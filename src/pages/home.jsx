import useData from "../data/read";

export default function Home() {
  const { venueData } = useData();

  console.log(venueData);
  return <div>Welcome to Homepage THIS IS THE HOME PAGE</div>;
}
