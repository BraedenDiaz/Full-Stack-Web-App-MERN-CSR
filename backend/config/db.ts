import mongoose from "mongoose";
import { MONGODB_DB } from "./config";

/**
 * @author Braeden Diaz
 */

// Connect to the MongoDB database
const mongooseConnectionPromise : Promise<typeof mongoose> = mongoose.connect(MONGODB_DB);
// Return the MongoDB client driver that is used by the main mongoose connection to talk to MongoDB
const mongooseConnectionClientPromise = mongooseConnectionPromise.then(mon => mon.connection.getClient());


// Catch any initial connection errors that occur.
mongooseConnectionClientPromise.catch(err => {
    console.log(err);
});


// Catch any errors with the connection after the inital connection
mongoose.connection.on("error", error => {
    console.log(error);
});

export default mongooseConnectionClientPromise;