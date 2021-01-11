import Checkbox from 'components/Checkbox';
import Select from 'components/Select';
import React, {ReactElement, useEffect, useState} from 'react';
import {
  Button,
  CheckboxGroup,
  CheckboxGroupItem,
  FieldsWrapper,
  Form,
  FormField,
  GroupHeader,
  HorizontalRule,
  RoleSelectorWrapper,
  Spacer
} from './style';

type Props = {
  onSelect(roleSelectorState: RoleSelectorState): void;
  onChange(roleSelectorState: RoleSelectorState): void;
  onSubmit(roleSelectorState: RoleSelectorState): void;
};

export type RoleSelectorState = PermissionFields & {
  role: Roles;
};

type Permissions = {
  create: boolean;
  update: boolean;
  move: boolean;
  delete: boolean;
  view: boolean;
  share: boolean;
};

type PermissionFields = {
  folders: Permissions;
  gems: Permissions;
};

enum Roles {
  ADMIN = 'admin',
  USER = 'user',
  MEMBER = 'member',
  CUSTOM = 'custom'
}

const roles = ['admin', 'user', 'member', 'custom'];
const initialPermission = {
  create: false,
  update: false,
  move: false,
  delete: false,
  view: false,
  share: false
};

const getPermissionByRole = (role: Roles): Permissions => {
  switch (role) {
    case Roles.ADMIN:
      return {create: true, update: true, move: true, delete: true, view: true, share: true};
    case Roles.USER:
      return {create: true, update: true, move: false, delete: false, view: true, share: true};
    case Roles.MEMBER:
      return {create: false, update: false, move: false, delete: false, view: true, share: true};
    default:
      return {...initialPermission};
  }
};

const initialPermissionFiels: PermissionFields = {
  folders: {...initialPermission},
  gems: {...initialPermission}
};

const RoleSelector: React.FC<Props> = ({onSubmit, onChange, onSelect}) => {
  const [role, setRole] = useState<Roles>('' as Roles);
  const [permissionFields, setPermissionFields] = useState<PermissionFields>({
    ...initialPermissionFiels
  });

  const handleRoleChange = (value: Roles): void => {
    setRole(value);
    const permission = getPermissionByRole(value);
    const permissionFieldsKeys = Object.keys(permissionFields);
    const updatedPermissionFields: PermissionFields = {} as PermissionFields;

    permissionFieldsKeys.forEach((permissionFieldsKey: keyof PermissionFields) => {
      updatedPermissionFields[permissionFieldsKey] = {...permission};
    });

    setPermissionFields(updatedPermissionFields);
    onSelect({role: value, ...updatedPermissionFields});
  };

  const handlePermissionsChange = (field: keyof PermissionFields, value: Permissions): void => {
    setPermissionFields({...permissionFields, [field]: value});
  };

  useEffect(() => {
    if (role === Roles.CUSTOM) {
      onChange({role, ...permissionFields});
    }
  }, [onChange, permissionFields, role]);

  const handleSave = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    onSubmit({role, ...permissionFields});
  };

  const renderCheckboxGroupItems = (permissionField: keyof PermissionFields): ReactElement[] => {
    const items = Object.keys(permissionFields[permissionField]);

    return items.map((permission: keyof Permissions) => (
      <CheckboxGroupItem key={`${permissionField}-${permission}`}>
        <Checkbox
          label={permission}
          disabled={role !== Roles.CUSTOM}
          checked={permissionFields[permissionField][permission]}
          onChange={(value): void =>
            handlePermissionsChange(permissionField, {
              ...permissionFields[permissionField],
              [permission]: value
            })
          }
        />
      </CheckboxGroupItem>
    ));
  };

  const renderPermissionFields = (): ReactElement[] => {
    const permissionFieldsKeys = Object.keys(permissionFields);

    return permissionFieldsKeys.map((permissionField: keyof PermissionFields, index) => {
      const itemId = `${permissionField}-group`;

      return (
        <React.Fragment key={itemId}>
          <FormField>
            <GroupHeader id={itemId}>{permissionField}</GroupHeader>
            <CheckboxGroup role={'group'} aria-labelledby={itemId}>
              {renderCheckboxGroupItems(permissionField)}
            </CheckboxGroup>
          </FormField>
          {index !== permissionFieldsKeys.length - 1 && <HorizontalRule />}
        </React.Fragment>
      );
    });
  };

  return (
    <RoleSelectorWrapper>
      <Form onSubmit={handleSave}>
        <FieldsWrapper>
          <FormField>
            <Select
              label={'User Role'}
              options={roles}
              selected={role}
              placeholder={'Select Role'}
              onChange={handleRoleChange}
            />
          </FormField>
          <Spacer />
          {renderPermissionFields()}
        </FieldsWrapper>
        <Spacer />
        <Button type={'submit'} disabled={!role}>
          SAVE
        </Button>
      </Form>
    </RoleSelectorWrapper>
  );
};

export default RoleSelector;
