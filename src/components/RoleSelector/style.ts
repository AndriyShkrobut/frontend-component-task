import styled from 'styled-components';

export const RoleSelectorWrapper = styled.div`
  padding: 20px;
  background-color: #f5f5f5;
`;

export const Form = styled.form``;

export const FieldsWrapper = styled.div`
  background-color: #fff;
  padding: 30px;
`;

export const FormField = styled.div``;

export const Spacer = styled.div`
  margin: 50px;
`;

export const Button = styled.button`
  padding: 15px 100px;
  font-weight: bold;
  background-color: #fa6b30;
  border: none;
  font-size: 1.6rem;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #f2b597;
  }

  &:disabled {
    background-color: #d8d8d8;
    cursor: not-allowed;
  }
`;

export const GroupHeader = styled.h3`
  font-family: sans-serif;
  font-size: 1.2rem;
  margin-bottom: 15px;
  font-weight: normal;
  text-transform: capitalize;
`;

export const CheckboxGroup = styled.div``;

export const CheckboxGroupItem = styled.div`
  display: inline-block;
  margin: 10px 0;

  &:not(:last-child) {
    margin-right: 25px;
  }
`;

export const HorizontalRule = styled.hr`
  margin: 30px 0;
  background-color: #d8d8d8;
  border: none;
  height: 2px;
`;
