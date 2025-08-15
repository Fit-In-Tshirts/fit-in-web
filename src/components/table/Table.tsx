import type { Paginator } from "@/types/common";
import { DataTable } from "./data-table"
import TablePaginator from "./paginator";

interface Props {
  data: any,
  columns: any,
  paginator: Paginator,
  setPaginator: React.Dispatch<React.SetStateAction<Paginator>>;
}

export default function Table(props: Props) {
  return (
    <div className="w-full flex flex-col">
      <DataTable columns={props.columns} data={props.data} />
      <TablePaginator paginatorState={props.paginator} PaginatorSetter={props.setPaginator} />
    </div>
  )
}