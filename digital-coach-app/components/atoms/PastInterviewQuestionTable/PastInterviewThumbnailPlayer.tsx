import ReactPlayer from "react-player";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  videoUrl: string;
}

export default function PastInterviewThumbnailPlayer(props: Props){
    const {videoUrl} = props;
    return (
        <ReactPlayer url={videoUrl} light={true} width="auto" height="100%" controls={true} />
    )
}