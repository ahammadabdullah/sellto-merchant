import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ContactForm from "@/components/shop/contactForm";
import { ReactLenisProvider } from "@/components/helpers/LenisProvider";
import { Button } from "@/components/ui/button";

import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Separator } from "@/components/ui/separator";
export default function ContactPage() {
  return (
    <ReactLenisProvider>
      <main className="w-full overflow-x-hidden relative">
        <div className="mx-auto mt-32  max-w-[1024px] max-[1025px]:px-[0.5rem] mb-10">
          <Card className="max-w-2xl md:p-10 mx-auto bg-background/70 backdrop-blur-md border-none">
            <CardHeader className="gap-1">
              <CardTitle className="font-clash font-medium text-3xl tracking-normal">
                Contact Us
              </CardTitle>
              <CardDescription>
                We&apos;d love to hear from you! Please fill out the form below
                and we&apos;ll get back to you as soon as possible.
              </CardDescription>

              <div className="flex justify-start space-x-4 mt-4">
                <Button variant="outline" size="icon">
                  <FaFacebookF className="h-4 w-4" />
                  <span className="sr-only">Facebook</span>
                </Button>
                <Button variant="outline" size="icon">
                  <FaXTwitter className="h-4 w-4" />
                  <span className="sr-only">Twitter / X</span>
                </Button>
                <Button variant="outline" size="icon">
                  <FaInstagram className="h-4 w-4" />
                  <span className="sr-only">Instagram</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </div>
        <div className="circel bg_primary_radial_gradient w-[100%] aspect-square rounded-full fixed top-[-100%] left-[50%] translate-x-[-50%] pointer-events-none opacity-60 z-[-1]"></div>
      </main>
    </ReactLenisProvider>
  );
}
