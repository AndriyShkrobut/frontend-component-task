import styled from 'styled-components';
import Check from 'assets/check.svg';
import UnCheck from 'assets/uncheck.svg';

export const StyledCheckbox = styled.div`
  display: inline-block;
  position: relative;
  font-family: sans-serif;
  padding-left: 40px;
  cursor: default;
  user-select: none;
  text-transform: capitalize;
  font-size: 1.2rem;
  outline: none;
  margin: 5px;

  &:before {
    content: '';
    position: absolute;
    width: 24px;
    height: 24px;
    top: 50%;
    left: 12px;
    transform: translate(-50%, -50%);
    background-color: #fff;
    background-size: 24px;
    background-image: url(${UnCheck});
  }

  &:focus:before {
    outline-color: #101;
    outline-width: 1px;
    outline-style: auto;
  }

  &[aria-checked='true']:before {
    background-image: url(${Check});
    background-color: #fa6b30;
  }

  &[aria-disabled='true']:before {
    background-color: #f0f0f0;
  }

  &[aria-checked='true'][aria-disabled='true']:before {
    background-color: #f2b597;
    background-image: url(${Check});
  }
`;
