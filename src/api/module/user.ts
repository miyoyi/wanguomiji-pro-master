import axios from 'axios';
import type { RouteRecordNormalized } from 'vue-router';
import { UserState } from '@/store/modules/user/types';
import constant from '@/utils/constant';
import { md5 } from '@/utils/encryption';

export interface LoginData {
  username: string;
  password: string;
}

export interface LoginRes {
  token: string;
}
export function login(data: LoginData) {
  const { PWD_SALT } = constant;
  const encryptedData: LoginData = {
    username: data.username,
    password: md5(data.password) + md5(PWD_SALT)
  };
  return axios.post<LoginRes>('/api/user/login', encryptedData);
}

export function logout() {
  return axios.post<LoginRes>('/api/user/logout');
}

export function getUserInfo() {
  return axios.post<UserState>('/api/user/info');
}

export function getMenuList() {
  return axios.post<RouteRecordNormalized[]>('/api/user/menu');
}
