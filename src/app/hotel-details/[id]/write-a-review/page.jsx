import "../../../globals.css";
import WriteReview from "../../../../components/Review/WriteReview";
import Link from "next/link";

export default function Reviewing({ params }) {
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
          <Link href={`/hotel-details/${id}`}>
            <p className="ml-1 ">Accomodation details &gt;</p>
          </Link>
          <Link href={`/hotel-details/${id}/reviews`}>
            <p className="ml-1 ">Reveiws &gt;</p>
          </Link>
          <p className="pl-2 text-caption-14 text-c4">Write a review</p>
        </div>
      </div>
      <WriteReview id={id} />
    </>
  );
}
