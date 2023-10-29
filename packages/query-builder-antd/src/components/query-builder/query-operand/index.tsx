import React, { useState } from 'react';
import { Input, Typography } from 'antd';
import Schema, { ValidateError } from 'async-validator';
import { OperandType } from '../types';
import './index.less';

interface Props extends OperandType {
  value?: any;
  onChange?: (value?: any) => void;
}

function OperandComponent({ value, children, onChange, disabled, validator = [] }: Props) {
  const [errors, setErrors] = useState<ValidateError[] | null>();

  const handleValidate = (changeValue: any) => {
    const asyncValidator = new Schema({
      operand: validator,
    });

    asyncValidator.validate({ operand: changeValue }, err => {
      setErrors(err);
    });
  };

  let component: React.ReactElement = (
    <Input
      placeholder="请输入"
      value={value}
      disabled={disabled}
      onChange={e => {
        onChange?.(e.target.value);
        handleValidate(e.target.value);
      }}
    />
  );

  if (children) {
    component = React.cloneElement(children, {
      value,
      onChange: (v: any) => {
        onChange?.(v);
        handleValidate(v);
      },
    });
  }

  return (
    <div>
      {component}
      <Typography.Text
        type="danger"
        ellipsis={{ tooltip: errors?.map(({ message }, i) => <p key={String(i)}>{message}</p>) }}
        style={{ fontSize: '10px' }}
      >
        {errors?.map(({ message }) => message)}
      </Typography.Text>
    </div>
  );
}

export default OperandComponent;
