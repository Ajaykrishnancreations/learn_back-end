const {Router} = require("express");
const express = require('express');
const {register,login,course,getCourse,updateUser,getAllStudentInfo,getVideos,addNewVideo,getUserDetais,addNewPost,getPosts,courseUpdate,RefreshToken} = require("../services/Api");
const router = Router();
const validateToken = require("../helpers/validateTokenHandler");
// const multer = require('multer');
const fs = require('fs');
const path = require("path");
const { Storage } = require("@google-cloud/storage");
const Multer = require("multer");
const src = path.join(__dirname, "views");

router.use(express.static(src));

const multer = Multer({
  storage: Multer.memoryStorage(),
});

let projectId = "eco-groove-405904";
let keyFilename = "mykey.json";

const storage = new Storage({
  projectId,
  keyFilename,
});

const bucket = storage.bucket("varsh-storage");

router.get("/getUploadVideos", async (req, res) => {
  try {
    const [files] = await bucket.getFiles();
    res.send([files]);
    console.log("Success");
  } catch (error) {
    res.send("Error:" + error);
  }
});

router.get("/stream/:videoFileName", async (req, res) => {
  try {
    const videoFileName = req.params.videoFileName;
    const file = bucket.file(videoFileName);

    // Get the file size
    const [metadata] = await file.getMetadata();
    const fileSize = (metadata?.size) || undefined;

    if (fileSize !== undefined) {
      // Set the content type
      res.setHeader("Content-Type", "video/mp4");

      // Parse Range header to get the start and end bytes
      const range = req.headers.range;

      if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

        // Calculate chunk size (you can adjust this value)
        const chunkSize = 10 ** 6; // 1 MB

        // Set the response headers for partial content
        res.setHeader("Content-Range", `bytes ${start}-${end}/${fileSize}`);
        res.setHeader("Accept-Ranges", "bytes");
        res.setHeader("Content-Length", chunkSize);
        res.status(206);

        // Stream the file in chunks
        const readStream = file.createReadStream({ start, end });

        readStream.on("error", (err) => {
          console.error("Error reading stream:", err);
          res.status(500).send("Internal Server Error");
        });

        readStream.pipe(res);

        console.log("Success");
      } else {
        // Handle the case when 'range' is undefined
        res.status(400).send("Bad Request: Range header is missing");
      }
    } else {
      // Handle the case when 'fileSize' is undefined
      res.status(500).send("Internal Server Error: File size is undefined");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});


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

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, './uploads');
//     },
//     filename: (req, file, cb) => {
//       cb(null, file.originalname);
//     },
//   });
//   const upload = multer({ storage });  
// router.post('/addNewVideo', upload.single('video'), async (req, res) => {
//     try {
//       const { title } = req.body;
//       const video = req.file.filename;
//       console.log(video,"videovideovideo");
//       const newVideo = await addNewVideo(title, video);
//       console.log(newVideo)
//       res.status(201).json({ message: 'Video added successfully' });
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   });

  // router.get("/:name", function (req, res) {
  //   const range = req.headers.range;
  //   if (!range) {
  //     res.status(400).send("Requires Range header");
  //   }
  //   const videoPath = "./uploads/"+req.params.name;
  //   const videoSize = fs.statSync("./uploads/"+req.params.name).size;
  //   const CHUNK_SIZE =  300*1000; // 300KB
  //   const start = Number(range.replace(/\D/g, ""));
  //   const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
  //   const contentLength = end - start + 1;
  //   const headers = {
  //     "Content-Range": `bytes ${start}-${end}/${videoSize}`,
  //     "Accept-Ranges": "bytes",
  //     "Content-Length": contentLength,
  //     "Content-Type": "video/mp4",
  //   };
  //   res.writeHead(206, headers);
  //   const videoStream = fs.createReadStream(videoPath, { start, end });
  //   videoStream.pipe(res);
  // });

  router.get('/getVideos/video',getVideos);
module.exports = router;