// const express=require("express")
// const app=express()
// const PORT=8000;
// const student=[
//     {id:1,name:"raj",branch:"CSE"},
//     {id:2,name:"ajay",branch:"ECE"},
//     {id:3,name:"yash",branch:"IT"},
// ]
// app.get("/",(req,res)=> {
//     res.send("welcome to home page");
// })
// app.get("/student",(req,res)=> {
//     res.json("user page");
// })
// app.get("/student/:id",(res,req)=>{
//       const branch=req.query.branch;
//       if(branch){
//         return res.json(student)
//       }
//       const foundStudent=student.filter(s=>s.branch==branch);
//       res.json.foundStudent;
// })

// app.post("/student/register",(res,req)=>{
//     const data=req.body
//     console.log("<<<",req.body)
//     if(data){
//         return res.statusCode(400).send("please provide student data")
//     }    
// })
// app.listen(PORT,()=>{
//     console.log("server is listening to port 8000")
// })
// const express = require("express");
// const app = express();
// const PORT = 8000;

// // Middleware to read JSON body
// app.use(express.json());

// // Student data
// const students = [
//   { id: 1, name: "raj", branch: "CSE" },
//   { id: 2, name: "ajay", branch: "ECE" },
//   { id: 3, name: "yash", branch: "IT" }
// ];

// // Home route
// app.get("/", (req, res) => {
//   res.send("Welcome to Home Page");
// });

// // Get all students
// app.get("/student", (req, res) => {
//   res.json(students);
// });

// // Get student by ID
// app.get("/student/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   const student = students.find(s => s.id === id);

//   if (!student) {
//     return res.status(404).send("Student not found");
//   }

//   res.json(student);
// });

// // Register new student
// app.post("/student/register", (req, res) => {
//   const data = req.body;

//   if (!data || !data.id || !data.name || !data.branch) {
//     return res.status(400).send("Please provide complete student data");
//   }

//   students.push(data);
//   res.status(201).json({
//     message: "Student registered successfully",
//     student: data
//   });
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server is listening on port ${PORT}`);
// });







// const express = require("express");
// const app = express();
// const PORT = 8000;

// // Middleware
// app.use(express.json());

// // Sample student data
// const students = [
//   { id: 1, name: "raj", branch: "CSE" },
//   { id: 2, name: "ajay", branch: "ECE" },
//   { id: 3, name: "yash", branch: "IT" }
// ];

// // Home route
// app.get("/", (req, res) => {
//   res.send("Welcome to Home Page");
// });

// // Get all students
// app.get("/student", (req, res) => {
//   res.json(students);
// });

// // Get student by ID
// app.get("/student/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const student = students.find(s => s.id === id);

//   if (!student) {
//     return res.status(404).send("Student not found");
//   }
//   res.json(student);
// });

// // Register new student
// app.post("/student/register", (req, res) => {
//   const data = req.body;

//   if (!data || !data.id || !data.name || !data.branch) {
//     return res.status(400).send("Please provide complete student data");
//   }

//   students.push(data);
//   res.status(201).json({
//     message: "Student registered successfully",
//     student: data
//   });
// });

// // UPDATE student using PUT
// app.put("/student/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const updatedData = req.body;

//   const student = students.find(s => s.id === id);

//   if (!student) {
//     return res.status(404).send("Student not found");
//   }

//   student.name = updatedData.name || student.name;
//   student.branch = updatedData.branch || student.branch;

//   res.json({
//     message: `Student ${id} updated successfully`,
//     student
//   });
// });
// // Start server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });




const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 8000;

app.use(express.json());

const FILE_PATH = "./students.json";

/* -------- HOME -------- */
app.get("/", (req, res) => {
  res.send("Welcome to Home page");
});

/* -------- GET ALL STUDENTS / SEARCH BY NAME -------- */
app.get("/students", (req, res) => {
  const { name } = req.query;

  fs.readFile(FILE_PATH, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Could not read file" });
    }

    let students = [];
    try {
      students = JSON.parse(data);
    } catch {
      students = [];
    }

    if (name) {
      students = students.filter(
        s => s.name.toLowerCase() === name.toLowerCase()
      );
    }

    res.json(students);
  });
});

/* -------- GET STUDENT BY ID -------- */
app.get("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);

  fs.readFile(FILE_PATH, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Could not read file" });
    }

    const students = JSON.parse(data || "[]");
    const student = students.find(s => s.id === id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
  });
});

/* -------- REGISTER STUDENT -------- */
app.post("/students", (req, res) => {
  const { name, age, branch } = req.body;

  if (!name || typeof age !== "number" || !branch) {
    return res.status(400).json({ message: "Invalid or missing data" });
  }

  fs.readFile(FILE_PATH, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Could not read file" });
    }

    const students = JSON.parse(data || "[]");

    const newId = students.length
      ? Math.max(...students.map(s => s.id)) + 1
      : 1;

    const newStudent = {
      id: newId,
      name,
      age,
      branch
    };

    students.push(newStudent);

    fs.writeFile(FILE_PATH, JSON.stringify(students, null, 2), err => {
      if (err) {
        return res.status(500).json({ message: "Error writing file" });
      }

      res.status(201).json({
        message: "Student registered successfully",
        student: newStudent
      });
    });
  });
});

/* -------- UPDATE STUDENT -------- */
app.put("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, age, branch } = req.body;

  fs.readFile(FILE_PATH, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Could not read file" });
    }

    const students = JSON.parse(data || "[]");
    const student = students.find(s => s.id === id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (name) student.name = name;
    if (age) student.age = age;
    if (branch) student.branch = branch;

    fs.writeFile(FILE_PATH, JSON.stringify(students, null, 2), err => {
      if (err) {
        return res.status(500).json({ message: "Error updating file" });
      }

      res.json({
        message: "Student updated successfully",
        student
      });
    });
  });
});

/* -------- DELETE STUDENT -------- */
app.delete("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);

  fs.readFile(FILE_PATH, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Could not read file" });
    }

    let students = JSON.parse(data || "[]");
    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
      return res.status(404).json({ message: "Student not found" });
    }

    const deletedStudent = students.splice(index, 1);

    fs.writeFile(FILE_PATH, JSON.stringify(students, null, 2), err => {
      if (err) {
        return res.status(500).json({ message: "Error deleting student" });
      }

      res.json({
        message: "Student deleted successfully",
        student: deletedStudent[0]
      });
    });
  });
});

/* -------- START SERVER -------- */
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});