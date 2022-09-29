import { TableData } from '@arco-design/web-vue';
import { Pagination } from '@/types/global';
import { reactive, Ref, ref, watch } from 'vue';
import { AxiosResponse } from 'axios';
import { HttpResponse } from '@/api/interceptor';
import useRequest, { UseRequestOption } from './request';

export type UseTableOption = UseRequestOption;

export interface HttpTableResponse extends HttpResponse {
  total: number;
}

export default function useTable(
  api: <T>(params?: T) => Promise<AxiosResponse<HttpResponse>>,
  option?: UseTableOption
) {
  const { run, loading, data, response } = useRequest(api, {
    defaultValue: [],
    ...option
  });
  const basePagination: Pagination = {
    current: 1,
    pageSize: 20
  };
  const pagination = reactive({
    ...basePagination
  });
  const formData = ref();
  watch(
    () => response as unknown as HttpTableResponse,
    ({ total = 0 }) => {
      pagination.total = total;
    }
  );
  const search = <T>(params?: T) => {
    formData.value = params;
  };
  const reset = <T>(params?: T) => {
    formData.value = params;
    pagination.current = 1;
  };

  const onPageChange = (current: number) => {
    pagination.current = current;
  };
  const fetchData = async <T>(params?: T) => {
    run({ params, ...pagination });
  };

  watch(
    formData,
    () => {
      fetchData(formData);
    },
    { deep: true, immediate: true }
  );
  watch(
    () => pagination.current,
    () => {
      fetchData(formData);
    }
  );

  return {
    loading,
    pagination,
    data: data as Ref<TableData[]>,
    search,
    reset,
    onPageChange
  };
}
