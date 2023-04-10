const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const generateUniqueIdentifier = () => {
    const subdocumentIdentifier = Math.floor(Math.random() * (99999 - 10000 + 1) + 10000);
    return subdocumentIdentifier
}

const generateJwtToken = (jwtToken) => {
    const databaseIdentifier = generateUniqueIdentifier();
    const JWT_SECRET_KEY = "95f3796f1ed430edcb49916f111bed"
    const databaseJwt = jwt.sign({ jwt: jwtToken }, process.env.JWT_SECRET_KEY)
    console.log(databaseJwt);
    // console.log(name);
    return databaseJwt
}

const encodeAccessToken = (userDatabase) => {
    const {
        database,
        _id,
        name,
        email,
        _v
    } = userDatabase

    const encodedDatabase = database.map((item) => {
        return {
            name: item.name,
            jwt: generateJwtToken(item.jwt),
            // jwt: item.jwt,
            _id: item._id,
            productTable: item.productTable,
            blogTable: item.blogTable
        }
    })
    const reStructureValue = {
        _id,
        name,
        email,
        _v,
        database: encodedDatabase
    }

    return reStructureValue
}


module.exports = {
    generateUniqueIdentifier,
    generateJwtToken,
    encodeAccessToken
}