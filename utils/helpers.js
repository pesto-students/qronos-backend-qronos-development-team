const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const generateUniqueIdentifier = () => {
    const subdocumentIdentifier = crypto.randomBytes(16).toString('hex');
    return subdocumentIdentifier
}

const generateJwtToken = () => {
    const databaseIdentifier = generateUniqueIdentifier();
    const JWT_SECRET_KEY = "95f3796f1ed430edcb49916f111bed"
    const databaseJwt = jwt.sign({ jwt: databaseIdentifier }, process.env.JWT_SECRET_KEY)

    return databaseJwt
}

module.exports = {
    generateUniqueIdentifier,
    generateJwtToken
}