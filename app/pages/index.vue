<template lang="pug">
    UContainer(class="py-[24px] lg:py-[40px]")
    
        .flex.items-center.justify-center

            //- Form
            UForm(class="space-y-4 w-full lg:w-[350px]" :schema="schema" :state="state" @submit="onSubmit" :loading)
                h1 {{ t('welcome') }}! {{ state.name }}

                //- Progress
                UProgress(v-model="progress")

                //- Name
                UFormField(:label="t('name')" name="name")
                    UInput(v-model="state.name" class="w-full" size="lg")
                
                //- Email
                UFormField(:label="t('email')" name="email")
                    UInput(v-model="state.email" class="w-full" trailing-icon="i-lucide-at-sign" size="lg")
                
                UFormField(:label="t('haveYouEverBoughtSomethingFromAnEgyptionBrandd')" name="HasBoughtFromEgyptianBrand")
                    URadioGroup(v-model="state.HasBoughtFromEgyptianBrand" value-key="value" orientation="horizontal" :items="items" class="w-full" size="lg")
                
                //- If a user has bought from an Egyption brand
                div(v-if="state.HasBoughtFromEgyptianBrand" class="space-y-4")

                  //- Brand Name
                  UFormField(:label="t('whatBrandDidYouBuyFrom')" name="brandName")
                      UInput(v-model="state.brandName" class="w-full" size="lg")

                  //- Why did you choose to buy from an Egyption brand ?
                  UFormField(:label="t('whyDidYouChooseToBuyFromAnEgyptionBrand')" name="reasonForChoice")
                      UTextarea(v-model="state.reasonForChoice" class="w-full" size="lg")

                  //- Describe your experience
                  UFormField(:label="t('describeYourExperience')" name="experienceDescription")
                      UTextarea(v-model="state.experienceDescription" class="w-full" size="lg")
                
                //- If a user has not bought from an Egyption brand
                div(v-else class="space-y-4") 

                  //- What prevented you
                  UFormField(:label="t('whatIsTheMainReasonWhichPreventedYouFromBuyingFromAnEgyptionBrand')" name="reasonForNotBuying")
                      UTextarea(v-model="state.reasonForNotBuying" class="w-full" size="lg")
                  
                  //- What would make you buy 
                  UFormField(:label="t('whatWouldMakeYouBuyFromAnEgyptionBrand')" name="whatWouldMakeYouBuy")
                      UTextarea(v-model="state.whatWouldMakeYouBuy" class="w-full" size="lg")
                
                //- Question 1
                UFormField(:label="t('ifAnEgyptionBrandOffersTheSameQualityOfGlobalBrandWouldYouBuy')" name="wouldBuySameQuality")
                    URadioGroup(v-model="state.wouldBuySameQuality" value-key="value" orientation="horizontal" :items="items" class="w-full" size="lg")
                  
                //- Question 2
                UFormField(:label="t('ifAnEgyptionBrandOffersTheSameQualityOfGlobalBrandWithSlightlyHigherPriceWouldYouBuy')" name="wouldBuyHigherPrice")
                    URadioGroup(v-model="state.wouldBuyHigherPrice" value-key="value" orientation="horizontal" :items="items" class="w-full" size="lg")
                
                //- Submit Button
                UButton(type="submit" class="w-full flex items-center justify-center cursor-pointer" :disabled="(progress < 100) || loading" :loading size="lg") {{ t('submit') }}
    
    SuccessModal(v-model="successModal" @closed="handleResetForm")

</template>

<script setup lang="ts">
import * as yup from "yup";
import type { RadioGroupItem } from "@nuxt/ui";

const { t, locale } = useI18n();
const items = ref<RadioGroupItem[]>([
  { label: t("yes"), value: true },
  { label: t("no"), value: false },
]);
const user = useState<string>("user", () => "---");
const toast = useToast();
const successModal = ref<boolean>(false);
const { submitForm, loading } = useSubmitForm();

const state = reactive({
  name: "",
  email: "",
  HasBoughtFromEgyptianBrand: true,
  brandName: "",
  reasonForChoice: "",
  experienceDescription: "",
  reasonForNotBuying: "",
  whatWouldMakeYouBuy: "",
  wouldBuySameQuality: "",
  wouldBuyHigherPrice: "",
});

const visibleFields = computed(() => {
  const base = {
    name: state.name,
    email: state.email,
    wouldBuySameQuality: state.wouldBuySameQuality,
    wouldBuyHigherPrice: state.wouldBuyHigherPrice,
    HasBoughtFromEgyptianBrand: state.HasBoughtFromEgyptianBrand,
  };
  if (state.HasBoughtFromEgyptianBrand) {
    return {
      ...base,
      brandName: state.brandName,
      reasonForChoice: state.reasonForChoice,
      experienceDescription: state.experienceDescription,
    };
  } else {
    return {
      ...base,
      reasonForNotBuying: state.reasonForNotBuying,
      whatWouldMakeYouBuy: state.whatWouldMakeYouBuy,
    };
  }
});

const progress = computed(() => {
  return (
    (Object.values(visibleFields.value).filter((v) => v || v === false).length /
      Object.values(visibleFields.value).length) *
    100
  );
});

const schema = yup.object({
  name: yup.string().trim().required(t("nameIsRequired")),
  email: yup
    .string()
    .trim()
    .email(t("invalidEmail"))
    .required(t("emailIsRequired")),
  HasBoughtFromEgyptianBrand: yup.boolean().required(t("thisFieldIsRequired")),
  brandName: yup
    .string()
    .trim()
    .when("HasBoughtFromEgyptianBrand", {
      is: true,
      then: (schema) => schema.required(t("brandNameIsRequired")),
    }),
  reasonForChoice: yup.string().when("HasBoughtFromEgyptianBrand", {
    is: true,
    then: (schema) => schema.required(t("thisFieldIsRequired")),
  }),
  experienceDescription: yup.string().when("HasBoughtFromEgyptianBrand", {
    is: true,
    then: (schema) => schema.required(t("thisFieldIsRequired")),
  }),
  reasonForNotBuying: yup.string().when("HasBoughtFromEgyptianBrand", {
    is: false,
    then: (schema) => schema.required(t("thisFieldIsRequired")),
  }),
  whatWouldMakeYouBuy: yup.string().when("HasBoughtFromEgyptianBrand", {
    is: false,
    then: (schema) => schema.required(t("thisFieldIsRequired")),
  }),
  wouldBuySameQuality: yup.boolean().required(t("thisFieldIsRequired")),
  wouldBuyHigherPrice: yup.boolean().required(t("thisFieldIsRequired")),
});

const onSubmit = async function (e: SubmitEvent) {
  const { data } = e as SubmitEvent & { data: typeof state };
  const input = {
    ...data,
    ...(data?.HasBoughtFromEgyptianBrand
      ? { whatWouldMakeYouBuy: undefined, reasonForNotBuying: undefined }
      : {
          brandName: undefined,
          experienceDescription: undefined,
          reasonForChoice: undefined,
        }),
  };
  const { message, success } = await submitForm(input);
  if (!success)
    return toast.add({
      title: message,
      color: "error",
      id: "modal-error",
    });
  successModal.value = true;
};

const handleResetForm = function () {
  state.name = "";
  state.email = "";
  state.HasBoughtFromEgyptianBrand = true;
  state.brandName = "";
  state.reasonForChoice = "";
  state.experienceDescription = "";
  state.reasonForNotBuying = "";
  state.whatWouldMakeYouBuy = "";
  state.wouldBuySameQuality = "";
  state.wouldBuyHigherPrice = "";
};

watch(state, () => {
  if (state.name === user.value) return;
  if (state.name === "") return (user.value = "---");
  user.value = state.name;
});
</script>

<style scoped></style>
