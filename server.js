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

const formSchema = new mongoose.Schema(
  {
    data: Object,
   },
    { collection : "feedback_form"
   }     
   );

  const Form = mongoose.model("Form",formSchema);

  const formData = (bodyData) => {
    Form ({data : bodyData}).save((err) => {
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
app.get("/form", (req, res) => {
    res.render("form");
  });

app.post( "/", urlencodedParser, (req,res)=> {
formData(req.body);  
res.render("form");
});

 server.listen(3030);