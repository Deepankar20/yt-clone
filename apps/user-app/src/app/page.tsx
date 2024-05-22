"use client";
import axios from "axios";
import { useState } from "react";

import { CreatePost } from "~/app/_components/create-post";
import { api } from "~/trpc/server";

export default function Home() {
  const [url, setUrl] = useState<string>("");
  const [file, setFile] = useState<File | null>();
  const [fields, setFields] = useState<object>({ key: "" });

  const getSignedUrl = async (filename: string, filetype: string) => {
    const url = await axios.get("http://localhost:3003/getsignedurl", {
      params: { filename, filetype },
    });

    setUrl((prev) => url.data.url.url);
    setFields((prev) => url.data.url.fields);
    console.log("hi");
  };

  const UploadFileToS3 = async () => {
    const data = await axios.get("http://localhost:3003/getsignedurl", {
      params: { filename: file?.name, filetype: file?.type },
    });
    const formData = new FormData();

    const fields = data.data.url.fields;
    const url = data.data.url.url;

    console.log(fields);

    //@ts-ignore
    formData.set("bucket", fields["bucket"]);
    formData.set("X-Amz-Algorithm", fields["X-Amz-Algorithm"]);
    formData.set("X-Amz-Credential", fields["X-Amz-Credential"]);
    formData.set("X-Amz-Algorithm", fields["X-Amz-Algorithm"]);
    formData.set("X-Amz-Date", fields["X-Amz-Date"]);
    formData.set("key", fields["key"]);
    formData.set("Policy", fields["Policy"]);
    formData.set("X-Amz-Signature", fields["X-Amz-Signature"]);
    formData.set("X-Amz-Algorithm", fields["X-Amz-Algorithm"]);

    //@ts-ignore
    formData.set("file", file);

    // Upload file to S3 using the presigned URL
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    const response = await fetch(url, {
      method: 'POST',
      body: formData
    });
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
