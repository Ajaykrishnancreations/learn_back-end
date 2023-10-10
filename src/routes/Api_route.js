const {Router} = require("express");
const {register,login,course,getCourse,updateUser,getAllStudentInfo} = require("../services/Api");
const router = Router();

router.post("/register",register);

router.post("/login",login);

router.post("/addcourse",course)
router.get('/getcourse',getCourse);
router.put('/updateUser',updateUser);

router.get('/getAllStudentInfo',getAllStudentInfo);
module.exports = router;