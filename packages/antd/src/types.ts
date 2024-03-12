/**
 * 默认组件值
 */
export interface DefaultValueType {
  /**
   * 逻辑连接符：and，or
   */
  connector?: any;
  /**
   * 条件组
   */
  filters?: DefaultFilterGroupValueType[];
}

/**
 * 默认单行组件值
 */
export interface DefaultFilterValueType {
  /**
   * 左侧操作值
   */
  left?: any;
  /**
   * 条件连接符
   */
  operator?: any;
  /**
   * 右侧操作值
   */
  value?: any;
}

/**
 * 默认多行条件组的值
 */
export type DefaultFilterGroupValueType = DefaultFilterValueType | DefaultValueType;

export interface FilterProps<VT extends object = DefaultValueType> {
  /**
   * default component value
   */
  defaultValue?: VT;
  /**
   * component value
   */
  value?: VT;
  /**
   * trigger on value change
   */
  onChange?: (value: VT | undefined) => void;
  /**
   * custom connector option
   */
  connectors?: SelectOption[];
  /**
   * custom operator option
   */
  operators?: SelectOption[];
  /**
   * custom component value field name
   */
  fieldNames?: FieldNameMap;
  // /**
  //  * custom logic toggle component
  //  */
  // renderConnector?: (props: CustomConnectorProps) => React.ReactElement;
  // /**
  //  * custom filter component
  //  */
  // renderFilter?: (props: CustomFilterProps) => React.ReactElement;
  // /**
  //  * custom filter operation component
  //  */
  // renderFilterOperation?: (props: CustomFilterOperationProps) => React.ReactElement;
  // /**
  //  * custom group footer component
  //  */
  // renderGroupFooter?: (props: CustomGroupProps<VT>) => React.ReactElement;
}

export interface FieldNameMap {
  connector?: string;
  filters?: string;
  left?: string;
  operator?: string;
  value?: string;
}

export interface SelectOption {
  label: React.ReactNode;
  value: string | number | boolean;
}

export type FilterPath = string[];
