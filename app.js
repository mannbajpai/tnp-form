const express = require ('express');
var bodyParser = require('body-parser');
const mongoose = require ('mongoose');
const { Schema, model } = mongoose;

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.connect('mongodb://localhost:27017/companyDB');

var companySchema =new Schema({
    companyDetails : {
        name:String,
        url:String,
        category:String,
        sector:String,
        address:String,
    },
    contactDetails : {
        headHR : {
            name:String,
            email:String,
            mobile:Number,
            landline:Number
        },
        firstContact : {
            name:String,
            email:String,
            mobile:Number,
            landline:Number         
        },
        secondContact : {
            name:String,
            email:String,
            mobile:Number,
            landline:Number         
        }
    },
    selectionProcess : {
        selProcess : String,
        programs:String,
        mode:String,
        rounds:Number,
        eligibility:Number,
    },
    jobDetails : {
        ctc : Number,
        noOfOffer : Number,
        gross: Number,
        bonus: String,
        bond:String,
        home:String
    } 

});

const Company = model('Company', companySchema);

app.get("/", (req,res)=>{
    res.sendFile(__dirname + '/index.html');
});

app.post("/", (res,req)=>{
    const co = new Company({
        companyDetails : {
            name:req.body.cname,
            url:req.body.url,
            category:req.body.cat,
            sector:req.body.sec,
            address:req.body.add,
        },
        contactDetails : {
            headHR : {
                name:req.body.hname,
                email:req.body.hemail,
                mobile:req.body.hmob,
                landline:req.body.hnum
            },
            firstContact : {
                name:req.body.fname,
                email:req.body.femail,
                mobile:req.body.fmob,
                landline:req.body.fnum         
            },
            secondContact : {
                name:req.body.sname,
                email:req.body.semail,
                mobile:req.body.smob,
                landline:req.body.snum         
            }
        },
        selectionProcess : {
            selProcess : req.body.selProcess,
            programs:req.body.programs,
            mode:req.body.mode,
            rounds:req.body.rounds,
            eligibility:req.body.cpi,
        },
        jobDetails : {
            ctc : req.body.ctc,
            noOfOffer : req.body.offers,
            gross: req.body.gross,
            bonus: req.body.bonus,
            bond: req.body.bond,
            home: req.body.home
        } 
    });
    console.log(co);
    co.save();
    res.redirect('/');
});

app.listen(3000, ()=>{
    console.log("The App is Running on Port 3000");
});