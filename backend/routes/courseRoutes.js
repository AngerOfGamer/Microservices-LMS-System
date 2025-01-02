import express from 'express';
import { getCourses } from '../controllers/courseController.js'; 

const router = express.Router();

router.get('/courses', getCourses);

export default router;
