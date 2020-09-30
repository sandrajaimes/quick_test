const jwt = require("jsonwebtoken");
const modelLogin = require('../models/login');

async function login(req,resp){
    try {
        const user = req.body.username;
        const password = req.body.password;
        const existUser = await modelLogin.login(user,password);

        if(!existUser){
            return resp.status(404).json({
                message:"Login Failed"
            })
        }

        const token = jwt.sign({... existUser}, "pormastesting2020", { expiresIn: 60 * 60 });

        resp.status(200).json({
            token:token,
            message:"Login Sucessfull"
        })

    }catch (e) {
        console.log(e);
        resp.status(500).json({
            message:"Server Error"
        })
    }
}

module.exports={
  login
};
