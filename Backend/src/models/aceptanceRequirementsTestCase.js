const db = require('./db');

function addAceptanceRequirementInTestCase(idTc,idAcceptanceRequirement){
    return new Promise((resolve, reject)=>{
        db.query(`INSERT INTO acceptance_requirements_test_case (id_test_case,id_acceptance_requirements) VALUES (${idTc},${idAcceptanceRequirement})`,
            (error,data)=>{
            if(error){
                reject(error)
            }
            resolve(data)
        })
    })
}

function getAceptanceRequirementsByTC(id){
    return new Promise((resolve, reject)=>{
        db.query(`SELECT ac.id,ac.description FROM
                        acceptance_requirements_test_case actc
                        INNER JOIN acceptance_requirements ac
                        ON actc.id = ac.id
                        AND actc.id_test_case =${id}`,(error,data)=>{
            if(error){
                reject(error)
            }
            resolve(data)
        })
    })
}

function deleteAcceptanceRequirementsInTestCase(idTc,idAcceptanceRequirement){
    return new Promise((resolve, reject)=>{
        db.query(`DELETE FROM acceptance_requirements_test_case WHERE id_test_case=${idTc} AND id_acceptance_requirements=${idAcceptanceRequirement}`,
            (error,data)=>{
                if(error){
                    reject(error)
                }
                resolve(data)
        })
    })
}

module.exports={
    addAceptanceRequirementInTestCase,
    getAceptanceRequirementsByTC,
    deleteAcceptanceRequirementsInTestCase
};
