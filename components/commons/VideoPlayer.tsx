import ReactPlayer from "react-player";

export default function VideoPlayer({url}:{url:string}) {
  return (
    <ReactPlayer
      src={`${process.env.R2_CUSTOM}/${url}`}
      controls={true}
      width="auto"
      height="500px"
    />
  );
}
