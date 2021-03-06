import React, { useState, useEffect } from 'react';
import { useTransition } from 'react-spring';
import { useSelector } from 'react-redux';

import { getAccountsListWithDescText } from '../../../store/account/selectors';
import { MANAGE_ACCOUNT_ACTIONS } from '../../../menus';
import { Wrapper, Content, Header, Grid, Button } from './styled';

import CurrencyIcon from '../CurrencyIcon/CurrencyIcon';
import AddAccountIcon from '../AddAccountIcon/AddAccountIcon';
import ClosePageButton from '../../layout/Page/ClosePageButton/ClosePageButton';
import MyAccountsButton from './MyAccountsButton/MyAccountsButton';

function getTransitionOptions(itemsLength: number) {
  return {
    unique: true,
    trail: 400 / itemsLength,
    from: { opacity: 0, transform: 'scale(0)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    leave: { opacity: 0, transform: 'scale(0)' },
  };
}

const MyAccounts: React.FC = () => {
  const [show, set] = useState(false);

  useEffect(() => {
    set(true);

    return () => {
      set(false);
    };
  }, []);

  const accounts = useSelector(getAccountsListWithDescText);

  const accountsTransitions = useTransition(
    show && accounts ? accounts : [],
    (item) => item.address,
    getTransitionOptions(accounts ? accounts.length : 0)
  );

  const createAccountTransitions = useTransition(
    show ? MANAGE_ACCOUNT_ACTIONS : [],
    (item) => item.link,
    getTransitionOptions(MANAGE_ACCOUNT_ACTIONS.length)
  );

  return (
    <Wrapper>
      <Content>
        <Header>My accounts</Header>
        <Grid>
          {accountsTransitions.map(({ item, key, props }) => (
            <MyAccountsButton key={key}>
              <Button
                style={props}
                key={key}
                link={`/account/${item.id}`}
                icon={<CurrencyIcon coin={item.coin} size="lg" />}
                text={item.name}
                descText={item.descText}
                readonly={item.readonly}
              />
            </MyAccountsButton>
          ))}
        </Grid>
        <Header>Manage</Header>
        <Grid>
          {createAccountTransitions.map(({ item, key, props }) => (
            <MyAccountsButton key={key}>
              <Button
                key={key}
                style={props}
                link={item.link}
                icon={<AddAccountIcon Icon={item.icon} />}
                text={item.text}
                descText={item.descText}
              />
            </MyAccountsButton>
          ))}
        </Grid>
      </Content>
      <ClosePageButton />
    </Wrapper>
  );
};

export default MyAccounts;
