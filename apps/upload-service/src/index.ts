import express from "express";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "crypto";
import uuid from "uuid";
require('dotenv').config();
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

async function generatePresignedUrl(bucketName: string, key: string) {
  const v4 = randomUUID();
  const Key = `${v4}${key}`;
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key,
    ContentType: "video/mp4",
  });

  const url = await getSignedUrl(s3Client, command, { expiresIn: 60 * 5 });
  return url;
}


app.get("/getSignedUrl", async (req: any, res: any) => {
  const { filename } = req.query;
  console.log(filename);

  const signedURL = await generatePresignedUrl("videostore20", filename);

  if (signedURL) {
    res.status(200).json({
      msg: "successfully generated signedURL",
      url: signedURL,
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
