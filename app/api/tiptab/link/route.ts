import og from "open-graph-scraper";
import { NextRequest, NextResponse } from "next/server";
import { validateToken } from "@/app/lib/auth/login";
import { lookup } from "node:dns/promises";
import net from "node:net";

export async function GET(req: NextRequest) {
	const auth = await validateToken()
	if (!auth.success) {
		return NextResponse.json({ success: 0, error: "Unauthorized" }, { status: 401 })
	}

	const param = req.nextUrl.searchParams
	const link = validateURL(param)
	if (!(typeof link == "string")) {
		return link
	}

	// SSRF guard: resolve the host and refuse private/loopback/link-local
	// targets so this preview fetcher can't reach internal services or the
	// cloud metadata endpoint.
	if (await resolvesToPrivate(link)) {
		return NextResponse.json(
			{ success: 0, error: "Blocked host" },
			{ status: 400 }
		)
	}

	const { error, result } = await og({ url: link })

	if (error) {
		return Response.json({
			success: 1,
			link,
		})
	}

	return Response.json({
		success: 1,
		link,
		meta: {
			title: result.ogTitle,
			description: result.ogDescription,
			image: result.ogImage && result.ogImage[0]
		}
	})
}

function isPrivateIp(ip: string): boolean {
	const v = net.isIP(ip)
	if (v === 4) {
		const [a, b] = ip.split(".").map(Number)
		return (
			a === 10 ||
			a === 127 ||
			(a === 172 && b >= 16 && b <= 31) ||
			(a === 192 && b === 168) ||
			(a === 169 && b === 254) || // link-local / cloud metadata
			a === 0
		)
	}
	if (v === 6) {
		const lower = ip.toLowerCase()
		return (
			lower === "::1" ||
			lower.startsWith("fc") || // unique local
			lower.startsWith("fd") ||
			lower.startsWith("fe80") || // link-local
			lower.startsWith("::ffff:") // IPv4-mapped — resolve underlying v4
		)
	}
	return false
}

async function resolvesToPrivate(link: string): Promise<boolean> {
	try {
		const host = new URL(link).hostname
		// Reject if the host is itself a private literal IP.
		if (net.isIP(host) && isPrivateIp(host)) return true
		const records = await lookup(host, { all: true })
		return records.some((r) => isPrivateIp(r.address))
	} catch {
		// DNS failure or bad URL — treat as blocked rather than fetch.
		return true
	}
}

function validateURL(param: URLSearchParams) {
	try {

		const link = param.get("url")
		if (!link) {
			return Response.json({
				success: 0,
				error: "Missing URL",
			}, { status: 400 })
		}

		const url = new URL(link);
		if (!["http:", "https:"].includes(url.protocol)) {
			return Response.json({
				success: 0,
				error: "Invliad protocol",
			}, { status: 400 })
		}
		return link
	} catch (e) {
		console.log(e)
		return Response.json({
			success: 0,
			errro: "Invalid URL",
		}, { status: 400 })
	}

}
