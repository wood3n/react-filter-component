import React from 'react';
import { RuleItem } from 'async-validator';
import {
  QueryBuilderCoreType,
  ConditionValueType,
  CustomLogicType,
  ValueType,
  ValueOption,
} from '@rc-querybuilder/core';
import { DefaultLogicValue } from './constants';

export interface OperatorOption extends ValueOption {
  disabled?: boolean;
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

export type RenderOperandType = (condition?: ConditionValueType) => OperandType;

export interface QueryConditionExpressionProps extends QueryBuilderCoreType {
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
    | ((defaultOperators: OperatorOption[], condition: ConditionValueType) => OperatorOption[]);
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
  className?: string;
  style?: React.CSSProperties;
}

export interface InnerValueType extends Exclude<ValueType, 'filters'> {
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
