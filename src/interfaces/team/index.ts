import { MeetInterface } from 'interfaces/meet';
import { SwimmerInterface } from 'interfaces/swimmer';
import { ClubInterface } from 'interfaces/club';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface TeamInterface {
  id?: string;
  name: string;
  club_id: string;
  head_coach_id: string;
  created_at?: any;
  updated_at?: any;
  meet?: MeetInterface[];
  swimmer?: SwimmerInterface[];
  club?: ClubInterface;
  user?: UserInterface;
  _count?: {
    meet?: number;
    swimmer?: number;
  };
}

export interface TeamGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  club_id?: string;
  head_coach_id?: string;
}
