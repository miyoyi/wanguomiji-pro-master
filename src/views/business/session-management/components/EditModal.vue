<template>
  <a-modal
    v-model:visible="modelVisible"
    :title="title"
    :ok-loading="loading"
    @cancel="handleCancel"
    @ok="submit"
  >
    <a-form ref="formRef" :model="formModal" :rules="rules" :disabled="props.type === 'view'">
      <a-form-item field="themeCode" label="主题">
        <a-select
          v-model="formModal.themeCode"
          :options="themeOptions"
          placeholder="请选择主题名称"
        />
      </a-form-item>
      <a-form-item field="playersNumber" label="玩家数" placeholder="请输入玩家数">
        <a-input-number v-model="formModal.playersNumber" />
      </a-form-item>
      <a-form-item field="sessionTime" label="计划时间段">
        <a-range-picker v-model="formModal.sessionTime" show-time format="YYYY-MM-DD HH:mm" />
      </a-form-item>
      <a-form-item field="status" label="状态">
        <a-select
          v-model="formModal.status"
          :disabled="statusDisable"
          :options="statusOptions"
          placeholder="请选择主题名称"
        />
      </a-form-item>
      <a-form-item field="remark" label="备注">
        <a-textarea v-model="formModal.remark" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
  import useDictionary from '@/hooks/dictionary';
  import { Message, SelectOptionData } from '@arco-design/web-vue';
  import { computed, reactive, ref } from 'vue';
  import type { EditModalTitle, EditModalType } from '@/types/global';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import useRequest from '@/hooks/request';
  import { addSession, editSession } from '@/api/module/session';
  import { HttpResponse } from '@/api/interceptor';

  const props = defineProps<{
    type: EditModalType;
    visible: boolean;
    // eslint-disable-next-line no-use-before-define
    formData?: typeof formModal;
  }>();
  const title = computed((): EditModalTitle => {
    if (props.type === 'add') {
      return '新建';
    }
    if (props.type === 'edit') {
      return '编辑';
    }
    return '详情';
  });
  const emit = defineEmits(['update:visible']);
  const modelVisible = computed(() => props.visible);
  const handleCancel = () => {
    if (!loading.value) {
      emit('update:visible', false);
    }
  };

  const { status, getDictionaryMap } = useDictionary('session');
  const { name } = useDictionary('theme');
  const statusOptions = computed<SelectOptionData[]>(() => status as SelectOptionData[]);
  const themeOptions = computed<SelectOptionData[]>(() => name as unknown as SelectOptionData[]);
  const formRef = ref<FormInstance>();
  const formModal = reactive({
    themeCode: '',
    sessionTime: [],
    playersNumber: 0,
    status: '1',
    remark: ''
  });
  const rules = reactive({
    themeCode: [{ required: true, message: '请选择主题' }],
    sessionTime: [{ required: true, message: '请选择计划时间段' }],
    playersNumber: [{ required: true, message: '请输入玩家数' }],
    status: [{ required: true, message: '请选择状态' }]
  });
  const statusDisable = computed(() => {
    return true;
  });

  const api = computed(() => (props.type === 'add' ? addSession : editSession));
  const { loading, run } = useRequest(api.value, {
    manual: true,
    onSuccess: (res: HttpResponse) => {
      const { message } = res;
      Message.success(message);
    }
  });
  const submit = () => {
    formRef.value?.validate((errors) => {
      if (!errors) {
        run(formModal);
      }
    });
  };
</script>

<script lang="ts">
  export default {
    name: 'EditModal'
  };
</script>
