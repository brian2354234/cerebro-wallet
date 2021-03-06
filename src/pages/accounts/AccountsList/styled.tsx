import styled from 'styled-components';

import { Breakpoints } from '../../../dictionaries';
import SidebarMenuContainer from '../../../containers/SidebarMenuContainer';

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  @media (min-width: ${Breakpoints.xl}px) {
    padding: 2.8125rem 1.875rem 1.875rem;
  }

  h3 {
    display: none;
    font-weight: bold;
    font-size: 1.125rem;
    line-height: 1.5rem;
    margin: 0 0.625rem 2.3125rem;

    @media (min-width: ${Breakpoints.xl}px) {
      display: block;
    }
  }

  a {
    padding-left: 0.625rem;
    padding-right: 0.625rem;
  }
`;

export const AccountsSidebarMenu = styled(SidebarMenuContainer)`
  padding: 2.1875rem 1.25rem 0;
  justify-items: left;

  @media (min-width: ${Breakpoints.md}px) {
    max-width: none;
    margin: 0;
  }

  @media (min-width: ${Breakpoints.xl}px) {
    padding: 0;
  }

  //i {
  //  margin-right: 0.9375rem;
  //}
`;
