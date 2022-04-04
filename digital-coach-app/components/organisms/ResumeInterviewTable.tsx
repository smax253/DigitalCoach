import useResumeInterviewQuery from "@App/lib/interview/useResumeInterviewQuery";
import { LinearProgress } from "@mui/material";
import { PropsWithoutRef, useMemo } from "react";
import { useSortBy, useTable } from "react-table";
import styles from "@App/components/organisms/ResumeInterviewTable.module.scss";
import ResumeInterviewTableHeader from "../atoms/ResumeInterviewTable/ResumeInterviewTableHeader";
import ResumeInterviewTableBody from "../molecules/ResumeInterviewTableBody";
interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  userId: string;
}

interface TableProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  data: {
    interviewId: string;
    interviewName: string;
    date: Date;
    completionPct: number;
  }[];
}

function TableBody(props: TableProps) {
  const { data } = props;

  const columns = useMemo(
    () => [
      { accessor: "interviewName", Header: "Name" },
      {
        accessor: "date",
        Header: "Date",
        Cell: (props: { value: Date }) => props.value.toString(),
      },
      {
        accessor: "completionPct",
        Header: "Progress",
        Cell: (props: { value: number | undefined }) => (
          <LinearProgress
            className={styles.ProgressBar}
            variant="determinate"
            value={props.value ? props.value * 100 : 0}
          />
        ),
      }
    ],
    []
  );
  const tableData = useMemo(() => data, [data]);
  const {
    getTableBodyProps,
    getTableProps,
    rows,
    prepareRow,
    headers,
    headerGroups,
  } = useTable(
    //@ts-ignore
    { columns, data: tableData },
    useSortBy
  );
  return (
    <table {...getTableProps()} className={styles.ResumeInterviewTable}>
      <ResumeInterviewTableHeader headerGroups={headerGroups} />
      <ResumeInterviewTableBody
        rows={rows}
        prepareRow={prepareRow}
        tableBodyProps={getTableBodyProps()}
        data={data}
      />
    </table>
  );
}

export default function ResumeInterviewTable(props: PropsWithoutRef<Props>) {
  const { userId } = props;
  const { data, isLoading, isFetching } = useResumeInterviewQuery(userId);

  if (isLoading || isFetching || !data) return <div>Loading...</div>;
  return <TableBody data={data} />;
}
