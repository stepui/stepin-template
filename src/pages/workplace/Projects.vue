<template>
  <div class="projects card">
    <div class="flex items-baseline justify-between">
      <overview-title title="工程项目" subtitle="本月进度" change="+40%" />
      <div class="extra">
        <a-radio-group>
          <a-radio-button>全部</a-radio-button>
          <a-radio-button>在线</a-radio-button>
          <a-radio-button>商店</a-radio-button>
        </a-radio-group>
      </div>
    </div>
    <a-table :columns="columns" :dataSource="dataSource" :pagination="false">
      <template #bodyCell="{ record, text, column }">
        <template v-if="column.dataIndex === 'company'">
          <div class="flex items-center">
            <img class="w-6" :src="text.logo" />
            <span class="ml-sm">{{ text.name }}</span>
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'progress'">
          <a-progress size="small" :percent="text * 100" :status="mapStatus(record.status, text)" />
        </template>
        <template v-else-if="column.dataIndex === 'members'">
          <avatar-list :size="28" :source="text" />
        </template>
      </template>
    </a-table>
    <a-button size="large" class="add-btn" type="dashed">
      <template #icon>
        <upload-outlined />
      </template>
      添加新项目
    </a-button>
  </div>
</template>
<script lang="ts" setup>
  import OverviewTitle from '@/components/statistic/OverviewTitle.vue';
  import AvatarList from '@/components/avatar/AvatarList.vue';
  import { formatThousand } from '@/utils/formatter';

  function mapStatus(status: string, progress: number) {
    switch (status) {
      case 'normal':
        return progress < 1 ? 'active' : 'success';
      case 'canceled':
        return 'exception';
      default:
        return 'normal';
    }
  }

  const columns = [
    { title: '企业', dataIndex: 'company' },
    { title: '成员', dataIndex: 'members' },
    {
      title: '预算',
      dataIndex: 'budget',
      customRender: ({ text }: { text: number }) => '￥' + formatThousand(text),
      customCell: () => {
        return {
          style: 'color: #9e9e9e;font-weight: 700;font-size:12px;',
        };
      },
    },
    { title: '进度', dataIndex: 'progress' },
  ];

  const dataSource = [
    {
      company: { logo: '/src/assets/logo/shopify.svg', name: 'Shopify' },
      members: [
        { avatar: '/src/assets/avatar/face-1.jpg', nickname: 'jock' },
        { avatar: '/src/assets/avatar/face-2.jpg', nickname: 'jock' },
        { avatar: '/src/assets/avatar/face-3.jpg', nickname: 'jock' },
        { avatar: '/src/assets/avatar/face-4.jpg', nickname: 'jock' },
      ],
      budget: 3200.23,
      status: 'normal',
      progress: 0.23,
    },
    {
      company: { logo: '/src/assets/logo/slack.svg', name: 'Shopify' },
      members: [
        { avatar: '/src/assets/avatar/face-3.jpg', nickname: 'jock' },
        { avatar: '/src/assets/avatar/face-4.jpg', nickname: 'jock' },
      ],
      budget: 1200,
      status: 'normal',
      progress: 0.23,
    },
    {
      company: { logo: '/src/assets/logo/invision.svg', name: 'Shopify' },
      members: [
        { avatar: '/src/assets/avatar/face-4.jpg', nickname: 'jock' },
        { avatar: '/src/assets/avatar/face-2.jpg', nickname: 'jock' },
        { avatar: '/src/assets/avatar/face-3.jpg', nickname: 'jock' },
      ],
      budget: 1200,
      status: 'normal',
      progress: 0.83,
    },
    {
      company: { logo: '/src/assets/logo/jira.svg', name: 'Shopify' },
      members: [
        { avatar: '/src/assets/avatar/face-1.jpg', nickname: 'jock' },
        { avatar: '/src/assets/avatar/face-4.jpg', nickname: 'jock' },
      ],
      budget: 1200,
      status: 'normal',
      progress: 1,
    },
    {
      company: { logo: '/src/assets/logo/atlassian.svg', name: 'Shopify' },
      members: [{ avatar: '/src/assets/avatar/face-1.jpg', nickname: 'jock' }],
      budget: 1200,
      status: 'normal',
      progress: 0.47,
    },
    {
      company: { logo: '/src/assets/logo/spotify.svg', name: 'Shopify' },
      members: [
        { avatar: '/src/assets/avatar/face-1.jpg', nickname: 'jock' },
        { avatar: '/src/assets/avatar/face-2.jpg', nickname: 'jock' },
        { avatar: '/src/assets/avatar/face-3.jpg', nickname: 'jock' },
        { avatar: '/src/assets/avatar/face-4.jpg', nickname: 'jock' },
      ],
      budget: 1200,
      status: 'canceled',
      progress: 1,
    },
  ];
</script>
<style lang="less" scoped>
  .projects {
    :deep(.ant-table) {
      @apply -mx-md;

      .ant-table-thead {
        > tr > th:first-child {
          @apply pl-lg;
        }

        > tr > th:last-child {
          @apply pr-lg;
        }
      }

      .ant-table-tbody {
        > tr > td {
          @apply border-b-0 border-t;

          &:first-child {
            @apply pl-lg;
          }

          &:last-child {
            @apply pr-lg;
          }
        }
      }
    }

    :deep(.ant-table-thead > tr > th) {
      @apply border-none bg-transparent text-subtext;

      &:not(:last-child):not(.ant-table-selection-column):not(.ant-table-row-expand-icon-cell):not([colspan])::before {
        @apply bg-transparent;
      }
    }

    .add-btn {
      @apply justify-center flex items-center mt-md -mx-2;
      width: calc(100% + 16px);
    }
  }
</style>
