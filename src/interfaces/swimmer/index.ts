import { AttendanceInterface } from 'interfaces/attendance';
import { ResultInterface } from 'interfaces/result';
import { TrainingPlanInterface } from 'interfaces/training-plan';
import { TeamInterface } from 'interfaces/team';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface SwimmerInterface {
  id?: string;
  first_name: string;
  last_name: string;
  team_id: string;
  team_manager_id: string;
  created_at?: any;
  updated_at?: any;
  attendance?: AttendanceInterface[];
  result?: ResultInterface[];
  training_plan?: TrainingPlanInterface[];
  team?: TeamInterface;
  user?: UserInterface;
  _count?: {
    attendance?: number;
    result?: number;
    training_plan?: number;
  };
}

export interface SwimmerGetQueryInterface extends GetQueryInterface {
  id?: string;
  first_name?: string;
  last_name?: string;
  team_id?: string;
  team_manager_id?: string;
}
