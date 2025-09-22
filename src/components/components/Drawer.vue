<script lang="ts" setup>
import { computed, ref } from 'vue'

// 定义props，并设置默认值
const props = withDefaults(
  defineProps<{
    direction: string
    width: string
  }>(),
  {
    direction: 'left',
    width: '20.8vw',
  }
)

// 定义一个响应式变量isHidden，初始值为false
const isHidden = ref(false)
// 定义一个toggle函数，用于切换isHidden的值
const toggle = () => {
  isHidden.value = !isHidden.value
}

// 计算属性，用于计算Drawer的样式
const DrawerSty = computed(() => {
  // 定义一个对象，用于存储Drawer的样式
  const sty: { [key: string]: string } = {
    width: props.width,
  }
  // 如果props.direction的值为'left'，则设置Drawer的left属性
  if (props.direction === 'left') {
    sty.left = isHidden.value ? '-' + sty.width : '0'
    // 如果props.direction的值为'right'，则设置Drawer的right属性
  } else if (props.direction === 'right') {
    sty.right = isHidden.value ? '-' + sty.width : '0'
  }
  // 返回计算后的样式
  return sty
})

const showHideSty = computed(() => {
  return props.direction === 'left' ? { left: '100%' } : { right: '100%' }
  //决定元素的显示和隐藏样式
})

</script>

<template>
  <div class="drawer" :style="DrawerSty">
    <slot></slot>
    <div class="show-hide" :style="showHideSty" @click="toggle">
    </div>
  </div>
</template>

<style lang="scss" scoped>
.drawer {
  position: absolute;
  bottom: 0;
  top: 0;
  background-color: #fff;
  transition: left 0.5s ease, right 0.5s ease;

  .show-hide {
    position: absolute;
    top: 0;
    width: 20px;
    height: 50px;
    background-color: #6fbbb8;
    cursor: pointer;

    .arrow {
      position: relative;
      top: 16px;
      right: 6px;
      border-left: 10px solid #ffffff00;
      border-right: 10px solid #ffffff;
      border-top: 10px solid #ffffff00;
      border-bottom: 10px solid #ffffff00;
      transform-origin: 16px 9px;
    }
  }
}
</style>
