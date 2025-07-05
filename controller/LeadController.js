const axios = require("axios");
const qs = require("qs");
const Lead = require("../models/LeadModule");

exports.submitLead = async (req, res) => {
  const { name, email, phone } = req.body;

  try {
    const lead = new Lead({ name, email, phone });
    await lead.save();

    const [firstName, ...last] = name.split(" ");

    const payload = qs.stringify({
      DataFrom: "T",
      ApiKey: "a28cc43c-526d-4010-970e-0d0e92c18902",
      EnquiryDate: new Date().toISOString().split("T")[0],
      FirstName: firstName,
      LastName: last.join(" "),
      MobileNo: phone,
      Email: email,
      Source: "Digitals",
      SourceDetail: "Website",
    });

    const response = await axios.post(
      "https://nirman.maksoftbox.com/MDocBoxAPI/MdocAddEnquiryORTeleCalling",
      payload,
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    console.log("CRM response:", response.data);

    res.status(200).json({ success: true, msg: "Lead submitted" });
  } catch (err) {
    res.status(500).json({ error: "Submission failed", detail: err.message });
  }
};
