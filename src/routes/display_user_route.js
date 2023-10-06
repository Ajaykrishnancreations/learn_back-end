const {Router} = require("express");
const authMiddleware = require("../helpers/authMiddleware");
const {display_user} = require("../services/display_user");

const router = Router();

router.get('/user/:userId', authMiddleware.verifyAccessToken, display_user);

module.exports = router;