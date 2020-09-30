const db = require('./db');

function addEnvironmentInTestCase(idTC, idEnvironment) {
    return new Promise((resolve, reject)=>{
        db.query(`INSERT INTO environment_test_case (id_test_case,id_environment) VALUES (${idTC},${idEnvironment})`,
            (error, data)=>{
            if(error){
                reject(error)
            }
            resolve(data)
        })
    })
}

function getEnvironmentByIdtc(id){
    return new Promise((resolve, reject)=>{
        db.query(`SELECT env.id,env.name FROM
                        environment_test_case envtc
                        INNER JOIN environment env
                        ON envtc.id_environment = env.id
                        AND envtc.id_test_case = ${id}`,(error,data)=>{
            if(error){
                reject(error)
            }
            resolve(data)
        })
    })
}

function deleteEnvironmentInTestCase(idTc,idEnvironment){
    return new Promise((resolve, reject)=>{
        db.query(`DELETE FROM environment_test_case 
                        WHERE id_test_case=${idTc} AND id_environment=${idEnvironment}`,(error,data)=>{
            if(error){
                reject(error)
            }
            resolve(data)
        })
    })
}

module.exports = {
    getEnvironmentByIdtc,
    addEnvironmentInTestCase,
    deleteEnvironmentInTestCase

};
