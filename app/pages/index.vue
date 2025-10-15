<template lang="pug">
    UContainer(class="py-[24px] lg:py-[40px]")

        

        .flex.items-center.justify-center

            //- Form
            UForm(class="space-y-4 w-full lg:w-[350px]" :schema="schema" :state="state" @submit="onSubmit")
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
                
                //- Brand Name
                UFormField(label="What brand did you buy from ?" name="brandName")
                    UInput(v-model="state.brandName" class="w-full" size="lg")

                //- Why did you choose to buy from an Egyption brand ?
                UFormField(label="Why did you choose to buy from an Egyption brand ?" name="whyChooseLocalBrand")
                    UTextarea(v-model="state.whyChooseLocalBrand" class="w-full" size="lg")

                //- Describe your experience
                UFormField(label="Describe your experience" name="describeUX")
                    UTextarea(v-model="state.describeUX" class="w-full" size="lg")

                //- Question 1
                UFormField(label="If an Egyption brand offers the same quality of global brand, would you buy ?" name="question1")
                    URadioGroup(v-model="state.question1" orientation="horizontal" :items="items" class="w-full" size="lg")
                
                //- Question 2
                UFormField(label="If an Egyption brand offers the same quality of global brand with slightly higher price, would you buy ?" name="question2")
                    URadioGroup(v-model="state.question2" orientation="horizontal" :items="items" class="w-full" size="lg")
                
                //- Submit Button
                UButton(type="submit" class="w-full flex items-center justify-center cursor-pointer" :disabled="progress < 100" size="lg") Submit
</template>

<script setup lang="ts">
import * as yup from "yup";

const items = ref(["Yes", "No"]);
const user = useState<string>("user", () => "Updating...");

const state = reactive({
  name: "",
  email: "",
  brandName: "",
  whyChooseLocalBrand: "",
  describeUX: "",
  question1: "",
  question2: "",
});
const progress = computed(() => {
  return (
    (Object.values(state).filter((v) => v).length /
      Object.values(state).length) *
    100
  );
});

const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  brandName: yup.string().required("Brand name is required"),
  whyChooseLocalBrand: yup.string().required("This field is required"),
  describeUX: yup.string().required("This field is required"),
  question1: yup
    .string()
    .oneOf(items.value, "Please select an option")
    .required("This field is required"),
  question2: yup
    .string()
    .oneOf(items.value, "Please select an option")
    .required("This field is required"),
});

const onSubmit = function (e: SubmitEvent) {
  const { data } = e as SubmitEvent & { data: typeof state };
  console.log("data -->", data);
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
