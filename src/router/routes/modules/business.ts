import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const BUSINESS: AppRouteRecordRaw = {
  path: '/business',
  name: 'business',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '业务中心',
    requiresAuth: true,
    icon: 'icon-archive',
    order: 2
  },
  children: [
    {
      path: 'session-management', // The midline path complies with SEO specifications
      name: 'SessionManage',
      component: () => import('@/views/business/session-management/index.vue'),
      meta: {
        locale: '场次管理',
        requiresAuth: true
      }
    }
  ]
};

export default BUSINESS;
