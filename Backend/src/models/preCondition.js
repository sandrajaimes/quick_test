const db = require('./db');

function addPreCondition(dataPreCondition) {
    return new Promise((resolve, reject)=>{
        db.query(`INSERT INTO pre_condition (description) VALUES ('${dataPreCondition}')`,(error,data)=>{
            if(error){
                reject(error)
            }
            resolve(data)
        })
    })
}

function getPreCondition(id) {
    return new Promise((resolve, reject)=>{
        db.query(`SELECT * FROM pre_condition where id=${id}`,(error,data)=>{
            if(error){
                reject(error)
            }
            resolve(data)
        })
    })
}

function updatePreconditionById(id,data){
    return new Promise((resolve, reject)=>{
        db.query(`UPDATE pre_condition SET description='${data}' WHERE id=${id}`, (error, data)=>{
            if(error){
                reject(error)
            }
            resolve(data)
        })
    })
}

function deletePrecondition(idPrecondition){
    return new Promise((resolve, reject)=>{
        db.query(`DELETE FROM pre_condition WHERE id=${idPrecondition}`,(error,data)=>{
            if(error){
                reject(error)
            }
            resolve(data)
        })
    })
}

module.exports={
    getPreCondition,
    updatePreconditionById,
    addPreCondition,
    deletePrecondition,
};
