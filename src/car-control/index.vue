<template>
  <div class="car-control"></div>
</template>

<script lang="ts">
import CarControl from './index';

export default {
  mounted() {
    new CarControl({
      width: window.innerWidth,
      height: window.innerHeight,
      targetElement: document.querySelector('.car-control') as HTMLElement,
    });
  },
}
</script>


<style>

</style>