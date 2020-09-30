const modelTypeOfTesting = require ('../models/typeOfTesting');

async function addTypeOfTesting(req,resp) {
    try{
        let body = req.body;

        let addTypeOfTestingOk = await modelTypeOfTesting.addTypeOfTesting(body.name);
        console.log("addTypeOfTestingOk",addTypeOfTestingOk);

        if(addTypeOfTestingOk) {
            resp.status(200).json({
                message:'test type was added successfully'
            })
        }
    }catch (e) {
        console.log('addTypeOfTesting',e);
        resp.status(500).json({
            message:'Type Of Testing could not be addOne'
        })
    }

}

module.exports={
    addTypeOfTesting:addTypeOfTesting,
};
