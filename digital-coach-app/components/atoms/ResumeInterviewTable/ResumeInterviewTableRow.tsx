import Link from "next/link";
import { Row } from "react-table";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
    key: string | number;
    data: {
        interviewId: string;
        interviewName: string;
        date: Date;
        completionPct: number;
      };
    row: Row<{
        interviewId: string;
        interviewName: string;
        date: Date;
        completionPct: number;
      }>;
      rowProps:{
        style?: React.CSSProperties | undefined;
        className?: string | undefined;
        role?: string | undefined;
    }
}


export default function ResumeInterviewTableRow(props: Props) {
    const { row, rowProps, data, key } = props;
  return (
    <Link key={key} href={`start/${data.interviewId}`} passHref>
      <tr {...rowProps}>
        {row.cells.map((cell) => {
          const { key: cellKey, ...restOfCellProps } = cell.getCellProps();
          return (
            <td key={cellKey} {...restOfCellProps}>
              {cell.render("Cell")}
            </td>
          );
        })}
      </tr>
    </Link>
  );
}
