export const useSubmitForm = function () {
  const config = useRuntimeConfig();
  const apiBaseUrl = config.public.apiBaseUrl;
  const loading = ref<boolean>(false);

  const submitForm = async (formData: Record<string, any>) => {
    loading.value = true;
    const { data, error } = await useFetch(`${apiBaseUrl}api/Survey`, {
      method: "POST",
      body: formData,
    });
    console.log("data", data);
    console.log("error", error);
    loading.value = false;
  };

  return { submitForm, loading };
};
