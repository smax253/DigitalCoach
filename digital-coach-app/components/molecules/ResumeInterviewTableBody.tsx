import { Row } from "react-table";
import { TableBodyProps } from "@mui/material";
import Link from "next/link";
import ResumeInterviewTableRow from "../atoms/ResumeInterviewTable/ResumeInterviewTableRow";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  tableBodyProps: TableBodyProps;
  rows: Row<{
    interviewId: string;
    interviewName: string;
    date: Date;
    completionPct: number;
  }>[];
  data: {
    interviewId: string;
    interviewName: string;
    date: Date;
    completionPct: number;
  }[];
  prepareRow: any;
}

export default function ResumeInterviewTableBody(props: Props) {
  const { rows, data, tableBodyProps, prepareRow } = props;
  return (
    <tbody {...tableBodyProps}>
        {rows.map((row, i) => {
          prepareRow(row);
          const { key: rowKey, ...restOfRowProps } = row.getRowProps();
          return (
            <ResumeInterviewTableRow key={rowKey} rowProps={restOfRowProps} row={row} data={data[i]} />
          );
        })}
      </tbody>
  );
}
