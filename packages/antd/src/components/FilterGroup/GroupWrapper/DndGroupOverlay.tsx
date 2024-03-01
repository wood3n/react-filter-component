import { Flex, Tag } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import { DndOverlay } from '@/components/Dnd';
import { useFilterFieldName } from '@/hooks';
import type { SelectOption } from '@/types';

interface Props {
  value: Record<string, any>;
  connectors?: SelectOption[];
  isDragging?: boolean;
}

const DndGroupOverlay = ({ value, isDragging, connectors }: Props) => {
  const { connector: connectorFieldName, filters: filterGroupFieldName } = useFilterFieldName();
  const filterGroup: Record<string, any>[] = value[filterGroupFieldName] || [];

  const connectorLabel = connectors?.find(item => item.value === value[connectorFieldName])?.label;

  return (
    <DndOverlay
      isDragging={isDragging}
      style={{
        padding: 16,
      }}
    >
      <Flex align="center" gap={8}>
        <DownOutlined />
        {connectorLabel && <Tag>{connectorLabel}</Tag>}
        group
      </Flex>
      <span
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          transform: 'translate(50%, -50%)',
          width: 16,
          height: 16,
          borderRadius: '50%',
          backgroundColor: '#1966FF',
          color: '#fff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 99999,
        }}
      >
        {filterGroup.length}
      </span>
    </DndOverlay>
  );
};

export default DndGroupOverlay;
