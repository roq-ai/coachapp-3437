import { SwimmerInterface } from 'interfaces/swimmer';
import { MeetInterface } from 'interfaces/meet';
import { GetQueryInterface } from 'interfaces';

export interface ResultInterface {
  id?: string;
  time: number;
  swimmer_id: string;
  meet_id: string;
  created_at?: any;
  updated_at?: any;

  swimmer?: SwimmerInterface;
  meet?: MeetInterface;
  _count?: {};
}

export interface ResultGetQueryInterface extends GetQueryInterface {
  id?: string;
  swimmer_id?: string;
  meet_id?: string;
}
