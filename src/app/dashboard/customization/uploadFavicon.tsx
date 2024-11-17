"use client";
import { FileUp } from "lucide-react";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const UploadFavicon = ({
  className,
  setFaviconFile,
  favicon,
}: {
  className?: string;
  setFaviconFile: (image: File) => void;
  favicon?: string;
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

      if (width <= 200 && height <= 200) {
        setFaviconFile(file);
        setPreviewUrl(URL.createObjectURL(file));
        setError(null);
      } else {
        setError("Image dimensions must be at most 200x200 pixels.");
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
        <span>Favicon</span>
        <span className="opacity-65 text-xs text-muted-foreground">
          (Max 200x200px)
        </span>
      </h3>
      <div
        style={{
          maxWidth: "clamp(120px, 40vw, 200px)",
          width: "100%",
          aspectRatio: "1",
          borderRadius: "50%",
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
        {favicon || previewUrl ? (
          <Image
            src={favicon || previewUrl || ""}
            alt="Preview"
            width={favicon ? 200 : 0}
            height={favicon ? 200 : 0}
            className="object-contain rounded-full"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
            }}
          />
        ) : isDragging ? (
          <div className="w-[200px]">
            <p className="text-center">Drop here</p>
          </div>
        ) : (
          <div className="flex flex-col items-center text-muted-foreground p-2">
            <FileUp
              size={55}
              className="opacity-65 pb-3 text-muted-foreground"
            />
            <span className="text-sm max-w-[170px] text-center leading-4 mb-1">
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

export default UploadFavicon;
