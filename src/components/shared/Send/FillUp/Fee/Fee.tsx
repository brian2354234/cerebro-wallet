import React from 'react';
import { useSelector } from 'react-redux';
import { useFormikContext } from 'formik';

import { isPositiveNumber } from '../../../../../utils/validations';
import {
  getAccountById,
  getRecommendedBTCFee,
} from '../../../../../store/account/selectors';

import Input from '../../../../forms/Input/Input';
import { Container } from './styled';
import { TxDraftFormValues } from '../../Send';
import { parseFloatStr } from '../../../../../utils/common';

const Fee: React.FC = () => {
  const { values } = useFormikContext<TxDraftFormValues>();
  const recommendedBTCFee = useSelector(getRecommendedBTCFee);
  const sendFromAccount = useSelector(getAccountById(values.transferFrom?.id));

  return (
    <Container coin={values.transferFrom?.coin}>
      <Input
        name="fee"
        required
        placeholder="0"
        validate={(value: string) => {
          if (!sendFromAccount) {
            return;
          }

          let error;

          const intVal = parseFloatStr(value);

          if (!isPositiveNumber(value)) {
            error = 'Fee field is not valid.';
          }

          if (intVal < recommendedBTCFee) {
            error = 'Not enough fee. Increase the fee.';
          }

          if (intVal > sendFromAccount?.balance - parseFloat(values.amount)) {
            error = 'Fee greater than the accounts balance.';
          }

          return error;
        }}
      />
    </Container>
  );
};

export default Fee;
