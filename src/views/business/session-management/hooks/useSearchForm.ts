import { SelectOptionData } from '@arco-design/web-vue';
import useDictionary from '@/hooks/dictionary';
import { computed, ref } from 'vue';

export default function useSearchForm() {
  const { status, getDictionaryMap } = useDictionary('session');
  const { name } = useDictionary('theme');
  const statusOptions = computed<SelectOptionData[]>(() => status as SelectOptionData[]);
  const themeOptions = computed<SelectOptionData[]>(() => name as unknown as SelectOptionData[]);

  const generateFormModel = () => {
    return {
      sessionId: '',
      themeName: '',
      contentType: '',
      sessionDate: [],
      status: ''
    };
  };
  const formModel = ref(generateFormModel());

  return {
    status,
    name,
    getDictionaryMap,
    statusOptions,
    themeOptions,
    formModel,
    generateFormModel
  };
}
