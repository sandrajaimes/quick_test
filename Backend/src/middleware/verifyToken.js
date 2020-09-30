const jwt = require("jsonwebtoken");
const modelLogin = require("../models/login");

async function verifyToken(req,resp,next) {
    try{
    const token = req.headers['authorization'];

    if(!token) return resp.status(400).json({ message:"Token Empty"});

    const extractBearer = token.split(" ");
    let finalyToken;

    if(extractBearer.length === 2){
        finalyToken = extractBearer[1];
    }
    if(extractBearer.length === 1){
        finalyToken = extractBearer[0];
    }

    const decoded = jwt.verify(finalyToken,"pormastesting2020");

    const userExist = modelLogin.findUserByUser(decoded.username);

    if(!userExist) return res.status(404).json({message:"User no found"});

    next()

    }catch (e) {
        console.log(e);
        return resp.status(500).json({message:"Token Invalid"});
    }
}
module.exports={
    verifyToken
};
