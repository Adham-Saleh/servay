<template lang="pug">
    UModal(:title="t('congrats')" :open="model" :close="{ onClick: handleClose }")    
        template(#body)
            UUser(:name="user" :description="t('thanksForYourHelp')" size="2xl" :avatar="{ src: 'https://i.pravatar.cc/150?u=john-doe', icon: 'i-lucide-image', }")
            p.mt-2 {{ t('thanks') }} {{ user }}, {{ t('forSharingYourValuableFeedbackWithUsWeAppreciateYourTimeAndEffortInHelpingUsImproveOurCountryMarketAndThoughts') }}
</template>

<script setup lang="ts">
const { t } = useI18n();
const model = defineModel();
const user = useState<string>("user");
const emit = defineEmits(["closed"]);

const handleClose = () => {
  model.value = false;
  emit("closed");
};
</script>

<style scoped></style>
