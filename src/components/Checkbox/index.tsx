import React from 'react';
import {KeyboardKeys} from 'src/util';
import {StyledCheckbox} from './style';

type Props = {
  label: string;
  checked: boolean;
  disabled?: boolean;
  onChange(value: boolean): void;
};

const Checkbox: React.FC<Props> = ({checked, label, disabled, onChange}) => {
  const toggleIsChecked = (): void => {
    if (disabled) return;

    onChange(!checked);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLSpanElement>): void => {
    if (event.code === KeyboardKeys.SPACE) toggleIsChecked();
  };

  return (
    <StyledCheckbox
      tabIndex={disabled ? -1 : 0}
      aria-checked={checked}
      aria-disabled={disabled}
      role={'checkbox'}
      onClick={toggleIsChecked}
      onKeyDown={handleKeyDown}
    >
      {label}
    </StyledCheckbox>
  );
};

export default Checkbox;
