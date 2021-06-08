const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require('cors');
const app = express();
//Config
dotenv.config(); //Load the enviromental variables

//Import Routes 
const screenings = require("./routes/screenings");
const clients = require("./routes/clients");
const screeners = require("./routes/screeners");


//Authentication route
const { isAuth } = require("./routes/protectRoutes");
//Controller
const { loginScreener } = require("./controllers/screeners");

//Middlewares
app.use(express.json());
app.use(cors());

//Login is the starting point(No need for the auth middleware)
app.post("/screeners/login", loginScreener);

//Only logged in users can access the routes below this middleware
// app.use(isAuth);

//Testing out writing code in Visual Studio
app.get("/", function (req, res) {
    res.send("I am so special with it. I feel so chosen");
});

//Route middlewares 
app.use("/clients", clients);
app.use("/screenings", screenings);
app.use("/screeners", screeners);

//Server listening on port 3000
app.listen(3000, () => {
    console.log("Server is running")
});

//Connecting to MongoDB
mongoose.connect(process.env.DATABASE_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}, () => {
        console.log("Database connected...");
    }
);

