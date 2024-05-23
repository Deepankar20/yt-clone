"use client";
import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState<string>("");
  const [file, setFile] = useState<File | null>();
  const [fields, setFields] = useState<object>({ key: "" });


  const UploadFileToS3 = async () => {
    const data = await axios.get("http://localhost:3003/getsignedurl", {
      params: { filename: file?.name, filetype: file?.type },
    });
    const formData = new FormData();

    const fields = data.data.url.fields;
    const url = data.data.url.url;

    console.log(fields);

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
