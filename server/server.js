const express = require("express");
const app = express();
const PORT = 4000;
const path = require("path");
const multer = require("multer");
const cors = require("cors");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

app.use(cors());
app.set("view engine", "ejs");
app.get("/upload", (req, res) => {
    res.render("upload");
});

app.post("/upload", upload.single("image"), (req, res) => {
    res.status(200);
    res.send("image uploaded");
});

app.listen(PORT, console.log(`server is up and running on port ${PORT}`));
