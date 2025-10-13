import Header from "./component/Header";
import SideBar from "./component/SideBar";
export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
		<div className={`h-screen flex flex-col select-none m-0`}>
		  <Header/>
			<div className="flex grow space-x-3">
				<SideBar />
				<div className="grow bg-amber-300 rounded-md p-3 mb-3">
				  {children}
				</div>
			</div>
		</div>
  );
}




