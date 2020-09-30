const modelTestCase = require('../models/testCase');
const modelPreConditionTestCase = require('../models/preConditionTestCase');

const modelTypeOfTestingTestCase = require('../models/typeOfTestingTestCase');
const modelFeatureTestCase = require('../models/featureTestCase');
const modelEnvironmentTestCase = require ('../models/environmentTestCase');
const modelPostConditionTestCase = require('../models/postConditionTestCase');

const modelStepTestCase = require('../models/stepTestCase');

const modelAcceptanceRequirementsTestCase = require('../models/aceptanceRequirementsTestCase');



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



module.exports = {
    findAll,
    oneTestCase,

};
