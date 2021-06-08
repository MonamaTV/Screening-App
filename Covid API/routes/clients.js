const express = require("express");
const router = express.Router();

const { getClients, 
        getClientById, 
        addClient,
        updateClient } = require("../controllers/clients");

router.get("/", getClients);

router.get("/:id", getClientById);

router.post("/", addClient);

router.patch("/:id", updateClient);

module.exports = router;