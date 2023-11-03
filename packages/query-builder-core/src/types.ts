export interface ConditionValueType {
  /**
   * 左侧操作值
   */
  operand?: any;
  /**
   * 条件连接符
   */
  connector?: string;
  /**
   * 右侧操作值
   */
  comparand?: any;
}

export interface FlatValueType {
  logic?: string;
  conditions?: (ConditionValueType | FlatValueType)[];
}

export interface WrapperedValueType {
  logic?: string;
  condition?: ConditionValueType;
  conditions?: WrapperedValueType[];
}

export interface Props<
  WrapperCondition = boolean,
  ValueType = WrapperCondition extends true ? WrapperedValueType : FlatValueType,
> {
  wrapperCondition?: WrapperCondition;
  value?: ValueType;
  defaultValue?: ValueType;
  onChange?: (value: ValueType) => void;
}
