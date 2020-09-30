const db = require('./db');

function addAceptanceRequirement(aceptanceRequirement){
    return new Promise((resolve, reject)=>{
        db.query(`INSERT INTO acceptance_requirements (description) VALUES ('${aceptanceRequirement}')`,(error,data)=>{
            if(error){
                reject(error)
            }
            resolve(data)
        })
    })
}

function getAcceptanceRequirementById(id,description){
    new Promise((resolve, reject)=>{
        db.query(``,(error,data)=>{
            if(error){
                reject(error)
            }
            resolve(data)
        })
    })
}

function updateAcceptanceRequirementById(id,description){
    new Promise((resolve, reject)=>{
        db.query(`UPDATE acceptance_requirements SET description='${description}' WHERE id=${id}`,(error,data)=>{
            if(error){
                reject(error)
            }
            resolve(data)
        })
    })
}

function deleteAcceptanceRequirementById(id){
    return new Promise((resolve, reject)=>{
        db.query(`DELETE FROM acceptance_requirements WHERE id=${id}`,(error,data)=>{
            if(error){
                reject(error)
            }
            resolve(data)
        })
    })
}

module.exports={
    getAcceptanceRequirementById,
    addAceptanceRequirement,
    updateAcceptanceRequirementById,
    deleteAcceptanceRequirementById

};
