/*
	* Landing page 
* */
import { mockProjects } from "../lib/projects";
import { mockUser  } from "../lib/users";
import { addProjToUser } from "../lib/projToUser";
import Body from "./components/Body";
import Footer from "./components/Footer";
import Header from "./components/Header";
export default async function Home() {
	await mockProjects();
	await mockUser();
	await addProjToUser()
  return (
		<div className="space-y-3">
			<Header/>
			<Body />
			<Footer />
		</div>
  );
}
