<script lang="ts" setup>
import { ref, onMounted } from 'vue'

const Scroll = ref<HTMLElement | null>(null)
let isDown = false
let startY: number
let scrollTop: number

onMounted(() => {
  const $Scroll = Scroll.value
  if ($Scroll) {
    $Scroll.addEventListener('wheel', function (e) {
      e.preventDefault()
      $Scroll.scrollTop += e.deltaY / 2
    })

    $Scroll.addEventListener('mousedown', (e) => {
      isDown = true
      startY = e.pageY
      scrollTop = $Scroll.scrollTop
    })

    $Scroll.addEventListener('mouseup', () => {
      isDown = false
    })

    $Scroll.addEventListener('mousemove', (e) => {
      if (!isDown) return
      const y = e.pageY
      const walk = y - startY
      $Scroll.scrollTop = scrollTop - walk
    })
  }
})
</script>

<template>
  <div class="scroll" ref="Scroll">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.scroll {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  overflow: hidden;
  user-select: none;

}
</style>
