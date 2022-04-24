import { ExpandMore, ExpandLess, UnfoldMore } from "@mui/icons-material";
import { HeaderGroup } from "react-table";
import styles from "@App/components/atoms/PastInterviewQuestionTable/PastInterviewQuestionTableHeader.module.scss";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  headerGroups: HeaderGroup<{
    answerId?: string | undefined;
    questionId: string;
    questionName: string;
    videoUrl?: string | undefined;
    score?: number | null | undefined;
    url: string;
}>[]
}


export default function PastInterviewQuestionTableHeader(props: Props ){
    const {headerGroups} = props;
    return (<thead className={styles.TableHeader}>
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
      </thead>)
}