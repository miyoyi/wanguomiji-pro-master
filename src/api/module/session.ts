import axios from 'axios';
import qs from 'query-string';
import type { DescData } from '@arco-design/web-vue/es/descriptions/interface';
import { HttpResponse } from '../interceptor';

export interface PolicyRecord {
  id: string;
  number: number;
  name: string;
  contentType: 'img' | 'horizontalVideo' | 'verticalVideo';
  filterType: 'artificial' | 'rules';
  count: number;
  status: 'online' | 'offline';
  createdTime: string;
}

export interface PolicyParams extends Partial<PolicyRecord> {
  current: number;
  pageSize: number;
}

export interface PolicyListRes {
  list: PolicyRecord[];
  total: number;
}

export function querySessionList<T>(params: T) {
  return axios.get<HttpResponse>('/api/session/list', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    }
  });
}

export function addSession<T>(params: T) {
  return axios.post<HttpResponse>('/api/session/add', {
    params
  });
}

export function editSession<T>(params: T) {
  return axios.post<HttpResponse>('/api/session/edit', {
    params
  });
}
