<template>
  <div class="about-us grid grid-cols-12 gap-4">
    <div class="card p-md col-span-12 lgx:col-span-7 flex justify-between items-stretch drop-shadow-sm">
      <div class="flex flex-col justify-between">
        <div class="">
          <div class="text-subtext font-bold mb-1">本项目由 @iczer 倾情奉献</div>
          <h1 class="text-title font-bold text-xl mb-4">Stepin Template for Ant Design</h1>
          <p class="text-subtext">无论是颜色、卡片、排版还是复杂的元素，你都能找到详细的文档。</p>
        </div>
        <a class="">了解更多 ></a>
      </div>
      <img class="rounded-lg" style="width: 200px" src="@/assets/image/step.jpg" />
    </div>
    <div style="min-height: 232px" class="card p-md col-span-12 lgx:col-span-5 text-inverse drop-shadow-sm">
      <div class="work-with-us text-text-inverse w-full h-full p-lg rounded-lg flex flex-col justify-between">
        <div class="main">
          <h2 class="text-xl mb-4 font-bold">和优秀的人一起成长</h2>
          <p>财富创造是一种成长型的零和游戏，关键在于谁先抓住机会。</p>
        </div>
        <a class="text-text-inverse">了解更多 ></a>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup></script>
<style lang="less" scoped>
  .work-with-us {
    background: linear-gradient(35deg, #844efd, #2533b2, #09b3ef);
  }
</style>
