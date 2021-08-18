const express = require("express");
const app = express();
const server = require("http").Server(app);
var path = require('path');
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false});
const mongoose = require('mongoose');

const url = "mongodb+srv://test:test@cluster0.iy7bi.mongodb.net/form?retryWrites=true&w=majority";
mongoose.connect(url,{
  useNewUrlParser: true,
  useUnifiedTopology: true,

});

const formSchema1 = new mongoose.Schema(
  {
    data: Object,
   },
    { collection : "feedback_form"
   }     
   );

const formSchema2 = new mongoose.Schema(
  {
    data: Object,
   },
    { collection : "feedback_form_2"
   }     
   );

const formSchema3 = new mongoose.Schema(
  {
    data: Object,
   },
    { collection : "feedback_form_3"
   }     
   );
const formSchema4 = new mongoose.Schema(
  {
    data: Object,
   },
    { collection : "feedback_form_4"
   }     
   );


  const Form1 = mongoose.model("Form1",formSchema1);
  const Form2 = mongoose.model("Form2",formSchema2);
  const Form3 = mongoose.model("Form3",formSchema3);
  const Form4 = mongoose.model("Form4",formSchema4);

  const formData1 = (bodyData) => {
    Form1 ({data : bodyData}).save((err) => {
          if (err) {
               throw err;
              }
            })
           }
const formData2 = (bodyData) => {
    Form2 ({data : bodyData}).save((err) => {
          if (err) {
               throw err;
              }
            })
           }
const formData3 = (bodyData) => {
    Form3 ({data : bodyData}).save((err) => {
          if (err) {
               throw err;
              }
            })
           }
const formData4 = (bodyData) => {
    Form4 ({data : bodyData}).save((err) => {
          if (err) {
               throw err;
              }
            })
           }

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static("public"));

  app.get("/", (req, res) => {
    res.render("index");
    });
  app.get("/form1", (req, res) => {
    res.render("form1");
    });
  app.get("/form2", (req, res) => {
    res.render("form2");
    });
  app.get("/form3", (req, res) => {
    res.render("form3");
    });
  app.get("/form4", (req, res) => {
    res.render("form4");
    });



app.post( "/form1", urlencodedParser, (req,res)=> {
formData1(req.body);  
res.render("thankyou");
});

app.post( "/form2", urlencodedParser, (req,res)=> {
formData2(req.body);  
res.render("thankyou");
});

app.post( "/form3", urlencodedParser, (req,res)=> {
formData3(req.body);  
res.render("thankyou");
});

app.post( "/form4", urlencodedParser, (req,res)=> {
formData4(req.body);  
res.render("thankyou");
});
 server.listen(3030);