const express = require('express');
const router = express.Router();
const groupsController = require('../../controllers/groupsController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), groupsController.getAllGroups)
    .delete(verifyRoles(ROLES_LIST.Admin), groupsController.deleteGroup)
    .post(verifyRoles(ROLES_LIST.Admin), groupsController.creatGroup)

router.route('/:id')
    .get(verifyRoles(ROLES_LIST.Admin), groupsController.getGroup)
    .put(verifyRoles(ROLES_LIST.Admin), groupsController.updateGroup)
    .delete(verifyRoles(ROLES_LIST.Admin), groupsController.deleteGroup)
    .post(verifyRoles(ROLES_LIST.Admin), groupsController.sendEmailToGroup)

router.route('/:id/users')
    .get(verifyRoles(ROLES_LIST.Admin), groupsController.getGroupUsers)
    .post(verifyRoles(ROLES_LIST.Admin), groupsController.addUserToGroup)

router.route('/:id/users/:userId')
    .delete(verifyRoles(ROLES_LIST.Admin), groupsController.removeUserFromGroup)

module.exports = router;