<script lang="ts" setup>
import EditableCell from '@/components/editable-cell';
import {
  EditFilled,
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
} from '@ant-design/icons-vue';
import { reactive, ref } from 'vue';

const profiles = reactive([
  {
    label: 'Full Name',
    content: 'Li Zhi',
  },
  {
    label: 'Mobile',
    content: '13678988900',
  },
  {
    label: 'Email',
    content: 'lizhi@firfox.com',
  },
  {
    label: 'Location',
    content: 'shenzheng.CN',
  },
]);

const edit = ref(false)
</script>
<template>
  <a-card title="Profile Information" class="profile-info rounded-xl shadow-lg" :bordered="false">
    <template #extra>
      <EditFilled @click="edit = true" class="text-subtext hover:text-primary cursor-pointer" />
    </template>
    <div class="description">
      <EditableCell :options="{ rows: 4 }" v-model:edit="edit" type="textarea" value="Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no.
      If two equally difficult paths, choose the one more painful in the short
      term (pain avoidance is creating an illusion of equality).">
      </EditableCell>
    </div>
    <a-divider />
    <div class="text-title font-medium">Oliver Liam</div>
    <a-descriptions class="profile-list mt-3 font-medium" :column="1">
      <a-descriptions-item :label="item.label" v-for="item in profiles">
        {{ item.content }}
      </a-descriptions-item>
      <a-descriptions-item label="Contact">
        <TwitterOutlined class="text-blue-400" />
        <FacebookOutlined class="text-blue-800" />
        <InstagramOutlined class="text-red-500" />
      </a-descriptions-item>
    </a-descriptions>
  </a-card>
</template>
<style lang="less" scoped>
.profile-info {
  :deep(.ant-card) {
    &-head {
      @apply border-none;

      &-title {
        @apply font-semibold;
      }
    }

    &-body {
      @apply pt-1;
    }
  }

  :deep(.ant-descriptions) {
    &-row:last-child>td {
      padding-bottom: 0;
    }

    &-item {
      &-content {
        @apply items-center;

        .anticon {
          @apply text-base;

          &:not(:first-child) {
            @apply ml-2;
          }
        }
      }
    }
  }
}
</style>
