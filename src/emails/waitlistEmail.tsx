import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";
import * as React from "react";

import { truncateString } from "@/lib/utils";
export interface waitlistEmailTemplateProps {
  accentColor?: string;
  previewText?: string;
  topBanner?: string;
  salutation?: string;
  topBannerAlt?: string;
  para_1?: string;
  para_2?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const WaitlistEmailTemplate = ({
  topBanner = `https://i.ibb.co.com/WWns0Q9/waitlist-email-banner.png`,
  topBannerAlt = "Sellto.io",
  accentColor = "#875CFF",
  previewText = "Sign up Complete!",
  para_1 = "You’ve signed up to be waitlisted for being a beta tester of sellto.io. You’ll receive an email notification when the beta version goes live.",
  para_2 = "Note: not all applicants are guaranteed to get beta tester privileges and some accounts may get the beta tester privileges earlier than others, based on sign up date, region/country etc.",
}: waitlistEmailTemplateProps) => {
  let previewTxt: string = previewText;
  if (!previewText || previewText === "") {
    previewTxt = truncateString(para_1, 20);
  }
  return (
    <Html>
      <Head />
      <Preview>{previewTxt}</Preview>
      <Tailwind>
        <Body className="bg-[#e2e2eb] my-auto mx-auto font-sans px-1 py-4 rounded-xl">
          <Container className="bg-[#0a1226] border border-solid border-[#272E40] rounded-3xl my-[40px] max-w-[550px]">
            <Section className="mt-0  rounded-md mb-[-4.6rem]">
              <Img
                src={"https://i.ibb.co.com/WWns0Q9/waitlist-email-banner.png"}
                width="550"
                height="140"
                alt={topBannerAlt}
                className="my-0 h-auto max-w-full rounded-t-3xl z-[-1]"
              />
            </Section>
            <Section className="pt-0 p-10">
              <Text
                className={`text-white text-[33px] font-semibold font-[verdana]  p-0  mx-0 `}
              >
                Sign up{" "}
                <span className={`text-[${accentColor}]`}>Complete!</span>
              </Text>
              <Text className="text-[#b5b7bd] mb-[-10px] pt-6 text-[14px] leading-[24px]">
                {para_1}
              </Text>

              <Text className="text-[#b5b7bd] text-[14px] pb-3 leading-[24px]">
                {para_2}
              </Text>
              <Section className="mx-0 w-full p-0 ">
                <Text className="text-white  text-[12px] ">
                  Copyright © Sellto.io
                </Text>

                {/* <Hr className="border border-solid border-slate-500 opacity-8 bg-slate-500 my-[1rem] mx-0 w-full" /> */}
                <Text className="text-[#909299f9]  text-[12px] leading-[24px] mx-0 w-full ">
                  Email was sent by{" "}
                  <span className="text-[#d9dadc]">Sellto.io,</span> If you wish
                  to get your email removed from the list{" "}
                  <Link
                    href={`https://www.sellto.io/emailslist/remove`}
                    className="underline"
                  >
                    click here
                  </Link>{" "}
                  for support contact us at{" "}
                  <Link
                    href={`mailto:support@sellto.io`}
                    className="text-[#d9dadc] underline"
                  >
                    support@sellto.io
                  </Link>{" "}
                </Text>
              </Section>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

WaitlistEmailTemplate.PreviewProps = {
  topBanner: "https://i.ibb.co.com/WWns0Q9/waitlist-email-banner.png",
  topBannerAlt: "Sellto.io",
  accentColor: "#875CFF",
  previewText: "Text",
  para_1:
    "You’ve signed up to be waitlisted for being a beta tester of sellto.io. You’ll receive an email notification when the beta version goes live.",
  para_2:
    "Note: not all applicants are guaranteed to get beta tester privileges and some accounts may get the beta tester privileges earlier than others, based on sign up date, region/country etc.",
} as waitlistEmailTemplateProps;

export default WaitlistEmailTemplate;
