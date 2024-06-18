import {
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import path from "path";
import { promisify } from "util";
import { exec } from "child_process";
import fs from "fs";

const execPromise = promisify(exec);

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
require("dotenv").config();

const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

async function listNewObjects(bucketName: string, lastCheckTimestamp: number) {
  const command = new ListObjectsV2Command({
    Bucket: bucketName,
  });

  try {
    const response = await s3Client.send(command);
    const objects = response.Contents;
    //@ts-ignore
    objects.forEach((object) => {
      // Assuming object.Key format is "path/to/file-timestamp.extension"
      //@ts-ignore
      const objectTimestamp = new Date(object.Key.split("-")[1]).getTime(); // Extract timestamp from object key
      if (objectTimestamp > lastCheckTimestamp) {
        if (object.Key?.split(".")[1] === "mp4") {
        }
        // Process the new video file here
      }
    });
  } catch (error) {
    console.error("Error listing objects:", error);
  }
}

async function downloadFile(
  bucketName: string,
  objectKey: string,
  localPath: string
) {
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: objectKey,
  });

  const data = await s3Client.send(command);
  return new Promise((resolve, reject) => {
    const fileStream = fs.createWriteStream(localPath);
    //@ts-ignore
    data.Body?.pipe(fileStream);
    //@ts-ignore
    data.Body?.on("end", () => resolve(localPath));
    //@ts-ignore
    data.Body?.on("error", reject);
  });
}

async function processVideo(bucketName: string, objectKey: string) {
  const localInputPath = path.join("/tmp", objectKey);
  const localOutputPath = path.join("/tmp/hls", objectKey);
  const outputPlaylist = path.join(localOutputPath, "index.m3u8");

  try {
    if (!fs.existsSync(localOutputPath)) {
      fs.mkdirSync(localOutputPath, { recursive: true });
    }

    await downloadFile(bucketName, objectKey, localInputPath);

    const ffmpegCommand = `
      ffmpeg -i ${localInputPath} \
      -codec: copy \
      -start_number 0 \
      -hls_time 10 \
      -hls_list_size 0 \
      -f hls ${outputPlaylist}
    `;

    await execPromise(ffmpegCommand);

    await deleteFile(bucketName, objectKey);

    if (fs.existsSync(outputPlaylist)) {
    } else {
      throw new Error(`HLS playlist not found: ${outputPlaylist}`);
    }

    await uploadDirectory(bucketName, `hls/${objectKey}/`, localOutputPath);
  } catch (error) {
    console.error("Error processing video to HLS:", error);
  } finally {
    fs.unlink(
      localInputPath,
      (err) => err && console.error("Error deleting input file:", err)
    );
    fs.rmdirSync(localOutputPath, { recursive: true });
  }
}

const videoQueue: [] = [];

async function processQueue() {
  while (videoQueue.length > 0) {
    const videoKey = videoQueue.shift(); // Remove the first video from the queue
    //@ts-ignore
    if (videoKey.split(".")[1] !== "mp4") continue;

    try {
      //@ts-ignore
      await processVideo("videostore20", videoKey); // Replace with your bucket name
    } catch (error) {
      console.error("Error processing video:", videoKey, error);
    }
  }
}

async function fetchObjects(bucketName: string) {
  const command = new ListObjectsV2Command({
    Bucket: bucketName,
  });

  try {
    const response = await s3Client.send(command);
    return response.Contents?.map((object) => object.Key);
  } catch (error) {
    console.error("Error listing objects:", error);
    return [];
  }
}

async function uploadDirectory(
  bucketName: string,
  s3Prefix: string,
  localDirectory: string
) {
  const files = fs.readdirSync(localDirectory);
  for (const file of files) {
    const filePath = path.join(localDirectory, file);
    const s3Key = `${s3Prefix}${file}`;
    await uploadFile(bucketName, s3Key, filePath);
  }
}

async function uploadFile(bucketName: string, s3Key: string, filePath: string) {
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: s3Key,
    Body: fs.createReadStream(filePath),
  });

  await s3Client.send(command);
}

async function deleteFile(bucketName: string, objectKey: string) {
  const command = new DeleteObjectCommand({
    Bucket: bucketName,
    Key: objectKey,
  });

  await s3Client.send(command);
}

async function main() {
  const bucketName = "videostore20"; // Replace 'your_bucket_name' with your bucket's name
  let previousObjectList: [] = [];

  while (true) {
    const currentObjectList = await fetchObjects(bucketName);

    // Determine new objects by comparing the current list with the previous list
    const newObjects = currentObjectList?.filter(
      //@ts-ignore
      (objectKey) => !previousObjectList.includes(objectKey)
    );

    // Add new objects to the processing queue
    //@ts-ignore
    videoQueue.push(...newObjects);

    // Update the previous object list
    //@ts-ignore
    previousObjectList = currentObjectList;

    // Process the videos in the queue
    await processQueue();

    // Wait for 5 seconds before fetching the list again
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }
}

main();
