interface SelectOption {
  label: React.ReactNode;
  value: string | number;
}

/**
 * 对象转 Select 选项
 */
export const objToSelectOptions = <ValueType = any>(obj: Record<string, ValueType>, prepend?: SelectOption[]) => {
  const ret = Object.entries(obj).map(([value, label]) => ({
    value,
    label,
  }));

  if (Array.isArray(prepend)) {
    return [...prepend, ...ret];
  }

  return ret;
};

export const removeArrayItem = <T>(arr: T[], value: T): T[] => {
  const index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
};