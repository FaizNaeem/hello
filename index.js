const exprees = require('express')
// const router = require('./Routes/user')
const app = exprees()
const cors = require("cors")
const morgan = require('morgan')
const mongoose = require('mongoose')
const  route  = require('./Routes/UserRoute')
app.use(cors())
mongoose.connect('mongodb+srv://faiz:faiz@cluster0.enqka2g.mongodb.net/').then(()=>{
    console.log("connect mongoDb");
})
.catch((err)=>{console.log(err);})

app.use(morgan("tiny"))
app.use(exprees.json())
// app.use('/user', router)
const middelever=(req ,res , next)=>{
console.log("Middlewere console");
next()
}
app.use(middelever)

app.get("/",(req ,res)=>{
    res.send({
        "status" :"200",
        "Name" :"Faiz"
    })
})

app.use("/Atendence",  route)

app.listen(100,()=>{
console.log("Server React To Go-->");
})