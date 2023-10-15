import "../app/globals.css";
import CardSection from "../components/Hotel/CardSection";
import FeaturedDestinations from "../components/FeaturedDestinations/FeaturedDestinations";
import TopTour from "../components/TopTour/TopTour";
import ExploreWorld from "../components/Hotel/ExploreWorld";
import SearchField from "../components/SearchField";
import TrendingCites from "../components/Hotel/TrendingCites";

export default function Home() {
  return (
    <>
      <SearchField />
      <CardSection />
      <FeaturedDestinations />
      <TopTour />
      <ExploreWorld />
      <TrendingCites />
    </>
  );
}
