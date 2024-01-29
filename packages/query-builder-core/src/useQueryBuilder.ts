import { useEffect } from 'react';
import { useImmer } from 'use-immer';
import get from 'lodash-es/get';
import type { QueryBuilderCoreType, ConditionValueType, ConditionGroupType, ValueType, DndHandlerProps } from './types';
import { DefaultLogicValue } from './default-config';

const useQueryBuilder = ({ defaultValue, value: controlledValue, onChange, logics }: QueryBuilderCoreType) => {
  const defaultLogicValue = logics ? logics.AND.value : DefaultLogicValue.And;
  const defaultCondition: ValueType = {
    logic: defaultLogicValue,
    conditions: [],
  };

  const [value, setValue] = useImmer<ValueType | undefined>(() => {
    if (controlledValue) {
      return controlledValue;
    }

    return defaultValue;
  });

  useEffect(() => {
    onChange?.(value);
  }, [value]);

  /** 修改逻辑连接符 */
  const onChangeLogic = (logicValue: unknown, path: string[]) => {
    setValue(draft => {
      const current: ValueType = get(draft, path);
      current.logic = logicValue;
    });
  };

  /**
   * 修改条件值
   */
  const onChangeCondition = (conditionValue: ValueType | ConditionValueType, path: string[]) => {
    setValue(draft => {
      const index = path.at(-1) as string;
      const current: Required<ValueType> = get(
        draft,
        path.filter(item => item !== index)
      );
      current.conditions[index] = conditionValue;
    });
  };

  /** 添加条件 */
  const onAddCondition = (path: string[]) => {
    // 当前有值
    if (value) {
      setValue(draft => {
        const conditions: ConditionGroupType[] = get(draft, path);
        conditions.push(defaultCondition);
      });
    } else {
      setValue(defaultCondition);
    }
  };

  /* 添加条件组 */
  const onAddConditionGroup = (path: string[]) => {
    // 当前有值
    if (value) {
      setValue(draft => {
        const conditions: ConditionGroupType[] = get(draft, path);
        conditions.push({
          operand: undefined,
          connector: undefined,
          comparand: undefined,
        });
      });
    } else {
      setValue({
        logic: defaultLogicValue,
        conditions: [
          {
            logic: defaultLogicValue,
            conditions: [],
          },
        ],
      });
    }
  };

  /** 复制条件或条件组 */
  const onCopy = (path: string[], index: number) => {
    setValue(draft => {
      const conditions: ConditionGroupType[] = get(draft, path);
      const item = conditions[index];
      conditions.splice(index + 1, 0, { ...item });
    });
  };

  /** 删除值 */
  const onDelete = (path: string[], index: number) => {
    setValue(draft => {
      const conditions: ConditionGroupType[] = get(draft, path);
      conditions.splice(index, 1);
    });
  };

  /** 拖拽 */
  const onDrop = ({ dragPath, dropPath }: DndHandlerProps) => {
    setValue(draft => {
      const dragItem = get(draft, dragPath.slice(0, -1)) as ValueType | ConditionValueType;
      const dropToArr = get(draft, dropPath.slice(0, -2)) as (ConditionValueType | ValueType)[];
      const dropIndex = Number(dropPath.at(-2)) + 1;
      dropToArr.splice(dropIndex, 0, { ...dragItem });

      const traverse = (treeNodes?: (ConditionValueType | ValueType)[]) => {
        if (Array.isArray(treeNodes)) {
          for (const item of treeNodes) {
            if (dragItem === item) {
              treeNodes.splice(treeNodes.indexOf(item), 1);
              break;
            } else if (item.conditions) {
              traverse(item.conditions);
            }
          }
        }
      };

      traverse(draft.conditions);
    });
  };

  return {
    value,
    onChange,
    onChangeLogic,
    onChangeCondition,
    onAddCondition,
    onAddConditionGroup,
    onCopy,
    onDelete,
    onDrop,
  };
};

export default useQueryBuilder;
