const db = require('./db');

function getTypeOfTestingByTC(id){
    return new Promise((resolve, reject)=>{
        db.query(`SELECT tot.id,tot.name FROM
                        type_of_testing_test_case tottc
                        INNER JOIN type_of_testing tot
                        ON tottc.id_type_of_testing = tot.id
                        AND tottc.id_test_case = ${id}`,(error,data)=>{
            if(error){
                reject(error)
            }
            resolve(data)
        })
    })
}

function getTypeOfTestingByTCandIDTypeOfTesting(idTC,idTypeOfTesting){
    return new Promise((resolve, reject)=>{
        db.query(`SELECT tot.id,tot.name FROM
                        type_of_testing_test_case tottc
                        INNER JOIN type_of_testing tot
                        ON tottc.id = tot.id
                        AND tottc.id_test_case = ${idTC} 
                        AND tottc.id_type_of_testing = ${idTypeOfTesting}`,(error,data)=>{
            if(error){
                reject(error)
            }
            resolve(data)
        })
    })
}

function addTypeOfTestingInTC(idTC,idTypeOfTesting){
    return new Promise((resolve, reject)=>{
        db.query(`INSERT INTO type_of_testing_test_case
                        (id_test_case,id_type_of_testing) VALUES (${idTC},${idTypeOfTesting})`,
            (error,data)=>{
            if(error){
                reject(error)
            }
            resolve(data)
        })
    })
}

function deleteTypeOfTestingInTC(idTC,idTypeOfTesting){
    return new Promise((resolve, reject)=>{
        db.query(`DELETE FROM type_of_testing_test_case 
                        WHERE id_test_case=${idTC} AND id_type_of_testing=${idTypeOfTesting}`,
            (error,data)=>{
            if(error){
                reject(error)
            }
            resolve(data)
        })
    })
}

module.exports = {
    getTypeOfTestingByTC,
    getTypeOfTestingByTCandIDTypeOfTesting,
    addTypeOfTestingInTC,
    deleteTypeOfTestingInTC
};
