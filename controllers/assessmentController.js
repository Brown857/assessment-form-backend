// controllers/assessmentController.js
const Assessment = require('../models/Assessment');

// Controller function to handle form submission
const submitAssessment = async (req, res) => {
  try {
    const formData = req.body;

    // Save the formData to the database (if using a database)
    const newAssessment = new Assessment(formData);
    await newAssessment.save();

    res.status(200).json({ message: 'Data submitted successfully!' });
  } catch (error) {
    console.error('Error saving assessment:', error);
    res.status(500).json({ message: 'Failed to submit data' });
  }
};

// Controller function to handle Excel file creation
const saveToExcel = async (req, res) => {
  const ExcelJS = require('exceljs');
  const path = require('path');
  const { responses } = req.body;

  try {
    // Save responses in the database
    const savedResponses = await Assessment.insertMany(responses);

    // Create Excel file
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Problem Behavior Checklist');

    worksheet.columns = [
      { header: 'Question', key: 'description', width: 50 },
      { header: 'Response', key: 'responses', width: 20 },
    ];

    savedResponses.forEach((item) => {
      worksheet.addRow({
        description: item.description,
        responses: item.responses.join(', '),
      });
    });

    // Save Excel file to server
    const filePath = path.join(__dirname, 'behavior_checklist.xlsx');
    await workbook.xlsx.writeFile(filePath);

    res.status(200).json({ message: 'Data saved and Excel file created!', filePath });
  } catch (error) {
    console.error('Error saving data to Excel:', error);
    res.status(500).json({ message: 'Error saving data to Excel' });
  }
};

module.exports = { submitAssessment, saveToExcel };
