try {

    // Importing the important modules required for the server to function

    const express = require('express');
    const cors = require('cors');
    const dotenv = require('dotenv');
    const helmet = require('helmet');
    const morgan = require('morgan');
    const generateConnectionUrl = require("./src/connection-url-generator");
    const connectToDatabase = require('./db/connect-to-database')
    const authUsers = require("./db/routes/auth-Users")


    // Server side configuration

    dotenv.config()
    connectToDatabase()
    const app = express();
    const port = process.env.PORT || 1337;
    const connection_string = generateConnectionUrl(60)
    app.use(express.json());
    app.use(cors())
    app.use(helmet());
    app.use(morgan("dev"));
    app.use("/api/auth", authUsers)

    // Server request routing 

    app.get("/api/server/active", async (req, res) => {
        if(req.header('serverPass') === process.env.SERVER_PASSWORD) {
            res.status(200).json({
                id: 1,
                statusCode: 200,
                message: "ER server active...",
                clientPass: process.env.CLIENT_PASSWORD,
            })
        }
    })

    app.listen(port, () => {
        console.log("X--- Exemplar Recruiter server succesfully running ---X");
        console.log(`X--- Exemplar Recruiter server connection key: ${connection_string} ---X`);
    });
} catch (error) {
    console.log("Some error occured in the main branch of the server. Err: ", error)
}