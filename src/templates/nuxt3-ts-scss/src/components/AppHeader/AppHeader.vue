<script setup lang="ts">
import { RouterLink } from 'vue-router';

import { appRoutes } from '@/appRoutes';

const APP_HEADER_ITEMS = [{ link: appRoutes.main().path, text: 'HOME' }];
</script>

<template>
  <header class="app-header">
    <div class="app-header__inner">
      <div class="app-header__navigation">
        <RouterLink
          v-for="linkItem in APP_HEADER_ITEMS"
          :key="linkItem.link"
          :to="linkItem.link"
          class="app-header__link"
          active-class="app-header__link--active"
        >
          {{ `${linkItem.text}` }}
        </RouterLink>
      </div>
      <div class="app-header__icon">
        <IcHome :font-controlled="false" :filled="true" />
      </div>
    </div>
  </header>
</template>

<style lang="scss">
.app-header {
  @include container;
  box-shadow: 0px 4px 8px 0px #dee3e766;

  &__inner {
    padding: 16px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__navigation {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  &__link {
    @include flex-center;

    padding: 12px 16px;
    color: $color-gray-dark-2;
    text-decoration: none;
    border-radius: 10px;
    transition: 0.2s;

    @include hover {
      background-color: $color-gray-light;
      color: $color-gray-dark;
    }

    &--active {
      background: $color-blue-light;
      color: $color-blue;

      @include hover {
        background: $color-blue-light;
        color: $color-blue;
      }
    }
  }

  &__exit-button {
    @include reset-button-style;
    @include flex-center;

    background: $color-gray-light;
    border-radius: 10px;
    padding: 11px;
    transition: 0.2s;

    @include hover {
      background: $color-gray-dark-2;
    }
  }
}
</style>
