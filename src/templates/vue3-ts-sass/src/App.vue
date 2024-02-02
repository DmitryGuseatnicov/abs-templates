<script setup lang="ts">
import { RouterView } from 'vue-router';

import {AppHeader} from './components/AppHeader';

</script>

<template>
  <AppHeader  />
  <AppConfirm />
  <main>
    <RouterView />
  </main>
</template>

<style lang="scss">
</style>
