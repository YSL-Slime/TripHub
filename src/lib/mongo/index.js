import { MongoClient } from "mongodb";

const URI = process.env.MONGO;
const options = {};

if (!URI) throw new Error("Add mongo uri to .env");

let client = new MongoClient(URI, options);
let clientPromise;

if (process.env.NODE_ENV === "production") {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = client.connect();
  }
  clientPromise + global._mongoClientPromise;
} else {
  clientPromise = client.connect();
}

export default clientPromise;
