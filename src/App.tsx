import React, {useState} from 'react';
import Checkbox from 'components/Checkbox';

const App: React.FC = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleChange = (value: boolean): void => {
    setIsChecked(value);
  };

  return (
    <React.Fragment>
      <Checkbox checked={isChecked} label={'Hello World'} onChange={handleChange} />
    </React.Fragment>
  );
};

export default App;
