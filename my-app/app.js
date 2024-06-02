const express = require("express");
const collection = require("./mongo");
const cors = require("cors");
const path = require("node:path");
const app = express();
const fs = require("fs");
const MarksModel = require("./Marks");
const WordsModel = require("./Words");
const { data1, data2, data3 } = require("./src/elements/data");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

const readingTasksFolder = path.join(__dirname, "uploads");

console.log(`Resolved path to texts folder: ${readingTasksFolder}`);

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

app.get("/getUsers", (req, res) => {
  collection
    .find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.error("Error fetching users:", err);
      res.status(500).json({
        status: "error",
        message: "Failed to fetch users",
        error: err.message,
      });
    });
});

app.get("/getUsers/:username", (req, res) => {
  const { username } = req.params;
  collection
    .findOne({ username: username })
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ status: "error", message: "Users not found" });
      }
    })
    .catch((err) => {
      console.error("Error fetching users:", err);
      res.status(500).json({
        status: "error",
        message: "Failed to fetch users",
        error: err.message,
      });
    });
});

let fileData = " ";
let filePath = ["task1.txt", "task2.txt", "task3.txt"];

const getFilePath = () => {
  const index = Math.floor(Math.random() * filePath.length);
  return filePath[index];
};

const filePathToRead = getFilePath();
fs.readFile(filePathToRead, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  fileData = data;
  console.log(data);
});
app.get("/readFile", (req, res) => {
  const filePathToRead = getFilePath();
  fs.readFile(filePathToRead, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    fileData = data;
    console.log(data);
  });
  let responseInfo;
  if (filePathToRead === "task1.txt") {
    responseInfo = { text: fileData, answers: data1 };
  } else if (filePathToRead == "task2.txt") {
    responseInfo = { text: fileData, answers: data2 };
  } else if (filePathToRead === "task3.txt") {
    responseInfo = { text: fileData, answers: data3 };
  }
  res.send(responseInfo);
});

app.get("/getRandomUploadedFile", (req, res) => {
  fs.readdir(readingTasksFolder, (err, files) => {
    if (err) {
      return res.status(500).send("Error reading directory");
    }

    const fileIndex = Math.floor(Math.random() * files.length);
    const file = files[fileIndex];

    fs.readFile(path.join(readingTasksFolder, file), "utf8", (err, data) => {
      if (err) {
        return res.status(500).send("Error reading file");
      }

      res.json({ fileName: file, content: data });
    });
  });
});
app.get("/getMarks", (req, res) => {
  MarksModel.find()
    .then((marks) => res.json(marks))
    .catch((err) => res.json(err));
});
app.post("/addMarks", async (req, res) => {
  const { username, mark } = req.body;
  if (!username || mark === undefined) {
    return res
      .status(400)
      .json({ status: "error", message: "Username and mark are required" });
  }

  try {
    const signedUser = await collection.findOne({ username: username });
    if (!signedUser) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }

    const existingUser = await MarksModel.findOne({ username: username });
    if (existingUser) {
      existingUser.marks.push(mark);
      await existingUser.save();
      return res.json({
        status: "exist",
        message: "User already exists, mark added",
        user: existingUser,
      });
    } else {
      const newUser = await MarksModel.create({ username, marks: [mark] });
      return res.status(201).json({ status: "created", user: newUser });
    }
  } catch (e) {
    return res.status(500).json({
      status: "error",
      message: "Failed to process request",
      error: e.message,
    });
  }
});

app.get("/getMarks/:username", (req, res) => {
  const { username } = req.params;
  MarksModel.findOne({ username: username })
    .then((mark) => {
      if (mark) {
        res.json(mark);
      } else {
        res.status(404).json({ status: "error", message: "Marks not found" });
      }
    })
    .catch((err) =>
      res.status(500).json({ status: "error", message: err.message })
    );
});

app.post("/api/upload", upload.single("task"), (req, res) => {
  res.json(req.file);
});



app.post("/addWords", async (req, res) => {
  const { username, word, definition } = req.body;
  if (!username || !word || !definition === undefined) {
    return res.status(400).json({
      status: "error",
      message: "Username, word and definition are required",
    });
  }

  try {
    const signedUser = await collection.findOne({ username: username });
    if (!signedUser) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }

    const existingUser = await WordsModel.findOne({ username: username });
    if (existingUser) {
      existingUser.words.push(word);
      existingUser.definitions.push(definition);
      await existingUser.save();
      return res.json({
        status: "exist",
        message: "User already exists, word and definition have been added",
        user: existingUser,
      });
    } else {
      const newUser = await WordsModel.create({
        username,
        words: [word],
        definitions: [definition],
      });
      return res.status(201).json({ status: "created", user: newUser });
    }
  } catch (e) {
    return res.status(500).json({
      status: "error",
      message: "Failed to process request",
      error: e.message,
    });
  }
});

app.get("/getWords", (req, res) => {
  WordsModel.find()
    .then((words) => res.json(words))
    .catch((err) => res.json(err));
});

app.get("/getRandomWord/:username", async (req, res) => {
  const { username } = req.params;

  try {
    const existingUser = await WordsModel.findOne({ username: username });

    if (!existingUser) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }
    if (!existingUser.words || !existingUser.definitions || existingUser.words.length === 0) {
      return res.status(404).json({ status: "error", message: "No words found for this user" });
    }
    const index = Math.floor(Math.random() * existingUser.words.length);
    const theWord = existingUser.words[index];
    const theDefinition = existingUser.definitions[index];
    res.json({ word: theWord, definition: theDefinition });
  } catch (e) {
    return res.status(500).json({
      status: "error",
      message: "Failed to process request",
      error: e.message,
    });
  }
});

app.listen(3001, () => {
  console.log("port connected");
});
