<template lang="pug">
    header
        Nav 
    main 
        slot
</template>

<script setup lang="ts">
const { t } = useI18n();
const config = useRuntimeConfig();

useSeoMeta({
  title: t("seoTitle"),
  description: t("seoDescription"),
  ogImage: config.public.appBaseUrl + "/share.png",
});
</script>

<style scoped></style>
