require('dotenv').config();
  const express = require('express');
  const mongoose = require('mongoose');
  const bodyParser = require('body-parser');
  const cors = require("cors");




  const app = express();

  // Middleware
 // app.use(cors());
  //app.use(bodyParser.json());

  app.use(
    cors({
      origin: ["https://677a906ebfce1481a2865922--sanjanaform.netlify.app"], // Add your Netlify frontend URL here
      methods: ["GET", "POST"], // Allowed methods
      allowedHeaders: ["Content-Type"],
    })
  );
  // Connect to MongoDB
  const mongoURI = process.env.MONGO_URI;  mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('Connected to MongoDB');
  });

  

  // Define Mongoose Schema
  const formDataSchema = new mongoose.Schema({
    name: String,
    sex: String,
    dateOfBirth: String,
    age: String,
    placeOfBirth: String,
    birthWeight: String,
    feed: String,
    latch: String,
    sixMonth: String,
    formula: String,
    duration: String,
    weaningAge: String,
    weaningType: String,
    colicIssues: String,
    pottyTrainingAge: String,
    height: String,
    weight: String,
    headCircumference: String,
    muac: String,
    sft: String,
    bmiPercentile: String,
    bmrPercentile: String,
    hemoglobin: String,
    clinical: String,
    appearanceFatLoss: Boolean,
    appearanceSunkenCheeks: Boolean,
    hairDryBrittle: Boolean,
    hairCorkscrewHair: Boolean,
    nailsSpooning: Boolean,
    nailsTransverseLines: Boolean,
    skinDryScaly: Boolean,
    skinPallor: Boolean,
    foodFrequency: {
      cereals: [String],
      rice: [String],
      ragi: [String],
      wheat: [String],
      jowar: [String],
      pulses: [String],
      milkProducts: [String],
      vegetables: [String],
      fruits: [String],
      meat: [String],
      processedFood: [String],
    },
    constipation:  String ,
    brainFog: String,
    nausea: String,
    eatingPattern: String,
    heartburn: String,
    breathingIrregularities: String,
    ibs: String,
    ruminating: String,
    regurgitation: String,
    stoolingPain: String,
    smellyStool:String,
    fallSick: String,
    antibioticUsage: String,
    foodAllergy: String,
    selfMutilation: String,
    soundSleep: String,
    // Demographic Data
    namemother: String,
    agemother: String,
    socio: String,
    qualifications: String,
    occupation: String,
    // Micellaneous fields
    primiparousMother: String,
    antenatalProblem: String,
    feverWithRash: String,
    anemia: String,
    pih: String,
    antepartumHemorrhage: String,
    modeOfDelivery: String,
    highRiskGroup: String,
    prematurity: String,
    lowBirthWeight: String,
    hospitalizationFirstFourDays: String,
    cnsInfection: String,
    cpOrDevelopmentalDelay: String,
    dysmorphicSyndrome: String,
    seizureDisorder: String,
    motherheight: String,
    motherweight: String,
    motherheadCircumference: String,
    mothermuac: String,
    mothersft: String,
    motherbmiPercentile: String,
    motherbmrPercentile: String,
    motherhemoglobin: String,
    mothersubcutaneousFatLoss: Boolean,
    mothersunkenCheeks: Boolean,
    motherdryBrittleHair: Boolean,
    mothercorkscrewHair: Boolean,
    motherspooningNails: Boolean,
    mothertransverseLines: Boolean,
    motherdryScalySkin: Boolean,
    motherpallor: Boolean,

    motherFoodFrequency: {
      cereals: [String],
      rice: [String],
      ragi: [String],
      wheat: [String],
      jowar: [String],
      pulses: [String],
      milkProducts: [String],
      vegetables: [String],
      fruits: [String],
      meat: [String],
      processedFood: [String],
    },
 
    behaviors: Object,
    
    
    //behaviours
      domainIntensity: {
        type: [[String]], // Nested array of strings
        default: Array(11).fill(Array(3).fill("")), // Initialize with 11 rows and 3 columns
      },

      milestoneData: [
        {
          age: String,
          fields: [
            {
              category: String,
              value: String,
            },
          ],
        },
      ],
      bedtime: [{ question: String, score: Number }],
      sleepBehavior: [{ question: String, score: Number }],
      wakingNight: [{ question: String, score: Number }],
      morningWakeUp: [{ question: String, score: Number }],
      weekdaysWakeUp: String,
      weekendsWakeUp: String,
      weeknights: String,
      bedtimeweekends: String,
      sleepHours: String,
      sleepMinutes: String,

      fecesDescriptions: [
        {
          altId: { type: String },
          description: { type: String },
        },
      ],

  });
  


  const FormData = mongoose.model("FormData", formDataSchema);

  // Test route
  app.get("/test", (req, res) => {
    res.status(200).json({ message: "Backend is working" });
  });
  
  app.post("/submit-form", async (req, res) => {
    try {
      console.log("Received request:", req.body);
  
      const { behaviors, milestoneData,fecesDescriptions, ...restOfData } = req.body;
  
      if (
        behaviors &&
        typeof behaviors === 'object' &&
        Array.isArray(milestoneData) 

      ) {
        const newFormData = new FormData({
          ...restOfData,
          behaviors,
          milestoneData,
          fecesDescriptions,
        });
  
        await newFormData.save();
        res.status(201).json({ message: "Form data submitted successfully!" });
      } else {
        res.status(400).json({
          message: "Invalid data structure. Check behaviors and milestone data.",
        });
      }
    } catch (error) {
      console.error("Error saving form data:", error);
      res.status(500).json({ message: "Failed to submit form data", error });
    }
  });
  
  
  // Start the server
  const PORT = 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });