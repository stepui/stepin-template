<script lang="ts" setup>
  import { reactive, ref, PropType, Component, watch } from 'vue';
  // @ts-ignore
  import * as icons from '@ant-design/icons-vue/es/icons';
  import GridList from '../list/GridList.vue';
  import { PaginationProps } from 'ant-design-vue';
  import { debounce } from 'lodash';

  type IconType = 'outlined' | 'filled' | 'twoTone';
  type SelectMode = 'multiple' | 'single';

  const iconMap = {
    outlined: [] as Component[],
    filled: [] as Component[],
    twoTone: [] as Component[],
  };

  const props = defineProps({
    mode: {
      type: String as PropType<SelectMode>,
      default: 'single',
    },
    value: {
      type: [String, Number, Object, Boolean, Array],
    },
  });

  // 分类
  for (const key in icons as { [key: string]: Component }) {
    if (key.endsWith('TwoTone')) {
      iconMap.twoTone.push(icons[key]);
    } else if (key.endsWith('Outlined')) {
      iconMap.outlined.push(icons[key]);
    } else if (key.endsWith('Filled')) {
      iconMap.filled.push(icons[key]);
    }
  }

  iconMap.twoTone.sort();
  iconMap.outlined.sort();
  iconMap.filled.sort();

  const current = reactive({
    outlined: 1,
    filled: 1,
    twoTone: 1,
  });

  const pageBase: PaginationProps = {
    pageSize: 40,
    hideOnSinglePage: true,
    showSizeChanger: false,
    size: 'small',
  };

  const visible = ref(false);

  const select = ref<Component[]>([]);
  const value = {
    multiple: [] as Array<any>,
    single: null,
  };

  watch(
    () => props.value,
    (val, old) => {
      value.multiple = props.value;
    }
  );

  function onSelect(icon: Component) {
    const index = select.value.indexOf(icon);
    if (props.mode === 'multiple') {
      if (index === -1) {
        select.value.push(icon);
      } else {
        select.value.splice(index, 1);
      }
    } else {
    }

    searchValue.value = '';
    searchIcon('');
  }

  /**
   * 移除选中
   * @param icon
   */
  function remove(icon: Component) {
    const index = select.value.indexOf(icon);
    select.value.splice(index, 1);
  }

  /**
   * 搜索图标
   * @param keyword
   */
  function searchIcon(keyword: string) {
    const empty = keyword === '';

    const group = groupList.find((item) => item.key === active.value)!;

    const reg = new RegExp(keyword.toLowerCase());

    group.iconList = empty
      ? iconMap[active.value]
      : iconMap[active.value].filter((icon) => reg.test(icon.name!.toLocaleLowerCase()));
    group.searchCount = empty ? undefined : group.iconList.length;

    groupList
      .filter((item) => item !== group)
      .forEach((g) => {
        g.searchCount = empty
          ? undefined
          : iconMap[g.key].filter((icon) => reg.test(icon.name!.toLocaleLowerCase())).length;
      });
    loading.value = false;
  }

  /**
   * 搜索防抖
   */
  const _search = debounce(searchIcon, 300);

  /**
   * 搜索监听
   * @param value
   */
  function onSearch(value: string) {
    searchValue.value = value;
    loading.value = true;
    _search(value);
  }

  const active = ref<IconType>('outlined');

  const searchValue = ref('');

  type IconGroup = {
    title: string;
    key: IconType;
    searchCount: undefined | number;
    iconList: Component[];
  };

  const groupOutlined: IconGroup = reactive({
    title: '线框风格',
    key: 'outlined',
    searchCount: undefined,
    iconList: iconMap.outlined,
  });
  const groupFilled: IconGroup = reactive({
    title: '实底风格',
    key: 'filled',
    searchCount: undefined,
    iconList: iconMap.filled,
  });
  const groupTwoTone: IconGroup = reactive({
    title: '双色风格',
    key: 'twoTone',
    searchCount: undefined,
    iconList: iconMap.twoTone,
  });

  const groupList = reactive([groupOutlined, groupFilled, groupTwoTone]);

  function onChange() {
    searchIcon(searchValue.value);
  }

  const loading = ref(false);
</script>
<template>
  <a-select
    @click="() => (visible = true)"
    mode="multiple"
    :showSearch="true"
    v-model:value="select"
    :open="visible"
    @blur="() => (visible = false)"
    @search="onSearch"
    :searchValue="searchValue"
  >
    <template #dropdownRender>
      <a-spin tip="加载中..." :spinning="loading">
        <a-tabs @change="onChange" v-model:activeKey="active" class="icon-selector px-base pb-base" @mousedown.prevent>
          <a-tab-pane :key="group.key" v-for="group in groupList">
            <template #tab>
              <a-badge :class="{ 'text-primary-500': active === group.key }" :count="group.searchCount" showZero>
                {{ group.title }}
              </a-badge>
            </template>
            <GridList
              class="icon-container"
              :dataSource="group.iconList"
              :column="8"
              :pagination="{
                ...pageBase,
                current: current[group.key],
                'onUpdate:current': (val) => (current[group.key] = val),
              }"
            >
              <template #renderItem="{ item }">
                <div
                  @click="onSelect(item)"
                  :class="`icon-item bg-white cursor-pointer h-10 w-10 flex justify-center items-center ${
                    select.indexOf(item) !== -1 ? 'bg-primary-100' : ''
                  }`"
                >
                  <component class="icon transition" :is="item" />
                </div>
              </template>
            </GridList>
          </a-tab-pane>
        </a-tabs>
      </a-spin>
    </template>
    <template #tagRender="item">
      <div class="mx-0.5 bg-bg-disabled p-1 rounded-sm flex items-center cursor-pointer">
        <component :is="item.value" />
        <CloseOutlined class="text-subtext text-[10px] ml-1 hover:text-text" @click="remove(item.value)" />
      </div>
    </template>
  </a-select>
</template>
<style lang="less" scoped>
  .icon-selector {
    :deep(.icon-container) {
      @apply p-2 text-xl grid gap-2 bg-gray-100 rounded;
      .icon-item {
        @apply rounded-sm border border-solid border-transparent;
        &:hover {
          @apply border-primary-500;
          .icon {
            @apply scale-125;
          }
        }
      }
    }
  }
</style>
