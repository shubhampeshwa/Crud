import express from 'express'
import mongoose from 'mongoose';
// import Student from './student.js';

const app = express()

  try {
    var DB_url = "mongodb+srv://peshwashubham1234:ZwXjMnVlBnVBlB54@test.evlr4.mongodb.net/"
    var mongodb = process.env.MONGODB_URI || DB_url;
   await mongoose.connect(mongodb, {
     useNewUrlParser: true,
     useUnifiedTopology: true,
    //  useCreateIndex: true,
    
     useUnifiedTopology: true
   });
   console.log("Mongo DB is Connected...");
 } catch (err) {
   console.error("Error Mgs", err.message);
   //Exist on failure
   process.exit(1);
 }

const port = 3000

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
  }, { timestamps: true });
  
  // Create Student Model
  const Student = mongoose.model('Student', studentSchema);

let teaArray = []
let nextId = 1
let studentArray =[]
let stuID = 1
app.use(express.json());

app.post("/teas",(req,res)=>{
    const{name,price} = req.body
    const newTea = {id:nextId++, name,price}
    teaArray.push(newTea)
    res.status(201).send(newTea)
})

app.get("/teas",(req,res)=>{
    res.status(200).send(teaArray)
})

app.post("/studenDetails",async (req,res)=>{
    const{name,age,email}= req.body
    const newStudent = new Student({ name, age, email });
    await newStudent.save(); 
    res.status(201).send(newStudent);

})

app.get("/getAllStudentDetails", async (req, res) => {
    try {
      const students = await Student.find(); // Fetch all students from the database
      res.status(200).send(students); // Send the students as a response
    } catch (err) {
      res.status(500).send({ error: "Failed to fetch students: " + err.message });
    }
  });



app.get("/getAllStudentName",async (req,res)=>{
    try{
        const studentNames = await Student.find().select('name age')
        res.status(200).send(studentNames)
    } catch{
        res.status(500).send({ error: "Failed to fetch students: " + err.message });
    }
    

})




//677f7729949b780b1b68bb8d
//Update 
// app.put("/studenDetails/:id",(req,res)=>{
//     console.log("request==>",req.body)
//     const studId = Student.find(t=>t._id==req.params.id)
//     console.log("request==>StuID",studId)
//     if(!studId) {
//         return res.status(404).send('student not found')
//     }
//     const {name,age} = req.body
//     studId.name = name
//     studId.age = age
//     res.send(200).send(studId)

// })

app.put("/studenDetails/:id", async (req, res) => {
    try {
      const { name, age } = req.body; 
      console.log("request body==>",req)
      // Find the student by ID and update the fields
      const updatedStudent = await Student.findByIdAndUpdate(
        req.params.id, 
        { name, age }, 
        { new: true, runValidators: true } 
      );
  console.log("update student==>",updatedStudent)
      
      if (!updatedStudent) {
        return res.status(404).send({ message: "Student not found" });
      }
  
      
      res.status(200).send(updatedStudent);
    } catch (err) {
      res.status(500).send({ error: "Failed to update student: " + err.message });
    }
  });
  

app.listen(port,()=>{
    console.log(`server is running at port: ${port}`);
    
})

