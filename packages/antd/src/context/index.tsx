import { createContext } from 'react';

import { useMouse } from 'ahooks';

import type { FieldNameMap } from '../types';

export const FieldNameContext = createContext<Required<FieldNameMap>>({
  connector: 'connector',
  filters: 'filters',
  left: 'left',
  operator: 'operator',
  value: 'value',
});

export const MousePositionContext = createContext<ReturnType<typeof useMouse>>({
  screenX: 0,
  screenY: 0,
  clientX: 0,
  clientY: 0,
  pageX: 0,
  pageY: 0,
  elementX: 0,
  elementY: 0,
  elementH: 0,
  elementW: 0,
  elementPosX: 0,
  elementPosY: 0,
});
