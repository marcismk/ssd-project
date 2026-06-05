import { Textarea } from '@mantine/core';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const Editor = ({ value, onChange }: Props) => {
  return (
    <Textarea
      placeholder="Write your comment..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
