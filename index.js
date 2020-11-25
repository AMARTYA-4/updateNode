const express = require("express");
const bodyParser = require('body-parser');
var mongoose=require("mongoose");
var cors = require('cors');
const path=require('path')
const app = express();
const port = process.env.PORT || "5000";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.use(cors());
require("./Schema/DeviceType");
require("./Schema/Classification");
require("./Schema/Model");
require("./Schema/Color");
require("./Schema/issue");
//DeviceRepair
const mongoURI="mongodb+srv://amartyasarkar0001:amartyasarkar1@cluster0.fp2ed.mongodb.net/updateCheck?retryWrites=true&w=majority"

// const mongoURI="mongodb+srv://amartyasarkar0001:amartyasarkar1@cluster0.fp2ed.mongodb.net/DeviceRepair?retryWrites=true&w=majority"

mongoose.connect(mongoURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify: false 
})
mongoose.connection.on("connected",()=>{
    console.log("Yeah !!!!,I have Successfully connected with Mongodb Atlas")
})
mongoose.connection.on("error",(err)=>{
    console.log("Error",err)
})


//amartyasarkar0001
//amartyasarkar1
//mongodb+srv://amartyasarkar0001:<password>@cluster0.fp2ed.mongodb.net/<dbname>?retryWrites=true&w=majority
app.use(express.json());
app.use(require("./routes/handling"));



app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});