const express = require('express');
const router = express.Router();
const dashboardController = require('../../controllers/dashboardController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.User), dashboardController.handleDashboard)

router.route('/:username')
    .get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.User), dashboardController.getDashboard);

module.exports = router;