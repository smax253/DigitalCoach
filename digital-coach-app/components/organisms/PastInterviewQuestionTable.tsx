import useGetInterviewQuestionsTableData from "@App/lib/interviewQuestion/useGetInterviewQuestionsTableData";
import { useMemo } from "react";
import { useSortBy, useTable } from "react-table";
import PastInterviewQuestionTableBody from "../atoms/PastInterviewQuestionTable/PastInterviewQuestionTableBody";
import PastInterviewQuestionTableHeader from "../atoms/PastInterviewQuestionTable/PastInterviewQuestionTableHeader";
import PastInterviewThumbnailPlayer from "../atoms/PastInterviewQuestionTable/PastInterviewThumbnailPlayer";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  userId: string;
  interviewId: string;
}
interface TableProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  data: {
    answerId?: string;
    questionName: string;
    videoUrl?: string;
    score?: number | null;
  }[];
  interviewId: string;
}

function Table(props: TableProps) {
  const { data, interviewId } = props;
  const columns = useMemo(
    () => [
      { accessor: "questionName", Header: "Question" },
      { accessor: "videoUrl", Header: "Watch your response", Cell: (props: {value: string | undefined}) => { return props.value && <PastInterviewThumbnailPlayer videoUrl={props.value} /> }},
      { accessor: "score", Header: "Score" },
    ],
    []
  );
  const tableData = useMemo(
    () =>
      data.map((item) => ({
        url: `/past/${interviewId}/${item.answerId}`,
        ...item,
      })),
    [data, interviewId]
  );
  const { getTableBodyProps, getTableProps, rows, prepareRow, headerGroups } =
    //@ts-ignore
    useTable({ columns, data: tableData }, useSortBy);
  return <table {...getTableProps()}>
    <PastInterviewQuestionTableHeader headerGroups={headerGroups} />
    <PastInterviewQuestionTableBody rows={rows} prepareRow={prepareRow} tableBodyProps={getTableBodyProps()}/>
  </table>;
}

export default function PastInterviewQuestionTable(props: Props) {
  const { userId, interviewId } = props;
  const { data, isLoading } = useGetInterviewQuestionsTableData(
    userId,
    interviewId
  );
  if (isLoading || !data) {
    return <div>Loading...</div>;
  }
  return <Table data={data} interviewId={interviewId} />;
}
