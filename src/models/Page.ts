import { Produto } from './Produto';
import { Sort } from './Sort';

export interface Page {
  content: Produto[];
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
