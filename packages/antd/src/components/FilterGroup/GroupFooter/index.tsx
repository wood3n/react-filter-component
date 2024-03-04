import { Button, Flex } from 'antd';

interface Props {
  onAddFilter: React.MouseEventHandler<HTMLElement> | undefined;
  onAddFilterGroup: React.MouseEventHandler<HTMLElement> | undefined;
  extra?: React.ReactNode;
}

const GroupFooter = ({ onAddFilter, onAddFilterGroup, extra }: Props) => {
  return (
    <Flex align="center" gap={8}>
      <Button type="primary" onClick={onAddFilter}>
        添加条件
      </Button>
      <Button onClick={onAddFilterGroup}>添加条件组</Button>
      {extra}
    </Flex>
  );
};

export default GroupFooter;
