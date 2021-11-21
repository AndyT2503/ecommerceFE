export interface HeaderTable {
  canFilter?: boolean;
  canSort?: boolean;
  isSortVisible?: boolean;
  label: string;
  key?: string;
  width?: number;
  dataType?: 'text' | 'date' | 'select';
  dataFilters?: {value: string, label: string}[];
  //onFilterChange?: (value: any) => void;
}