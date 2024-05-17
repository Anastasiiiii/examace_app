const express = require("express");
const collection = require("./mongo");
const cors = require("cors");
const app = express();

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
        const newUser = await collection.create({ username, email, password });
        res.json({ status: "doesnontexist", user: newUser });
      }
    } catch (e) {
      res.status(500).json({ status: "error", message: "Failed to create user" });
    }
  });
  


app.listen(3001, ()=>{
    console.log("port connected")
})