const express = require("express")
const app = express()
const dotenv = require("dotenv")
dotenv.config();
const PORT = process.env.PORT || 3000;
const cors = require("cors")
app.use(express.json())
app.use(cors())


app.use("/api/cars",require("./routes/cars"))
app.use("/api/users",require("./routes/users"))

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})