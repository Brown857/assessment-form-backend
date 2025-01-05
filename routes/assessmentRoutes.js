// routes/assessmentRoutes.js
const express = require('express');
const { submitAssessment, saveToExcel } = require('../controllers/assessmentController');

const router = express.Router();

// Route to handle assessment form submission
router.post('/submit', submitAssessment);

// Route to save data and generate Excel file
router.post('/saveToExcel', saveToExcel);

module.exports = router;
