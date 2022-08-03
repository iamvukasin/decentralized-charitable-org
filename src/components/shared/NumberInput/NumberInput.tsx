import { ChangeEvent, FC, memo, useCallback, useMemo, useState } from 'react';
import './NumberInput.scss';

interface NumberInputProps {
  disabled?: boolean;
  onValueChange: (value: number) => void;
}

const NumberInput: FC<NumberInputProps> = props => {
  const { disabled, onValueChange } = props;
  const [textValue, setTextValue] = useState('');

  const handleValueChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.validity.patternMismatch) {
      setTextValue(event.currentTarget.value);
      onValueChange(+event.currentTarget.value);
    }
  }, []);

  return (
    <div className="number-input">
      <input
        type="text"
        pattern="[0-9,]*[.]?[0-9]{0,18}"
        value={textValue}
        placeholder="0.0000"
        disabled={disabled}
        onChange={handleValueChange}
      />
    </div>
  );
};

export default memo(NumberInput);
