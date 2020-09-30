const db = require('./db');

function addTypeOfTesting(typeOfTesting) {
    return new Promise((resolve, reject)=>{
        db.query(`INSERT INTO type_of_testing (name) values ('${typeOfTesting}')`,(error, data)=>{
            if(error){
                reject(error)
            }
            resolve(data)
        })
    })
}
function getTypeOfTestingByid(id) {
    return new Promise((resolve, reject)=>{
        db.query(`SELECT * FROM type_of_testing WHERE id=${id}`,(error, data)=>{
            if(error){
                reject(error)
            }
            resolve(data)
        })
    })
}
function getTypeOfTestingByName(name) {
    return new Promise((resolve, reject)=>{
        db.query(`SELECT * FROM type_of_testing WHERE name='${name}'`,(error, data)=>{
            if(error){
                reject(error)
            }
            resolve(data)
        })
    })
}
function deleteTypeOfTesting(id) {
    return new Promise((resolve, reject)=>{
        db.query('',(error, data)=>{
            if(error){
                reject(error)
            }
            resolve(data)
        })
    })
}

module.exports={
    addTypeOfTesting:addTypeOfTesting,
    getTypeOfTestingByid:getTypeOfTestingByid,
    getTypeOfTestingByName:getTypeOfTestingByName,
    deleteTypeOfTesting:deleteTypeOfTesting

};
