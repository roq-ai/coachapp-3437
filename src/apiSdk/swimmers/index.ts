import axios from 'axios';
import queryString from 'query-string';
import { SwimmerInterface, SwimmerGetQueryInterface } from 'interfaces/swimmer';
import { GetQueryInterface } from '../../interfaces';

export const getSwimmers = async (query?: SwimmerGetQueryInterface) => {
  const response = await axios.get(`/api/swimmers${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createSwimmer = async (swimmer: SwimmerInterface) => {
  const response = await axios.post('/api/swimmers', swimmer);
  return response.data;
};

export const updateSwimmerById = async (id: string, swimmer: SwimmerInterface) => {
  const response = await axios.put(`/api/swimmers/${id}`, swimmer);
  return response.data;
};

export const getSwimmerById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/swimmers/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteSwimmerById = async (id: string) => {
  const response = await axios.delete(`/api/swimmers/${id}`);
  return response.data;
};
