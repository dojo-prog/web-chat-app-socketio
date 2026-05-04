import { useState, type ChangeEvent } from "react";

const useForm = (initialValues: Record<string, any>) => {
  const [formData, setFormData] = useState(initialValues);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    const file = files?.[0];
    if (!file) return;

    setFormData((prev) => ({ ...prev, [name]: file }));
  };

  const resetForm = () => {
    setFormData(initialValues);
  };

  return { formData, setFormData, handleChange, handleFileChange, resetForm };
};

export { useForm };
