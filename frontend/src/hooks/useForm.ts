import { useState, type ChangeEvent } from "react";

const useForm = (initialValues: Record<string, any>) => {
  const [formData, setFormData] = useState(initialValues);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData(initialValues);
  };

  return { formData, setFormData, handleChange, resetForm };
};

export { useForm };
