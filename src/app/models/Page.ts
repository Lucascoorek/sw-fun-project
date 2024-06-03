import { Entity } from './Entity';

export interface Page {
  message: string;
  total_records: number;
  total_pages: number;
  previous: null | string;
  next: null | string;
  results: Entity[];
}
