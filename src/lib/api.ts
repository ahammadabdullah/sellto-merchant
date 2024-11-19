"use server";
import { revalidateTag } from "next/cache";
import { headers } from "next/headers";

export async function getAllProducts(id: string) {
  return fetch(`${process.env.SERVER_URL}/api/products?shopId=${id}`, {
    headers: headers(),
    next: { tags: ["products"] },
  }).then((res) => res.json());
}

export async function deleteProduct(id: string) {
  return fetch(`${process.env.SERVER_URL}/api/products?id=${id}`, {
    method: "DELETE",
    headers: headers(),
  })
    .then((res) => res.json())
    .then((res) => {
      revalidateTag("products");
      return res;
    });
}
