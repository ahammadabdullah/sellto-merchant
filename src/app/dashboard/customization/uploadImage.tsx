"use client";
import { FileUp } from "lucide-react";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const UploadImage = ({
  className,
  setImageFile,
  image,
}: {
  className?: string;
  setImageFile: (image: File) => void;
  image?: string;
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      checkImageDimensions(file);
    }
  };

  const checkImageDimensions = (file: File) => {
    const img = new window.Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      const { width, height } = img;
      URL.revokeObjectURL(objectUrl);
      console.log("Image dimensions:", width, height);

      // Ensure the image adheres to the max 1320x600 constraint or maintains the aspect ratio.
      if (width <= 1320 && height <= 600 && width / height === 1320 / 600) {
        setImageFile(file);
        setPreviewUrl(URL.createObjectURL(file)); // Set preview
        setError(null);
      } else {
        setError(
          "Image must be 1320x600 pixels or maintain the same aspect ratio."
        );
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
        <span className="text-base">Upload Image</span>
        <span className="opacity-65 text-[12px]">Max 1320x600px</span>
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
        onClick={() => document.getElementById("imageInput")?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {image || previewUrl ? (
          <Image
            src={image || previewUrl || ""}
            alt="Preview"
            width={image ? 1320 : 0}
            height={image ? 600 : 0}
            className="object-cover"
            style={{ width: "100%", height: "100%" }}
          />
        ) : isDragging ? (
          <p>Drop here</p>
        ) : (
          <div className="flex flex-col items-center text-muted-foreground p-2">
            <FileUp
              size={55}
              className="opacity-65 pb-3 text-muted-foreground"
            />
            <span className="text-sm p-2 text-center leading-4 mb-1">
              Click to upload or drag and drop
            </span>
            <span className="text-xs opacity-65">svg, png, jpg, or gif</span>
          </div>
        )}
      </div>
      <input
        id="imageInput"
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
