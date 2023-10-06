const {Router} = require("express");
const {register,login,course,getCourse,updateUser} = require("../services/login");
const router = Router();

router.post("/register",register);

router.post("/login",login);

router.post("/addcourse",course)
router.get('/getcourse',getCourse);
router.put('/updateUser',updateUser);
module.exports = router;