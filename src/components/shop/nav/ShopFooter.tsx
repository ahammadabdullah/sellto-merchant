// "use client";
// libraries
// import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";

// functions
// import { useGSAP } from "@gsap/react";
// import { useState, useEffect, useCallback } from "react";
import { cn, customDateFormatter } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import styles from "./ShopFooter.module.css";

import { socialsLinkType, LinkType } from "@/types/types";

const Links: LinkType[] = [
  { label: "Home", url: "/" },
  { label: "Products", url: "/products" },
  { label: "About us", url: "/about" },
  { label: "Contact", url: "/contact" },
  { label: "Return Policy", url: "/returnpolicy" },
  { label: "Terms of Service", url: "/tos" },
];
type ShopFooterTypes = {
  className?: string;
  usefulLinks?: LinkType[];
  contactList?: LinkType[];
  proUser: boolean;
  shortDescription: string;
  copyright: string;
  shopLogo: any;
  shopName?: string;
  socials?: socialsLinkType[];
};

export default function ShopFooter({
  className,
  usefulLinks = Links,
  contactList,
  proUser,
  shortDescription,
  copyright,
  shopLogo,
  shopName,
  socials,
}: ShopFooterTypes) {
  return (
    <section className={cn("mx-auto  max-w-[1024px] max-[1025px]:px-[0.5rem]")}>
      <footer
        className={cn(
          "rounded-t-lg border border-b-0 bg-card/55 text-card-foreground shadow-md sm:shadow-sm relative overflow-hidden flex flex-col gap-4",
          proUser ? "min-[380px]:py-10 p-4" : "min-[380px]:pt-10 pt-6"
        )}
      >
        <div className="min-[380px]:px-10 px-2">
          <div className="top_wrap px-4 flex flex-wrap gap-6 justify-between mb-12">
            <div className="left_wrap  min-[770px]:max-w-[42%] min-[970px]:max-w-[90%]">
              <div className="hover:opacity-60 transition-opacity max-w-fit  mb-3">
                <Link
                  href={"/"}
                  className="flex flex-wrap gap-2 place-items-center"
                >
                  <Image
                    src={shopLogo}
                    alt="icon"
                    width={45}
                    height={45}
                    objectFit="cover"
                    className="rounded-full"
                  ></Image>
                  <h1 className="font-clash max-w-[400px] min-[380px]:text-2xl text-xl">
                    {shopName}
                  </h1>
                </Link>
              </div>
              <h1 className="font-clash  max-w-[400px] min-[380px]:text-2xl text-lg font-medium">
                {shortDescription}
                <span className="text-primary2">.</span>
              </h1>
            </div>
            <div className="right_wrap flex flex-wrap gap-10 justify-between sm:max-w-[60%] pt-1">
              <div className="links_wrap">
                <h2 className="font-clash text-xl">Useful Links</h2>
                <ul className="ml-2 flex flex-col gap-1 text-sm">
                  {usefulLinks.map((link) => (
                    <li
                      className="hover:opacity-100 opacity-70 transition-opacity w-[fit-content]"
                      key={link.url}
                    >
                      {" "}
                      <Link href={link.url}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="links_wrap">
                <h2 className="font-clash text-xl">Contact us</h2>
                <ul className="ml-2 flex flex-col gap-1 text-sm">
                  {contactList?.map((contact) => (
                    <li
                      className="w-[fit-content] opacity-85"
                      key={contact.url}
                    >
                      {contact.label}:{" "}
                      <Link
                        href={contact.url}
                        className="hover:opacity-100 opacity-70 transition-opacity"
                      >
                        {contact?.visibleUrl
                          ? contact?.visibleUrl
                          : contact.url}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="bottom_wrap px-4 flex flex-wrap sm:flex-row-reverse justify-between gap-4">
            <ul className="text-primary2 flex flex-wrap gap-6">
              {socials?.map((social) => (
                <li
                  className="w-[fit-content] hover:opacity-70 transition-opacity"
                  key={social.url}
                >
                  <Link href={social.url}>
                    <social.icon size={24} className="text-primary2" />
                  </Link>
                </li>
              ))}
              <li className="w-[fit-content] hover:opacity-70 transition-opacity">
                <Link href={"#"}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="fill-primary2"
                  >
                    <path d="M12.001 2.002c-5.522 0-9.999 4.477-9.999 9.999 0 4.99 3.656 9.126 8.437 9.879v-6.988h-2.54v-2.891h2.54V9.798c0-2.508 1.493-3.891 3.776-3.891 1.094 0 2.24.195 2.24.195v2.459h-1.264c-1.24 0-1.628.772-1.628 1.563v1.875h2.771l-.443 2.891h-2.328v6.988C18.344 21.129 22 16.992 22 12.001c0-5.522-4.477-9.999-9.999-9.999z"></path>
                  </svg>
                </Link>
              </li>
              <li className="w-[fit-content] hover:opacity-70 transition-opacity">
                <Link href={"#"}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="fill-primary2"
                  >
                    <path d="M20.947 8.305a6.53 6.53 0 0 0-.419-2.216 4.61 4.61 0 0 0-2.633-2.633 6.606 6.606 0 0 0-2.186-.42c-.962-.043-1.267-.055-3.709-.055s-2.755 0-3.71.055a6.606 6.606 0 0 0-2.185.42 4.607 4.607 0 0 0-2.633 2.633 6.554 6.554 0 0 0-.419 2.185c-.043.963-.056 1.268-.056 3.71s0 2.754.056 3.71c.015.748.156 1.486.419 2.187a4.61 4.61 0 0 0 2.634 2.632 6.584 6.584 0 0 0 2.185.45c.963.043 1.268.056 3.71.056s2.755 0 3.71-.056a6.59 6.59 0 0 0 2.186-.419 4.615 4.615 0 0 0 2.633-2.633c.263-.7.404-1.438.419-2.187.043-.962.056-1.267.056-3.71-.002-2.442-.002-2.752-.058-3.709zm-8.953 8.297c-2.554 0-4.623-2.069-4.623-4.623s2.069-4.623 4.623-4.623a4.623 4.623 0 0 1 0 9.246zm4.807-8.339a1.077 1.077 0 0 1-1.078-1.078 1.077 1.077 0 1 1 2.155 0c0 .596-.482 1.078-1.077 1.078z"></path>
                    <circle cx="11.994" cy="11.979" r="3.003"></circle>
                  </svg>
                </Link>
              </li>
              <li className="w-[fit-content] hover:opacity-70 transition-opacity">
                <Link href={"#"}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="fill-primary2"
                  >
                    <path d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM8.339 18.337H5.667v-8.59h2.672v8.59zM7.003 8.574a1.548 1.548 0 1 1 0-3.096 1.548 1.548 0 0 1 0 3.096zm11.335 9.763h-2.669V14.16c0-.996-.018-2.277-1.388-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248h-2.667v-8.59h2.56v1.174h.037c.355-.675 1.227-1.387 2.524-1.387 2.704 0 3.203 1.778 3.203 4.092v4.71z"></path>
                  </svg>
                </Link>
              </li>
            </ul>
            <p className="text-sm opacity-70">
              Copyright © {copyright}{" "}
              {!proUser &&
                customDateFormatter({
                  isoDateTime: Date.now(),
                  customFormat: "yyyy",
                })}
            </p>
          </div>
        </div>
        {!proUser && (
          <div className="w-full p-1 max-[400px]:p-8 flex flex-wrap gap-2 place-items-center justify-center bg-foreground/5 backdrop-blur-xl">
            <h1 className="min-[400px]:font-clash min-[400px]:font-medium">
              Powered by
            </h1>
            <Link href={"https://www.sellto.io/"} target="_blank">
              <div className="max-w-[100px] hover:opacity-60 transition-opacity">
                <svg
                  className=" w-full  "
                  width="206"
                  height="39"
                  viewBox="0 0 206 39"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M45.8655 3.68495C45.5439 3.19596 45.162 2.73026 44.7198 2.30781C43.3965 1.03379 41.6913 0.228791 39.9259 0.0458377C36.8774 -0.273499 33.735 1.09034 31.524 3.68828C29.7217 5.80388 28.8105 8.35858 28.2812 10.2946C28.2176 10.5208 28.1606 10.7403 28.1104 10.9499C27.695 12.5931 27.3968 14.2464 27.1322 15.8697C27.0518 16.3553 26.9747 16.841 26.8977 17.3233C26.5761 19.3458 26.2746 21.2585 25.8055 23.1246C24.767 27.266 23.0418 30.1933 20.68 31.8265C19.3132 32.7712 17.6281 33.2569 15.9297 33.2868C15.9565 33.3534 15.9833 33.4166 16.0101 33.4864C16.526 34.8835 16.4389 36.4303 15.7722 37.7376C15.5411 38.19 15.2429 38.6058 14.8945 38.9684C18.0972 39.1746 21.3467 38.3729 23.9831 36.5534C27.4873 34.1351 29.9663 30.1201 31.3431 24.6215C31.8724 22.5125 32.2074 20.3869 32.5357 18.3312C32.6027 17.9054 32.6697 17.4863 32.7367 17.0672C32.9947 15.4805 33.266 13.9536 33.6446 12.4601C33.7317 12.1141 33.8221 11.7881 33.9159 11.4754C34.4452 9.70246 35.0851 8.40848 35.8992 7.45047C36.8908 6.28622 38.2877 5.61095 39.4535 5.73403C39.5976 5.74733 39.7383 5.78393 39.879 5.8305C40.3982 6.0068 40.8806 6.37936 41.1386 6.79183C41.4166 7.191 41.5674 7.77978 41.5205 8.32199C41.5071 8.46835 41.4803 8.61472 41.4367 8.74777C41.0783 9.8588 39.8957 10.8567 38.4217 11.2892C37.6512 11.5154 36.7802 11.6218 35.7752 11.6085C35.7652 11.6351 35.7585 11.6651 35.7484 11.6917C35.6546 12.0043 35.5642 12.3303 35.4771 12.6763C35.0985 14.1665 34.8305 15.6867 34.5726 17.2701C36.2576 17.3932 38.204 17.3399 40.1302 16.7744C43.4166 15.8098 45.9358 13.5012 46.8705 10.6006C47.4132 8.92075 47.3562 7.04797 46.713 5.33153C46.4986 4.75939 46.2273 4.22383 45.9023 3.73485C45.8956 3.72819 45.8923 3.71821 45.8856 3.71156C45.8755 3.70158 45.8688 3.69493 45.8655 3.68495Z"
                    fill="fill-foreground"
                    className="fill-foreground"
                  />
                  <path
                    d="M13.5813 36.58C14.3451 35.0831 13.6416 33.2436 12.0737 32.5683C11.6282 32.3754 11.1927 32.1392 10.8007 31.8365C9.58803 30.9051 8.40213 29.8473 7.55122 28.55C6.69697 27.2527 6.10066 25.7691 5.82931 24.2722C5.57806 22.8784 5.70871 21.4281 6.14756 20.0776C6.78742 18.115 8.08387 16.362 9.81583 15.3075C12.2714 13.8172 15.6616 13.4281 19.8994 14.1499C21.6247 14.4459 23.3298 14.875 25.112 15.3407C25.3666 13.7973 25.6547 12.2339 26.05 10.6738C26.1036 10.4642 26.1606 10.248 26.2209 10.0185C26.2443 9.93863 26.2678 9.85214 26.2912 9.76898C24.4923 9.29995 22.6431 8.83758 20.7436 8.51159C15.1223 7.55358 10.4222 8.18893 6.78072 10.401C1.88969 13.3881 -0.813778 19.4622 0.218028 25.1803C0.63008 27.4722 1.81264 29.6277 3.06554 31.5837C4.42565 33.7059 6.22126 35.7018 8.23128 36.9725C8.83428 37.355 9.40043 37.6478 9.90964 37.8706C11.2999 38.4827 12.9012 37.9139 13.5813 36.58Z"
                    fill="url(#paint1_linear_52_58)"
                    className="fill-foreground"
                  />
                  <path
                    d="M64.3182 25.0238C64.3182 27.9239 66.6856 29.2538 75.6804 29.2538C83.1362 29.2538 85.3856 28.4312 85.3856 26.2757C85.3856 24.0031 83.8074 23.6128 74.8519 23.1805C62.8186 22.6311 58.0446 20.7517 58.0446 14.6003C58.0446 8.56598 64.2396 6.64761 74.5768 6.64761C84.9926 6.64761 91.3055 9.23246 91.3055 16.0113H84.2035C84.2035 12.9942 81.1649 12.2496 73.7877 12.2496C66.8035 12.2496 65.1467 12.9161 65.1467 14.9516C65.1467 17.0681 66.8035 17.4584 74.8519 17.9297C85.7424 18.5181 92.4877 19.1065 92.4877 26.0385C92.4877 33.3638 85.5035 34.8529 75.2843 34.8529C63.9615 34.8529 57.2131 32.9345 57.2131 25.0208H64.3182V25.0238Z"
                    fill="white"
                    className="fill-foreground"
                  />
                  <path
                    d="M119.557 26.1976H126.263C124.724 32.0728 118.964 34.8558 110.362 34.8558C101.525 34.8558 94.6584 31.4094 94.6584 22.9463C94.6584 14.4442 101.325 10.9977 110.755 10.9977C119.593 10.9977 126.656 14.0149 126.656 24.5134H101.564C102.314 28.1971 105.863 29.4099 110.362 29.4099C115.018 29.4099 117.857 28.5483 119.557 26.1976ZM101.8 20.2443H119.436C118.293 16.993 114.976 16.0924 110.716 16.0924C106.102 16.0924 102.867 16.993 101.8 20.2443Z"
                    fill="white"
                    className="fill-foreground"
                  />
                  <path
                    d="M135.968 3.12305V34.4656H129.223V3.12305H135.968Z"
                    fill="white"
                    className="fill-foreground"
                  />
                  <path
                    d="M145.873 3.12305V34.4656H139.127V3.12305H145.873Z"
                    fill="white"
                    className="fill-foreground"
                  />
                  <path
                    d="M161.102 16.993V23.6518C161.102 28.119 161.97 29.2538 166.072 29.2538C168.204 29.2538 169.386 29.2538 172.107 28.8605V34.2674C169.858 34.6577 167.294 34.8559 164.177 34.8559C158.181 34.8559 154.314 32.6222 154.314 27.5306V16.993H148.198V11.391H154.314V6.61157L161.102 4.69319V11.391H172.11V16.993H161.102Z"
                    fill="white"
                    className="fill-foreground"
                  />
                  <path
                    d="M173.806 22.9463C173.806 14.4442 180.277 10.9977 189.903 10.9977C199.491 10.9977 206 14.4442 206 22.9463C206 31.4094 199.491 34.8558 189.903 34.8558C180.277 34.8558 173.806 31.4094 173.806 22.9463ZM199.215 22.9463C199.215 18.1278 196.138 16.5997 189.903 16.5997C183.63 16.5997 180.552 18.1278 180.552 22.9463C180.552 27.7257 183.63 29.2538 189.903 29.2538C196.138 29.2538 199.215 27.7257 199.215 22.9463Z"
                    fill="white"
                    className="fill-foreground"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_52_58"
                      x1="21.5496"
                      y1="41.4672"
                      x2="43.8397"
                      y2="-1.08572"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#6D28D9" />
                      <stop offset="0.2903" stopColor="#893EFF" />
                      <stop offset="0.6777" stopColor="#893EFF" />
                      <stop offset="1" stopColor="#6D28D9" />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_52_58"
                      x1="3.94899"
                      y1="42.0923"
                      x2="15.6889"
                      y2="10.6381"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#6D28D9" />
                      <stop offset="0.2903" stopColor="#893EFF" />
                      <stop offset="0.6777" stopColor="#893EFF" />
                      <stop offset="1" stopColor="#6D28D9" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </Link>
          </div>
        )}

        <div className="bg_primary_radial_gradient  min-[430px]:w-[110%] w-[150%]  aspect-square rounded-full absolute left-[50%] translate-x-[-50%] min-[1250px]:bottom-[-200%] min-[1000px]:bottom-[-190%] min-[806px]:bottom-[-210%] min-[735px]:bottom-[-100%] min-[496px]:bottom-[-70%] bottom-[-40%] opacity-90 pointer-events-none"></div>
      </footer>
    </section>
  );
}
