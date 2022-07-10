import { ChangeEvent, FC, memo, useCallback, useState } from 'react';
import './NumberInput.scss';

interface NumberInputProps {
  onValueChange: (value: number) => void;
}

const NumberInput: FC<NumberInputProps> = props => {
  const { onValueChange } = props;
  const [textValue, setTextValue] = useState('');

  const handleValueChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.validity.patternMismatch) {
      setTextValue(event.currentTarget.value);
      onValueChange(+event.currentTarget.value);
    }
  }, []);

  return (
    <div className="number-input">
      <input type="text" pattern="[0-9,]*[.]?[0-9]{0,18}" value={textValue} onChange={handleValueChange} />
    </div>
  );
};

export default memo(NumberInput);
