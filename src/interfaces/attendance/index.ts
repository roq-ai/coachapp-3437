import { SwimmerInterface } from 'interfaces/swimmer';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface AttendanceInterface {
  id?: string;
  date: any;
  swimmer_id: string;
  coach_id: string;
  created_at?: any;
  updated_at?: any;

  swimmer?: SwimmerInterface;
  user?: UserInterface;
  _count?: {};
}

export interface AttendanceGetQueryInterface extends GetQueryInterface {
  id?: string;
  swimmer_id?: string;
  coach_id?: string;
}
