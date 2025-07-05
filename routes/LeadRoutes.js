const express = require("express");

const { submitLead } = require("../controller/LeadController");
const router = express.Router();

router.post("/submit-lead", submitLead);

module.exports = router;
