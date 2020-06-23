const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

const aboutPage ="Hey there thankyou for coming to my blog my name is ujjwal dhiman and i am a full stack developer i post about tech,sports and everything intresting.So, find the blog you are intrested and happy reading "
mongoose.connect("mongodb+srv://admin-ujjwal:Ujjwaldhiman@todolist-fxluc.mongodb.net/ujjwalblog",{useNewUrlParser: true,useUnifiedTopology: true})

const postSchema = {
	title:String,
	content:String
}

const Post = mongoose.model("blog" , postSchema)

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine' , 'ejs');
app.use(express.static ("public"))

app.get("/compose" , function(req,res){
	res.render("compose")
})
app.get("/about" , function(req,res){
	res.render("about" , {about:aboutPage})
})
app.get("/contact" , function(req,res){
	res.render("contact")
})

app.get("/" , function(req,res){

	Post.find({},function(err,response){
		res.render("home" , {title:response})
	})
	
})

app.post("/" , function(req,res){

	const post = new Post({
		title:req.body.title,
		content:req.body.content
	})
	post.save(function(err){
		if (!err) {
		res.redirect("/")	
		}
	})
		
})

app.get("/post/:postId" , function(req,res){
	const id = req.params.postId
	Post.findOne({_id:id},function(err,post){
		res.render("post",
		 { head:post.title, 
		 	body:post.content
		 })
	})

})


app.listen(3000,function(){
	console.log("server running")
})