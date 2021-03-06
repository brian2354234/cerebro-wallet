import styled from 'styled-components';
import { Link } from 'react-router-dom';

import IconButton from '../../../../components/shared/IconButton/IconButton';
import { TrackYEl } from '../../../../components/shared/Scrollbar/styled';
import { Breakpoints } from '../../../../dictionaries';

export const AccountsContainer = styled.section`
  position: relative;
  background: ${(props) => props.theme.colors.tertiary};
  border-radius: 1.25rem;
  grid-area: accounts;
  display: flex;
  flex-direction: column;
  padding: 1.3125rem 1.0625rem 0.9375rem 0.9375rem;

  &:after {
    position: absolute;
    display: none;
    content: '';
    height: 2.625rem;
    z-index: 1;
    width: 100%;
    left: 0;
    bottom: 0.9375rem;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0) 0%,
      ${(props) => props.theme.colors.tertiary} 100%
    );
  }

  @media (min-width: ${Breakpoints.xl}px) {
    &:after {
      display: block;
    }
  }
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.8125rem 0 0.9375rem;
  margin-bottom: 1.5625rem;
`;

export const Title = styled.span`
  font-size: 0.875rem;
  line-height: 1.0625rem;
  color: ${(props) => props.theme.colors.secondary};
`;

export const AddAccountButton = styled(Link)`
  position: relative;
  display: block;
  width: 2.25rem;
  height: 1.5625rem;
  border-radius: 1.6875rem;
  background: ${(props) => props.theme.colors.secondaryLight};
  border: 0;
  cursor: pointer;
  text-align: center;
  transition: background 0.15s ease-in;

  &:focus {
    outline: none;
  }

  svg {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: ${(props) => props.theme.colors.secondary};
    width: 0.75rem;
    height: 0.75rem;
    transition: color 0.15s ease-in;
  }

  &:hover {
    background: ${(props) => props.theme.colors.primaryLight};

    svg {
      color: ${(props) => props.theme.colors.tertiary};
    }
  }

  &:active {
    background: ${(props) => props.theme.colors.primaryLight};

    svg {
      color: ${(props) => props.theme.colors.tertiary};
    }
  }
`;

export const AccountItem = styled(IconButton)`
  border: 0;
  background: none;
  display: flex;
  align-items: center;
  text-align: left;
  width: 100%;
  padding: 0.8125rem 1rem 0.8125rem 0.625rem;
  border-radius: 2.375rem;
  transition: background-color 0.15s ease-in;
  cursor: pointer;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    background-color: ${(props) => props.theme.colors.secondaryExtraLight};
  }

  @media (min-width: ${Breakpoints.xl}px) {
    &:last-child {
      margin-bottom: 1.5625rem;
    }
  }

  &:focus {
    outline: none;
  }

  &.active {
    background: ${(props) => props.theme.colors.secondaryExtraLight};

    &:hover {
      background: ${(props) => props.theme.colors.secondaryExtraLight};
    }
  }
`;

export const ScrollbarTrackY = styled(TrackYEl)`
  right: -0.7rem;
`;
