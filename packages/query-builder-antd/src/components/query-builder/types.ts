import React from 'react';
import { RuleItem } from 'async-validator';
import { DefaultLogicValue } from './constants';

export interface OperatorOption {
  label: React.ReactNode;
  value: unknown;
  disabled?: boolean;
}

export interface ExpressionValueType {
  left?: string;
  operator?: string;
  value?: any;
}

export interface QueryConditionExprssionValueType {
  logic?: string;
  expression?: ExpressionValueType;
  filters?: QueryConditionExprssionValueType[];
}

export interface CustomOperandElementProps {
  value?: any;
  onChange?: (value?: any) => void;
}

/**
 * 左侧或右侧操作数类型
 */
export interface OperandType {
  /**
   * 禁用
   */
  disabled?: boolean;
  /**
   * 校验规则
   */
  validator?: RuleItem[];
  /**
   * 自定义渲染组件类型，需要支持value,onChange属性
   */
  children?: React.ReactElement<CustomOperandElementProps>;
}

export type RenderOperandType = (expression?: ExpressionValueType) => OperandType;

export interface QueryConditionExpressionProps {
  /**
   * 左侧操作数自定义类型
   */
  leftOperand?: OperandType | RenderOperandType;
  /**
   * 右侧操作数自定义类型
   */
  rightOperand?: OperandType | RenderOperandType;
  /**
   * 自定义表达式连接符
   */
  operators?:
    | OperatorOption[]
    | ((defaultOperators: OperatorOption[], expression: ExpressionValueType) => OperatorOption[]);
  /**
   * 自定义AND，OR的值
   */
  logics?: Record<DefaultLogicValue, string>;
  /**
   * 查看模式
   */
  readonly?: boolean;
  /**
   * 是否可拖拽
   */
  draggable?: boolean;
  /**
   * 禁用
   */
  disabled?: boolean;
  /**
   * 组件值
   */
  value?: QueryConditionExprssionValueType;
  /**
   * 修改组件值触发
   */
  onChange?: (value?: QueryConditionExprssionValueType) => void;
  className?: string;
  style?: React.CSSProperties;
}

export interface InnerValueType extends Exclude<QueryConditionExprssionValueType, 'filters'> {
  /**
   * 节点路径
   */
  path?: number[];
  filters?: InnerValueType[];
}

export enum DragElementType {
  Expression = 'expression',
  ExpressionGroup = 'expression-group',
}

export interface DragItemType {
  type: DragElementType;
  path: string[];
}

export interface DndHandlerProps {
  dragType: DragElementType;
  dragPath: string[];
  dropType: DragElementType;
  dropPath: string[];
}

export type DndHandler = (e: DndHandlerProps) => void;
