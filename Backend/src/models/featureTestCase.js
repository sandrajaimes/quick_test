const db = require('./db');

function addFeatureInTestCase(idTC, idFeature) {
    return new Promise((resolve, reject)=>{
        db.query(`INSERT INTO feature_test_case (id_test_case,id_feature) VALUES (${idTC},${idFeature})`,
            (error,data)=>{
            if(error){
                reject(error)
            }
            resolve(data)
        })
    })
}

function getFeatureByIdTC(idTC){
    return new Promise((resolve, reject)=>{
        db.query(`SELECT fe.id,fe.name FROM
                        feature fe 
                        INNER JOIN feature_test_case fetc
                        ON fetc.id_feature = fe.id
                        AND fetc.id_test_case = ${idTC}`,(error,data)=>{
            if(error){
                reject(error)
            }
            resolve(data)
        })
    })
}

function deteleFeatureInTestCase(idTC, idFeature){
    return new Promise((resolve, reject)=>{
        db.query(`DELETE FROM feature_test_case WHERE id_test_case=${idTC} AND id_feature=${idFeature}`,
            (error,data)=>{
                if(error){
                    reject(error)
                }
                resolve(data)
        })
    })
}

module.exports = {
    getFeatureByIdTC,
    addFeatureInTestCase,
    deteleFeatureInTestCase

};
