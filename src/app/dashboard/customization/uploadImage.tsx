"use client";
import { FileUp } from "lucide-react";
import React, { useState } from "react";

const UploadImage = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      checkImageDimensions(file);
    }
  };

  const checkImageDimensions = (file: File) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      const { width, height } = img;
      URL.revokeObjectURL(objectUrl);
      console.log("width:", width, "height:", height);
      if (width === 200 && height === 200) {
        console.log("Favicon selected:", file);
        setError(null);
      } else {
        setError("Image dimensions must be 200x200 pixels.");
      }
    };

    img.onerror = () => {
      setError("Invalid image file.");
      URL.revokeObjectURL(objectUrl);
    };

    img.src = objectUrl;
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      checkImageDimensions(file);
    }
  };

  return (
    <div>
      <h3 className="flex gap-2 items-center pb-5">
        <span className="text-base">Favicon</span>{" "}
        <span className="opacity-65 text-[12px]">1320x600px</span>
      </h3>
      <div
        style={{
          width: "731px",
          height: "241px",
          borderRadius: "14px",
          border: isDragging ? "2px dashed #4caf50" : "2px dashed #536681",
          padding: "10px",
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: isDragging ? "#f0fdf4" : "transparent",
        }}
        onClick={() => document.getElementById("faviconInput")?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {isDragging ? (
          <p className="text-black">Drop here</p>
        ) : (
          <div className="flex flex-col items-center text-base">
            <FileUp size={70} className="opacity-65 pb-5" />
            <span className="font-medium text-center">
              Click to upload or drag and drop
            </span>
            <span className="text-sm opacity-65">SVG, PNG, JPG or GIF</span>
          </div>
        )}
      </div>
      <input
        id="faviconInput"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      {error && <p className="text-red-500 text-base">{error}</p>}
    </div>
  );
};

export default UploadImage;
