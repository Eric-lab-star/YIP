
export default function Page() {
	return <div>
    <div className="flex items-center justify-center min-h-screen bg-black">
      <iframe
        src="/game/index.html"
        width={450}
        height={800}
        style={{ border: "none" }}
        allow="autoplay"
      />
    </div>
	</div>
}
