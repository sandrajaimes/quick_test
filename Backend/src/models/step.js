const db = require('./db');

function addStep(data){
    return new Promise((resolve, reject)=>{
        db.query(`INSERT INTO step (description,expected_result) VALUES ('${data.description}','${data.expected_result}')`,
            (error,data)=>{
            if(error){
                reject(error)
            }
            resolve(data)
        })
    })
}
function updateStepById(id,data){
    return new Promise((resolve, reject)=>{
        db.query(`UPDATE step SET description='${data.description}', expected_result='${data.expected_result}' WHERE id=${id}`,(error,data)=>{
            if(error){
                reject(error)
            }
            resolve(data)
        })
    })
}
function deleteStepByID(id){
    return new Promise((resolve, reject)=>{
        db.query(`DELETE FROM step WHERE id=${id}`,(error, data)=>{
            if(error){
                reject(error)
            }
            resolve(data)
        })
    })
}

module.exports = {
    updateStepById,
    addStep,
    deleteStepByID
};
