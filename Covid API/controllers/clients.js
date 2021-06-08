

const clientModel = require("../models/Client");
const screeningModel = require("../models/Screening");

module.exports.getClients = async (req, res) => {
    const clients = clientModel;
    try {
        const foundClients = await clients.find({});

        res.status(200).send(foundClients);
    } catch (error) {
        res.status(400).send({message: "Something terrible happened"});
    }
};

module.exports.getClientById = async (req, res) => {

    const client = clientModel;
    const cliendID = req.params.id;
    try {
        const foundClient = await client.findById(cliendID);
        console.log(foundClient)
        res.status(200).send(foundClient);
    } catch (error) {
        res.status(500).send({message: "Something terrible happened"});
    }
};

//Helper function when saying a new client
saveScreenigData = async (screeningData, id, name, screener) => {
    let status = true;
    console.log(screeningData)
    const screening = new screeningModel({
        cliendID: id,
        screenerID: "9708150000000",
        client: name,
        screener: screener,
        temperature: screeningData.temperature,
        fever: screeningData.fever,
        cough: screeningData.cough,
        shortnessBreath: screeningData.shortnessBreath,
        soreThroat: screeningData.soreThroat,
        musclePain: screeningData.musclePain,
        lostTasteSmell: screeningData.lostTasteSmell,
        questions: screeningData.questions
    });
    
    try {
        const saved = await screening.save();
        return saved;
    } catch (error) {
       return null;
    }
}

module.exports.addClient = async (req, res) => {

    const clientInfo = req.body[0];
    const { address:  { addressA }, 
            address:  {addressB} } = clientInfo;

    // Client information
    const newClient = new clientModel({
        name: clientInfo.name,
        surname: clientInfo.surname,
        age: clientInfo.age,
        sex: clientInfo.sex,
        cellphone: clientInfo.cellphone,
        address: {
            addressA,
            addressB
        }
    });

    //Screenig info
    const screeningData  = req.body[1];
    const screeningSaved = await saveScreenigData(screeningData, newClient.id, newClient.name, "Tadima");
    
    if(screeningSaved === null) {
        return res.status(400).send({message: "Failed submission"});
    };

    try {
        const savedClient = await newClient.save();
        res.status(200).send([savedClient, screeningSaved]);
    } catch (error) {
        res.status(400).send({message: error});
    }

};

module.exports.updateClient = async (req, res) => {
    const clientID = req.params.id;
    const client = clientModel;

    if(!req.body) {
        res.status(200).send({message: "Could not update"})
        return;
    }

    if(req.body.userType) {
        res.status(200).send({message: "Could not update"})
        return;
    }

    try {

        const updateClient = await client.updateOne({_id: clientID}, {
            $set: {
                ...req.body,
            }
        })
        res.status(200).send(updateClient);

    } catch (error) {
        res.status(401).send({message: "Something happened on our end"});
    }
};