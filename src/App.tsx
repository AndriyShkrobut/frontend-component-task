import React, {useState} from 'react';
import RoleSelector, {RoleSelectorState} from 'components/RoleSelector';

const App: React.FC = () => {
  const [permissions, setPermissions] = useState<RoleSelectorState>({} as RoleSelectorState);

  const handleRoleSelectorSubmit = (roleSelectorState: RoleSelectorState): void => {
    setPermissions(roleSelectorState);
  };

  const handleRoleSelect = (roleSelectorState: RoleSelectorState): void => {
    setPermissions(roleSelectorState);
  };

  const handleRoleSelectorChange = (roleSelectorState: RoleSelectorState): void => {
    setPermissions(roleSelectorState);
  };

  return (
    <React.Fragment>
      <RoleSelector
        onSubmit={handleRoleSelectorSubmit}
        onChange={handleRoleSelectorChange}
        onSelect={handleRoleSelect}
      />
      <pre>
        <code>{JSON.stringify(permissions, null, 2)}</code>
      </pre>
    </React.Fragment>
  );
};

export default App;
