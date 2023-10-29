import React from 'react';
import { Button, Tag } from 'antd';
import classNames from 'classnames';
import { ReactComponent as IconToggle } from '@/assets/icons/toggle.svg';
import { DefaultLogicDesc, DefaultLogicValue } from '../constants';
import './index.less';

interface Props {
  readonly?: boolean;
  disabled?: boolean;
  value: string;
  onChange?: (value: string) => void;
  style?: React.CSSProperties;
}

const LogicToggle: React.FC<Props> = ({ disabled, readonly, value, onChange }) => {
  const toggleValue = () => {
    onChange?.(value === DefaultLogicValue.And ? DefaultLogicValue.Or : DefaultLogicValue.And);
  };

  return (
    <div className="logic-toggle">
      <div className="curly-brace-wrapper">
        <div
          className={classNames('curly-brace', 'curly-brace-start', {
            readonly,
          })}
        />
      </div>
      {readonly ? (
        <Tag className="logic-toggle-tag">{DefaultLogicDesc[value]}</Tag>
      ) : (
        <Button ghost disabled={disabled} onClick={toggleValue} className="logic-toggle-button">
          <div className="logic-toggle-button-text">{DefaultLogicDesc[value]}</div>
          <IconToggle style={{ color: '#585B60', width: '0.8em' }} />
        </Button>
      )}
      <div className="curly-brace-wrapper">
        <div
          className={classNames('curly-brace', 'curly-brace-end', {
            readonly,
          })}
        />
      </div>
    </div>
  );
};

export default LogicToggle;
