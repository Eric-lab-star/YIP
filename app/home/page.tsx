/*
	* Landing page 
* */
import Body from "./components/Body";
import Footer from "./components/Footer";
import Header from "./components/Header";
export default async function Home() {

  return (
		<div className="space-y-3">
			<Header/>
			<Body />
			<Footer />
		</div>
  );
}
