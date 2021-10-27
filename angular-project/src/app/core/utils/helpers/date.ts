export const createDate = (value: any) => {
  // #region ensureDate()
  const ensureDate = (value_: any) =>
    typeof value_ === 'undefined' || value_ === null
      ? new Date()
      : (value_ as Date);
  // #endregion ensureDate()
  return typeof value === 'string' ? new Date(value) : ensureDate(value);
};

export const substractDate = (date?: Date| string, number: number = 1) => {
  const today = createDate(date);
  today.setDate(new Date().getDate() - number);
  return today;
};
