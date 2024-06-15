const express = require("express");
const cors = require("cors");
const path = require("path");
const loginRouter = require("./Routes/loginRoute");
const signupRouter = require("./Routes/signupRoute");
const userRoute = require("./Routes/userRoutes");
const connectToMongoDB = require("./connect");

const cookieParser = require('cookie-parser');
const multer = require("multer");

const PORT = process.env.PORT || 3000;

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// connectToMongoDB("mongodb://127.0.0.1:27017/LinkBeeMERNAPP");

connectToMongoDB(process.env.MONGO_URL);

// origin: "http://localhost:5173",
app.use(cors({
    origin: "https://link-bee-roan.vercel.app/",
    credentials: true
}));



// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         return cb(null, "./ProfileImages");
//     },
// })


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './ProfileImages')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname)
    }
})
const upload = multer({ storage });

app.post('/upload', upload.single('avatar'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were 
    console.log("images are :: ", req.file);
    console.log("second one is ::", req.body);
    res.send("uploaded successsfully");
})

app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use("/user", userRoute);

// Static file serving
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(PORT, () => {
    console.log("listening to the server");
});
