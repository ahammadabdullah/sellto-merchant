import { auth } from "@/auth";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// get all products
export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({
      message: "You are not authorized to perform this action",
      success: "false",
    });
  }
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const shopId = searchParams.get("shopId");
  if (!shopId) {
    return NextResponse.json({
      message: "Shop ID is required",
      success: "false",
    });
  }

  try {
    const products = await prisma.product.findMany({
      where: {
        shopId: shopId as string,
      },
    });

    return NextResponse.json({
      success: "true",
      products,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Something went wrong, please try again",
      success: "false",
    });
  }
}
// delete product
export async function DELETE(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({
      message: "You are not authorized to perform this action",
      success: "false",
    });
  }
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const id = searchParams.get("id");
  try {
    const res = await prisma.product.delete({
      where: {
        id: id as string,
      },
    });
    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    return NextResponse.json({
      message: "Something went wrong, please try again",
      success: "false",
    });
  }
}
