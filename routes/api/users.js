const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/userController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), usersController.getAllUsers)
    .put(verifyRoles(ROLES_LIST.Admin), usersController.permitUser);

router.route('/:id')
    .get(verifyRoles(ROLES_LIST.Admin), usersController.getUser);

router.route('/:username')
    .delete(verifyRoles(ROLES_LIST.Admin), usersController.deleteUser);
module.exports = router;