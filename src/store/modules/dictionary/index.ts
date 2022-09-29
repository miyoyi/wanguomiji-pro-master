import { DictionaryMap, DictionaryState, SceneType } from '@/types/dictionary';
import { defineStore } from 'pinia';

const useDictionaryStore = defineStore('dictionary', {
  state: (): DictionaryState => ({
    theme: {
      name: [
        {
          label: '消逝的光芒',
          value: 'XiaoShiDeGuangMang'
        },
        {
          label: '咒经',
          value: 'ZhouJing'
        },
        {
          label: '还愿',
          value: 'HuanYuan'
        },
        {
          label: '剃头',
          value: 'Titou'
        },
        {
          label: '人魅',
          value: 'RenMei'
        },
        {
          label: '血校',
          value: 'XueXiao'
        },
        {
          label: '见鬼十法',
          value: 'JianGuiShiFa'
        },
        {
          label: '疗养院',
          value: 'LiaoYangYuan'
        }
      ]
    },
    session: {
      status: [
        {
          label: '拼场中',
          value: '1'
        },
        {
          label: '待开场',
          value: '2'
        },
        {
          label: '已开场',
          value: '3'
        },
        {
          label: '已结束',
          value: '4'
        },
        {
          label: '已取消',
          value: '5'
        }
      ]
    }
  }),

  actions: {
    getDictionary(key: SceneType): DictionaryMap {
      return this.$state[key];
    }
  }
});

export default useDictionaryStore;
