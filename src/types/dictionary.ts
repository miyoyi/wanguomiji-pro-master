export type SceneType = 'session' | 'theme';

export interface DictionaryMap {
  [key: string]: (
    | {
        label: string;
        value: string;
      }
    | undefined
  )[];
}

export type DictionaryState = Record<SceneType, DictionaryMap>;
