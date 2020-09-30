const db = require('./db');

function addOne(data){
    return new Promise((resolve, reject)=>{
        db.query(`INSERT INTO test_case (title,description,author,executortc,state,notas) 
                        VALUES ('${data.title}','${data.description}','${data.author}','${data.executortc}','${data.state}','${data.notas}')`,
            (error,data)=>{
            if(error){
                reject(error)
            }
            resolve(data)
        })
    })
}

function findAll(){
    return new Promise((resolve, reject)=>{
        db.query('SELECT * FROM test_case',(error,data)=>{
            if(error){
                reject(error)
            }
            resolve(data)
        })
    })
}

function findOne(id){
    return new Promise((resolve, reject)=>{
        db.query(`SELECT * FROM test_case WHERE id=${id}`,(error,data)=>{
            if(error){
                reject(error)
            }
            resolve(data)
        })
    })
}

function updateOne(id,data){
    return new Promise((resolve, reject) =>{
        db.query(`UPDATE test_case
                    SET title = ?, description=?, author=?, executortc=?,state=?,notas=?
                    WHERE id = ${id}`,
            [data.title,data.description,data.author,data.executortc,data.state,data.notes],
            (error,data) =>{
             if(error){
                 reject(error)
             }
             resolve(data)
        })
    })
}

function DeleteOne(idTC){
    return new Promise((resolve, reject)=>{
        db.query(`DELETE FROM test_case WHERE id=${idTC}`,(error,data)=>{
            if(error){
                reject(error)
            }
            resolve(data)
        })
    })
}

module.exports = {
    addOne,
    findAll,
    findOne,
    updateOne,
    DeleteOne
};
