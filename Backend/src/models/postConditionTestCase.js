const db = require('./db');

function addPostConditionInTestCase(idTc, idPostCondition){
    return new Promise((resolve, reject)=>{
        db.query(`INSERT INTO post_condition_test_case (id_test_case,id_post_condition) VALUES (${idTc},${idPostCondition})`,
            (error,data)=>{
                if(error){
                    reject(error)
                }
                resolve(data)
            })
    })
}

function getPostConditionByTC(id) {
    return new Promise((resolve, reject)=>{
        db.query(`SELECT pos.id,pos.name FROM
                        post_condition_test_case postc
                        INNER JOIN post_condition pos
                        ON postc.id = pos.id
                        AND postc.id_test_case = ${id}`,(error,data)=>{
            if(error){
                reject(error)
            }
            resolve(data)
        })
    })
}

function updatePostCondition (id){
    return new Promise((resolve, reject)=>{
        db.query('',(error, data)=>{
            if(error){
                reject(error)
            }
            resolve(data)
        })
    })
}

function deletePostConditionInTestCase(idTc,idPostCondition){
    return new Promise((resolve, reject)=>{
        db.query(`DELETE FROM post_condition_test_case WHERE id_test_case=${idTc} AND id_post_condition=${idPostCondition}`,
            (error,data)=>{
            if(error){
                reject(error)
            }
            resolve(data)
        })
    })
}

module.exports={
    getPostConditionByTC,
    addPostConditionInTestCase,
    deletePostConditionInTestCase,
};
