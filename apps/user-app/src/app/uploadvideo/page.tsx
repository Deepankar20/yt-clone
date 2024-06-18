"use client";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { db } from "~/server/db";
import { api } from "~/trpc/react";

const FileUploadForm = () => {
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  const create = api.video.create.useMutation({
    onSuccess: (data) => {
      if (data.code) {
        console.log("message : ", data.message);
      }
    },
  });

  const UploadFileToS3 = async () => {
    const data = await axios.get("http://localhost:3003/getsignedurl", {
      //@ts-ignore
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

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Form submission logic
    // Simulate file upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) clearInterval(interval);
    }, 100);
  };

  return (
    <div className="flex items-center justify-center bg-black p-12 text-white">
      <div className="mx-auto w-full max-w-[1250px] bg-gray-800">
        <form
          className="flex justify-between px-9 py-6"
          onSubmit={handleSubmit}
        >
          <div>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="mb-3 block text-base font-medium"
              >
                Title
              </label>
              <input
                type="text"
                name="title"
                id="text"
                placeholder="enter video title"
                value={email}
                onChange={handleEmailChange}
                className="w-full rounded-md border border-[#e0e0e0] bg-black px-6 py-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="text"
                className="mb-3 block text-base font-medium"
              >
                Description
              </label>
              <textarea
                name="description"
                id="text"
                placeholder="enter video title"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="h-[400px] w-full rounded-md border border-[#e0e0e0] bg-black px-6 py-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="text"
                className="mb-3 block text-base font-medium"
              >
                Category
              </label>
              <input
                type="text"
                name="category"
                id="text"
                placeholder="enter video title"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-md border border-[#e0e0e0] bg-black px-6 py-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
          </div>

          <div className="w-1/2">
            <div className="mb-6 pt-4">
              <label className="mb-5 block text-xl font-semibold ">
                Upload Video
              </label>

              <div className="mb-8">
                <input
                  type="file"
                  name="file"
                  id="file"
                  onChange={handleFileChange}
                  className="sr-only"
                />
                <label
                  htmlFor="file"
                  className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
                >
                  <div>
                    <span className="mb-2 block text-xl font-semibold">
                      Drop files here
                    </span>
                    <span className="mb-2 block text-base font-medium text-[#6B7280]">
                      Or
                    </span>
                    <span className="inline-flex rounded border border-[#e0e0e0] px-7 py-2 text-base font-medium ">
                      Browse
                    </span>
                  </div>
                </label>
              </div>

              {fileName && (
                <div className="mb-5 rounded-md bg-black px-8 py-4">
                  <div className="flex items-center justify-between">
                    <span className="truncate pr-3 text-base font-medium ">
                      {fileName}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setFile(null);
                        setFileName("");
                        setUploadProgress(0);
                      }}
                      className="text-white"
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M0.279337 0.279338C0.651787 -0.0931121 1.25565 -0.0931121 1.6281 0.279338L9.72066 8.3719C10.0931 8.74435 10.0931 9.34821 9.72066 9.72066C9.34821 10.0931 8.74435 10.0931 8.3719 9.72066L0.279337 1.6281C-0.0931125 1.25565 -0.0931125 0.651788 0.279337 0.279338Z"
                          fill="currentColor"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M0.279337 9.72066C-0.0931125 9.34821 -0.0931125 8.74435 0.279337 8.3719L8.3719 0.279338C8.74435 -0.0931127 9.34821 -0.0931123 9.72066 0.279338C10.0931 0.651787 10.0931 1.25565 9.72066 1.6281L1.6281 9.72066C1.25565 10.0931 0.651787 10.0931 0.279337 9.72066Z"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {fileName && (
                <div className="rounded-md bg-black px-8 py-4">
                  <div className="flex items-center justify-between">
                    <span className="truncate pr-3 text-base font-medium text-white">
                      {fileName}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setFile(null);
                        setFileName("");
                        setUploadProgress(0);
                      }}
                      className="text-white"
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M0.279337 0.279338C0.651787 -0.0931121 1.25565 -0.0931121 1.6281 0.279338L9.72066 8.3719C10.0931 8.74435 10.0931 9.34821 9.72066 9.72066C9.34821 10.0931 8.74435 10.0931 8.3719 9.72066L0.279337 1.6281C-0.0931125 1.25565 -0.0931125 0.651788 0.279337 0.279338Z"
                          fill="currentColor"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M0.279337 9.72066C-0.0931125 9.34821 -0.0931125 8.74435 0.279337 8.3719L8.3719 0.279338C8.74435 -0.0931127 9.34821 -0.0931123 9.72066 0.279338C10.0931 0.651787 10.0931 1.25565 9.72066 1.6281L1.6281 9.72066C1.25565 10.0931 0.651787 10.0931 0.279337 9.72066Z"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="relative mt-5 h-[6px] w-full rounded-lg bg-[#E2E5EF]">
                    <div
                      className="absolute left-0 right-0 h-full w-[75%] rounded-lg bg-[#6A64F1]"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="hover:shadow-form w-full rounded-md bg-blue-700 px-8 py-3 text-center text-base font-semibold text-white outline-none"
              >
                Upload
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FileUploadForm;
