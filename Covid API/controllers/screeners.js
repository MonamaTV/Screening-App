const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { registerValidation, loginValidation } = require("../validation");

// People who screen visitors
const screenerModel = require("../models/Screener");


module.exports.registerScreener = async (req, res) => {
    
    const screener = req.body;
    const { error } = registerValidation(screener)
 
    if(error) {
        return res.status(401).send({message: error.details[0].message})
    }
    //Check first if the screener is not already added/registered
    const checkUser = await screenerModel.find({email: screener.email, _id: screener._id});
    if(checkUser.length > 0) {
        return res.send({message: "User already exists"});
    }

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(screener.email, salt);

    const registerScreener = new screenerModel({
        _id: screener._id,
        name: screener.name,
        email: screener.email,
        password: hashPassword,
        isActive: true,
        userType: screener.userType
    });

    try {
        const registeredScreener = await registerScreener.save();
        res.status(200).send(registeredScreener);
    } catch (error) {
        res.status(501).send({error})
    }
};

module.exports.loginScreener = async (req, res) => {

    const screenerInfo = req.body;
    
    const { error } = loginValidation(screenerInfo);
    if(error) {
        return res.status(400).send({message: error.details[0].message});
    }

    const user = await screenerModel.findOne({email: screenerInfo.email});
    if(!user) {
        return res.status(400).send({message: "email does not have account"});
    }

    const validUser = await bcrypt.compare(screenerInfo.password, user.password);
    if(!validUser) {
        return res.status(401).send({message: "Email or password is incorrect"});
    }
    const { password, _id, isActive, addedAt, ...userToken } = user?._doc;
    
    //Create and assign web token
    const token = jwt.sign({userToken}, process.env.PROJECT_SECRET_AUTHENTICATION);
    
    res.header("auth-token", token).send({User: {
        name: user.name,
        userType: user.userType,
        email: user.email,
        isActive: user.isActive,
        _id: user._id,
        token
    }});
};

module.exports.getScreenerById = async (req, res) => {
    const { screenerID } = req.params;

    if(screenerID === "" || screenerID.length < 1) {
        return res.status(500).send({message: "Your query is empty"});
    }

    try {
        const screener = await screenerModel.findById({screenerID}, {password: 0});
        res.status(400).send(screener);
    } catch (error) {
        res.status(501).send({message: error})
    }
};

module.exports.getScreeners =  async (req, res) => { 
    try {
        const screeners = await screenerModel.find({$and: [{userType: {$nin: 3}, isActive: {$nin: false}} ]}, {password: 0}).sort({addedAt: -1});
        res.status(200).send(screeners);
    } catch (error) {
        res.status(501).send({message: error})
    }
};

module.exports.updateScreener =  async (req, res) => {
    const { screenerID } =  req.params;
    const update = req.body;

    if(!screenerID) {
        res.status(401).send({message: "The user id is not valid"});
        return;
    }

    if(JSON.stringify(update) === "{}") {
        res.status(300).send({message: "No data to update"});
        return;
    }
    

    try {
        const updatedScreener = await screenerModel.updateOne({_id: screenerID}, {
            $set: {
                ...update,
            }
        });
        res.status(200).send(updatedScreener);
    } catch (error) {
        res.status(500).send({message: "there was no update"})
    }
};

//add delete route that only changes the isActive property of screener