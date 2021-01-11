import React, {useState} from 'react';
import Checkbox from 'components/Checkbox';
import Select from 'components/Select';

const App: React.FC = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [selectValue, setSelectValue] = useState<string>('');

  const handleCheckboxChange = (value: boolean): void => {
    setIsChecked(value);
  };

  const handleSelectChange = (value: string): void => {
    setSelectValue(value);
  };

  return (
    <React.Fragment>
      <Select
        options={['admin', 'user', 'member', 'custom']}
        selected={selectValue}
        onChange={handleSelectChange}
        label={'Hello World'}
      />
      <Checkbox checked={isChecked} label={'Hello World'} onChange={handleCheckboxChange} />
    </React.Fragment>
  );
};

export default App;
