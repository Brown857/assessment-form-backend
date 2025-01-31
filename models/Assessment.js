// models/Assessment.js
const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sex: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  age: { type: Number, required: true },
  placeOfBirth: { type: String, required: true },
  birthWeight: { type: String, required: true },
  goldenHour: String,
  goldenHourReason: String,
  latch: String,
  exclusiveBreastfeed: String,
  exclusiveBreastfeedReason: String,
  formulaFed: String,
  formulaDuration: String,
  breastfeedDuration: String,
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
  appearanceFatLoss: false,
    appearanceSunkenCheeks: false,
    hairDryBrittle: false,
    hairCorkscrewHair: false,
    nailsSpooning: false,
    nailsTransverseLines: false,
    skinDryScaly: false,
    skinPallor: false,
  foodFrequency: [
    {
      category: String,
      daily: String,
      weekly: String,
      often: String,
      rarely: String,
    }
  ],
  gutHealth: {
    constipation: String,
    brainFog: String,
    nausea: String,
    eatingPattern: String,
    heartburn: String,
    breathingIrregularities: String,
    ibs: String,
    ruminating: String,
    regurgitation: String,
    stoolingPain: String,
    smellyStool: String,
    fallSick: String,
    antibioticUsage: String,
    foodAllergy: String,
    selfMutilation: String,
    soundSleep: String,
  },
  maternalHealth: {
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
  },
  anthropometric: {
    height: String,
    weight: String,
    headCircumference: String,
    muac: String,
    sft: String,
    bmiPercentile: String,
    bmr: String,
  },
  developmental: {
    ageGroup: { type: String, required: true },
    motorSkills: String,
    fineMotorSkills: String,
    feeding: String,
    cognitive: String,
    socialEmotional: String,
    receptiveLanguage: String,
    expressiveLanguage: String,
  },
  behaviorChecklist: {
    ageRange: String,
    behaviors: [
      {
        description: String,
        responses: [String],
      },
    ],
    fecesType: String,
    fecesComments: String,
  }
});

const Assessment = mongoose.model('Assessment', assessmentSchema);

module.exports = Assessment;
