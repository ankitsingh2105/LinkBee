const express = require("express");
const cors = require("cors");

const loginRouter = require("./Routes/loginRoute");
const signupRouter = require("./Routes/signupRoute");
const userRoute = require("./Routes/userRoutes");
const app = express();

const connectToMongoDB = require("./connect");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectToMongoDB("mongodb://127.0.0.1:27017/LinkBeeMERNAPP")

app.use(cors({
    origin: "http://localhost:5173"
})); 


app.use("/login" , loginRouter);
app.use("/signup" , signupRouter);
app.use("/user", userRoute);

app.listen(3000 , ()=>{
    console.log("listening to the server");
})