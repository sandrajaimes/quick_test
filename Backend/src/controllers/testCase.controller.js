const modelTestCase = require('../models/testCase');
const modelPreConditionTestCase = require('../models/preConditionTestCase');
const modelPreCondition = require('../models/preCondition');
const modelTypeOfTestingTestCase = require('../models/typeOfTestingTestCase');
const modelFeatureTestCase = require('../models/featureTestCase');
const modelEnvironmentTestCase = require ('../models/environmentTestCase');
const modelPostConditionTestCase = require('../models/postConditionTestCase');
const modelPostCondition = require('../models/postCondition');
const modelStepTestCase = require('../models/stepTestCase');
const modelStep = require('../models/step');
const modelAcceptanceRequirementsTestCase = require('../models/aceptanceRequirementsTestCase');
const modelAcceptanceRequirements = require('../models/acceptanceRequirements');

async function addTestCases(req,resp) {
    try{
        const tcData = req.body;

        const dataSend = {
            title:tcData.title,
            description:tcData.description,
            author:tcData.author,
            executortc:tcData.executortc,
            state:tcData.state,
            notas:tcData.notas
        };

        const addTestCase = await modelTestCase.addOne(dataSend);

        if(tcData.dataPrecondition.length > 0){
            let dataPre=0;
            while(dataPre < tcData.dataPrecondition.length){
                const addPreCondition =await modelPreCondition.addPreCondition(tcData.dataPrecondition[dataPre].description);
                await modelPreConditionTestCase.addPreConditionInTestCase(addTestCase.insertId,addPreCondition.insertId);
                dataPre ++
            }
        }

        if(tcData.dataPostcondition.length > 0){
            let dataPost=0;
            while(dataPost < tcData.dataPostcondition.length){
                const dataPostcondition = await modelPostCondition.addPostCondition(tcData.dataPostcondition[dataPost].name);
                await modelPostConditionTestCase.addPostConditionInTestCase(addTestCase.insertId,dataPostcondition.insertId);
                dataPost ++
            }
        }

        if(tcData.dataStep.length > 0){
            let dataStepC=0;
            while(dataStepC < tcData.dataStep.length){
                let dataToStep = {
                    description:tcData.dataStep[dataStepC].description,
                    expected_result:tcData.dataStep[dataStepC].expected_result,
                };
                const adddataStep =await modelStep.addStep(dataToStep);
                await modelStepTestCase.addStepInTestCase(addTestCase.insertId,adddataStep.insertId);
                dataStepC ++
            }
        }

        if(tcData.dataAcceptanceRequirement.length > 0){
            let dataARequirementC=0;
            while(dataARequirementC < tcData.dataAcceptanceRequirement.length){
                const addAceptanceRequirement = await modelAcceptanceRequirements.addAceptanceRequirement(tcData.dataAcceptanceRequirement[dataARequirementC].description);
                await modelAcceptanceRequirementsTestCase.addAceptanceRequirementInTestCase(addTestCase.insertId,addAceptanceRequirement.insertId);
                dataARequirementC ++
            }
        }

        if(tcData.dataTypeOfTesting.length > 0){
            let dataTypeOfTestingC=0;
            while(dataTypeOfTestingC < tcData.dataTypeOfTesting.length){
                await modelTypeOfTestingTestCase.addTypeOfTestingInTC(addTestCase.insertId,tcData.dataTypeOfTesting[dataTypeOfTestingC].id);
                dataTypeOfTestingC ++
            }
        }

        if(tcData.dataFeature.length > 0){
            let dataFeatureC=0;
            while(dataFeatureC < tcData.dataFeature.length){
                await modelFeatureTestCase.addFeatureInTestCase(addTestCase.insertId,tcData.dataFeature[dataFeatureC].id);
                dataFeatureC ++
            }
        }

        if(tcData.dataEnvironment.length > 0){
            let dataEnvironmentC=0;
            while(dataEnvironmentC < tcData.dataEnvironment.length){
                await modelEnvironmentTestCase.addEnvironmentInTestCase(addTestCase.insertId,tcData.dataEnvironment[dataEnvironmentC].id);
                dataEnvironmentC ++
            }
        }

        if(addTestCase){
            resp.status(200).json({
                id:addTestCase.insertId,
                message:'Test Case Add'
            })
        }

    }catch (e) {
        console.log(e);
        resp.status(500).json({
            message:'Server Error'
        })
    }

}

async function findAll(req,resp) {
    try{
        const data = await modelTestCase.findAll();
        let parent= [];

        for(let i=0; i < data.length; i++){

            const dataPrecondition = await modelPreConditionTestCase.getPreConditionByTestCase(data[i].id);
            const dataTypeOfTesting = await modelTypeOfTestingTestCase.getTypeOfTestingByTC(data[i].id);
            const dataFeature = await modelFeatureTestCase.getFeatureByIdTC(data[i].id);
            const dataEnvironment = await modelEnvironmentTestCase.getEnvironmentByIdtc(data[i].id);
            const dataPostcondition = await modelPostConditionTestCase.getPostConditionByTC(data[i].id);
            const dataStep = await modelStepTestCase.getStepInTestCaseById(data[i].id);
            const dataAcceptanceRequirement = await modelAcceptanceRequirementsTestCase.getAceptanceRequirementsByTC(data[i].id);

            await parent.push({
                ... data[i],
                dataPrecondition: dataPrecondition,
                dataTypeOfTesting: dataTypeOfTesting,
                dataFeature:dataFeature,
                dataEnvironment:dataEnvironment,
                dataPostcondition:dataPostcondition,
                dataStep:dataStep,
                dataAcceptanceRequirement: dataAcceptanceRequirement
            })

        }

        resp.status(200).json(parent)
    }catch (e) {
        console.log(e);
        resp.status(500).json({
            message:'Server Error'
        })
    }

}

async function oneTestCase(req,resp) {
    try{
        const idTC = req.params.id;
        const existsTestCase = await modelTestCase.findOne(idTC);

        if(existsTestCase.length === 0){
            return resp.status(404).json({
                message:"Test Case no found"
            })
        }

        if(existsTestCase.length > 0){
            const dataPrecondition = await modelPreConditionTestCase.getPreConditionByTestCase(idTC);
            const dataTypeOfTesting = await modelTypeOfTestingTestCase.getTypeOfTestingByTC(idTC);
            const dataFeature = await modelFeatureTestCase.getFeatureByIdTC(idTC);
            const dataEnvironment = await modelEnvironmentTestCase.getEnvironmentByIdtc(idTC);
            const dataPostcondition = await modelPostConditionTestCase.getPostConditionByTC(idTC);
            const dataStep = await modelStepTestCase.getStepInTestCaseById(idTC);
            const dataAcceptanceRequirement = await modelAcceptanceRequirementsTestCase.getAceptanceRequirementsByTC(idTC);

            resp.status(200).json({
                ...existsTestCase[0],
                dataPrecondition: dataPrecondition,
                dataTypeOfTesting: dataTypeOfTesting,
                dataFeature:dataFeature,
                dataEnvironment:dataEnvironment,
                dataPostcondition:dataPostcondition,
                dataStep:dataStep,
                dataAcceptanceRequirement: dataAcceptanceRequirement
            });
        }
    }catch (e) {
        console.log(e);
        resp.status(500).json({
            message:"Server Fail"
        })
    }

}

async function updateTestCase(req,resp){
    try{
        const idTC = req.params.id;
        const body = req.body;
        const checkTestCaseId = await modelTestCase.findOne(idTC);

        if(checkTestCaseId.length === 0){
            return resp.status(404).json({
                message: 'Test case not found'
            })
        }

        const getPreconditionsTC = await modelPreConditionTestCase.getPreConditionByTestCase(idTC);
        const idsPreConditionInDB = getPreconditionsTC.map(data=>{return data.id});
        for (let a = 0; a < body.dataPrecondition.length; a++){

            if(idsPreConditionInDB.includes(body.dataPrecondition[a].id)){
                await modelPreCondition.updatePreconditionById(body.dataPrecondition[a].id, body.dataPrecondition[a].description)
            }
        }

        const getPostConditionsTC = await modelPostConditionTestCase.getPostConditionByTC(idTC);
        const idsPostConditionsInDB = getPostConditionsTC.map(data=>{return data.id});
        for (let b =0; b < body.dataPostcondition.length; b++){

            if(idsPostConditionsInDB.includes(body.dataPostcondition[b].id)){
                await modelPostCondition.updatePostConditionById(body.dataPostcondition[b].id, body.dataPostcondition[b].name)
            }
        }

        const getStepsTC = await modelStepTestCase.getStepInTestCaseById(idTC);
        const idsStepsInDB = getStepsTC.map(data=>{return data.id});
        for(let c=0; c < body.dataStep.length ;c++){
            let dataStepForUpdate = {
                description: body.dataStep[c].description || getStepsTC[c].description,
                expected_result: body.dataStep[c].expected_result || getStepsTC[c].expected_result
            };
            if(idsStepsInDB.includes(body.dataStep[c].id)){
                await modelStep.updateStepById(body.dataStep[c].id,dataStepForUpdate);
            }
        }

        const getAcceptanceRequirements = await modelAcceptanceRequirementsTestCase.getAceptanceRequirementsByTC(idTC);

        const idsAcceptanceRequirementsInDB = getAcceptanceRequirements.map(data=>{return data.id});
        for(let d=0; d < body.dataAcceptanceRequirement.length; d++){
            if(idsAcceptanceRequirementsInDB.includes(body.dataAcceptanceRequirement[d].id)){
                await modelAcceptanceRequirements.updateAcceptanceRequirementById(body.dataAcceptanceRequirement[d].id,body.dataAcceptanceRequirement[d].description)
            }
        }

        const dataUpdate = {
            title: req.body.title || checkTestCaseId.title,
            description: req.body.description || checkTestCaseId.description,
            author: req.body.author || checkTestCaseId.author,
            executortc: req.body.executortc || checkTestCaseId.executortc,
            state: req.body.state || checkTestCaseId.state,
            notes: req.body.notes || checkTestCaseId.notes
        };

        const dataTest = await modelTestCase.updateOne(idTC,dataUpdate);

        if(dataTest){
            resp.status(200).json({
                message: 'Test case update sucessfull'
            })
        }

    }catch (e) {
        console.log('testCase.controller',e);
        resp.status(500).json({
            message: 'Test case could not be update'
        });
    }
}

async function deleteTestCase(req,resp){
    try {
        const idTC = req.params.id;
        const existsTestCase = await modelTestCase.findOne(idTC);

        if(existsTestCase.length === 0){
            return resp.status(404).json({
                message:'Test Case Not Found'
            })
        }

        const tcHavePreCondition = await modelPreConditionTestCase.getPreConditionByTestCase(idTC);
        const tcHavePostCondition = await modelPostConditionTestCase.getPostConditionByTC(idTC);
        const tcHaveStep = await modelStepTestCase.getStepInTestCaseById(idTC);
        const tcHaveAcceptanceRequirement = await modelAcceptanceRequirementsTestCase.getAceptanceRequirementsByTC(idTC);
        const tcHaveTypeOfTesting = await modelTypeOfTestingTestCase.getTypeOfTestingByTC(idTC);
        const tcHaveFeature = await modelFeatureTestCase.getFeatureByIdTC(idTC);
        const tcHaveEnvironment = await modelEnvironmentTestCase.getEnvironmentByIdtc(idTC);

        if(tcHavePreCondition.length > 0){
            let countPreCondition=0;
            while(countPreCondition < tcHavePreCondition.length){
                await modelPreConditionTestCase.detelePreconditionInTestCase(idTC,tcHavePreCondition[countPreCondition].id);
                await modelPreCondition.deletePrecondition(tcHavePreCondition[countPreCondition].id);
                countPreCondition++
            }

        }

        if(tcHavePostCondition.length > 0){
            let countPostCondition=0;
            while(countPostCondition < tcHavePostCondition.length){
                await modelPostConditionTestCase.deletePostConditionInTestCase(idTC,tcHavePostCondition[countPostCondition].id);
                await modelPostCondition.deletePostCondition(tcHavePostCondition[countPostCondition].id);
                countPostCondition++
            }

        }

        if(tcHaveStep.length > 0){
            let countStep=0;
            while(countStep < tcHaveStep.length){
                await modelStepTestCase.deleteStepInTestCase(idTC,tcHaveStep[countStep].id);
                await modelStep.deleteStepByID(tcHaveStep[countStep].id);
                countStep++
            }

        }

        if(tcHaveAcceptanceRequirement.length > 0){
            let countAcceptanceRequirement=0;
            while(countAcceptanceRequirement < tcHaveAcceptanceRequirement.length){
                await modelAcceptanceRequirementsTestCase.deleteAcceptanceRequirementsInTestCase(idTC,tcHaveAcceptanceRequirement[countAcceptanceRequirement].id);
                await modelAcceptanceRequirements.deleteAcceptanceRequirementById(tcHaveAcceptanceRequirement[countAcceptanceRequirement].id);
                countAcceptanceRequirement++
            }

        }

        if(tcHaveTypeOfTesting.length > 0){
            let cTypeofTesting=0;
            while(cTypeofTesting < tcHaveTypeOfTesting.length){
                await modelTypeOfTestingTestCase.deleteTypeOfTestingInTC(idTC,tcHaveTypeOfTesting[cTypeofTesting].id);
                cTypeofTesting++
            }
        }

        if(tcHaveFeature.length > 0){
            let cFeature=0;
            while(cFeature < tcHaveFeature.length){
                await modelFeatureTestCase.deteleFeatureInTestCase(idTC,tcHaveFeature[cFeature].id);
                cFeature++
            }
        }

        if(tcHaveEnvironment.length > 0){
            let cEnvironment=0;
            while(cEnvironment < tcHaveEnvironment.length){
                await modelEnvironmentTestCase.deleteEnvironmentInTestCase(idTC,tcHaveEnvironment[cEnvironment].id);
                cEnvironment++
            }
        }

        await modelTestCase.DeleteOne(idTC);

        resp.status(200).json({
            message:`Test Case were delete`
        })

    }catch (e) {
        console.log(e);
        resp.status(500).json({
            message:`Server Error`
        })
    }
}

module.exports = {
    findAll,
    oneTestCase,
    updateTestCase,
    addTestCases,
    deleteTestCase

};

