import { JsonValue } from "@prisma/client/runtime/library";

export type socialsLinkType = {
  icon: any;
  url: string;
  name: string;
};

export type LinkType = {
  label: string;
  visibleUrl?: string;
  url: string;
};

export interface Product {
  id: string;
  price: number;
  image?: string | null;
  shopId: string;
  shopSubDomain: string;
  createdAt: Date;
  updatedAt: Date;
  customDefaultWarranty: boolean;
  defaultWarrantyText?: string | null;
  defaultWarrantyTime?: string | null;
  fullDescription?: string | null;
  productName: string;
  shortDescription?: string | null;
  visibility: string;
  soldCount: number;
  variants: Variant[];
}

export interface Variant {
  id: string;
  name: string;
  shortDescription?: string | null;
  description?: string | null;
  price: number;
  currency: string;
  productType: string;
  customWarranty: boolean;
  warrantyTime?: string | null;
  warrantyText?: string | null;
  serials?: string | null;
  parsedSerial?: JsonValue | null;
  serialParseMethod?: string | null;
  removeDuplicates: boolean;
  serviceDescription?: string | null;
  unlimitedStock: boolean;
  stock?: number | null;
  minQuantity?: number | null;
  maxQuantity?: number | null;
  productId: string;
  createdAt: Date;
  updatedAt: Date;
}
