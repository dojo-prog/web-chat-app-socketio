const returnMissing = (requiredFields: Record<string, any>) => {
  const keyMap: Record<string, string> = {
    fname: "First Name",
    lname: "Last Name",
    cPassword: "Confirmation Password",
  };

  return Object.entries(requiredFields)
    .filter(
      ([_, value]) =>
        !value || value === undefined || value === null || value.trim() === "",
    )
    .map(([key]) => keyMap[key] || key[0].toUpperCase + key.slice(1));
};

export { returnMissing };
