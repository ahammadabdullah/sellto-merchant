"use server";

import { signIn } from "@/auth";
import prisma from "@/lib/db";
import { LoginSchema } from "@/schema/zod-schema";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export type State = {
  message: string | null;
  errors: {
    email?: string[];
    password?: string[];
  };
};

export async function login(prevState: State, formData: FormData) {
  const fields = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!fields.success) {
    return {
      errors: fields.error.flatten().fieldErrors,
      message: null,
      redirectUrl: null,
    };
  }

  const { email, password } = fields.data;
  try {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (res.error) {
      return {
        errors: {
          email: ["Invalid email or password"],
          password: ["Invalid email or password"],
        },
        message: null,
        redirectUrl: null,
      };
    }
    return { errors: {}, message: null, redirectUrl: "/dashboard" };
  } catch (error) {
    console.error("Login failed", error);
    return {
      errors: {
        email: ["Invalid email or password"],
      },
      message: null,
      redirectUrl: null,
    };
  }
}

export async function signUp(prevState: State, formData: FormData) {
  const fields = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!fields.success) {
    return {
      errors: fields.error.flatten().fieldErrors,
      message: null,
      redirectUrl: null,
    };
  }

  const { email, password } = fields.data;
  const hashedPassword = await bcrypt.hash(password as string, 10);
  const existingUser = await prisma.user.findFirst({
    where: {
      email: email as string,
    },
  });
  if (existingUser) {
    return {
      errors: {
        email: ["Email already exists"],
      },
      message: null,
      redirectUrl: null,
    };
  }

  try {
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    return {
      errors: {},
      message: "Signup successful!",
      redirectUrl: "/login",
    };
  } catch (error) {
    console.error("Signup failed", error);
    return {
      errors: {
        email: ["Wrong email or password"],
      },
      message: null,
      redirectUrl: null,
    };
  }
}

// get all the products by shopId

export async function getAllProductsByShopId(shopId: string) {
  const products = await prisma.product.findMany({
    where: {
      shopId: shopId as string,
    },
  });
  return products;
}

// add a product by shopId

export async function addProductByShopId(shopId: string, productData: any) {
  const product = await prisma.product.create({
    data: {
      ...productData,
      shopId,
    },
  });
  return product;
}

// get a product by productId
export async function getProductById(productId: string) {
  const product = await prisma.product.findFirst({
    where: {
      id: Number(productId),
    },
  });
  return product;
}

// update a product by productId
export async function updateProductById(productId: string, productData: any) {
  const product = await prisma.product.update({
    where: {
      id: Number(productId),
    },
    data: {
      ...productData,
    },
  });
  return product;
}

// delete a product by productId
export async function deleteProductById(productId: string) {
  const product = await prisma.product.delete({
    where: {
      id: Number(productId),
    },
  });
  return product;
}

// get all the categories by shopId
export async function getAllCategoriesByShopId(shopId: string) {
  const categories = await prisma.category.findMany({
    where: {
      shopId: shopId as string,
    },
  });
  return categories;
}

// add a category by shopId
export async function addCategoryByShopId(shopId: string, categoryData: any) {
  const category = await prisma.category.create({
    data: {
      ...categoryData,
      shopId,
    },
  });
  return category;
}
