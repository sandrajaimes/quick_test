const express = require('express');
const controllerTestCase = require('../controllers/testCase.controller');
const controllerTypeOfTesting = require('../controllers/typeOfTesting.controller');
const controllerTypeOfTestingTestCase = require("../controllers/typeOfTestingTestCase.controller");
const controllerEnvironmentTestCase = require("../controllers/environmentTestCase.controller");
const controllerFeatureTestCase = require("../controllers/featureTestCase.controller");
const controllerLogin = require("../controllers/login.controller");
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

router.post('/login',controllerLogin.login);

router.get('/test-cases',verifyToken.verifyToken,controllerTestCase.findAll);
router.get('/test-cases/:id',verifyToken.verifyToken,controllerTestCase.oneTestCase);


module.exports=router;
