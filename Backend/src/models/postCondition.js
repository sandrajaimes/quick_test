const db = require('./db');

function addPostCondition(postCondition){
    return new Promise((resolve, reject)=>{
        db.query(`INSERT INTO post_condition (name) VALUES ('${postCondition}')`,(error,data)=>{
            if(error){
                reject(error)
            }
            resolve(data)
        })
    })
}

function getPostConditionById(id){
    return new Promise((resolve, reject)=>{
        db.query('SELECT * FROM post_condition WHERE id=${id}',(error,data)=>{
            if(error){
                reject(error)
            }
            resolve(data && data.length > 0 && data[0])
        })
    })
}

function updatePostConditionById(id,name){
    return new Promise((resolve, reject)=>{
        db.query(`UPDATE post_condition SET NAME='${name}' WHERE id=${id}`,(error,data)=>{
            if(error){
                reject(error)
            }
            resolve(data)
        })
    })
}

function deletePostCondition(idPostCondition){
    return new Promise((resolve, reject)=>{
        db.query(`DELETE FROM post_condition WHERE id=${idPostCondition}`,(error,data)=>{
            if(error){
                reject(error)
            }
            resolve(data)
        })
    })
}

module.exports={
    getPostConditionById,
    addPostCondition,
    updatePostConditionById,
    deletePostCondition
};
