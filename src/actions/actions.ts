"use server";

import { signIn } from "@/auth";
import prisma from "@/lib/db";
import { LoginSchema, onboardingForm, shopSchema } from "@/schema/zod-schema";
import bcrypt from "bcryptjs";
import { auth } from "@/auth";
import { getSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import { ProductFormData } from "@/app/dashboard/products/new/addProduct";
import { ProductFormData as ProductFormData2 } from "@/app/dashboard/products/edit/EditProduct";
import { Currency } from "lucide-react";
import { Prisma } from "@prisma/client";
import { StripeSession } from "@/app/shop/[subdomain]/success/page";

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
    // await signIn("credentials", {
    //   email,
    //   password,
    //   redirect: false,
    // });
    return {
      errors: {},
      message: "Signup successful! Please login",
      redirectUrl: "/login",
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
    // await signIn("credentials", {});

    return {
      data: res,
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

// get shopDetails

export async function getShopDetailsForOnboarding() {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    return null;
  }
  const shops = await prisma.shop.findMany({
    select: {
      name: true,
      subDomain: true,
    },
  });
  return shops;
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
  console.log(shopId, "shopId");
  const products = await prisma.product.findMany({
    where: {
      shopId: shopId as string,
    },
  });
  return products;
}

// add a product by shopId

export async function addProductByShopId(formData: ProductFormData2) {
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
  const shop = await prisma.shop.findUnique({
    where: {
      id: shopId as string,
    },
  });

  if (!shop) {
    return {
      errors: {
        email: ["Shop not found, Contact support"],
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
  const stock = variants.reduce(
    (total, variant) => total + parseInt(variant.stock),
    0
  );
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
        stock,
        shopSubDomain: shop.subDomain as string,
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
      console.log(newVariants, "newVariants");
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

export async function updateProductById(
  productId: string,
  formData: ProductFormData
) {
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
  const shop = await prisma.shop.findUnique({
    where: {
      id: shopId as string,
    },
  });

  if (!shop) {
    return {
      errors: {
        email: ["Shop not found, Contact support"],
      },
      message: null,
      redirectUrl: "/login",
    };
  }

  const existingProduct = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!existingProduct) {
    return {
      errors: {
        email: ["Product not found"],
      },
      message: null,
      redirectUrl: "/dashboard/products",
    };
  }

  const updateData: any = {};

  // Only update fields that are provided in the form data
  if (formData.defaultPrice)
    updateData.price = parseFloat(formData.defaultPrice as string);
  if (formData.image) updateData.image = formData.image as string;
  if (formData.customDefaultWarranty !== undefined)
    updateData.customDefaultWarranty =
      formData.customDefaultWarranty as boolean;
  if (formData.defaultWarrantyText)
    updateData.defaultWarrantyText = formData.defaultWarrantyText as string;
  if (formData.defaultWarrantyTime)
    updateData.defaultWarrantyTime = formData.defaultWarrantyTime as string;
  if (formData.fullDescription)
    updateData.fullDescription = formData.fullDescription as string;
  if (formData.shortDescription)
    updateData.shortDescription = formData.shortDescription as string;
  if (formData.productName)
    updateData.productName = formData.productName as string;
  if (formData.visibility)
    updateData.visibility = formData.visibility as string;

  const variants = formData.variants;
  let updatedStock = 0;

  if (variants) {
    const updatedVariants = variants.map((variant) => {
      updatedStock += parseInt(variant.stock); // Calculate total stock
      return {
        id: (variant as any)?.id as string,
        productId: productId,
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
        parsedSerial: variant.parsedSerial as unknown as Prisma.InputJsonValue,
        serialParseMethod: variant.serialParseMethod as string,
        removeDuplicates: variant.removeDuplicates as unknown as boolean,
        serviceDescription: variant.serviceDescription as string,
        unlimitedStock: variant.unlimitedStock as unknown as boolean,
        minQuantity: parseInt(variant.minQuantity),
        maxQuantity: parseInt(variant.maxQuantity),
      };
    });

    // Update variants (use upsert or updateMany based on your use case)
    for (const variant of updatedVariants) {
      await prisma.variant.upsert({
        where: { id: variant.id as string },
        update: variant,
        create: variant,
      });
    }
  }

  try {
    // Update product with the new data
    const updatedProduct = await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        ...updateData,
        stock: updatedStock, // Update stock based on variants
      },
    });

    return {
      errors: {},
      message: "Product updated successfully!",
      redirectUrl: "/dashboard/products",
    };
  } catch (error) {
    console.error("Error updating product:", error);
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

// // update a product by productId
// export async function updateProductById(productId: string, productData: any) {
//   const product = await prisma.product.update({
//     where: {
//       id: productId as string,
//     },
//     data: {
//       ...productData,
//     },
//   });
//   return product;
// }

// delete a product by productId
export async function deleteProductById(productId: string) {
  const product = await prisma.product.delete({
    where: {
      id: productId as string,
    },
  });
  return product;
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
    take: 5,
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

// get shopId by subDomain
export async function getShopIdBySubDomain(subDomain: string) {
  try {
    const shop = await prisma.shop.findFirst({
      where: {
        subDomain: subDomain,
      },
    });
    return shop?.id;
  } catch {
    return null;
  }
}

// handle payment success

export const handlePaymentSuccess = async (
  StripeSession: StripeSession,
  shopId: string
) => {
  const { customer, productData, lineItems, orderData } = StripeSession;
  const products = JSON.parse(productData);
  try {
    const enrichedLineItems = lineItems.data.map(
      (lineItem: any, index: number) => ({
        ...lineItem,
        productId: products[index].productId,
        variantId: products[index].variantId,
        quantity: products[index].quantity,
      })
    );
    // Check if the order already exists to prevent duplicates
    const existingOrder = await prisma.order.findFirst({
      where: { paymentId: orderData.paymentId },
    });

    if (existingOrder) {
      console.log("Order already created");
      return existingOrder; // Return existing order
    }
    const order = {
      customer_name: customer.name,
      customer_email: customer.email,
      revenue: orderData.amount / 100,
      paymentId: orderData.paymentId,
      productIds: enrichedLineItems.map((item: any) => item.productId),
      variantIds: enrichedLineItems.map((item: any) => item.variantId),
      quantities: enrichedLineItems.map((item: any) => item.quantity),
      productNames: enrichedLineItems.map((item: any) => item.description),
      shopId,
    };

    // Create order in the database
    const orderRes = await prisma.order.create({
      data: order,
    });

    // Update stock
    for (const product of products) {
      const { variantId, productId, quantity } = product;

      // Update variant stock
      const variant = await prisma.variant.findFirst({
        where: { id: variantId },
      });
      if (variant) {
        const newStock = Number(variant.stock) - Number(quantity);
        await prisma.variant.update({
          where: { id: variantId },
          data: { stock: newStock },
        });
      }

      // Update product stock
      const productData = await prisma.product.findFirst({
        where: { id: productId },
      });
      if (productData) {
        const newProductStock = Number(productData.stock) - Number(quantity);
        await prisma.product.update({
          where: { id: productId },
          data: {
            stock: newProductStock,
            soldCount: productData.soldCount + Number(quantity),
          },
        });
      }
    }

    // update balance in the shop
    await prisma.shop.update({
      where: { id: shopId },
      data: {
        balance: {
          increment: orderData.amount / 100,
        },
      },
    });

    return orderRes;
  } catch (error) {
    console.error(error);
    return null;
  }
};
