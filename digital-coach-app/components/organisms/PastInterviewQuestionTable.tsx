import useGetInterviewQuestionsTableData from "@App/lib/interviewQuestion/useGetInterviewQuestionsTableData";
import { useMemo } from "react";
import { useSortBy, useTable } from "react-table";
import PastInterviewQuestionTableBody from "../atoms/PastInterviewQuestionTable/PastInterviewQuestionTableBody";
import PastInterviewQuestionTableHeader from "../atoms/PastInterviewQuestionTable/PastInterviewQuestionTableHeader";
import PastInterviewThumbnailPlayer from "../atoms/PastInterviewQuestionTable/PastInterviewThumbnailPlayer";
import styles from "@App/components/organisms/PastInterviewQuestionTable.module.scss";

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
    questionId: string;
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
      { accessor: "score", Header: "Score", Cell: (props: { value: number | undefined }) => props.value ? (props.value * 100).toFixed(1) + "%" : "--", },
    ],
    []
  );
  const tableData = useMemo(
    () =>
      data.map((item) => ({
        url: `/past/${interviewId}/${item.questionId}`,
        ...item,
      })),
    [data, interviewId]
  );
  const { getTableBodyProps, getTableProps, rows, prepareRow, headerGroups } =
    //@ts-ignore
    useTable({ columns, data: tableData }, useSortBy);
  return <table {...getTableProps()} className={styles.PastInterviewQuestionTable}>
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
