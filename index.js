const { log } = require("console");
const express = require("express");
const app = express();
const port = 5500;
const path = require("path");
const{v4:uuidv4}=require("uuid")
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public"))); // ✅ Correct

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

let posts = [
    { id:uuidv4(),username: "sobit", content: "coding using java" },
    { id:uuidv4(),username: "avansh", content: "coding using cpp" },
    { id:uuidv4(),username: "mayank", content: "coding using javascript" }
];

app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts }); // ✅ Pass data to template
});
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs")
})
app.get("/posts/:id",(req,res)=>{
    let {id} = req.params
     let post =posts.find((p)=>id===p.id)
     if (!post) {
        return res.status(404).send("Post not found");
    }
     res.render("show.ejs",{post})
     
})
app.post("/posts",(req,res)=>{ 
    let {username,content}=req.body
    const  id = uuidv4()
    posts.push({ id,username,content}) 
    res.redirect("/posts")
    
})
app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params
    let newContent =req.body.content

          let post =posts.find((p)=>id===p.id)
          if (!post) {
        return res.status(404).send("Post not found");
    }
          post.content= newContent
        res.redirect("/posts")
})
app.get("/posts/:id/edit",(req,res)=>{
       let {id} = req.params
       let post =posts.find((p)=>id===p.id)
       res.render("edit.ejs",{post})

})
app.delete("/posts/:id",(req,res)=>{
      let {id} = req.params
     posts =posts.filter((p)=>id!==p.id)
     res.redirect("/posts")
})
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
