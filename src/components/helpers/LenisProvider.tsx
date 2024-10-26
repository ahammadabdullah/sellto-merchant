"use client";

// import { useState } from "react";
import { ReactLenis, useLenis } from "lenis/react";

export function ReactLenisProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Create a client

  return <ReactLenis root>{children} </ReactLenis>;
}
