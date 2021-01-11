import React, {useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';
import {KeyboardKeys} from 'src/util';
import {SelectButton, SelectLabel, SelectOption, SelectOptions, SelectWrapper} from './style';

type Props = {
  options: string[];
  placeholder?: string;
  selected: string;
  label?: string;
  onChange(value: string): void;
};

const Select: React.FC<Props> = ({options, placeholder = '', selected, onChange, label = ''}) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [selectedOptionValue, setSelectedOptionValue] = useState<string>(selected);
  const [focusedOptionIndex, setFocusedOptionIndex] = useState<number>(placeholder ? -1 : 0);

  const selectRef = useRef<HTMLButtonElement | null>(null);
  const optionsRef = useRef<HTMLUListElement | null>(null);
  const focusedOptionRef = useRef<HTMLLIElement | null>(null);

  // refs of states in order to have up-to-date values in window event
  const isOpenedRef = useRef<boolean>(isOpened);
  useEffect(() => {
    isOpenedRef.current = isOpened;
  }, [isOpened]);

  const selectedOptionValueRef = useRef<string>(selectedOptionValue);
  useEffect(() => {
    selectedOptionValueRef.current = selectedOptionValue;
  }, [selectedOptionValue]);

  // helpers
  const closeSelectOptions = (): void => {
    setIsOpened(false);
    selectRef.current.focus();
  };

  const getOptionIndexFromPressedKey = (keyName: string): number => {
    let optionIndex: number;

    if (keyName === KeyboardKeys.UP) {
      optionIndex = focusedOptionIndex === 0 ? 0 : focusedOptionIndex - 1;
    } else if (keyName === KeyboardKeys.DOWN) {
      optionIndex = (focusedOptionIndex + 1) % options.length;
    } else if (keyName === KeyboardKeys.HOME) {
      optionIndex = 0;
    } else {
      optionIndex = options.length - 1;
    }

    return optionIndex;
  };

  // handlers
  const handleSelectClick = (): void => {
    setIsOpened((prevIsOpened) => !prevIsOpened);
  };

  const handleSelectKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>): void => {
    switch (event.code) {
      case KeyboardKeys.ENTER:
      case KeyboardKeys.SPACE:
        event.preventDefault();
        setIsOpened(true);

        break;
      case KeyboardKeys.UP:
      case KeyboardKeys.DOWN:
      case KeyboardKeys.HOME:
      case KeyboardKeys.END: {
        event.preventDefault();

        const updatedFocusedOptionIndex = getOptionIndexFromPressedKey(event.code);

        setFocusedOptionIndex(updatedFocusedOptionIndex);
        const optionToSelect = options[updatedFocusedOptionIndex];

        setSelectedOptionValue(optionToSelect);
        onChange(optionToSelect);

        break;
      }
      default:
        break;
    }
  };

  const handleOptionKeyDown = (event: React.KeyboardEvent<HTMLLIElement>): void => {
    switch (event.code) {
      case KeyboardKeys.UP:
      case KeyboardKeys.DOWN:
      case KeyboardKeys.HOME:
      case KeyboardKeys.END: {
        event.preventDefault();
        event.stopPropagation();

        const updatedFocusedOptionIndex = getOptionIndexFromPressedKey(event.code);

        setFocusedOptionIndex(updatedFocusedOptionIndex);
        setSelectedOptionValue(options[updatedFocusedOptionIndex]);

        break;
      }
      case KeyboardKeys.TAB:
      case KeyboardKeys.ESCAPE:
      case KeyboardKeys.ENTER: {
        event.preventDefault();
        event.stopPropagation();

        const {value} = focusedOptionRef.current.dataset;

        setSelectedOptionValue(value);
        onChange(value);
        closeSelectOptions();

        break;
      }
      default:
        break;
    }
  };

  const handleOptionMouseOver = (event: React.MouseEvent<HTMLLIElement>): void => {
    const targetElement = event.target as HTMLLIElement;
    const optionIndex = Number(targetElement.dataset.index);

    setFocusedOptionIndex(optionIndex);
  };

  const handleOptionClick = (event: React.MouseEvent<HTMLLIElement>): void => {
    const targetElement = event.target as HTMLLIElement;
    const {value} = targetElement.dataset;

    setSelectedOptionValue(value);
    onChange(value);
    closeSelectOptions();
  };

  const handleClickOutsideSelect = useCallback(
    (event: Event): void => {
      const isOptionsOpened = isOpenedRef.current;

      if (!isOptionsOpened || !optionsRef.current) {
        return;
      }

      if (!optionsRef.current.contains(event.target as Node)) {
        onChange(selectedOptionValueRef.current);
        closeSelectOptions();
      }
    },
    [onChange]
  );

  // effects
  useLayoutEffect(() => {
    if (!selected && !placeholder && options.length) {
      setSelectedOptionValue(options[0]);
    }
  }, [options, placeholder, selected]);

  useEffect(() => {
    window.addEventListener('click', handleClickOutsideSelect);

    return (): void => {
      window.removeEventListener('click', handleClickOutsideSelect);
    };
  }, [handleClickOutsideSelect]);

  // control options focus
  useLayoutEffect(() => {
    if (focusedOptionRef.current && isOpened) {
      focusedOptionRef.current.focus();
    }
  }, [focusedOptionIndex, isOpened]);

  useEffect(() => {
    const initialFocusedOptionIndex = options.findIndex((option) => option === selectedOptionValue);

    setFocusedOptionIndex(initialFocusedOptionIndex !== -1 ? initialFocusedOptionIndex : 0);
  }, [options, selectedOptionValue]);

  return (
    <React.Fragment>
      <SelectLabel id={'select__label'} htmlFor={'select__button'}>
        {label}
      </SelectLabel>
      <SelectWrapper tabIndex={-1} id={'select'}>
        <SelectButton
          tabIndex={0}
          type={'button'}
          ref={selectRef}
          id={'select__button'}
          aria-haspopup={'listbox'}
          aria-labelledby={'select__label'}
          aria-expanded={isOpened}
          onKeyDown={handleSelectKeyDown}
          onClick={handleSelectClick}
        >
          {selectedOptionValue || placeholder}
        </SelectButton>
        {isOpened && (
          <SelectOptions
            tabIndex={-1}
            role={'listbox'}
            ref={optionsRef}
            aria-labelledby={'select__button'}
          >
            {options.map((option, index) => (
              <SelectOption
                ref={(element): void => {
                  if (index === focusedOptionIndex) focusedOptionRef.current = element;
                }}
                aria-selected={option === selectedOptionValue}
                data-index={index}
                data-value={option}
                role={'option'}
                key={index}
                onKeyDown={handleOptionKeyDown}
                onMouseOver={handleOptionMouseOver}
                onClick={handleOptionClick}
                tabIndex={index === focusedOptionIndex ? 0 : -1}
              >
                {option}
              </SelectOption>
            ))}
          </SelectOptions>
        )}
      </SelectWrapper>
    </React.Fragment>
  );
};

export default React.memo(Select);
