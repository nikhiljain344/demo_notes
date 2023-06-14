const express = require('express');
const app = express();
const env = require('dotenv');
const path = require('path')
const cors = require('cors');
env.config();
require('./database/db');

const port = process.env.PORT

var authRouter = require("./mvc/auth/router");
var notesRouter = require("./mvc/notes/router");

app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, "public")))

app.use("/api/auth", authRouter);
app.use("/api/note", notesRouter);

app.listen(port, (err) => {
    err ? console.log(err) : console.log(`server is runing at ${port}`);
})