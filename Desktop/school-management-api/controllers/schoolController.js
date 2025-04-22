import { db } from '../config/database.js';
import dotenv from 'dotenv';
dotenv.config();

const toRadians = (degrees) => degrees * (Math.PI / 180);

// Haversine formula to calculate distance between two coordinates
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth radius in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

const schoolController = {
    // Existing student handlers...

    addSchool: async (req, res) => {
        const { name, address, latitude, longitude } = req.body;

        if (!name || !address || typeof latitude !== 'number' || typeof longitude !== 'number') {
            return res.status(400).json({ error: 'Invalid input. Please provide name, address, latitude, and longitude (as numbers).' });
        }

        try {
            const [result] = await db.query(
                'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
                [name, address, latitude, longitude]
            );
            res.status(201).json({ message: 'School added', id: result.insertId });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    listSchools: async (req, res) => {
        const { latitude, longitude } = req.query;

        if (!latitude || !longitude) {
            return res.status(400).json({ error: 'Latitude and longitude are required as query parameters.' });
        }

        const userLat = parseFloat(latitude);
        const userLon = parseFloat(longitude);

        if (isNaN(userLat) || isNaN(userLon)) {
            return res.status(400).json({ error: 'Latitude and longitude must be valid numbers.' });
        }

        try {
            const [schools] = await db.query('SELECT * FROM schools');

            const schoolsWithDistance = schools.map(school => {
                const distance = calculateDistance(userLat, userLon, school.latitude, school.longitude);
                return { ...school, distance };
            });

            schoolsWithDistance.sort((a, b) => a.distance - b.distance);


            res.json(schoolsWithDistance);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

export default schoolController;
