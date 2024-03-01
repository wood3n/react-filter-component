import { Button, Flex } from 'antd';
import { CopyOutlined, DeleteOutlined, HolderOutlined } from '@ant-design/icons';

export interface FilterOperationProps {
  onCopy: VoidFunction;
  onDelete: VoidFunction;
  dndHandlerProps: Record<string, any>;
}

const FilterOperation = ({ onCopy, onDelete, dndHandlerProps }: FilterOperationProps) => {
  return (
    <Flex gap={8}>
      <Button size="small" onClick={onCopy}>
        <CopyOutlined />
      </Button>
      <Button size="small" {...dndHandlerProps}>
        <HolderOutlined />
      </Button>
      <Button size="small" onClick={onDelete}>
        <DeleteOutlined />
      </Button>
    </Flex>
  );
};

export default FilterOperation;
