const db = require('./db');

async function findOne(idFeature) {
    return new Promise((resolve, reject) =>{
        db.query(`SELECT * FROM feature WHERE id=${idFeature}`,(error,data)=>{
            if(error){
                reject(error)
            }
            resolve(data)
        })
    })
}

module.exports={
    findOne
};
