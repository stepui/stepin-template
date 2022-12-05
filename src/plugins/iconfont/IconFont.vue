<script lang="ts" setup>
  defineProps<{ name: string }>();
</script>
<template>
  <span role="img" class="text-sm">
    <svg width="1rem" height="1rem" aria-hidden="true">
      <use :xlink:href="`#${name}`"></use>
    </svg>
  </span>
</template>
