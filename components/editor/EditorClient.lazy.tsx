import dynamic from "next/dynamic";

const EitorClient = dynamic(() => import("./editorClient"), {ssr: false})

export default EitorClient


