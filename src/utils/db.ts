import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
 throw new Error("Missing MONGODB_URI in environment variables");
}

type MongooseCache = {
 conn: typeof mongoose | null;
 promise: Promise<typeof mongoose> | null;
};

const globalForMongoose = globalThis as unknown as {
 mongoose: MongooseCache | undefined;
};

const cached = globalForMongoose.mongoose ?? { conn: null, promise: null };

export async function connectToDatabase() {
 if (cached.conn) {
   return cached.conn;
 }

 if (!cached.promise) {
   cached.promise = mongoose.connect(MONGODB_URI, {
     bufferCommands: false,
   });
 }

 console.log("Connected to db")
 cached.conn = await cached.promise;
 globalForMongoose.mongoose = cached;

 return cached.conn;
}


