require("console");
const express = require("express");
const app = express();
const port = 5500;
const path = require("path");
const{v4:uuidv4}=require("uuid")
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

let posts = [
    { id:uuidv4(),username: "sobit", content: "Sobit is a dedicated and enthusiastic web developer from Ambalika Institute of Management & Technology, Lucknow. He has a solid grasp of HTML, CSS, JavaScript, and React.js, with growing expertise in backend technologies. Sobit has successfully developed projects like a Sorting Visualizer and To-Do List application, showcasing both problem-solving skills and a creative approach to coding. His passion for learning and building practical solutions makes him a reliable and innovative developer." },
    { id:uuidv4(),username: "avansh", content: "Sobit is a dedicated and enthusiastic web developer from Ambalika Institute of Management & Technology, Lucknow. He has a solid grasp of HTML, CSS, JavaScript, and React.js, with growing expertise in backend technologies. Sobit has successfully developed projects like a Sorting Visualizer and To-Do List application, showcasing both problem-solving skills and a creative approach to coding. His passion for learning and building practical solutions makes him a reliable and innovative developer." },
    { id:uuidv4(),username: "mayank", content: "avansh is a talented and passionate web developer from Ambalika Institute of Management & Technology, Lucknow. With a strong foundation in HTML, CSS, JavaScript, and modern frameworks like React.js and Node.js, he has worked on multiple projects that demonstrate both creativity and technical expertise." }
];

app.get("/", (req, res) => {
    res.render("index.ejs", { posts }); // ✅ Pass data to template
});
app.get("/new",(req,res)=>{
    res.render("new.ejs")
})
app.get("/show/:id",(req,res)=>{
    let {id} = req.params
     let post =posts.find((p)=>id===p.id)
     if (!post) {
        return res.status(404).send("Post not found");
    }
     res.render("show.ejs",{post})
     
})
app.post("/new",(req,res)=>{ 
    let {username,content}=req.body
    const  id = uuidv4()
    posts.push({ id,username,content}) 
    res.redirect("/")
    
})
app.patch("/:id",(req,res)=>{
    let {id} = req.params
    let newContent =req.body.content

          let post =posts.find((p)=>id===p.id)
          if (!post) {
        return res.status(404).send("Post not found");
    }
          post.content= newContent
        res.redirect("/")
})
app.get("/:id/edit",(req,res)=>{
       let {id} = req.params
       let post =posts.find((p)=>id===p.id)
       res.render("edit.ejs",{post})

})
app.delete("/:id",(req,res)=>{
      let {id} = req.params
     posts =posts.filter((p)=>id!==p.id)
     res.redirect("/posts")
})
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
