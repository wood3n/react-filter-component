import { Button, Flex } from 'antd';
import { CopyOutlined, DeleteOutlined, HolderOutlined } from '@ant-design/icons';

export interface FilterOperationProps {
  onCopy: React.MouseEventHandler<HTMLElement> | undefined;
  onDelete: React.MouseEventHandler<HTMLElement> | undefined;
  dndHandlerProps: Record<string, any>;
}

const FilterOperation = ({ onCopy, onDelete, dndHandlerProps }: FilterOperationProps) => {
  return (
    <Flex gap={8}>
      <Button onClick={onCopy}>
        <CopyOutlined />
      </Button>
      <Button {...dndHandlerProps}>
        <HolderOutlined />
      </Button>
      <Button onClick={onDelete}>
        <DeleteOutlined />
      </Button>
    </Flex>
  );
};

export default FilterOperation;
