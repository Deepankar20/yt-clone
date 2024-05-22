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

async function generatePresignedUrl(
  bucketName: string,
  fileName: string,
  fileType: string
) {
  const s3Params = {
    Bucket: bucketName,
    Key: fileName,
    Conditions: [
      { bucket: bucketName },
      ["starts-with", "$key", `user`],
      ["content-length-range", 0, 1000000],
    ],
    Fields: {
      key: fileName,
    },
    Expires: 600, // URL expiration time in seconds
  };

  try {
    //@ts-ignore
    const url = await createPresignedPost(s3Client, s3Params);

    return url;
  } catch (error) {
    console.log(error);
    return "";
  }
}

app.get("/getSignedUrl", async (req: any, res: any) => {
  const { filename, filetype } = req.query;
  console.log(filename);

  const signedURL = await generatePresignedUrl(
    "videostore20",
    filename,
    filetype
  );

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
