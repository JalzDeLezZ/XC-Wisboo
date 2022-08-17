import xMongoose, { Model, Schema } from "mongoose";
import { Entry } from "../interfaces";

export interface IEntry extends Entry {}

const entrySchema = new Schema({
  description: { type: String, required: true },
  createAt: { type: Number },
  status: {
    type: String,
    enum: {
      values: ["pending", "in-progress", "finished"],
      message: "{VALUE} is not a valid status",
    },
    default: "pending",
  },
});

const EntryModel: Model<IEntry> =
  xMongoose.models.Entry || xMongoose.model("Entry", entrySchema);

export default EntryModel;
