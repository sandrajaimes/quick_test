const db = require('./db');

function addPreConditionInTestCase(idTC,idPreCondition) {
    return new Promise((resolve, reject)=>{
        db.query(`INSERT INTO pre_condition_test_case (id_test_case,id_pre_condition) VALUES (${idTC},${idPreCondition})`,
            (error,data)=>{
            if(error){
                reject(error)
            }
            resolve(data)
        })
    })
}
function getPreConditionByTestCase(id){
    return new Promise((resolve, reject)=>{
        db.query(`SELECT pc.id,pc.description FROM
                        pre_condition_test_case pctc
                        INNER JOIN pre_condition pc
                        ON pc.id = pctc.id_pre_condition
                        AND pctc.id_test_case = ${id}`,(error,data)=>{
            if(error){
                reject(error)
            }
            resolve(data)
        })
    })
}
function detelePreconditionInTestCase(idTC,idPrecondition){
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM pre_condition_test_case WHERE id_test_case=${idTC} and id_pre_condition=${idPrecondition}`,
            (error,data)=>{
            if(error){
                resolve(error)
            }
            resolve(data)
        })
    })
}

module.exports = {
    getPreConditionByTestCase,
    addPreConditionInTestCase,
    detelePreconditionInTestCase,
};
