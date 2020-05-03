import React from 'react';
import { useSelector } from 'react-redux';
import { useFormikContext } from 'formik';

import { TxDraftFormValues } from '../SendForm';
import { Currencies } from '../../../../../dictionaries';
import {
  getAccountById,
  getExchangeRates,
} from '../../../../../store/account/selectors';
import { getSettings } from '../../../../../store/user/selectors';
import { round, parseFloatStr } from '../../../../../utils/common';
import { isPositiveNumber } from '../../../../../utils/validations';

import {
  Container,
  SendAllButton,
  InputsContainer,
  AmountInCrypto,
  AmountInLocal,
} from './styled';

import Input from '../../../../forms/Input/Input';

enum Inputs {
  amount = 'amount',
  amountInLocalCurrency = 'amountInLocalCurrency',
}

const Amount: React.FC = () => {
  const { values, setFieldValue } = useFormikContext<TxDraftFormValues>();
  const sendFromAccount = useSelector(
    getAccountById(values.transferFrom.intId)
  );
  const rates = useSelector(getExchangeRates);
  const settings = useSelector(getSettings);
  const exchangeRate =
    rates && sendFromAccount && settings && settings.currency
      ? rates[sendFromAccount.coin][settings.currency]
      : 0;
  const fee = parseFloat(values.fee);

  const validateInput = (inputName: Inputs) => (value: string) => {
    if (!sendFromAccount) {
      return;
    }

    let error;
    const intVal = parseFloatStr(value);

    if (!isPositiveNumber(value)) {
      error = 'Amount field is not valid.';
    }

    const maxAvailableAmount = sendFromAccount.balance - fee;

    if (inputName === Inputs.amount && intVal > maxAvailableAmount) {
      error = 'The sending amount exceeds the available balance.';
    }

    return error;
  };

  const updateInputValue = (inputToUpdate: Inputs) => (value: string) => {
    let newValue = '';

    if (isPositiveNumber(value)) {
      const intVal = parseFloatStr(value);
      const decimals = inputToUpdate === Inputs.amount || intVal > 0 ? 2 : 8;
      const convertedValue =
        inputToUpdate === Inputs.amount
          ? round(intVal / exchangeRate, 8)
          : round(intVal * exchangeRate, decimals);
      newValue = convertedValue.toString();
    }

    setFieldValue(inputToUpdate as never, newValue);
  };

  return (
    <Container label="Amount">
      <SendAllButton
        type="button"
        onClick={() => {
          if (sendFromAccount) {
            const maxAvailableAmount = (
              sendFromAccount.balance - fee
            ).toString();
            setFieldValue(Inputs.amount, maxAvailableAmount);
            updateInputValue(Inputs.amountInLocalCurrency)(maxAvailableAmount);
          }
        }}
      >
        Send all
      </SendAllButton>
      <InputsContainer>
        <AmountInCrypto currency={sendFromAccount?.coin}>
          <Input
            name="amount"
            onChange={updateInputValue(Inputs.amountInLocalCurrency)}
            validate={validateInput(Inputs.amount)}
            required
          />
        </AmountInCrypto>
        <AmountInLocal currency={Currencies.USD}>
          <Input
            name="amountInLocalCurrency"
            onChange={updateInputValue(Inputs.amount)}
            validate={validateInput(Inputs.amountInLocalCurrency)}
            hideTextError
            required
          />
        </AmountInLocal>
      </InputsContainer>
    </Container>
  );
};

export default Amount;
