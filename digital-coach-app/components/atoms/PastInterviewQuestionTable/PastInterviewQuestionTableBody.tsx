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
    answerId?: string | undefined;
    questionName: string;
    videoUrl?: string | undefined;
    score?: number | null | undefined;
    url: string;
  }>[];
  prepareRow: any;
}

export default function PastInterviewQuestionTableBody(props: Props) {
  const { rows, tableBodyProps, prepareRow } = props;
  return (
    <tbody {...tableBodyProps}>
      {rows.map((row, i) => {
        prepareRow(row);
        const { key: rowKey, ...restOfRowProps } = row.getRowProps();
        return (
          <tr key={rowKey} {...restOfRowProps}>
            {row.cells.map((cell) => {
              const { key: cellKey, ...restOfCellProps } = cell.getCellProps();
              if (cell.column.id === "videoUrl") {
                return (
                  <td key={cellKey} {...restOfCellProps}>
                    {cell.render("Cell")}
                  </td>
                );
              } else {
                return (
                  <Link href={row.original.url} passHref>
                    <td key={cellKey} {...restOfCellProps}>
                      {cell.render("Cell")}
                    </td>
                  </Link>
                );
              }
            })}
          </tr>
        );
      })}
    </tbody>
  );
}
