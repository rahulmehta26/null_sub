export const bindField = (field: any) => ({
  value: field.state.value,
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    field.handleChange(e.target.value),
  onBlur: field.handleBlur,
});
