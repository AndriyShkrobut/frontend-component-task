import styled from 'styled-components';
import DropdownArrow from 'assets/collapse-arrow.svg';

export const SelectLabel = styled.label`
  font-family: sans-serif;
  font-size: 1.2rem;
  text-transform: capitalize;
  margin-right: 20px;
  display: inline-block;
`;

export const SelectWrapper = styled.div`
  display: inline-block;
  box-sizing: border-box;
  width: 250px;
  position: relative;
  font-size: 1.2rem;
`;

export const SelectButton = styled.button`
  padding: 8px 35px 8px 15px;
  width: 100%;
  height: 42px;
  font-size: inherit;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: capitalize;
  background-color: #fff;
  border-style: solid;
  border-width: 2px;
  border-color: #d8d8d8;

  &:after {
    content: '';
    transform: rotate(${(props): string => (props['aria-expanded'] ? '180deg' : '0')});
    display: block;
    width: 15px;
    height: 100%;
    position: absolute;
    right: 15px;
    top: 0;
    background-image: url(${DropdownArrow});
    background-size: 15px;
    background-repeat: no-repeat;
    background-position: center;
  }
`;

export const SelectOptions = styled.ul`
  z-index: 1000;
  list-style: none;
  box-sizing: border-box;
  padding: 0;
  position: absolute;
  width: 100%;
  margin-top: -2px;
  max-height: 250px;
  overflow-y: auto;
  border-style: solid;
  border-width: 2px;
  border-color: #d8d8d8;
  background-color: #fff;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.5);
`;

export const SelectOption = styled.li`
  padding: 8px 15px;
  user-select: none;
  font-family: sans-serif;
  font-size: inherit;
  text-transform: capitalize;

  &:not(:last-child) {
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: #d8d8d8;
  }

  &:focus {
    outline: none;
    background-color: #f2b597;
  }
`;
