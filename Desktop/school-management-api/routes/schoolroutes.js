import express from 'express';
import schoolController from '../controllers/schoolController.js';

const router = express.Router();

// ✅ Make sure these method names match exactly with what exists in your controller
router.post('/addSchool', schoolController.addSchool);
router.get('/listSchools', schoolController.listSchools);


// Existing routes (if any)...

export default router;
