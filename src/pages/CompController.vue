<script lang="ts" setup>
import { useRenderConponentStore } from "@/stores/renderComponent";
import ElementHolder from "@/components/ElementHolder.vue";

const { compBucket } = useRenderConponentStore();
</script>
<template>
  <div class="left_panel">
    <ElementHolder :compList="compBucket"></ElementHolder>
  </div>
</template>
<style scoped>
.left_panel {
  flex-shrink: 0;
  width: 300px;
  height: fit-content;
  display: grid;
  grid-template-columns: 50% 50%;
}
</style>
