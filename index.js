
const express = require("express");
const {connectToDB} = require('./DB/connect');
const cors = require('cors')

const employees = require('./routes/employees');
const auth = require('./routes/auth');
const task = require('./routes/empTasks');

require("dotenv").config();


const app = express();
const PORT = process.env.PORT || 4000;

// is used to read the requested data from web in FORM .. middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json({limit: "60mb"}));   // allows express to use json in body..
app.use(cors());    // allow cross origin resource sharing..

app.use("/auth", auth);
app.use("/employee", employees);
app.use('/task', task);

( async () => {

    try{
        app.listen(PORT, ()=> {
            console.log(`Server is active on port ${PORT}..`);
        })
        await connectToDB();
    }
    catch(err) {
        console.log("Error in server loading");
        console.log(err);
    }

})();


// default route
app.all('*', (req, res) => {

    res.status(404).send('<h1> Resourse not found </h1> <p> Probably wrong URL </p>');

})

