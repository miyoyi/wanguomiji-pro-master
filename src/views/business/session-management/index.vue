<template>
  <div class="container">
    <Breadcrumb :items="['业务中心', '场次管理']" />
    <a-card class="general-card" title="场次管理">
      <a-row>
        <a-col :flex="1">
          <a-form
            :model="formModel"
            :label-col-props="{ span: 6 }"
            :wrapper-col-props="{ span: 18 }"
            label-align="left"
          >
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item field="sessionId" label="场次编号">
                  <a-input v-model="formModel.sessionId" placeholder="请输入场次编号" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="themeName" label="主题名称">
                  <a-select
                    v-model="formModel.themeName"
                    :options="themeOptions"
                    placeholder="请选择主题名称"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="sessionDate" label="场次日期">
                  <a-range-picker v-model="formModel.sessionDate" style="width: 100%" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="status" label="状态">
                  <a-select
                    v-model="formModel.status"
                    :options="statusOptions"
                    placeholder="全部"
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
        <a-divider style="height: 84px" direction="vertical" />
        <a-col :flex="'86px'" style="text-align: right">
          <a-space direction="vertical" :size="18">
            <a-button type="primary" @click="search(formModel)">
              <template #icon>
                <icon-search />
              </template>
              查询
            </a-button>
            <a-button @click="onReset">
              <template #icon>
                <icon-refresh />
              </template>
              重置
            </a-button>
          </a-space>
        </a-col>
      </a-row>
      <a-divider style="margin-top: 0" />
      <a-row style="margin-bottom: 16px">
        <a-col :span="16">
          <a-space>
            <a-button type="primary" @click="openModal('add')">
              <template #icon>
                <icon-plus />
              </template>
              新建
            </a-button>
            <a-upload action="/">
              <template #upload-button>
                <a-button> 批量导入 </a-button>
              </template>
            </a-upload>
          </a-space>
        </a-col>
        <a-col :span="8" style="text-align: right">
          <a-button>
            <template #icon>
              <icon-download />
            </template>
            下载
          </a-button>
        </a-col>
      </a-row>
      <a-table
        row-key="sessionId"
        :loading="loading"
        :pagination="pagination"
        :data="data"
        :bordered="false"
        @page-change="onPageChange"
      >
        <template #columns>
          <a-table-column title="场次编号" data-index="sessionId" />
          <a-table-column title="主题名称" data-index="themeName" />
          <a-table-column title="人数" data-index="playersNumber" align="center" />
          <a-table-column title="计划时间段" align="center">
            <template #cell="{ record }">
              {{ record.scheduledStartTime + ' - ' + record.scheduledEndTime }}
            </template>
          </a-table-column>
          <a-table-column title="实际时间段" align="center">
            <template #cell="{ record }">
              {{ record.actualStartTime + ' - ' + record.actualEndTime }}
            </template>
          </a-table-column>
          <a-table-column title="场次日期" data-index="sessionDate" align="center" />
          <a-table-column title="备注" data-index="remark" />
          <a-table-column title="状态" align="center">
            <template #cell="{ record }">
              {{ getDictionaryMap('status', record.status) }}
            </template>
          </a-table-column>
          <a-table-column title="操作" data-index="operations" align="center" fixed="right">
            <template #cell>
              <a-button type="text" size="small" @click="openModal('view')"> 查看 </a-button>
              <a-button type="text" size="small" @click="openModal('edit')"> 编辑 </a-button>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-card>
  </div>
  <EditModal v-model:visible="visible" :type="type" />
</template>

<script lang="ts" setup>
  import useModal from '@/hooks/modal';
  import useTable from '@/hooks/table';
  import { querySessionList } from '@/api/module/session';
  import EditModal from './components/EditModal.vue';
  import useSearchForm from './hooks/useSearchForm';

  const { visible, type, openModal } = useModal();
  const { getDictionaryMap, statusOptions, themeOptions, formModel, generateFormModel } =
    useSearchForm();
  const { loading, pagination, data, search, reset, onPageChange } = useTable(querySessionList);

  const onReset = () => {
    formModel.value = generateFormModel();
    reset();
  };
</script>

<script lang="ts">
  export default {
    name: 'SearchTable'
  };
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
  }

  :deep(.arco-table-th) {
    &:last-child {
      .arco-table-th-item-title {
        margin-left: 16px;
      }
    }
  }
</style>
