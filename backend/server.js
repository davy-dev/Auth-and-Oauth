// NB:m'etant concentré sur la création de session et l'authentification et l'enregistrement en base de données
// les liens sensibles ne sont pas placés en variable d'environnement

const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const passport=require("passport")
const session=require("express-session")
const passportLocalMongoose=require("passport-local-mongoose")
const findOrCreate=require("mongoose-findorcreate")
const GoogleStrategy=require("passport-google-oauth20").Strategy
const app=express()

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))
app.use(session({
    secret:"Blackman",
    saveUninitialized:true,
    resave:false,
    cookie:{
        maxAge:360000,
        httpOnly:true
    }
}))
app.use(passport.initialize())
app.use(passport.session())

mongoose.connect("mongodb+srv://dav-dev:godisgood971@cluster0.2kwyz.mongodb.net/passportJsDB",{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(console.log("mongoose connect to DB")).catch(err=>{
    console.log(err);
})

userSchema= new mongoose.Schema({
    username:String,
    password:String,
    googleId:String,

})

userSchema.plugin(passportLocalMongoose)
userSchema.plugin(findOrCreate)

const User= new mongoose.model("User", userSchema)

passport.use(User.createStrategy())

passport.serializeUser((user,done)=>{
    done(null,user)
})

passport.deserializeUser((id,done)=>{
    User.findById(id, (err,user)=>{
        done(err,user)
    })
})


passport.use(new GoogleStrategy({

    clientID: "504592334099-imulbjeidrluqn66gvt1hh5tegoc07vn.apps.googleusercontent.com",
    clientSecret:"5oWPV5_eD4xS2i9i9L1_4gop",
    callbackURL: "http://localhost:8001/auth/google/welcome",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
    
  },
  (accessToken,refreshToken,profile,cb)=>{
      console.log(profile);
    User.findOrCreate({
        googleId:profile.id,
        username:profile.name.familyName
    },(err,user)=>{
        return cb(err,user)
    })
  }
  ))

app.get("/home", (req,res)=>{
    res.send("Bienvenue Merci de vous identifier")
})

app.get("/welcome", (req,res)=>{
    if(req.isAuthenticated()){
        User.findById(req.user._id, (err,docs)=>{
            if(err){
                res.send(err)
            }else{
                res.send(`Bonjour ${docs.username}`)
            }
        })
    }else{
        res.redirect("/home")
    }
})

app.post("login",(req,res)=>{
    const user= new User({

        username:req.body.username,
        password:req.body.username
    })
req.login(user,(err)=>{
    if(err){
        res.send(err)
    }else{
        passport.authenticate("local") (req,res,()=>{
            res.redirect("/welcome")
        })
    }
})
})

app.post("/register",(req,res)=>{
User.register({username:req.body.username},req.body.password,(err,user)=>{
    if(err){
        console.log(err);
        res.send(err)
    }else{
        passport.authenticate("local")(req,res,()=>{
            res.redirect("/welcome")
        })
    }
})

})

app.get("/auth/google",
passport.authenticate("google",({scope:["profile"]})))

app.get("/auth/google/welcome",
passport.authenticate("google",({failureRedirect:"/login"})),
(req,res)=>{
    res.redirect("http://localhost:3000/access")
})

app.listen(8001,()=>{
    console.log("server is running on port 8001");
})
