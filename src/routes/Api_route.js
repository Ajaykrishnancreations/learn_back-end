const {Router} = require("express");
const {register,login,course,getCourse,updateUser,getAllStudentInfo,getUserDetais,addNewPost,getPosts,courseUpdate,RefreshToken} = require("../services/Api");
const router = Router();
const validateToken = require("../helpers/validateTokenHandler");

router.post("/register",register);

router.post("/login",login);

router.post("/addcourse",validateToken,course)
router.get('/getcourse',validateToken,getCourse);
router.put('/updateUser',validateToken,updateUser);

router.get('/getAllStudentInfo',validateToken,getAllStudentInfo) ;
router.get('/getUserDetais/:email',validateToken,getUserDetais);

router.post("/addNewPost",validateToken,addNewPost)
router.get('/getPosts',validateToken,getPosts);

router.put('/courseUpdate',validateToken,courseUpdate);

router.post("/RefreshToken",RefreshToken);
module.exports = router;