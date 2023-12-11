require('dotenv').config()

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.json())

app.use("/user", require("./routes/userRoute"));
app.use("/question", require("./routes/questionRoute"));
app.use("/reaction", require("./routes/reactionRoute"));
app.use("/result", require("./routes/resultRoute"));
app.use("/report", require("./routes/reportRoute"));


const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`App is running at: http://localhost:${port}`);
})