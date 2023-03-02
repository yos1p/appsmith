import React from "react";
import {
  TableBodyPropGetter,
  TableBodyProps,
  Row as ReactTableRowType,
} from "react-table";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { ReactTableColumnProps, TableSizes } from "./Constants";
import { HeaderComponentProps } from "./header/TableColumnHeader";
import VirtualTableInnerElement from "./header/VirtualTableInnerElement";
import { TableBody } from "./TableBody";

type VirtualTableProps = HeaderComponentProps & {
  getTableBodyProps(
    propGetter?: TableBodyPropGetter<Record<string, unknown>> | undefined,
  ): TableBodyProps;
  pageSize: number;
  height: number;
  width?: number;
  tableSizes: TableSizes;
  accentColor: string;
  borderRadius: string;
  multiRowSelection?: boolean;
  prepareRow?(row: ReactTableRowType<Record<string, unknown>>): void;
  selectTableRow?: (row: {
    original: Record<string, unknown>;
    index: number;
  }) => void;
  selectedRowIndex: number;
  selectedRowIndices: number[];
  columns: ReactTableColumnProps[];
  primaryColumnId?: string;
  isAddRowInProgress: boolean;
  totalColumnsWidth?: number;
  scrollContainerStyles: any;
  useVirtual: boolean;
  tableBodyRef: React.MutableRefObject<HTMLDivElement | null>;
};

const VirtualTable = (props: VirtualTableProps) => {
  return (
    <SimpleBar style={props.scrollContainerStyles}>
      {({ scrollableNodeRef }) => (
        <TableBody
          accentColor={props.accentColor}
          borderRadius={props.borderRadius}
          canFreezeColumn={props.canFreezeColumn}
          columns={props.columns}
          disableDrag={props.disableDrag}
          editMode={props.editMode}
          enableDrag={props.enableDrag}
          getTableBodyProps={props.getTableBodyProps}
          handleAllRowSelectClick={props.handleAllRowSelectClick}
          handleColumnFreeze={props.handleColumnFreeze}
          handleReorderColumn={props.handleReorderColumn}
          headerGroups={props.headerGroups}
          height={props.height}
          innerElementType={VirtualTableInnerElement}
          isAddRowInProgress={props.isAddRowInProgress}
          isResizingColumn={props.isResizingColumn}
          isSortable={props.isSortable}
          multiRowSelection={!!props.multiRowSelection}
          outerRef={scrollableNodeRef}
          pageSize={props.pageSize}
          prepareRow={props.prepareRow}
          primaryColumnId={props.primaryColumnId}
          ref={props.tableBodyRef}
          rowSelectionState={props.rowSelectionState}
          rows={props.subPage}
          selectTableRow={props.selectTableRow}
          selectedRowIndex={props.selectedRowIndex}
          selectedRowIndices={props.selectedRowIndices}
          sortTableColumn={props.sortTableColumn}
          tableSizes={props.tableSizes}
          totalColumnsWidth={props?.totalColumnsWidth}
          useVirtual={props.useVirtual}
          widgetId={props.widgetId}
          width={props.width}
        />
      )}
    </SimpleBar>
  );
};

export default VirtualTable;
