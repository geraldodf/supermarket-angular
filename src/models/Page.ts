import {Sort} from './Sort';

export interface Page {
  content: any[];
  pageable: string;
  totalElements: number;
  last: boolean;
  totalPages: number;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}
