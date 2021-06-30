const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const ejs = require("ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/uploads"));
app.set('view engine', 'ejs');
const mongoose = require("mongoose");
const md5=require("md5");
// const session=require('express-session');
// const passport=require("passport");
// const passportLocalMongoose=require("passport-local-mongoose");




app.use(bodyparser.urlencoded({
  extended: true
}));
var fs = require('fs');
var path = require('path');

var multer = require('multer');

var storage = multer.diskStorage({
  destination: './public/images/uploads/',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now()
  +  path.extname(file.originalname));
  }
});

var upload = multer({
  storage: storage
});


//for session
// app.use(session({
//   secret:"Our little project.",
//   resave:false,
//   saveUninitialized:false
// }));


// app.use(passport.initialize());
// app.use(passport.session());


// DATABASE CONNECTION

mongoose.connect("mongodb://localhost:27017/ngoDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useNewUrlParser:true,
  useFindAndModify:false,
  useCreateIndex:true
});


var flag = true;

const ownerSchema={
  ownername: String,
  owneremail: {
    type: String,
    unique: true
  },
  ownerpassword: String,
  ownercontact: String};

  // ownerSchema.plugin(passportLocalMongoose);

  const Owner = mongoose.model("Owner", ownerSchema);

// passport.use(Owner.createStrategy());
// passport.serializeUser(Owner.serializeUser());
// passport.deserializeUser(Owner.deserializeUser());

  const ngoSchema={
    ownerusername:String,
  cateogary: String,
  ngotitle: String,
  ngoaddress: String,
  aboutngo: String,
  currentfunds: Number,
  websiteurl: String,
  ngoregno: String,
  regcertificateimg: {
    data: Buffer,
    contentType: String
  }
};

const NGOs = mongoose.model("NGO", ngoSchema);


const donorSchema = {
  donorname: String,
  donorcontact: String,
  donoremail: {
    type: String,
    unique: true
  },
  donorpassword: String,
  donatedNGOname: [String],
  amountdonated: [Number],
  datedonated: [Date]
};


const Donor = mongoose.model("Donor", donorSchema);

// const donationSchema={
//   donatedNGOname:String,
//   amountdonated:Number
// };
// const Donation=mongoose.model("Donoation",donationSchema);

app.post("/ownerreg", function(req, res)
  // {   const temp=req.body.email;
  //     Owner.findOne({owneremail:temp},function(er,f)
  //   {
  //     if(er)
  //     res.send(duplicatemail());
  //     else{
  //       const newOwner = new Owner({
  //         ownername: req.body.fullname,
  //         owneremail: req.body.email,
  //         ownercontact:req.body.contactno,
  //         ownerpassword: (req.body.password)
  //       });
  //       newOwner.save(function(err){
  //         if(!err){
  //       console.log("Successfully saved owner details");
  //       res.redirect("/loginowner");}
  //     });
  //     }
  //   });
  // });
  {
    const newOwner = new Owner({
      ownername: req.body.fullname,
      owneremail: req.body.email,
      ownercontact: req.body.contactno,
      ownerpassword: md5(req.body.password)

    });
    newOwner.save(function(er) {
      if (!er) {
        console.log("Successfully saved owner details");

        res.redirect("/loginowner");
      } else if(er.code=11000)
      {
        res.render("ownerreg",
      {
        dup:false
      });
    }
    });

  });


app.post("/donorreg", function(req, res) {

  const newDonor = new Donor({
    donorname: req.body.fullname,
    donoremail: req.body.email,
    donorpassword: md5(req.body.password),
    donorcontact: req.body.contactno
  });
  newDonor.save(function(er) {
    if (!er) {
      console.log("Successfully saved donor details");
      res.redirect("/logindonor");
    } else if(er.code==11000){
      res.render("donorreg", {
        dup1: false
      });
    }
  });
});
// app.get("/profileowner",function(req,res)
// { if(req.isAuthenticated()){
//   res.render("profileowner",{
//     Owner:n,
//     Ownerusername:username
//   });
// }
// else
// {
//   res.redirect("/loginowner");
// }
// });

app.post("/loginowner", function(req, res) {
  const email = req.body.email;
  const password = md5(req.body.password);
  Owner.findOne({
    owneremail: email
  }, function(err, foundOwner) {
    if (!err) {
      if (foundOwner) {
        if (foundOwner.ownerpassword === (password)){
        // var ind=email.indexOf("@");
        //username=email.slice(0,email.indexOf("@"));
        // var ind1=foundOwner.ownername.indexOf(" ");
    //    n=foundOwner.ownername.slice(0,foundOwner.ownername.indexOf(" "));
      //  console.log(username);
      n=foundOwner.ownername.slice(0,foundOwner.ownername.indexOf(" "));
      username=foundOwner.owneremail;
      //   req.login(foundOwner,function(errorr)
      // {
      //   if(errorr)
      //   console.log(errorr);
      //   else{
      //   passport.authenticate("local")(req,res,function()
      // {
      //   res.redirect("/profileowner");
      // });}
      // });
          res.render("profileowner", {
            Owner:foundOwner.ownername.slice(0,foundOwner.ownername.indexOf(" ")),
            Ownerusername:foundOwner.owneremail,
            flag1:false,
            own:foundOwner
          });

        } else{
          res.render("loginowner",{
            inc1:false,
            inc2:true
          });
        }
      } else{
        res.render("loginowner",{
          inc2:false,
          inc1:true
        });
      }
    }

      else
      console.log(err);
  });
});



app.post("/logindonor", function(req, res) {
  const email = req.body.email;
  const password = md5(req.body.password);
  Donor.findOne({
    donoremail: email
  }, function(er, foundDonor) {
    if (!er) {
    //  console.log(foundDonor);
      if (foundDonor) {
        if (foundDonor.donorpassword === password) {
          // var ind=email.indexOf("@");
          // const username=email.slice(0,ind);
          // var ind1=foundDonor.donorname.indexOf(" ");
          // const n=foundDonor.donorname.slice(0,ind1);
        //  console.log(username);
          // currentDonor = foundDonor.donorname;
          n1=foundDonor.donorname.slice(0,foundDonor.donorname.indexOf(" "));
          username1=foundDonor.donoremail;
          res.render("profiledonor", {
            Donor: foundDonor.donorname.slice(0,foundDonor.donorname.indexOf(" ")),
            Donoremai:foundDonor.donoremail,
            flag:false
          });


          NGOs.find({},function(e,ress)
          {
            if(!e)
            {
              res.render("profiledonor",
            {
              shows:ress
            });
            }});

        }  else{
          res.render("logindonor",{
            inc3:false,
            inc4:true
          });
        }
      }  else{
        res.render("logindonor",{
          inc4:false,
          inc3:true
        });
      }
    } else
      console.log(er);
  });
});



app.get("/RegisterNgo/:username/:user", function(req, res) {
  NGOs.findOne({ownerusername:req.params.username.slice(0,req.params.username.indexOf("@"))}, function(e, resu) {
    if (!e) {
      if (!resu) {
        res.render("registerngo", {
          users: req.params.username
        });

      }
      else
      {
        res.render("registered",
      {
        Ownerusername:req.params.username,
        Owner:req.params.user

      });
      }
    } else
      console.log(e);
  });
});




app.post("/RegisterNgo",upload.single('image'),function(req,res)
{
   // console.log(req.body.NGOname);
  const newNGO=new NGOs({
    ownerusername:req.body.nowowner.slice(0,req.body.nowowner.indexOf("@")),
  cateogary: req.body.category,
  ngotitle: req.body.NGOname,
  ngoaddress: req.body.NGOaddress,
  aboutngo: req.body.NGOabout,
  currentfunds: req.body.NGOfunds,
  websiteurl: req.body.NGOwebsite,
  ngoregno: req.body.NGOregistrationno,
  regcertificateimg: {
    data: fs.readFileSync(path.join('./public/images/uploads/'+ req.file.filename)),
    contentType: 'image/jpg'
  }
});

newNGO.save(function(er)
{
  if(er)
  console.log(er);
  else
  {
    Owner.findOne({owneremail:req.body.nowowner},function(erer,fofo)
  {
    if(!erer)
    {
      if(fofo)
      {
        res.render("profileowner",
      {
        Ownerusername:req.body.nowowner,
        Owner:fofo.ownername.slice(0,fofo.ownername.indexOf(" ")),
        own:fofo,
        flag1:true
      });
      }
    }
    else
    console.log(erer);
  });
  }
});
});



app.get("/myngo/:username/:user",function(req,res)
{
//var aa=req.params.username;
        //var ind=aa.indexOf("@");
          // const usernamee=aa.slice(0,ind);
  NGOs.findOne({ownerusername:req.params.username.slice(0,req.params.username.indexOf("@"))},function(e,done)
    {
        if(!e)
        {
          if(done)
          {
            res.render("myngo",
          {
            Ownerusername:req.params.username,
            Owner:req.params.user,
            myngo:done
          });
          }
          else
          {
            res.render("nongo",
          {
            Ownerusername:req.params.username,
            Owner:req.params.user
          })
          }
        }
    });
});


app.get("/a/:user/:useremail/:cat",function(req,res)
{
  NGOs.find({cateogary:req.params.cat},function(ee,d)
{  if(!ee)
  {

      res.render("show",{
        ngo:d,
        type:req.params.cat,
        Donor:req.params.user,
        Donoremai:req.params.useremail
    });
  }
else
console.log(ee);

  });
});


app.get("/donate/:uu/:vv",function(req,res)
{
  Donor.findOne({donoremail:req.params.uu},function(eerr,foouu)
{
  if(!eerr)
  {
    if(foouu)
    {
      res.render("donate",
    {
      Donoruseremail:req.params.uu,
      regn:req.params.vv
    });
    }
  }
});
});


app.post("/donate",function(req,res)
{
  NGOs.findOne({ownerusername:req.body.owneruname},function(eee,founded)
{
  if(!eee)
  {
    if(founded)
    {
      founded.currentfunds=founded.currentfunds+parseInt(req.body.amt);
      founded.save(function(ee)
    {
      if(ee)
      console.log("err");
      else
      console.log("Updated in NGO details");
    });
    Donor.findOne({donoremail:req.body.nowuser},function(errr,ff)
  {
    if(!errr)
    {
      if(ff)
      {
        ff.donatedNGOname.push(founded.ngotitle);
        ff.amountdonated.push(parseInt(req.body.amt));
        // var now = new Date();
      // var getTheDate = (now.getDate() + "").slice(0,24);
        ff.datedonated.push(new Date());
        ff.save(function(e1)
      {
        if(!e1)
       res.render("profiledonor",
     {
        Donoremai:req.body.nowuser,
        Donor:ff.donorname.slice(0,ff.donorname.indexOf(" ")),
        flag:true
     });
      });
      }
    }
    else
    console.log(errr);
  });
  }
    }

  else
  console.log(eee);
});
});



app.get("/mydonations/:e",function(req,res)
{
   Donor.findOne({donoremail:req.params.e},function(erer,fo)
 {
      if(!erer)
      {
        if(fo)
        {
          res.render("donations",
          {
            Donor:fo.donorname.slice(0,fo.donorname.indexOf(" ")),
            Donoremai:fo.donoremail,
            tt:fo
          });
        }
      }
      else
      console.log(erer);
 });
});


app.get("/profile/:user",function(req,res)
{

Owner.findOne({owneremail:req.params.user},function(eee,foo)
{
  if(!eee)
{
   if(foo)
{
    res.render("profileowner",{
      Owner:foo.ownername.slice(0,foo.ownername.indexOf(" ")),
      Ownerusername:foo.owneremail,
      flag1:false,
      own:foo
    });
}
}
else
console.log(e);
});
});


app.get("/b/profile/:userem",function(req,res)
{
Donor.findOne({donoremail:req.params.userem},function(ee1,fo1)
{
  if(!ee1)
{
   if(fo1)
{
    res.render("profiledonor",{
      Donor:fo1.donorname.slice(0,fo1.donorname.indexOf(" ")),
      Donoremai:fo1.donoremail,
      flag:false
    });
}
}
else
console.log(e);
   });
});






app.get("/", function(req, res) {
  res.render("home");
});
app.get("/loginowner", function(req, res) {
  res.render("loginowner",
  {
    inc2:true,
    inc1:true
  });
});
app.get("/logindonor", function(req, res) {
  res.render("logindonor",
{
  inc3:true,
  inc4:true
});
});

app.get("/registeras", function(req, res) {
  res.render("registeras");
});

app.get("/ownerreg", function(req, res) {
  res.render("ownerreg",
   {
     dup:true
   });
});


app.get("/donorreg", function(req, res) {
  res.render("donorreg", {
    dup1: true
  });
});
app.get("/login", function(req, res) {
  res.render("loginas");
});


app.listen("3000", function(req, res) {
  console.log("Connected successfully to the server");
});
