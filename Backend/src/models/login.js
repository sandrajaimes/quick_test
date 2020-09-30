const db = require('./db');

function login(username,password) {
    return new Promise((resolve, reject)=>{
        db.query(`SELECT * FROM users WHERE username='${username}' AND password='${password}'`,(error,data)=>{
            if(error){
                reject(error)
            }
            resolve(data && data.length > 0 && data[0])
        })
    })
}

function findUserByUser(username) {
    return new Promise((resolve, reject)=>{
        db.query(`SELECT * FROM users WHERE username='${username}'`,(error,data)=>{
            if(error){
                reject(error)
            }
            resolve(data && data.length > 0 && data[0])
        })
    })
}

module.exports = {
    login,
    findUserByUser
};
