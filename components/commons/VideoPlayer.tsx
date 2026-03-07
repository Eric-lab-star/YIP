import ReactPlayer from "react-player";

export default function VideoPlayer({url }:{ url:string}) {
  return (
		<div className="h-auto w-full">
    <ReactPlayer
      src={`${process.env.R2_CUSTOM}/${url}`}
      controls={true}
			style={{ width: '100%', height: 'auto', aspectRatio: '16/9' }}
      width="auto"
    />
		</div>
  );
}
