const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()


// create datanase connection
const db_connection = async() => {

    // access database connection string
    const MONGO_CONNECTION_STRING = 'mongodb+srv://vglashikasathruwan:T78mqUIYTMFvyiMT@cluster0.2fcnw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

    if(MONGO_CONNECTION_STRING != null) {

        try{
            mongoose.connect(MONGO_CONNECTION_STRING)

            console.log("Successfully connected")
        }
        catch(err) {
            console.log("Something went wrong..")
        }

    }
    else {
        console.log("There is database connection violate")
    }
    
} 


module.exports = db_connection