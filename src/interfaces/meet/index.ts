import { ResultInterface } from 'interfaces/result';
import { TeamInterface } from 'interfaces/team';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface MeetInterface {
  id?: string;
  name: string;
  date: any;
  team_id: string;
  team_manager_id: string;
  created_at?: any;
  updated_at?: any;
  result?: ResultInterface[];
  team?: TeamInterface;
  user?: UserInterface;
  _count?: {
    result?: number;
  };
}

export interface MeetGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  team_id?: string;
  team_manager_id?: string;
}
