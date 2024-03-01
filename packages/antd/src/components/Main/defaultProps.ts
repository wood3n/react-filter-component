export const DefaultConnectorValue = {
  And: 'AND',
  Or: 'OR',
};

export const DefaultConnectorDesc: Record<string, string> = {
  [DefaultConnectorValue.And]: '且',
  [DefaultConnectorValue.Or]: '或',
};

export const DefaultConnectorOptions = Object.entries(DefaultConnectorDesc).map(([value, label]) => ({
  label,
  value,
}));

export const DefaultOperatorValue = {
  Equal: 'equal',
  NotEqual: 'not_equal',
  Greater: 'greater',
  GreaterEqual: 'greater_equal',
  Less: 'less',
  LessEqual: 'less_equal',
  In: 'in',
  NotIn: 'not_in',
  Like: 'like',
  NotLike: 'not_like',
};

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

export const DefaultOperatorOptions = Object.entries(DefaultOperatorDesc).map(([value, label]) => ({
  label,
  value,
}));
