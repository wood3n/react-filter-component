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

export type ConditionGroupType = ConditionValueType | ValueType;

export interface ValueType {
  /**
   * 逻辑连接符：and，or
   */
  logic: unknown;
  /**
   * 条件组
   */
  conditions?: ConditionGroupType[];
}

export interface ValueOption {
  label: React.ReactNode;
  value: unknown;
}

/** 自定义逻辑连接符号 */
export type CustomLogicType = Record<'AND' | 'OR', ValueOption>;

export interface QueryBuilderCoreType {
  /**
   * 默认值
   */
  defaultValue?: ValueType;
  /**
   * 组件值
   */
  value?: ValueType;
  /**
   * 组件值改变回调
   */
  onChange?: (value: ValueType | undefined) => void;
  /**
   * 自定义AND，OR的值
   */
  logics?: CustomLogicType;
}

export interface DndHandlerProps {
  dragPath: string[];
  dropPath: string[];
}
