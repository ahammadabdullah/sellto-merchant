"use server";

import { signIn } from "@/auth";
import prisma from "@/lib/db";
import { LoginSchema, onboardingForm, shopSchema } from "@/schema/zod-schema";
import bcrypt from "bcryptjs";
import { auth } from "@/auth";
import { getSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import { ProductFormData } from "@/app/dashboard/products/new/addProduct";
import { Currency } from "lucide-react";
import { Prisma } from "@prisma/client";

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
    const user = await prisma.user.findFirst({
      where: {
        email: email as string,
      },
    });
    if (user?.shopId === null || user?.shopId === undefined) {
      return {
        errors: {},
        message: null,
        redirectUrl: "/onboarding",
      };
    } else return { errors: {}, message: null, redirectUrl: "/dashboard" };
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
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return {
      errors: {},
      message: "Signup successful!",
      redirectUrl: "/onboarding",
    };
  } catch (error) {
    console.error("Signup failed", error);
    return {
      errors: {
        email: ["Please try again later"],
      },
      message: null,
      redirectUrl: null,
    };
  }
}
// onboarding user
export async function onboardingUser(formData: FormData) {
  const session = await auth();
  const email = session?.user?.email;
  const id = session?.user?.id;
  if (!email || !id) {
    return {
      errors: {
        email: ["Not authorized"],
      },
      message: null,
      redirectUrl: "/login",
    };
  }
  const fields = onboardingForm.safeParse({
    shopName: formData.get("shopName"),
    shopLogo: formData.get("shopLogo"),
    subDomain: formData.get("subDomain"),
    currency: formData.get("currency"),
    description: formData.get("description"),
    productTypes: formData.get("productTypes"),
  });
  if (!fields.success) {
    return {
      errors: fields.error.flatten().fieldErrors,
      message: null,
      redirectUrl: null,
    };
  }
  const { shopName, shopLogo, subDomain, currency, description, productTypes } =
    fields.data;
  try {
    const res = await prisma.shop.create({
      data: {
        name: shopName,
        image: shopLogo as string,
        userId: id,
        subDomain,
        currency,
        description,
        productTypes,
      },
    });
    await prisma.user.update({
      where: {
        email: email as string,
      },
      data: {
        shopId: res.id,
      },
    });

    return {
      errors: {},
      message: "Onboarding successful!",
      redirectUrl: "/dashboard",
    };
  } catch (error) {
    console.error("Onboarding failed", error);
    return {
      errors: {
        email: ["Please try again later"],
      },
      message: null,
      redirectUrl: "/onboarding",
    };
  }
}

// get shop by shopId
export const getShop = async (id: string) => {
  const res = await prisma.shop.findUnique({
    where: {
      id: id,
    },
  });
  return res;
};

// update shop by shopId
export const updateShop = async (id: string, formData: FormData) => {
  try {
    const fields = shopSchema.safeParse({
      name: formData.get("name"),
      subTitle: formData.get("subTitle"),
      description: formData.get("description"),
      favicon: formData.get("favicon"),
      image: formData.get("image"),
    });

    if (!fields.success) {
      return {
        errors: fields.error.flatten().fieldErrors,
        message: null,
        redirectUrl: null,
      };
    }

    const { name, subTitle, description, favicon, image } = fields.data;

    const updatedData: any = {};

    if (name !== undefined && name !== null) updatedData.name = name;
    if (subTitle !== undefined && name !== null)
      updatedData.subTitle = subTitle;
    if (description !== undefined && name !== null)
      updatedData.description = description;
    if (favicon !== undefined && favicon !== null)
      updatedData.favicon = favicon;
    if (image !== undefined && image !== null) updatedData.image = image;

    const shop = await prisma.shop.update({
      where: {
        id: id,
      },
      data: updatedData,
    });

    return {
      errors: {},
      message: "Shop updated successfully!",
      redirectUrl: "/dashboard",
    };
  } catch (error) {
    console.error("Error updating shop:", error);
    return {
      errors: {
        error: ["Please try again later"],
      },
      message: null,
      redirectUrl: null,
    };
  }
};

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

export async function addProductByShopId(formData: ProductFormData) {
  const session = await auth();
  const shopId = session?.user?.shopId;
  if (!shopId) {
    return {
      errors: {
        email: ["Not authorized, Contact support"],
      },
      message: null,
      redirectUrl: "/login",
    };
  }
  const price = parseFloat(formData.defaultPrice as string);
  const image = formData.image as string;
  const customDefaultWarranty =
    formData.customDefaultWarranty as unknown as boolean;
  const defaultWarrantyText = formData.defaultWarrantyText as string;
  const defaultWarrantyTime = formData.defaultWarrantyTime as string;
  const fullDescription = formData.fullDescription as string;
  const shortDescription = formData.shortDescription as string;
  const productName = formData.productName as string;
  const visibility = formData.visibility as string;
  const variants = formData.variants;
  try {
    const newProduct = await prisma.product.create({
      data: {
        shopId: shopId as string,
        price,
        image,
        customDefaultWarranty,
        defaultWarrantyText,
        defaultWarrantyTime,
        fullDescription,
        shortDescription,
        productName,
        visibility,
      },
    });
    if (variants && variants.length > 0) {
      const newVariants = variants.map((variant) => {
        return {
          productId: newProduct.id,
          name: variant.name,
          price: parseFloat(variant.price),
          stock: parseInt(variant.stock),
          shortDescription: variant.shortDescription as string,
          description: variant.description as string,
          currency: variant.currency as string,
          productType: variant.productType as string,
          customWarranty: variant.customWarranty as unknown as boolean,
          warrantyText: variant.warrantyText as string,
          warrantyTime: variant.warrantyTime as string,
          serials: variant.serials as string,
          parsedSerial:
            variant.parsedSerial as unknown as Prisma.InputJsonValue,
          serialParseMethod: variant.serialParseMethod as string,
          removeDuplicates: variant.removeDuplicates as unknown as boolean,
          serviceDescription: variant.serviceDescription as string,
          unlimitedStock: variant.unlimitedStock as unknown as boolean,
          minQuantity: parseInt(variant.minQuantity),
          maxQuantity: parseInt(variant.maxQuantity),
        };
      });
      await prisma.variant.createMany({
        data: newVariants,
      });
    }
    return {
      errors: {},
      message: "Product added successfully!",
      redirectUrl: "/dashboard/products",
    };
  } catch (error) {
    console.error("Error creating product:", error);
    return {
      errors: {
        email: ["Please try again later"],
      },
      message: null,
      redirectUrl: null,
    };
  }
}

// get user
export async function getUser(email: string) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        shopId: true,
      },
    });
    return user;
  } catch {
    return {};
  }
}

// export async function addProductByShopId(shopId: string, productData: any) {
//   const product = await prisma.product.create({
//     data: {
//       ...productData,
//       shopId,
//     },
//   });
//   return product;
// }

// get a product by productId
export async function getProductById(productId: string) {
  const product = await prisma.product.findFirst({
    where: {
      id: productId as string,
    },
  });
  return product;
}

// update a product by productId
export async function updateProductById(productId: string, productData: any) {
  const product = await prisma.product.update({
    where: {
      id: productId as string,
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
      id: productId as string,
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

// get recent orders by shopId

export async function getRecentOrdersByShopId(shopId: string) {
  const orders = await prisma.order.findMany({
    where: {
      shopId: shopId as string,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 2,
  });
  return orders;
}

// get all the orders by shopId
export async function getAllOrdersByShopId(shopId: string) {
  const orders = await prisma.order.findMany({
    where: {
      shopId: shopId as string,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return orders;
}

// export async function addOrder() {
//   const order = await prisma.order.createMany({
//     data: [
//       {
//         userId: 2,
//         userName: "John Doe",
//         revenue: 150.5,
//         productId: 1,
//         quantity: 3,
//         shopId: "1279cc87-a710-4b17-bd7f-96aadde2fdc0",
//         status: "completed",
//         createdAt: "2024-10-01T10:30:00Z",
//         updatedAt: "2024-10-03T15:00:00Z",
//       },
//       {
//         userId: 2,
//         userName: "Jane Smith",
//         revenue: 75.0,
//         productId: 2,
//         quantity: 1,
//         shopId: "1279cc87-a710-4b17-bd7f-96aadde2fdc0",
//         status: "pending",
//         createdAt: "2024-10-02T09:15:00Z",
//         updatedAt: "2024-10-02T09:15:00Z",
//       },
//       {
//         userId: 2,
//         userName: "Bob Johnson",
//         revenue: 200.0,
//         productId: 3,
//         quantity: 5,
//         shopId: "1279cc87-a710-4b17-bd7f-96aadde2fdc0",
//         status: "shipped",
//         createdAt: "2024-10-04T13:45:00Z",
//         updatedAt: "2024-10-05T11:30:00Z",
//       },
//       {
//         userId: 2,
//         userName: "Alice Brown",
//         revenue: 320.75,
//         productId: 4,
//         quantity: 7,
//         shopId: "1279cc87-a710-4b17-bd7f-96aadde2fdc0",
//         status: "delivered",
//         createdAt: "2024-10-05T08:20:00Z",
//         updatedAt: "2024-10-06T17:00:00Z",
//       },
//       {
//         userId: 2,
//         userName: "Charlie Wilson",
//         revenue: 50.0,
//         productId: 2,
//         quantity: 2,
//         shopId: "1279cc87-a710-4b17-bd7f-96aadde2fdc0",
//         status: "canceled",
//         createdAt: "2024-10-06T11:10:00Z",
//         updatedAt: "2024-10-07T09:00:00Z",
//       },
//     ],
//   });
//   return order;
// }

// export async function addShop() {
//   try {
//     const shop = await prisma.shop.create({
//       data: {
//         name: "Shop 2",
//         image: "/shop_img.png",
//         userId: 1,
//       },
//     });
//     return shop;
//   } catch (error) {
//     console.error("Error creating shop:", error);
//     throw error;
//   }
// }

// export async function addProducts() {
//   try {
//     const product3 = await prisma.product.create({
//       data: {
//         name: "Product 3",
//         price: 49.99,
//         image: "/product3_img.png",
//         shopId: "59727a20-e0e6-42f7-b673-8fdcc1c5fe88", // reference to existing shop
//         stock: 100,
//         type: "Apparel",
//       },
//     });

//     const product4 = await prisma.product.create({
//       data: {
//         name: "Product 4",
//         price: 99.99,
//         image: "/product4_img.png",
//         shopId: "59727a20-e0e6-42f7-b673-8fdcc1c5fe88", // reference to existing shop
//         stock: 20,
//         type: "Footwear",
//       },
//     });

//     return { product3, product4 };
//   } catch (error) {
//     console.error("Error creating products:", error);
//     throw error;
//   }
// }
