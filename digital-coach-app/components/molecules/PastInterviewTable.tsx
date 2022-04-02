import usePastInterviewQuery from "@App/lib/interview/usePastInterviewQuery";
import { Timestamp } from "@firebase/firestore";
import { PropsWithoutRef, useMemo } from "react";
import { useSortBy, useTable } from "react-table";
import styles from "@App/components/molecules/PastInterviewTable.module.scss";
import { LinearProgress } from "@mui/material";
import { ExpandMore, UnfoldMore, ExpandLess } from "@mui/icons-material";
import Link from "next/link";
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
    averageScore: number | undefined;
    completionPct: number;
  }[];
}

function TableBody(props: PropsWithoutRef<TableProps>) {
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
      },
      {
        accessor: "averageScore",
        Header: "Score",
        Cell: (props: { value: number | undefined }) =>
          props.value ? (props.value * 100).toFixed(1) + "%" : "--",
      },
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
    <table {...getTableProps()} className={styles.PastInterviewTable}>
      <thead className={styles.TableHeader}>
        {headerGroups.map((headerGroup) => {
          const { key, ...restOfHeaderGroupProps } =
            headerGroup.getHeaderGroupProps();
          return (
            <tr {...restOfHeaderGroupProps} key={key}>
              {headerGroup.headers.map((header) => {
                const { ...restOfHeaderProps } = header.getSortByToggleProps();
                const { key } = header.getHeaderProps();
                return (
                  <th
                    key={key}
                    {...restOfHeaderProps}
                    className={styles.TableLabel}
                  >
                    <div>
                      {header.render("Header")}
                      {header.isSorted ? (
                        header.isSortedDesc ? (
                          <ExpandMore />
                        ) : (
                          <ExpandLess />
                        )
                      ) : (
                        <UnfoldMore />
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          );
        })}
      </thead>

      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          const { key: rowKey, ...restOfRowProps } = row.getRowProps();
          return (
            <Link key={rowKey} href={`past/${data[i].interviewId}`} passHref>
              <tr {...restOfRowProps} className={styles.InterviewRow}>
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
    </table>
  );
}

export default function PastInterviewTable(props: PropsWithoutRef<Props>) {
  const { userId } = props;
  const { data, isLoading, isFetching } = usePastInterviewQuery(userId);

  if (isLoading || isFetching || !data) return <div>Loading...</div>;
  return <TableBody data={data} />;
}
