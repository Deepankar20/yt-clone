import express from "express";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "crypto";
import uuid from "uuid";
require("dotenv").config();
import cors from "cors";
const app = express();
app.use(cors());

console.log(process.env.log);

const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

async function putObject(filename: string, contentType: string) {
  const command = new PutObjectCommand({
    Bucket: "videostore20",
    Key: `${filename}`,
    ContentType: contentType,
  });

  const putObjectUrl = getSignedUrl(s3Client, command);

  return putObjectUrl;
}

app.get("/getSignedUrl", async (req: any, res: any) => {
  const { filename, contentType } = req.query;

  const url = await putObject(filename, contentType);

  if (url) {
    res.status(201).json({
      message: "url generated",
      url: url,
    });
  }
});

app.get("/hello", (req, res) => {
  res.json({
    message: "hi",
  });
});

app.listen(3003, () => {
  console.log("server running ...");
});
