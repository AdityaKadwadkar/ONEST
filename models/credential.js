const mongoose = require("mongoose");

const credentialSchema = new mongoose.Schema({
  credentialId: { type: String, required: true, unique: true },
  issuer: { type: String, default: "did:web:kle-tech.edu" },
  issuanceDate: { type: Date, default: Date.now },
  subject: {
    id: String,
    name: String,
    email: String,
    course: String,
    grade: String,
    completionDate: String
  },
  credential: { type: Object, required: true },  // full VC JSON-LD
  signature: { type: String },                   // JWS signature
  status: { type: String, default: "active" }    // active | revoked
});

module.exports = mongoose.model("Credential", credentialSchema);
