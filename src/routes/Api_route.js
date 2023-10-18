const {Router} = require("express");
const {register,login,course,getCourse,updateUser,getAllStudentInfo,getUserDetais,addNewPost,getPosts} = require("../services/Api");
const router = Router();

router.post("/register",register);

router.post("/login",login);

router.post("/addcourse",course)
router.get('/getcourse',getCourse);
router.put('/updateUser',updateUser);

router.get('/getAllStudentInfo',getAllStudentInfo);
router.get('/getUserDetais/:email',getUserDetais);


router.post("/addNewPost",addNewPost)
router.get('/getPosts',getPosts);
module.exports = router;