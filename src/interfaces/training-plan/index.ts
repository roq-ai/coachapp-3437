import { UserInterface } from 'interfaces/user';
import { SwimmerInterface } from 'interfaces/swimmer';
import { GetQueryInterface } from 'interfaces';

export interface TrainingPlanInterface {
  id?: string;
  name: string;
  description?: string;
  coach_id: string;
  swimmer_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  swimmer?: SwimmerInterface;
  _count?: {};
}

export interface TrainingPlanGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
  coach_id?: string;
  swimmer_id?: string;
}
