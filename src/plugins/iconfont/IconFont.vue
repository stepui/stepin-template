<script lang="ts" setup>
  defineProps({ name: String });
</script>
<template>
  <span role="img" class="anticon">
    <svg fill="currentColor" width="1em" height="1em" aria-hidden="true">
      <use :xlink:href="`#${name}`"></use>
    </svg>
  </span>
</template>
