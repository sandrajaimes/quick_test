const db = require('./db');

function addStepInTestCase(idTC, idStep) {
    return new Promise((resolve, reject)=>{
        db.query(`INSERT INTO step_test_case (id_test_case,id_step) VALUES (${idTC},${idStep})`,
            (error,data)=>{
            if(error){
                reject(error)
            }
            resolve(data)
        })
    })
}

function getStepInTestCaseById(id) {
    return new Promise((resolve, reject)=>{
        db.query(`SELECT st.id,st.description, st.expected_result FROM
                        step_test_case sttc
                        INNER JOIN step st
                        ON sttc.id = st.id
                        AND sttc.id_test_case = ${id}`,(error, data) => {
            if(error){
                reject(error)
            }
            resolve(data)
        })
    })
}

function deleteStepInTestCase(idTC,idStep){
    return new Promise((resolve, reject)=>{
        db.query(`DELETE FROM step_test_case WHERE id_test_case=${idTC} AND id_step=${idStep}`,
            (error,data)=>{
            if(error){
                reject(error)
            }
            resolve(data)
        })
    })
}

module.exports={
    getStepInTestCaseById,
    addStepInTestCase,
    deleteStepInTestCase
};
