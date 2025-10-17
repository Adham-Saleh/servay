<template lang="pug">
    UContainer(class="py-[24px] lg:py-[40px]")

        

        .flex.items-center.justify-center

            //- Form
            UForm(class="space-y-4 w-full lg:w-[350px]" :schema="schema" :state="state" @submit="onSubmit" :loading)
                h1.text-lg Welcome! {{ state.name }}
                p Fill up the form
                //- Progress
                UProgress(v-model="progress")

                //- Name
                UFormField(label="Name" name="name")
                    UInput(v-model="state.name" class="w-full" size="lg")
                
                //- Email
                UFormField(label="Email" name="email")
                    UInput(v-model="state.email" class="w-full" trailing-icon="i-lucide-at-sign" size="lg")
                
                UFormField(label="Have you ever bought something from an Egyption brand ?" name="boughtFromEgyptionBrand")
                    URadioGroup(v-model="state.boughtFromEgyptionBrand" orientation="horizontal" :items="items" class="w-full" size="lg")
                
                //- If a user has bought from an Egyption brand
                div(v-if="state.boughtFromEgyptionBrand === 'Yes'" class="space-y-4")

                  //- Brand Name
                  UFormField(label="What brand did you buy from ?" name="brandName")
                      UInput(v-model="state.brandName" class="w-full" size="lg")

                  //- Why did you choose to buy from an Egyption brand ?
                  UFormField(label="Why did you choose to buy from an Egyption brand ?" name="reasonForChoice")
                      UTextarea(v-model="state.reasonForChoice" class="w-full" size="lg")

                  //- Describe your experience
                  UFormField(label="Describe your experience" name="experienceDescription")
                      UTextarea(v-model="state.experienceDescription" class="w-full" size="lg")
                
                //- If a user has not bought from an Egyption brand
                div(v-else class="space-y-4") 

                  //- What prevented you
                  UFormField(label="What is the main reason which prevented you from buying from an Egyption brand?" name="whatPreventedYou")
                      UTextarea(v-model="state.whatPreventedYou" class="w-full" size="lg")
                  
                  //- What would make you buy 
                  UFormField(label="What would make you buy from an Egyption brand ?" name="whyWouldYouBuy")
                      UTextarea(v-model="state.whyWouldYouBuy" class="w-full" size="lg")
                
                //- Question 1
                UFormField(label="If an Egyption brand offers the same quality of global brand, would you buy ?" name="wouldBuySameQuality")
                    URadioGroup(v-model="state.wouldBuySameQuality" orientation="horizontal" :items="items" class="w-full" size="lg")
                  
                //- Question 2
                UFormField(label="If an Egyption brand offers the same quality of global brand with slightly higher price, would you buy ?" name="wouldBuyHigherPrice")
                    URadioGroup(v-model="state.wouldBuyHigherPrice" orientation="horizontal" :items="items" class="w-full" size="lg")
                
                //- Submit Button
                UButton(type="submit" class="w-full flex items-center justify-center cursor-pointer" :disabled="(progress < 100) || loading" size="lg") Submit
</template>

<script setup lang="ts">
import * as yup from "yup";

const items = ref(["Yes", "No"]);
const user = useState<string>("user", () => "Updating...");
const { submitForm, loading } = useSubmitForm();

const state = reactive({
  name: "",
  email: "",
  boughtFromEgyptionBrand: "Yes",
  brandName: "",
  reasonForChoice: "",
  experienceDescription: "",
  whatPreventedYou: "",
  whyWouldYouBuy: "",
  wouldBuySameQuality: "",
  wouldBuyHigherPrice: "",
});

const visibleFields = computed(() => {
  const base = {
    name: state.name,
    email: state.email,
    wouldBuySameQuality: state.wouldBuySameQuality,
    wouldBuyHigherPrice: state.wouldBuyHigherPrice,
    boughtFromEgyptionBrand: state.boughtFromEgyptionBrand,
  };
  if (state.boughtFromEgyptionBrand === "Yes") {
    return {
      ...base,
      brandName: state.brandName,
      reasonForChoice: state.reasonForChoice,
      experienceDescription: state.experienceDescription,
    };
  } else {
    return {
      ...base,
      whatPreventedYou: state.whatPreventedYou,
      whyWouldYouBuy: state.whyWouldYouBuy,
    };
  }
});

const progress = computed(() => {
  return (
    (Object.values(visibleFields.value).filter((v) => v).length /
      Object.values(visibleFields.value).length) *
    100
  );
});

const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  boughtFromEgyptionBrand: yup
    .string()
    .oneOf(["Yes", "No"])
    .required("Please select Yes or No"),
  brandName: yup.string().when("boughtFromEgyptionBrand", {
    is: "Yes",
    then: (schema) => schema.required("Brand name is required"),
  }),
  reasonForChoice: yup.string().when("boughtFromEgyptionBrand", {
    is: "Yes",
    then: (schema) => schema.required("This field is required"),
  }),
  experienceDescription: yup.string().when("boughtFromEgyptionBrand", {
    is: "Yes",
    then: (schema) => schema.required("This field is required"),
  }),
  whatPreventedYou: yup.string().when("boughtFromEgyptionBrand", {
    is: "No",
    then: (schema) => schema.required("This field is required"),
  }),
  whyWouldYouBuy: yup.string().when("boughtFromEgyptionBrand", {
    is: "No",
    then: (schema) => schema.required("This field is required"),
  }),
  wouldBuySameQuality: yup
    .string()
    .oneOf(items.value, "Please select an option")
    .required("This field is required"),
  wouldBuyHigherPrice: yup
    .string()
    .oneOf(items.value, "Please select an option")
    .required("This field is required"),
});

const onSubmit = async function (e: SubmitEvent) {
  const { data } = e as SubmitEvent & { data: typeof state };
  console.log("data -->", data);
  await submitForm(data);
  alert(JSON.stringify(toRaw(data), null, 2));
  //   TODO: Handle form submission (e.g., send data to a server)
};

watch(state, () => {
  if (state.name === user.value) return;
  if (state.name === "") return (user.value = "Updating...");
  user.value = state.name;
});
</script>

<style scoped></style>
