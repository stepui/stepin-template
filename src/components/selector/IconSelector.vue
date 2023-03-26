<script lang="ts" setup>
  import { ref, computed, Ref } from 'vue';
  import type { Component, PropType } from 'vue';
  import GridList from '../list/GridList.vue';
  import { PaginationProps } from 'ant-design-vue';
  import { debounce } from 'lodash';
  import useModelValue from '@/utils/useModelValue';

  export interface IconSelectOption {
    label?: string;
    component: string | Component;
    value: string | number;
  }

  export interface IconSelectGroup {
    title: string;
    key: string | number;
    list: IconSelectOption[];
  }

  type SelectMode = 'multiple' | 'single';

  const props = defineProps({
    mode: {
      type: String as PropType<SelectMode>,
      default: 'multiple',
    },
    value: {
      type: [Array<string | number>, String, Number],
      default(rawProps: any) {
        if (rawProps.mode === 'multiple' || !rawProps.mode) {
          return undefined;
        } else {
          return undefined;
        }
      },
    },
    column: {
      type: Number,
      default: 8,
    },
    placeholder: {
      type: String,
      default: '选择图标，输入文字搜索...',
    },
    options: {
      type: [Array<IconSelectOption>, Array<IconSelectGroup>],
      default: [],
    },
  });

  const emit = defineEmits<{
    (e: 'update:value', args: (string | number)[] | undefined | string | number): void;
  }>();

  // 分页
  const pageBase: PaginationProps = {
    pageSize: props.column * 5,
    hideOnSinglePage: true,
    showSizeChanger: false,
    size: 'small',
  };

  const visible = ref(false);

  const isMultiple = computed(() => props.mode === 'multiple');

  /**
   * 格式化分组
   */
  const groupList = computed<(IconSelectGroup & { _searchList: IconSelectOption[]; _current: Ref<number> })[]>(() => {
    if (props.options.length === 0 || (props.options as IconSelectGroup[])[0].title !== undefined) {
      return (props.options as IconSelectGroup[]).map((group) => ({
        ...group,
        _current: ref(1),
        _searchList: group.list,
      }));
    }
    return [
      {
        title: '全部图标',
        key: '__dft',
        list: props.options as IconSelectOption[],
        _current: ref(1),
        _searchList: [...props.options] as IconSelectOption[],
      },
    ];
  });

  /**
   * icon 字典 (方便搜索和查找)
   */
  const iconMap = computed(() => {
    const map = new Map<string | number, IconSelectOption>();
    groupList.value
      .flatMap((group) => group.list)
      .forEach((item) => {
        map.set(item.value, item);
      });
    return map;
  });

  const { value: select } = useModelValue(
    () =>
      Array.isArray(props.value) || props.value === undefined ? (props.value as Array<string | number>) : [props.value],
    (val) => emit('update:value', isMultiple.value ? val : val?.[0])
  );

  /**
   * 选中图标
   * @param icon
   */
  function onSelect(icon: IconSelectOption) {
    const index = select.value?.indexOf(icon.value) ?? -1;
    if (index === -1) {
      select.value = isMultiple.value ? [...(select.value ?? []), icon.value] : [icon.value];
    } else if (isMultiple.value) {
      remove(icon.value);
    }
    if (!isMultiple.value) {
      visible.value = false;
    }
    searchValue.value = '';
    searchIcon('');
  }

  /**
   * 移除选中
   * @param icon
   */
  function remove(iconKey: string | number) {
    const index = select.value?.findIndex((icon) => icon === iconKey) ?? -1;
    if (index >= 0) {
      select.value = select.value?.filter((icon) => icon !== iconKey);
    }
  }

  /**
   * 搜索图标
   * @param keyword
   */
  function searchIcon(keyword: string) {
    const empty = keyword === '';

    const group = groupList.value.find((item) => item.key === active.value)!;

    const reg = new RegExp(keyword.toLowerCase());

    const filterIcon = (reg: RegExp, list: IconSelectOption[]) => {
      return list.filter((icon) => reg.test(icon.label!.toLocaleLowerCase()));
    };

    group._searchList = empty ? [...group.list] : filterIcon(reg, group.list);

    setTimeout(() => {
      groupList.value
        .filter((item) => item !== group)
        .forEach((g) => {
          g._searchList = empty ? [...g.list] : filterIcon(reg, g.list);
        });
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

  // 当前激活分组
  const active = ref(groupList.value[0]?.key);

  // 搜索关键字
  const searchValue = ref('');

  const loading = ref(false);

  function selected(icon: IconSelectOption) {
    return select.value?.includes(icon.value);
  }
</script>
<template>
  <a-select
    @click="() => (visible = true)"
    :showSearch="true"
    mode="multiple"
    v-model:value="select"
    :open="visible"
    @blur="() => (visible = false)"
    @search="onSearch"
    :searchValue="searchValue"
    v-bind="{ placeholder }"
    allow-clear
  >
    <template #dropdownRender>
      <a-spin tip="搜索中..." :spinning="loading">
        <a-tabs
          v-model:activeKey="active"
          :class="[
            'icon-selector',
            'px-base',
            'pb-base',
            { 'no-group pt-[12px]': groupList.length === 1 && groupList[0].key === '__dft' },
          ]"
          @mousedown.prevent
        >
          <a-tab-pane :key="group.key" v-for="group in groupList">
            <template #tab>
              <a-badge
                :class="{ 'text-primary-500': active === group.key }"
                :count="group._searchList.length === group.list.length ? undefined : group._searchList.length"
                showZero
              >
                {{ group.title }}
              </a-badge>
            </template>
            <GridList
              class="icon-container"
              :dataSource="group._searchList"
              :column="column"
              :pagination="{
                ...pageBase,
                current: group._current.value,
                'onUpdate:current': (val) => (group._current.value = val),
              }"
            >
              <template #renderItem="{ item }">
                <div
                  @click="onSelect(item)"
                  :class="`icon-item bg-container cursor-pointer h-10 w-10 flex justify-center items-center ${
                    selected(item) ? 'bg-primary-100' : ''
                  }`"
                >
                  <component class="icon transition" :is="item.component" />
                </div>
              </template>
            </GridList>
          </a-tab-pane>
        </a-tabs>
      </a-spin>
    </template>
    <template #tagRender="item">
      <div class="mx-0.5 bg-bg-disabled p-1 rounded-sm flex items-center cursor-pointer">
        <component :is="iconMap.get(item.value)?.component" />
        <CloseOutlined
          v-if="isMultiple"
          class="text-subtext text-[10px] ml-1 hover:text-text"
          @click="remove(item.value)"
        />
      </div>
    </template>
  </a-select>
</template>
<style lang="less" scoped>
  .icon-selector {
    :deep(.icon-container) {
      @apply p-2 text-xl grid gap-2 bg-layout rounded;

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

    &.no-group {
      :deep(.ant-tabs-nav) {
        @apply hidden;
      }
    }
  }
</style>
