import { useDictionaryStore } from '@/store';
import { DictionaryMap, SceneType } from '@/types/dictionary';

const dictionaryStore = useDictionaryStore();

export default function useDictionary(scene: SceneType) {
  const dictionary = dictionaryStore.getDictionary(scene) as DictionaryMap;

  type DictionaryKey = keyof typeof dictionary;
  const getDictionaryMap = <T extends DictionaryKey>(dictionaryKey: T, value: string): string => {
    const dictionaryArray = dictionary[dictionaryKey];
    return dictionaryArray.find((item) => item?.value === value)?.label || '--';
  };

  return {
    getDictionaryMap,
    ...dictionary
  } as unknown as typeof getDictionaryMap & DictionaryMap;
}
