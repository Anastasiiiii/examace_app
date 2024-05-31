const express = require("express");
const collection = require("./mongo");
const cors = require("cors");
const app = express();
const fs = require("fs");
const MarksModel = require("./Marks");
//const mark = document.getElementById("mark");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", cors(), (req, res) => {});

app.post("/", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await collection.findOne({ username: username });

    if (existingUser) {
      res.json({ status: "exist" });
    } else {
      const newUser = await collection.create({ username, email, password});
      res.json({ status: "doesnontexist", user: newUser });
    }
  } catch (e) {
    res.status(500).json({ status: "error", message: "Failed to create user" });
  }
});
let fileData = ' ';
fs.readFile("task.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  fileData = data;
  console.log(data);
});
app.get('/readFile', (req, res) => {
  res.send(fileData);
})

app.get('/getMarks', (req, res) => {
  MarksModel.find()
  .then(marks => res.json(marks))
  .catch(err => res.json(err))
})

app.post('/addMarks', async (req, res) => {
  const { username, marks } = req.body;
  if (!username || !marks) {
    return res.status(400).json({ status: "error", message: "Username and marks are required" });
  }

  try {
    const existingUser = await MarksModel.findOne({ username: username });

    if (existingUser) {
      return res.json({ status: "exist", message: "User already exists" });
    } else {
      const newUser = await MarksModel.create({ username, marks: [marks] });
      return res.status(201).json({ status: "created", user: newUser });
    }
  } catch (e) {
    return res.status(500).json({ status: "error", message: "Failed to create user", error: e });
  }
});

// app.post('/addMark', async(req, res) => {
//   const { username, markInfo } = req.body;
//   try {
//     const existingUser = await collection.findOne({ username: username });

//     if (existingUser) {
//       const userData = await collection.create({username, marks: []})
//       userData.mark.push(markInfo);
//     } else {
//       console.error(err)
//     }
//   } catch (e) {
//     res.status(500).json({ status: "error", message: "Failed to create user" });
//   }
  
//   })


app.listen(3001, () => {
  console.log("port connected");
});
