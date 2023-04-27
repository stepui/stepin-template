<script lang="ts" setup>
  defineProps({ name: String });
</script>
<template>
  <span role="img" style="line-height: 1">
    <svg fill="currentColor" style="vertical-align: top" width="1em" height="1em" aria-hidden="true">
      <use :xlink:href="`#${name}`"></use>
    </svg>
  </span>
</template>
