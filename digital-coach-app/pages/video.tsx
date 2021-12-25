import { useEffect, useRef } from "react";
import { useReactMediaRecorder } from "react-media-recorder";

export default function VideoPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { status, startRecording, stopRecording, mediaBlobUrl, previewStream } =
    useReactMediaRecorder({ video: true });

  useEffect(() => {
    if (videoRef.current && previewStream)
      videoRef.current.srcObject = previewStream;
  }, [previewStream]);

  return (
    <div>
      <p>{status}</p>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
      <video src={mediaBlobUrl!} controls autoPlay loop />
      <video ref={videoRef} controls autoPlay />
    </div>
  );
}
