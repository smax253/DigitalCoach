import { Row } from "react-table";
import { TableBodyProps } from "@mui/material";
import Link from "next/link";

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
    averageScore?: number | undefined;
    completionPct: number;
  }>[];
  data: {
    interviewId: string;
    interviewName: string;
    date: Date;
    averageScore?: number | undefined;
    completionPct: number;
  }[];
  prepareRow: any;
}

export default function PastInterviewTableBody(props: Props) {
  const { rows, data, tableBodyProps, prepareRow } = props;
  return (
    <tbody {...tableBodyProps}>
        {rows.map((row, i) => {
          prepareRow(row);
          const { key: rowKey, ...restOfRowProps } = row.getRowProps();
          return (
            <Link key={rowKey} href={`past/${data[i].interviewId}`} passHref>
              <tr {...restOfRowProps}>
                {row.cells.map((cell) => {
                  const { key: cellKey, ...restOfCellProps } =
                    cell.getCellProps();
                  return (
                    <td key={cellKey} {...restOfCellProps}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            </Link>
          );
        })}
      </tbody>
  );
}
