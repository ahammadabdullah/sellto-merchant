"use client";
import { FileUp } from "lucide-react";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const NewProductImage = ({
  className,
  setProductImage,
  image,
  imgUrl,
}: {
  className?: string;
  image?: File | null;
  setProductImage: (image: File) => void;
  imgUrl?: string;
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (image) {
      const objectUrl = URL.createObjectURL(image);
      setPreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreviewUrl(null);
    }
  }, [image]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      checkImageAspectRatio(file);
    }
  };

  const checkImageAspectRatio = (file: File) => {
    const img = new window.Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      const { width, height } = img;
      URL.revokeObjectURL(objectUrl);

      const aspectRatio = width / height;
      const targetRatio = 16 / 9;

      if (Math.abs(aspectRatio - targetRatio) < 0.01) {
        setProductImage(file);
        console.log(file);
        setError(null);
      } else {
        setError("Image must have a 16:9 aspect ratio.");
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
      checkImageAspectRatio(file);
    }
  };

  return (
    <div className={cn(className, "h-full")}>
      <div
        style={{
          maxWidth: "clamp(205px, 80vw, 840px)",
          width: "100%",
          height: "100%",
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
        {imgUrl || previewUrl ? (
          <Image
            src={imgUrl || previewUrl || ""}
            alt="Preview"
            width={1920}
            height={1080}
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
            <span className=" text-sm p-2 text-center leading-4 mb-1">
              Click to upload or drag and drop
            </span>
            <span className="text-xs opacity-65">svg, png, jpg, or gif</span>
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

export default NewProductImage;
