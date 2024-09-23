const express = require("express");
const cors = require("cors");
const path = require("path");
const loginRouter = require("./Routes/loginRoute");
const signupRouter = require("./Routes/signupRoute");
const userRoute = require("./Routes/userRoutes");
const connectToMongoDB = require("./connect");
const userModel = require("./models/userModel");

const cookieParser = require('cookie-parser');
const multer = require("multer");

const PORT = process.env.PORT || 3000;

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
 
connectToMongoDB("mongodb://127.0.0.1:27017/LinkBeeMERNAPP");

// connectToMongoDB(process.env.MONGO_URL);
// console.log(process.env.MONGO_URL);
// origin: "https://linkbeemern.vercel.app",

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true 
}));
// app.set("trust proxy", 1);


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../FrontEnd/src/Components/User/ProfileImages')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname)
    }
})
const upload = multer({ storage });

app.post('/upload', upload.single('avatar'), async function (req, res, next) {
    try {
        const userID = req.body.userID;
        const imageName = req.file.filename;
        await userModel.findOneAndUpdate({ userID }, {
            "imageUrl": imageName
        });
        res.send("uploaded successsfully");
    }
    catch (error) {
        console.log(error);
    }

})

app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use("/user", userRoute);

// Static file serving
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/", (req, response) => {
    response.send("testing the api");
})

app.listen(PORT, () => {
    console.log("listening to the serve", PORT);
});
