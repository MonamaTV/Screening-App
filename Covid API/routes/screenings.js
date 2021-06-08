//Route for screening form

const express = require("express");

const router = express.Router();

const screeningModel = require("../models/Screening");

// There is no post function/request in this route because the data is posted along with the client
router.get("/:id", async (req, res) => {
    
    const screeningID = req.params.id;
    const screening = screeningModel;
    console.log(screeningID)
    try {
        const screeningData = await screening.findById(screeningID);
        res.status(200).send(screeningData);
    }
    catch(error) {
        res.status(400).send({message: "We could not find what you are looking for"});
    }
});

//Search by name and page number are query parameters
router.get("/:datestart?/:dateend?", async (req, res) => {
    
    const pagination = 10; //Always return 10 collections/documents
    //Page number for pagination
    let { page, name } = req.query;
    //Default values
    const defaultName = '';
    const defaultDateStart = '2020-12-31';
    const defaultDateEnd = '2100-12-12';

    //Assigning values to filter the data with
    name = name.length > 1? name : defaultName;
    const datestart = req.params?.datestart? req.params?.datestart : defaultDateStart;
    const dateend = req.params?.dateend? req.params?.dateend : defaultDateEnd;
    try {
        //Yeah neh... using regex to filter the data with client names(if the user has made such query) or just return everything
        //Also we sort the data with addedAt...simply taking the latest data
        //We only return ten collections per query, pagination is used
        const screenings = await screeningModel.find({client: {
                $regex: `.*${name || ''}.*`
            }, 
            $and: [{addedAt: {$gte: datestart}}, {addedAt: {$lte: dateend}}]})
            .sort({addedAt: -1})
            .skip((page - 1) * pagination)
            .limit(10);

        
        let newScreenings = [];
        
        screenings.forEach((screening) => {
            const newQuestions = screening?.questions;
            
            let risk = false;
            if(screening?.temperature > 38) risk = true;
            if(screening?.fever) risk = true; 
            if(screening?.cough) risk = true; 
            if(screening?.soreThroat) risk = true; 
            if(screening?.musclePain) risk = true; 
            if(screening?.lostTasteSmell) risk = true; 
            if(screening?.shortnessBreath) risk = true; 

            if(newQuestions?.attendedGathering) risk = true; 
            if(newQuestions?.attendedHealthCare) risk = true; 
            if(newQuestions?.interprovincialTravel) risk = true; 
            if(newQuestions?.possibleCovidContact) risk = true; 

            newScreenings.push({...screening?._doc, risk});
        });
          
        res.status(200).send(newScreenings);
    } catch (error) {
        res.status(400).send({message: "We could not find the database"})
    }
});


router.patch("/:id", async (req, res) => {
    const screeningID = req.params.id;
    const screening = screeningModel;
    
    if(!res.body)
    {
        res.status(500).send({message: "No content to update"});
    }

    try {
        const updateScreening = await screening.updateOne({_id: screeningID}, {
            $set: {
                ...req.body
            }
        });
        res.status(200).send(updateScreening);
    }
    catch (error) {
        res.status(400).send({message: "Somethig else happened"});
    }
});

router.delete("/:id", async (req, res) => {
    const screeningID = req.params.id;
    const screening = screeningModel;

    try {
        await screening.deleteOne({_id: screeningID});
        res.status(200).send({message: "The data has been deleted"})
    }
    catch (error) {
        res.status(404).send({message: "Could not delete the data"})
    }
});

module.exports = router;