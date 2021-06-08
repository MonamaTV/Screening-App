const jwt = require("jsonwebtoken");

module.exports.isAuth = (req, res, next) => {
    const token = req.header("auth-token");
    if(!token) {
        return res.status(400).send({message: "Invalid request"});
    }

    try {
        const verify = jwt.verify(token, process.env.PROJECT_SECRET_AUTHENTICATION);
        req.user = verify;
        next();
    } catch (err) {
        res.status(400).send({message: "Something went wrong"});
    }
};

module.exports.isAdmin = (req, res, next) => {
    const token = req.header("auth-token");
    if(!token) {
        return res.status(401).send({message: "Invalid request"});
    }

    try {
        const verify = jwt.verify(token, process.env.PROJECT_SECRET_AUTHENTICATION);
        req.user = verify;
        
        if(req.user.userToken.userType !== 3) {
            return res.status(401).send({message: "Bad request"});
        }
        next();  
    } catch (err) {
        res.status(400).send({message: "Something went wrong"});
    }
};