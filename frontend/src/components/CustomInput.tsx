import { forwardRef, type ChangeEvent } from "react";

interface CustomInputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  id?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
  autocomplete?: boolean;
  labelStyles?: string;
  inputStyles?: string;
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  (
    {
      label,
      type = "text",
      placeholder = "Type here...",
      id,
      value,
      onChange,
      disabled = false,
      required = true,
      autocomplete = true,
      labelStyles,
      inputStyles,
    },
    ref,
  ) => {
    return (
      <div>
        {label && (
          <label htmlFor={id} className={`text-sm capitalize ${labelStyles}`}>
            {label}{" "}
            {required && <span className="text-bold text-red-500">*</span>}
          </label>
        )}
        <input
          type={type}
          placeholder={placeholder}
          ref={ref}
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          autoComplete={autocomplete ? "on" : "off"}
          className={`w-full border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputStyles}`}
        />
      </div>
    );
  },
);

export default CustomInput;
