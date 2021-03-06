import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Breakpoints } from '../../../../../dictionaries';
import dynamite from '../../../../../images/dynamite.png';

export const Container = styled.div`
  display: block;
  justify-content: space-between;
  align-items: center;
  border-radius: 1.25rem;
  position: relative;
  background: ${(props) => props.theme.colors.secondaryExtraLight};
  padding: 1.563rem;
  margin: 1.1rem 0;

  h4 {
    font-weight: bold;
    font-size: 1.125rem;
    line-height: 1.5rem;
    padding-right: 3.5rem;
    margin-bottom: 0.813rem;
  }

  p {
    font-size: 0.813rem;
    line-height: 1.5rem;

    @media (min-width: ${Breakpoints.xl}px) {
      line-height: 1.5rem;
    }

    a {
      color: ${(props) => props.theme.colors.secondary}};
      text-decoration: none;
    }
  }

  p + a {
    margin-top: 0.813rem;
  }
`;

export const HideButton = styled.button`
  position: absolute;
  top: 1.563rem;
  right: 1.563rem;
  width: 3rem;
  height: 3rem;
  background: ${(props) => props.theme.colors.tertiary};
  border-radius: 100%;
  border: 0;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  i {
    position: absolute;
    width: 1.5rem;
    height: 1.5rem;
    left: 50%;
    top: 50%;
    background: url(${dynamite}) center center no-repeat;
    background-size: cover;
    transform: translate(-50%, -50%);
  }
`;

export const ReadMoreLink = styled(Link)`
  display: block;
  color: ${(props) => props.theme.colors.secondary};
  font-size: 0.813rem;
  line-height: 1rem;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
