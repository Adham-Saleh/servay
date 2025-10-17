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
    loading.value = false;
    if (error.value)
      return {
        data,
        message: error?.value?.data?.message || "Something went wrong",
        success: false,
      };
    return { data, message: "Form submitted successfully", success: true };
  };

  return { submitForm, loading };
};
