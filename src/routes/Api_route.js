const {Router} = require("express");
const {register,login,course,getCourse,updateUser,getAllStudentInfo,getVideos,addNewVideo,getUserDetais,addNewPost,getPosts,courseUpdate,RefreshToken} = require("../services/Api");
const router = Router();
const validateToken = require("../helpers/validateTokenHandler");
const multer = require('multer');
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

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  const upload = multer({ storage });  
router.post('/addNewVideo', upload.single('video'), async (req, res) => {
    try {
      const { title } = req.body;
      const video = req.file.filename;
      console.log(video,"videovideovideo");
      const newVideo = await addNewVideo(title, video);
      console.log(newVideo)
      res.status(201).json({ message: 'Video added successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.get('/getVideos',getVideos);
module.exports = router;