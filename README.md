# react filter

<p align="center">
  <img width="200px" height="200px" src="./website/docs//public/react-filter.png">
</p>

[![npm version](https://badge.fury.io/js/@react-filter%2Fantd.svg)](https://badge.fury.io/js/@react-filter%2Fantd)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

## 安装

```shell
pnpm add @react-filter/antd
```

## 使用

```jsx
import { ReactFilter } from '@react-filter/antd';

<ReactFilter />;
```

## API

| 属性           | <div style="width: 160">说明</div>     | 类型              | 默认值                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| :------------- | -------------------------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `defaultValue` | 组件初始化默认值                       | `object`          |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `value`        | 组件值                                 | `object`          |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `onChange`     | 组件值改变回调                         | `(value) => void` |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `connectors`   | 条件组关系，默认且和或                 | `SelectOption[]`  | `{ label: '且', value: 'AND' }`<br />`{ label: '或', value: 'OR' }`                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `operators`    | 条件表达式操作符，例如`大于`、`小于`等 | `SelectOption[]`  | `{ label: "等于", "value": "equal"}`<br />`{ "label": "不等于",        "value": "not_equal"}`<br />`{ "label": "大于", "value": "greater"    }`<br />`{ "label": "大于等于", "value": "greater_equal" }`<br />`{       "label": "小于", "value": "less" }` <br />`{ "label": "小于等于", "value": "less_equal" }`<br />`{ "label": "包含", "value": "in"    }`<br />`{ "label": "不包含", "value": "not_in" }`<br />`{        "label": "模糊匹配", "value": "like" }`<br />`{ "label": "不匹配",        "value": "not_like" }` |
| `fieldNames`   | 组件值字段名称                         | `FieldNameMap`    | `{connector: 'connector', filters: 'filters',  left: 'left', operator: 'operator', value: 'value'}`                                                                                                                                                                                                                                                                                                                                                                                                                            |

### interface

```typescript
interface SelectOption {
  label: React.ReactNode;
  value: string | number | boolean;
}
```

```typescript
interface FieldNameMap {
  connector?: string;
  filters?: string;
  left?: string;
  operator?: string;
  value?: string;
}
```
