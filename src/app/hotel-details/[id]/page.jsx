import "../../globals.css";
import HotelDetail from "../../../components/HotelDetail/HotelDetail";
import Link from "next/link";

export default function Home({ params }) {
  const id = params.id;

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex flex-row items-center p-10">
          <Link href="/">
            <p className="">Home &gt;</p>
          </Link>
          <Link href="/hotel-list">
            <p className="ml-1 ">Accomodation list &gt;</p>
          </Link>
          <p className="pl-2 text-caption-14 text-c4">Accomodation details</p>
        </div>
      </div>
      <HotelDetail id={id} />
    </>
  );
}
