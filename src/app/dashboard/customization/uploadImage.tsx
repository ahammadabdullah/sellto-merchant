"use client";
import { FileUp } from "lucide-react";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

const UploadImage = ({ className }: { className?: string }) => {
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
    <div className={cn(className)}>
      <h3 className="flex gap-2 items-center pb-5">
        <span className="text-base">Favicon</span>{" "}
        <span className="opacity-65 text-[12px]">1320x600px</span>
      </h3>
      <div
        style={{
          maxWidth: "clamp(205px, 80vw, 840px)",
          width: "100%",
          height: "205px",
          borderRadius: "14px",
          border: isDragging ? "2px dashed #4caf50" : "2px dashed #536681",
          padding: "10px",
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: isDragging ? "#43ff644a" : "transparent",
        }}
        onClick={() => document.getElementById("faviconInput")?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {isDragging ? (
          <p className="">Drop here</p>
        ) : (
          <div className="flex flex-col items-center text-muted-foreground p-2">
            <FileUp
              size={55}
              className="opacity-65 pb-3 text-muted-foreground"
            />
            <span className=" text-sm p-2 text-center leading-4 mb-1">
              Click to upload or drag and drop
            </span>
            <span className="text-xs opacity-65">svg, png, jps or gif</span>
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
