<template>
  <div class="theme">
    <a-steps :current="1">
      <a-step>
        <template #title>Finished</template>
        <template #description>
          <span>This is a description.</span>
        </template>
      </a-step>
      <a-step
        title="In Progress"
        sub-title="Left 00:00:08"
        description="This is a description."
      />
      <a-step title="Waiting" description="This is a description." />
    </a-steps>
    <a-steps>
      <a-step status="finish" title="Login">
        <template #icon>
          <user-outlined />
        </template>
      </a-step>
      <a-step status="finish" title="Verification">
        <template #icon>
          <solution-outlined />
        </template>
      </a-step>
      <a-step status="process" title="Pay">
        <template #icon>
          <loading-outlined />
        </template>
      </a-step>
      <a-step status="wait" title="Done">
        <template #icon>
          <smile-outlined />
        </template>
      </a-step>
    </a-steps>
    <div class="global-search-wrapper" style="width: 300px">
      <a-auto-complete
        class="global-search"
        style="width: 100%"
        option-label-prop="title"
      >
        <a-input-search placeholder="input here" enterButton></a-input-search>
      </a-auto-complete>
    </div>
    <a-cascader :options="options" placeholder="Please select" />
    <a-checkbox-group :options="['Apple', 'Pear', 'Orange']" />
    <a-space direction="vertical">
      <a-date-picker />
      <a-month-picker placeholder="Select month" />
      <a-range-picker />
      <a-week-picker placeholder="Select week" />
      <a-range-picker
        :show-time="{ format: 'HH:mm' }"
        format="YYYY-MM-DD HH:mm"
        :placeholder="['Start Time', 'End Time']"
      />
    </a-space>
    <a-form :model="form">
      <a-form-item required label="用户名" name="username">
        <a-input v-model:value="form.username" />
      </a-form-item>
      <a-form-item required label="密码" name="password">
        <a-input-password v-model:value="form.password" />
      </a-form-item>
      <a-button>提交</a-button>
    </a-form>
    <a-mentions autofocus v-model:value="author">
      <a-mentions-option value="afc163">afc163</a-mentions-option>
      <a-mentions-option value="zombieJ">zombieJ</a-mentions-option>
      <a-mentions-option value="yesmeck">yesmeck</a-mentions-option>
    </a-mentions>
    <a-radio disabled>Radio</a-radio>
    <a-radio-group>
      <a-radio-button value="a">Hangzhou</a-radio-button>
      <a-radio-button disabled value="b">Shanghai</a-radio-button>
      <a-radio-button value="c">Beijing</a-radio-button>
      <a-radio-button value="d">Chengdu</a-radio-button>
    </a-radio-group>
    <a-rate v-model:value="rate" allow-half />
    <a-switch checked-children="开" un-checked-children="关" />
    <br />
    <a-switch checked-children="1" un-checked-children="0" />
    <br />
    <a-switch>
      <template #checkedChildren><check-outlined /></template>
      <template #unCheckedChildren><close-outlined /></template>
    </a-switch>
    <a-switch loading :checked="true" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'Theme',
    data() {
      return {
        author: undefined,
        rate: 1,
        form: {
          username: '李志',
          password: '123456',
        },
        options: [
          {
            value: 'zhejiang',
            label: 'Zhejiang',
            children: [
              {
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [
                  {
                    value: 'xihu',
                    label: 'West Lake',
                  },
                ],
              },
            ],
          },
          {
            value: 'jiangsu',
            label: 'Jiangsu',
            children: [
              {
                value: 'nanjing',
                label: 'Nanjing',
                children: [
                  {
                    value: 'zhonghuamen',
                    label: 'Zhong Hua Men',
                  },
                ],
              },
            ],
          },
        ],
      };
    },
  });
</script>
