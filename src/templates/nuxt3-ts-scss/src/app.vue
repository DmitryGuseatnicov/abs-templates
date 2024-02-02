<script setup lang="ts">
import { Html, NuxtLayout, NuxtLoadingIndicator, NuxtPage } from '#components';

</script>

<template>
  <Html>
    <NuxtLayout>
      <NuxtLoadingIndicator color="#00a19c" :height="3" />
      <NuxtPage />
    </NuxtLayout>
  </Html>
</template>
