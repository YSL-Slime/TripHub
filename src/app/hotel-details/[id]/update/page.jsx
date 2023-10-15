import "../../../globals.css";
import Updator from "../../../../components/Posting/Updator";
import Head from "next/head";
import Link from "next/link";

export default function Update({ params }) {
  const { id } = params;
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex flex-row items-center p-10">
          <Link href="/profile">
            <p className="">Profile &gt;</p>
          </Link>
          <Link href="/hotel-list/my">
            <p className="ml-1 ">My listings &gt;</p>
          </Link>
          <p className="pl-2 text-caption-14 text-c4">Update your listing</p>
        </div>
      </div>
      <div className="container mx-auto px-8 py-28">
        <div>
          <h1 className="mb-3 text-left text-heading-1 text-[#23262F]">
            Update your listing
          </h1>
        </div>
        <div className="mb-10 mt-1 border-b-2 border-blue-500"></div>
        <Updator id={id} />
      </div>
    </>
  );
}
