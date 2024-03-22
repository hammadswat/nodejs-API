import dotenv from 'dotenv'
import express from "express"
import routes from "./routes/index.mjs"
import db from './config/db.mjs'

const app = express( )
const port = process.env.PORT || 4001;
app.listen(port ,function(){
    console.log("4001 run seccessfully")
})

db.connection.once('open', () => console.log("connected to db")).on("error", (err) => console.log("error connecting db -->", err))


app.use(express.json())
app.use('/' , routes)
