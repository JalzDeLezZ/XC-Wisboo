import type { NextApiRequest, NextApiResponse } from "next";
import xMongoose from "mongoose";
import { db } from "../../../database";
import { Entry, IEntry } from "../../../models";

type Data =
  | {
      message: string;
      error?: string;
    }
  | IEntry;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;

  if (!xMongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }

  switch (req.method) {
    case "PUT":
      return updateEntry(req, res);
    case "GET":
      return getEntryByID(req, res);
    case "DELETE":
      return deleteEntryByID(req, res);
    default:
      res.setHeader("Allow", "GET, POST, PUT");
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// *******************************************************
// *********************** METHODS ***********************
// *******************************************************

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  await db.connect();

  const entryToUpdate = await Entry.findById(id);

  if (!entryToUpdate) {
    await db.disconnect();
    return res.status(404).json({ message: "Entry not found" });
  }

  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status,
  } = req.body;

  try {
    const updatedEntry = await Entry.findByIdAndUpdate(
      id,
      {
        description,
        status,
      },
      { new: true, runValidators: true }
    );

    await db.disconnect();

    res.status(200).json(updatedEntry!);
  } catch (error: any) {
    console.log({ error });
    await db.disconnect();
    return res.status(400).json({
      message: "Review console from server",
      error: error.errors.status.message,
    });
  }
};

const getEntryByID = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.query;

  await db.connect();

  const entry = await Entry.findById(id);

  await db.disconnect();

  if (!entry) {
    return res.status(404).json({ message: "Entry not found" });
  }

  return res.status(200).json(entry);
};

const deleteEntryByID = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.query;

  await db.connect();

  const entry = await Entry.findByIdAndDelete(id);

  await db.disconnect();

  if (!entry) {
    return res.status(404).json({ message: "Entry not found" });
  }

  return res.status(200).json(entry);
};
