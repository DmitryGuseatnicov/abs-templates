<script setup lang="ts">
import { AppHeader } from '~/components/AppHeader';

</script>

<template>
  <div class="default-layout">
    <AppHeader />
    <main>
      <slot />
    </main>
  </div>
</template>
