


import { Geist } from 'next/font/google'
 
const geist = Geist({
  subsets: ['latin'],
})

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className={`${geist.className} absolute top-0 left-0`}>
        {children}
      </div>
  );
}
