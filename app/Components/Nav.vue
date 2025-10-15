<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const route = useRoute();
const colorMode = useColorMode();
const user = useState<string>("user", () => "Updating...");
</script>

<template>
  <UHeader :toggle="false" title="">
    <template #left>
      <UUser
        :name="user"
        description="Thank for your help"
        :avatar="{
          src: 'https://i.pravatar.cc/150?u=john-doe',
          icon: 'i-lucide-image',
        }"
      />
    </template>

    <template #right>
      <ClientOnly v-if="!colorMode?.forced">
        <UColorModeButton class="cursor-pointer" />
        <template #fallback>
          <div class="size-8" />
        </template>
      </ClientOnly>
    </template>
  </UHeader>
</template>
