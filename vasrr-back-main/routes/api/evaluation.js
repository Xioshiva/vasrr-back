const express = require('express');
const router = express.Router();
const scenarioController = require('../../controllers/evaluationsController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .post(verifyRoles(ROLES_LIST.User), scenarioController.createEvaluation)
    .get(verifyRoles(ROLES_LIST.User), scenarioController.getAllEvaluations);

router.route('/:id')
    .get(verifyRoles(ROLES_LIST.Admin), scenarioController.getEvalutionByID)

router.route('/scenario/:id')
    .get(verifyRoles(ROLES_LIST.User), scenarioController.getEvalutionsByScenarioID)


module.exports = router;