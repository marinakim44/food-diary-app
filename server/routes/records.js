import express from "express";
import {
  PutCommand,
  QueryCommand,
  UpdateCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";
import docClient from "./dynamoClient.js";

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const { userId, timestamp, recordType, notes } = req.body;

    if (!userId || !timestamp || !recordType || !notes) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const item = {
      userId: userId,
      timestamp: timestamp.toString(),
      recordType,
      notes,
    };

    await docClient.send(
      new PutCommand({
        TableName: "food-diary-app-user-records",
        Item: item,
      })
    );

    res.status(201).json({ message: "Record added", item });
  } catch (err) {
    console.error("DynamoDB error:", err);
    res.status(500).json({ error: "Failed to add record" });
  }
});

router.get("/records/:userId", async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ error: "Missing userId" });
  }

  const params = {
    TableName: "food-diary-app-user-records",
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": userId,
    },
  };

  try {
    const data = await docClient.send(new QueryCommand(params));
    console.log("DynamoDB Query Response:", data.Items);
    res.status(200).json({ records: data.Items });
  } catch (err) {
    console.error("DynamoDB Query Error:", err);
    res.status(500).json({ error: "Failed to fetch records" });
  }
});

router.patch("/record", async (req, res) => {
  const { userId, timestamp, recordType, notes } = req.body;

  if (!userId || !timestamp) {
    return res.status(400).json({ error: "userId and timestamp are required" });
  }

  // Build the update expression dynamically
  let updateExpression = "SET";
  const expressionAttributeValues = {};
  const expressionAttributeNames = {};

  if (recordType) {
    updateExpression += " #recordType = :recordType,";
    expressionAttributeNames["#recordType"] = "recordType";
    expressionAttributeValues[":recordType"] = recordType;
  }

  if (notes) {
    updateExpression += " #notes = :notes,";
    expressionAttributeNames["#notes"] = "notes";
    expressionAttributeValues[":notes"] = notes;
  }

  // Remove trailing comma
  updateExpression = updateExpression.replace(/,$/, "");

  const params = {
    TableName: "food-diary-app-user-records",
    Key: {
      userId,
      timestamp,
    },
    UpdateExpression: updateExpression,
    ExpressionAttributeNames: expressionAttributeNames,
    ExpressionAttributeValues: expressionAttributeValues,
    ReturnValues: "ALL_NEW",
  };

  try {
    const result = await docClient.send(new UpdateCommand(params));
    res.status(200).json({ updatedItem: result.Attributes });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Failed to update record" });
  }
});

router.delete("/record", async (req, res) => {
  const { userId, timestamp } = req.body;

  if (!userId || !timestamp) {
    return res.status(400).json({ error: "userId and timestamp are required" });
  }

  const params = {
    TableName: "food-diary-app-user-records",
    Key: {
      userId,
      timestamp,
    },
  };

  try {
    await docClient.send(new DeleteCommand(params));
    res.status(200).json({ message: "Record deleted" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Failed to delete record" });
  }
});

export default router;
