"use server";
import { getShopIdBySubDomain } from "@/actions/actions";
import { ContactFormData } from "@/components/shop/contactForm";
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

export async function revalidateMessage() {
  revalidateTag("ticketMessage");
}

export const getChatData = async (ticketId: string) => {
  const res = await fetch(
    `${process.env.SERVER_URL}/api/tickets/${ticketId}/messages`,
    {
      next: { tags: ["ticketMessage"] },
    }
  );
  const data = await res.json();
  return data;
};

export const getTickets = async (shopId: string) => {
  const res = await fetch(
    `${process.env.SERVER_URL}/api/tickets?shopId=${shopId}`,
    {
      headers: headers(),
      next: { tags: ["tickets"] },
    }
  );
  const data = await res.json();
  return data;
};
