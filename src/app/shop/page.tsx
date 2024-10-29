"use client";

import { useRouter } from "next/navigation";
import React from "react";

const DefaultPage = () => {
  const router = useRouter();
  router.push("/dashboard");
  return <div></div>;
};

export default DefaultPage;
