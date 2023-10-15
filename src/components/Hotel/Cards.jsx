/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
import cardList from "../../constants/CardSection";
import Link from "next/link";

const Cards = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {cardList.map((card) => (
          <Link href={`/hotel-list/${card.title}`}>
            <div className="hover:shadow-opacity-50 hover:shadow-offset-2 hover:shadow-offset-c00 over:opacity-90 cursor-pointer rounded-3xl shadow-xl transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-2xl hover:shadow-c3">
              <img className="rounded-t-3xl" src={card.img} alt={card.title} />
              <div className="p-5">
                <p className="mb-3 font-bold text-c3">{card.title}</p>
                <p className="text-lg font-normal text-c4">{card.text}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Cards;
