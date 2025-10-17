<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";
import { ar, en } from "@nuxt/ui/locale";

const { t } = useI18n();
const route = useRoute();
const colorMode = useColorMode();
const user = useState<string>("user");

const { locale, setLocale } = useI18n();

const handleSwitch = function () {
  locale.value === "en" ? setLocale("ar") : setLocale("en");
};

useHead(() => ({
  htmlAttrs: {
    lang: locale.value,
    dir: locale.value === "ar" ? "rtl" : "ltr",
  },
}));
</script>

<template>
  <UHeader :toggle="false" title="">
    <template #left>
      <UUser
        :name="user"
        :description="t('thanksForYourHelp')"
        :avatar="{
          src: 'https://i.pravatar.cc/150?u=john-doe',
          icon: 'i-lucide-image',
        }"
      />
    </template>

    <template #right>
      <UButton variant="ghost" @click="handleSwitch">{{
        locale === "en" ? "AR" : "EN"
      }}</UButton>
      <ClientOnly v-if="!colorMode?.forced">
        <UColorModeButton class="cursor-pointer" />
        <template #fallback>
          <div class="size-8" />
        </template>
      </ClientOnly>
    </template>
  </UHeader>
</template>
