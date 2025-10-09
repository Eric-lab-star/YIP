/*
	* Landing page 
* */
import { mockProjects } from "../lib/projects";
import Body from "./components/Body";
import Footer from "./components/Footer";
import Header from "./components/Header";
export default async function Home() {
	// await mockProjects()

  return (
		<div className="space-y-3">
			<Header/>
			<Body />
			<Footer />
		</div>
  );
}
