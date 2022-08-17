import xMongoose from "mongoose";

/**
 * Connection ready state
 *
 * - 0 = disconnected
 * - 1 = connected
 * - 2 = connecting
 * - 3 = disconnecting
 * - 99 = uninitialized
 */

const oMongooConnection = {
  isConnected: 0,
};

export const connect = async () => {
  if (oMongooConnection.isConnected) {
    console.log("MongoDB is already connected");
    return;
  }
  if (xMongoose.connections.length > 0) {
    oMongooConnection.isConnected = xMongoose.connections[0].readyState;

    if (oMongooConnection.isConnected === 1) {
      console.log("Ussing existing connection");
      return;
    }
    await xMongoose.disconnect();
  }

  await xMongoose.connect(process.env.MONGO_URL || "");
  oMongooConnection.isConnected = 1;

  console.log(
    "MongoDB is connected",
    process.env.MONGO_URL,
    +"\n" + "============" + "\n" + xMongoose.connections[0].readyState,
    xMongoose.connections[0].name,
    xMongoose.connections[0].host,
    xMongoose.connections[0].port,
  );
};

export const disconnect = async () => {
  if (process.env.NODE_ENV === "development") return;
  
  if (oMongooConnection.isConnected === 0) return;

  await xMongoose.disconnect();

  oMongooConnection.isConnected = 0;
  
  console.log("MongoDB is disconnected");
};
