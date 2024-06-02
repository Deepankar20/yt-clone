"use client";
import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState<string>("");
  const [file, setFile] = useState<File | null>();
  const [fields, setFields] = useState<object>({ key: "" });

  const UploadFileToS3 = async () => {
    const data = await axios.get("http://localhost:3003/getsignedurl", {
      params: { filename: file?.name, contentType: file?.type },
    });

    console.log(data);

    const response = await fetch(data.data.url, {
      method: "PUT",
      body: file,
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
