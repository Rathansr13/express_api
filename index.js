const express = require('express')
const app = express();
const Joi = require('joi')


//data
app.use(express.json())
const courses=[
    { id:1 , name:'courses1'},
    { id:2 , name:'courses2'},
    { id:3 , name:'courses3'},
    { id:4 , name:'courses4'},
    { id:5 , name:'courses5'},
     { id:6 , name:'courses7'},
]

app.get('/' ,(req,res)=>{
 res.send("hello")
});

app.get('/api/courses',(req,res)=>{
    res.send(courses);
})

app.get('/api/courses/:id',(req,res)=>{
     const course=courses.find(c=>c.id===parseInt(req.params.id));
     if(!course)
     res.status(404)
     else
     res.send(course)
})

app.post('/api/courses',(req,res)=>{
    const schema={
        name : Joi.string().min(3).required()
    };
    const result = Joi.validate(req.body,schema)
    console.log(result);
    if(result.error)
    {
        res.status(400).send("name")
    }
   const cours={
    id:courses.length+1,
    name :req.body.name
   };
   courses.push(cours);
   res.send(cours);
})


app.put('/api/courses/:id',(req,res)=>{
    //look up the courses
    //if not existing return error
    const course=courses.find(c=>c.id===parseInt(req.params.id));
    if(!course)
    res.status(404).send("not found")

    const schema={
        name : Joi.string().min(3).required()
    };
    const result = Joi.validate(req.body,schema)
    if(result.error)
{
    res.status(404).send("not valid")
}

courses.name = req.body.name;
res.send(courses)

})

const port=3000
app.listen(port,(port)=>{
    console.log('app is running')
})