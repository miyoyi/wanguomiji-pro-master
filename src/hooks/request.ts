import { ref, UnwrapRef } from 'vue';
import { AxiosResponse } from 'axios';
import { HttpResponse } from '@/api/interceptor';
import useLoading from './loading';

// use to fetch list
// Don't use async function. It doesn't work in async function.
// Use the bind function to add parameters
// example: useRequest(api.bind(null, {}))

export interface UseRequestOption {
  defaultValue?: any;
  manual?: boolean;
  onSuccess?: (res: any) => void;
  onError?: (err: any) => void;
  onFinally?: () => void;
}

export default function useRequest<T>(
  api: <P>(params?: P) => Promise<AxiosResponse<HttpResponse>>,
  option?: UseRequestOption
) {
  const { defaultValue = [], manual, onSuccess, onError, onFinally } = option || {};
  const { loading, setLoading } = useLoading(false);
  const data = ref<T>(defaultValue);
  const response = ref<HttpResponse>();

  const run = <K>(payload?: K) => {
    setLoading(true);
    api(payload)
      .then((res) => {
        response.value = res as unknown as HttpResponse;
        data.value = res.data as unknown as UnwrapRef<T>;
        onSuccess?.(response.value);
      })
      .catch((e) => {
        onError?.(e);
      })
      .finally(() => {
        setLoading(false);
        onFinally?.();
      });
  };
  if (!manual) {
    run();
  }
  return { loading, data, run, response };
}
