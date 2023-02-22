const express = require('express');
const router = express.Router();
const scenarioController = require('../../controllers/scenariosController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(verifyRoles(ROLES_LIST.User), scenarioController.getAllScenarios)
    .post(verifyRoles(ROLES_LIST.Admin), scenarioController.createScenario)

router.route('/:id')
    .get(verifyRoles(ROLES_LIST.Admin), scenarioController.getScenarioByID)
    .delete(verifyRoles(ROLES_LIST.Admin), scenarioController.deleteScenario)
    .put(verifyRoles(ROLES_LIST.Admin), scenarioController.updateScenario)

router.route('/:id/group/:groupId')
    .post(verifyRoles(ROLES_LIST.Admin), scenarioController.addGroupToScenario)

module.exports = router;