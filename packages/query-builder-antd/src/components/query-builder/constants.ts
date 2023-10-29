export enum DefaultOperatorValue {
  Equal = 'equal',
  NotEqual = 'not_equal',
  Greater = 'greater',
  GreaterEqual = 'greater_equal',
  Less = 'less',
  LessEqual = 'less_equal',
  In = 'in',
  NotIn = 'not_in',
  Like = 'like',
  NotLike = 'not_like',
}

export const DefaultOperatorDesc: Record<string, string> = {
  [DefaultOperatorValue.Equal]: '等于',
  [DefaultOperatorValue.NotEqual]: '不等于',
  [DefaultOperatorValue.Greater]: '大于',
  [DefaultOperatorValue.GreaterEqual]: '大于等于',
  [DefaultOperatorValue.Less]: '小于',
  [DefaultOperatorValue.LessEqual]: '小于等于',
  [DefaultOperatorValue.In]: '包含',
  [DefaultOperatorValue.NotIn]: '不包含',
  [DefaultOperatorValue.Like]: '模糊匹配',
  [DefaultOperatorValue.NotLike]: '不匹配',
};

export enum DefaultLogicValue {
  And = 'AND',
  Or = 'OR',
}

export const DefaultLogicDesc: Record<string, string> = {
  [DefaultLogicValue.And]: '且',
  [DefaultLogicValue.Or]: '或',
};
