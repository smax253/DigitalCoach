import usePastInterviewQuery from "@App/lib/interview/pastInterviewQuery";
import { Timestamp } from "@firebase/firestore";
import { PropsWithoutRef, useMemo } from "react";
import { useTable } from "react-table";
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
    interviewName: string;
    date: string;
    averageScore: number;
    completionPct: number;
  }[];
}

function TableBody(props: PropsWithoutRef<TableProps>) {
  const { data } = props;
  const columns = useMemo(
    () => [
      { accessor: "interviewName", Header: "Name" },
      { accessor: "date", Header: "Date" },
      { accessor: "completionPct", Header: "Progress" },
      { accessor: "averageScore", Header: "Score" },
    ],
    []
  );
  const tableData = useMemo(() => data, [data]);
  const { getTableBodyProps, getTableProps, rows, prepareRow, headers } =
    useTable(
      //@ts-ignore
      { columns, data: tableData }
    );

  console.log("table data", data[0].averageScore);
  return (
    <table {...getTableProps()}>
      <thead>
        <tr>
          {headers.map((header) => {
            const { key, ...restOfHeaderProps } = header.getHeaderProps();
            return (
              <th key={key} {...restOfHeaderProps}>
                {header.render("Header")}
              </th>
            );
          })}
        </tr>
      </thead>

      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          const { key: rowKey, ...restOfRowProps } = row.getRowProps();
          return (
            <tr key={rowKey} {...restOfRowProps}>
              {row.cells.map((cell) => {
                  const {key: cellKey, ...restOfCellProps} = cell.getCellProps();
                return (
                  <td key={cellKey} {...restOfCellProps}>
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default function PastInterviewTable(props: PropsWithoutRef<Props>) {
  const { userId } = props;
  const { data, isLoading, isFetching } = usePastInterviewQuery(userId);

  if (isLoading || isFetching || !data) return <div>Loading...</div>;
  console.log("data", data);
  return <TableBody data={data} />;
}
