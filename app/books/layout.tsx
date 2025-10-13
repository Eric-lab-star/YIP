import Link from "next/link";
import { bookPaths } from "./utils";
import { notosansKorean_500 } from "../stores/font"
export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
		<div className={`h-screen flex flex-col select-none m-0`}>
		  <Header className={`${notosansKorean_500.className} my-3 text-2xl grow-0`}/>
			<div className="flex grow space-x-3">
				<VBar className="" />
				<div className="grow bg-amber-300 rounded-md p-3 mb-3">
				  {children}
				</div>
			</div>
		</div>
  );
}


function Header({className}:{className: string}) {
	return (
		<Link href={"/books"} className={className}>
			<div> 학원 교제방</div>
		</Link>
	)
}


function VBar({className}:{className: string}) {
	return (
		<div className={` h-full w-44 flex gap-1 flex-col flex-none ${className}`}>
			{
				bookPaths.map((book)=>{
					return <Link key={book.path} className={`${notosansKorean_500.className} text-lg rounded-md min-h-10  bg-amber-300 flex items-center justify-center `} href={`/books/${book.path}`}>
					  <div className="">{book.label}</div>
					</Link>
				})
			}
			

		</div>
	)
}
