const express = require("express")
const app = express()
const dotenv = require("dotenv")
dotenv.config();
const PORT = process.env.PORT || 3000;
const whiteList = ["http://127.0.0.1:5504"]
const corsOption = {
    origin: (origin,callback)=>{
        if(whiteList.indexOf(origin) !== -1 || !origin ){
            callback(null,true)
        }else{
            callback(new Error("Not Allowed By Cors"))
        }
    },
    optionsSuccessStatus: 200
}
const cors = require("cors")
app.use(express.json())
app.use(cors(corsOption ))
app.use(require("cookie-parser")())

app.use("/api/cars",require("./routes/cars"))
app.use("/api/users",require("./routes/users"))
app.use("/api/refresh",require("./routes/refresh"))
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})