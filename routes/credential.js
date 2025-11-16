const express = require("express");
const router = express.Router();
const Credential = require("../models/credential");
const authMiddleware = require("../middleware/authMiddleware");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

// Create credential (Admin Only)
router.post("/issue", authMiddleware, async (req, res) => {
  try {
    const user = req.user;
    if (user.role !== "admin") {
      return res.status(403).json({ error: "You are not allowed to issue credentials" });
    }

    const { name, email, course, grade, completionDate } = req.body;

    const credentialId = uuidv4();

    const vc = {
      "@context": [
        "https://www.w3.org/2018/credentials/v1"
      ],
      "id": `urn:uuid:${credentialId}`,
      "type": ["VerifiableCredential", "CourseCompletionCredential"],
      "issuer": "did:web:kle-tech.edu",
      "issuanceDate": new Date().toISOString(),
      "credentialSubject": {
        "id": `mailto:${email}`,
        "name": name,
        "email": email,
        "course": course,
        "grade": grade,
        "completionDate": completionDate
      }
    };

    const signed = jwt.sign(vc, process.env.JWT_SECRET);

    const newCredential = new Credential({
      credentialId,
      subject: { name, email, course, grade, completionDate },
      credential: vc,
      signature: signed
    });

    await newCredential.save();

    res.json({
      success: true,
      message: "Credential issued successfully",
      credentialId,
      signedCredential: signed
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to issue credential" });
  }
});

module.exports = router;
