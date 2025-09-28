import Link from "next/link";

export default function ProjectLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
		<div
        className={`
					bg-amber-600 lg:w-5/6 lg:mx-auto md:w-screen space-y-3 `}
    > 
				<div> 
					<Link href={"/"}> 똑똑코딩 </Link>
				</div>
        {children}
		</div>
  );
}
