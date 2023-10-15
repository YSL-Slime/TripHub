import "../globals.css";
import CreatePost from "../../components/Posting/CreatePost";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex flex-row items-center p-10">
          <Link href="/profile">
            <p className="">Profile &gt;</p>
          </Link>
          <p className="pl-2 text-caption-14 text-c4">Add your accomodation</p>
        </div>
      </div>
      <CreatePost />
    </>
  );
}
