const mongoose = require("mongoose");
// Rules 
const requirements = {
    required: true,
    type: Boolean,
};
// ID rules
const IdRequirements = {
    required: true,
    type: String,
}
// questionaires
const questionsModel = mongoose.Schema({
    attendedGathering: requirements,
    attendedHealthCare: requirements,
    interprovincialTravel: requirements,
    possibleCovidContact: requirements
});
// Models/Schemas
const screeningModel = mongoose.Schema({
    cliendID: IdRequirements,
    client: String,
    screener: String,
    temperature: {
        type: Number,
        required: true
    },
    screenerID: IdRequirements,
    fever: requirements,
    cough: requirements,
    shortnessBreath: requirements,
    soreThroat: requirements,
    musclePain: requirements,
    lostTasteSmell: requirements,
    addedAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    questions: questionsModel
});

const screenings = mongoose.model("screenings", screeningModel);

module.exports = screenings;