import {Orbit, Archivo_Black, Black_Han_Sans, Sunflower, Noto_Sans_KR, Google_Sans_Code } from "next/font/google" 

export const orbit = Orbit({weight: "400"})
export const archivoBlack = Archivo_Black({weight: "400"})
export const blackHanSans = Black_Han_Sans({weight: "400"})
export const sunflower  = Sunflower({weight: "300"})
export const noto_sans_kr = Noto_Sans_KR({weight:"300", style: "normal"})
export const googleCode300 = Google_Sans_Code({weight: "300", fallback: ["Noto_Sans_KR"]})
export const googleCode400 = Google_Sans_Code({weight: "400", fallback: ["Noto_Sans_KR"]})
