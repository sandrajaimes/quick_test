const db = require('./db');

function finOne(idEnvironment) {
    return new Promise((resolve, reject)=>{
        db.query(`SELECT * FROM environment WHERE id=${idEnvironment}`,(error, data)=>{
            if (error){
                reject(error)
            }
            resolve(data)
        })
    })
}
function deleteOne(idEnvironment){
    return new Promise((resolve, reject)=>{
        db.query(`DELETE FROM environment WHERE id=${idEnvironment}`,(error, data)=>{
            if (error){
                reject(error)
            }
            resolve(data)
        })
    })
}

module.exports={
    finOne,
    deleteOne
};
