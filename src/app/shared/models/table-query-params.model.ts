export interface TableQueryParams {
  pageIndex: number;
  pageSize: number;
  sort?: { key: string, value: TableSortOrder }[]
}

export declare type TableSortOrder = string | 'ascend' | 'descend' | null;
