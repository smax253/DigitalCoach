import { useEffect, useRef } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import styles from "@App/styles/VideoPage.module.scss";

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
      <p className = {styles.thing}>{status}</p>
      <div className={styles.videoBox}>
        <video src={mediaBlobUrl!} controls autoPlay loop />
        <video ref={videoRef} controls autoPlay />
      </div>
      <div className={styles.buttonBox}>
        <button onClick={startRecording}>Start Recording</button>
        <button onClick={stopRecording}>Stop Recording</button>
      </div>
      
    </div>
  );
}
