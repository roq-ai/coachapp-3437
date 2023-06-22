import axios from 'axios';
import queryString from 'query-string';
import { MeetInterface, MeetGetQueryInterface } from 'interfaces/meet';
import { GetQueryInterface } from '../../interfaces';

export const getMeets = async (query?: MeetGetQueryInterface) => {
  const response = await axios.get(`/api/meets${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createMeet = async (meet: MeetInterface) => {
  const response = await axios.post('/api/meets', meet);
  return response.data;
};

export const updateMeetById = async (id: string, meet: MeetInterface) => {
  const response = await axios.put(`/api/meets/${id}`, meet);
  return response.data;
};

export const getMeetById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/meets/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteMeetById = async (id: string) => {
  const response = await axios.delete(`/api/meets/${id}`);
  return response.data;
};
