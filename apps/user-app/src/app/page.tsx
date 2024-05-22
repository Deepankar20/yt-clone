'use client'
import axios from "axios";
import { useState } from "react";

import { CreatePost } from "~/app/_components/create-post";
import { api } from "~/trpc/server";

export default  function Home() {
  const [url, setUrl] = useState<string>("");
  const [file, setFile] = useState<File | null>();
  console.log(file);
  

  const getSignedUrl = async (filename:string)=>{

    const url = await axios.get("http://localhost:3003/getsignedurl", {params:{filename}});
    console.log(url.data.url);
    
    setUrl(url.data.url);
  }

  const UploadFileToS3 = async ()=>{

    await getSignedUrl(file?.name as string);

    try {
      const response = await axios.put(url, file, {
        headers: {
          'Content-Type': file?.type,
        },
      });
      console.log('File uploaded successfully:', response);
    } catch (error) {
      console.error('Error uploading file:', error);
    }


  }


  return (
    <div className="flex flex-col w-1/2">
      <button onClick={UploadFileToS3}>upload video</button>
      <input type="file" name="" id="" onChange={(e)=>setFile(e.target.files && e.target.files[0])}/>
      <button onClick={()=>getSignedUrl('filename')}>get signedurl</button>
    </div>
  );
}

