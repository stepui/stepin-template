<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import {
    PlusOutlined,
    EditFilled,
    UploadOutlined,
    SaveOutlined,
  } from '@ant-design/icons-vue';
  import EditableCell from '@/components/editable-cell';
  import { message } from 'ant-design-vue';
  import { getBase64 } from '@/utils/file';

  const columns = [
    { title: 'COMPANIES', dataIndex: 'company' },
    {
      title: 'BUDGET',
      dataIndex: 'budget',
      customRender: ({ text }: any) => `$${text}`,
    },
    { title: 'STATUS', dataIndex: 'status' },
    { title: 'COMPLETION', dataIndex: 'progress' },
    { title: 'OPERATION', dataIndex: 'operation', width: 200, align: 'center' },
  ];

  type Project = {
    logo?: string;
    company?: string;
    budget?: number;
    status?: number;
    progress?: number;
    _edit?: boolean;
  };

  const projects = reactive<Array<Project>>([
    {
      logo: '/src/assets/logo/shopify.svg',
      company: 'shopify',
      budget: 1200,
      status: 1,
      progress: 90,
    },
    {
      logo: '/src/assets/logo/atlassian.svg',
      company: 'atlassian',
      budget: 1200,
      status: 1,
      progress: 90,
    },
    {
      logo: '/src/assets/logo/invision.svg',
      company: 'invision',
      budget: 1200,
      status: 1,
      progress: 90,
    },
    {
      logo: '/src/assets/logo/jira.svg',
      company: 'jira',
      budget: 1200,
      status: 1,
      progress: 90,
    },
  ]);

  const mapStatus = (val: number) => {
    switch (val) {
      case -1:
        return 'exception';
      case 0:
        return 'pause';
      case 1:
        return 'working';
      default:
        return 'unknown';
    }
  };

  function saveRecord(record: any) {
    record._edit = false;
    message.success('修改成功');
  }

  function extractImg(file: Blob, record: any) {
    getBase64(file).then((res) => {
      record.logo = res;
    });
  }

  /**
   * 新增记录
   */
  function addNew() {
    projects.push({ progress: 10, _edit: true });
  }
</script>
<template>
  <!-- 工程 -->
  <a-table
    :title="() => '工程表格'"
    v-bind="$attrs"
    :columns="columns"
    :dataSource="projects"
    :pagination="false"
    rowClassName="text-subtext"
  >
    <template #bodyCell="{ column, text, record }">
      <div class="flex items-center" v-if="column.dataIndex === 'company'">
        <EditableCell
          :options="{
            size: 'small',
            format: 'YYYY-MM-DD HH:mm',
            showTime: true,
          }"
          :edit="record._edit"
          v-model:value="record.company"
        >
          <template #input>
            <a-upload
              :show-upload-list="false"
              :beforeUpload="(file: File) => extractImg(file, record)"
            >
              <img
                class="h-8 rounded border border-dashed border-border p-0.5"
                v-if="record.logo"
                :src="record.logo"
              />
              <a-button v-else :loading="false" type="dashed">
                <template #icon>
                  <UploadOutlined />
                </template>
              </a-button>
            </a-upload>
            <a-input class="ml-2" v-model:value="record.company" />
          </template>
          <img class="w-8 rounded" :src="record.logo" />
          <span class="ml-2 text-title text-base">{{ record.company }}</span>
        </EditableCell>
      </div>
      <template v-else-if="column.dataIndex === 'budget'">
        <EditableCell
          v-model:value="record.budget"
          :edit="record._edit"
          :options="{
            prefix: '￥',
          }"
        >
          ￥{{ record.budget }}
        </EditableCell>
      </template>
      <template v-else-if="column.dataIndex === 'status'">
        <EditableCell
          :edit="record._edit"
          v-model:value="record.status"
          type="select"
          :options="{
            options: [
              { label: 'exception', value: -1 },
              { label: 'pause', value: 0 },
              { label: 'working', value: 1 },
            ],
            class: 'w-24',
          }"
        >
          <a-badge color="blue">
            <template #text>
              <span>{{ mapStatus(record.status) }}</span>
            </template>
          </a-badge>
        </EditableCell>
      </template>
      <template v-else-if="column.dataIndex === 'progress'">
        <EditableCell
          :edit="record._edit"
          v-model:value="record.progress"
          type="slider"
          :options="{ tooltipVisible: true }"
        >
          <a-progress
            :strokeWidth="4"
            :percent="record.progress"
            status="exception"
          />
        </EditableCell>
      </template>
      <template v-else-if="column.dataIndex === 'operation'">
        <a-button type="link" v-if="!record._edit" @click="record._edit = true">
          <template #icon>
            <EditFilled />
          </template>
          编辑
        </a-button>
        <a-button type="link" v-else @click="saveRecord(record)">
          <template #icon>
            <SaveOutlined />
          </template>
          保存
        </a-button>
      </template>
    </template>
    <template #summary>
      <a-table-summary>
        <a-table-summary-row>
          <a-table-summary-cell colspan="5">
            <a-button size="large" class="w-full" type="dashed" @click="addNew">
              <PlusOutlined />
              新增一列
            </a-button>
          </a-table-summary-cell>
        </a-table-summary-row>
      </a-table-summary>
    </template>
  </a-table>
</template>
