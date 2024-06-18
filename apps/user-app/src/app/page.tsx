"use client";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { db } from "~/server/db";
import { api } from "~/trpc/react";

export default function Home() {
  const [url, setUrl] = useState<string>("");
  const [file, setFile] = useState<File | null>();
  const [fields, setFields] = useState<object>({ key: "" });

  const create = api.video.create.useMutation({
    onSuccess: (data) => {
      if (data.code) {
        console.log("message : ", data.message);
      }
    },
  });

  const UploadFileToS3 = async () => {
    const data = await axios.get("http://localhost:3003/getsignedurl", {
      params: { filename: file?.name, contentType: file?.type },
    });

    console.log(data);



    const response = await fetch(data.data.url, {
      method: "PUT",
      body: file,
    });

    // create.mutate({
    //   title:title,
    //   videoUrl:`${cloudfrontUrl}/hls/${file?.name}/index.m3u8`
    // });

  };

  return (
    <div className="flex w-1/2 flex-col">
      <button onClick={UploadFileToS3}>upload video</button>
      <input
        type="file"
        name=""
        id=""
        onChange={(e) => setFile(e.target.files && e.target.files[0])}
      />
    </div>
  );
}
