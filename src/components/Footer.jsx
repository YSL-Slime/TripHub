import Link from "next/link";
import Image from "next/image";

import logo from "../../public/general/logo.png";

const Footer = () => {
  return (
    <>
      <div className="mt-16 flex min-h-[500px] w-full min-w-[390px] items-center justify-center bg-white">
        <div className="flex w-full max-w-7xl py-8">
          <div className="flex w-full flex-col-reverse pl-12 md:flex-row">
            <div className="mr-4 flex w-1/3 flex-col gap-3">
              <Link href={"/"}>
                <div className="relative flex h-[38px] w-[40px] items-center object-contain">
                  <Image src={logo} alt="logo" />
                  <p className="ml-2 text-heading-4 leading-6 text-c2">
                    TripHub
                  </p>
                </div>
              </Link>
              <p className="text-[14px] leading-6 text-c3">
                Explore your world effortlessly with TripHub - Your one-stop
                destination for hassle-free trip booking!
              </p>
            </div>

            <div className="mb-15 flex w-full flex-col md:ml-8 md:flex-row">
              <div className="text-sm flex w-full flex-col gap-3 pb-10 md:pb-0">
                <h5 className="text-heading-4 text-c2">Services</h5>
                <p className="text-sm cursor-pointer text-[14px] leading-6 text-c4 hover:underline">
                  Travel Booking
                </p>
                <p className="text-sm cursor-pointer text-[14px] leading-6 text-c4 hover:underline">
                  Flight Booking
                </p>
                <p className="text-sm cursor-pointer text-[14px] leading-6 text-c4 hover:underline">
                  Car Booking
                </p>
              </div>

              <div className="text-sm flex w-full flex-col gap-3 pb-10 md:pb-0">
                <h5 className="text-heading-4 text-c2">Support</h5>
                <p className="text-sm cursor-pointer text-[14px] leading-6 text-c4 hover:underline">
                  Account
                </p>
                <p className="text-sm cursor-pointer text-[14px] leading-6 text-c4 hover:underline">
                  Legal
                </p>
                <p className="text-sm cursor-pointer text-[14px] leading-6 text-c4 hover:underline">
                  Contact
                </p>
                <p className="text-sm cursor-pointer text-[14px] leading-6 text-c4 hover:underline">
                  Terms & Conditions
                </p>
                <p className="text-sm cursor-pointer text-[14px] leading-6 text-c4 hover:underline">
                  Privacy Policy
                </p>
              </div>

              <div className="text-sm flex w-full flex-col gap-3 pb-10 md:pb-0">
                <h5 className="text-heading-4 text-c2">Business</h5>
                <p className="text-sm cursor-pointer text-[14px] leading-6 text-c4 hover:underline">
                  Success
                </p>
                <p className="text-sm cursor-pointer text-[14px] leading-6 text-c4 hover:underline">
                  About
                </p>
                <p className="text-sm cursor-pointer text-[14px] leading-6 text-c4 hover:underline">
                  Blog
                </p>
                <p className="text-sm cursor-pointer text-[14px] leading-6 text-c4 hover:underline">
                  Information
                </p>
                <p className="text-sm cursor-pointer text-[14px] leading-6 text-c4 hover:underline">
                  Travel Guide
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
