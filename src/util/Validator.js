export const isValidAnswer = (value) => {
  if (!value.trim())
    return { isValid: false, message: "Answer cannot be empty!" };
  if (value.length >= 20) return { isValid: true, message: "" };
  return { isValid: false, message: "Answer must be at least 20 words!" };
};
