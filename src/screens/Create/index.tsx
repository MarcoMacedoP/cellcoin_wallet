import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';

import Toast from 'react-native-simple-toast';
import Wallet from 'erc20-wallet';

import {Button} from 'shared/components/Button';
//components

import {PasswordForm} from './components/PasswordForm';
import {PasswordLabelBox} from './components/PasswordLabelBox';
import {usePasswordValidations} from './hooks/usePasswordValidations';
import {colors} from 'shared/styles';
export const CreateScreen = ({navigation}) => {
  const [state, setState] = useState({
    pass: '',
    passConfirm: '',
  });
  const {validations, isValidPassword} = usePasswordValidations(state.pass);
  const [isLoading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const onTextChange = text => {
    if (step === 1) {
      setState({...state, pass: text});
    } else {
      setState({...state, passConfirm: text});
    }
  };

  async function onSubmit() {
    if (step === 1) {
      isValidPassword
        ? setStep(2)
        : Toast.show('Invalid password', Toast.SHORT);
    } else {
      console.log({...state});
      if (state.pass === state.passConfirm) {
        setLoading(true);
        Wallet.password = state.pass;
        try {
          Wallet.seed = await Wallet.createSeed();
          console.log(Wallet.seed);
          setLoading(false);
          navigation.navigate('Mnemonic');
        } catch (error) {
          console.error(error);
        }
      } else {
        Toast.show("Passwords didn't match", Toast.SHORT);
      }
    }
  }

  return (
    <Container>
      {step === 1 ? (
        <PasswordForm
          labelText="Please set security password"
          value={state.pass}
          onSubmitEditing={onSubmit}
          onTextChange={text => onTextChange(text)}>
          {state.pass.length > 0 && (
            <>
              <PasswordLabelBox
                isValid={validations.textHasMinorCase}
                text="A lower case letter"
              />
              <PasswordLabelBox
                isValid={validations.textHasUpperCase}
                text="A uppercase letter"
              />
              <PasswordLabelBox
                isValid={validations.textHasANumber}
                text=" A number"
              />
              <PasswordLabelBox
                isValid={validations.textHasValidLong}
                text="8~32 characters"
              />
              <PasswordLabelBox
                isValid={validations.textHasSpecialCharacter}
                text="An special character"
              />
            </>
          )}
        </PasswordForm>
      ) : (
        <PasswordForm
          labelText="Repeat password"
          value={state.passConfirm}
          onSubmitEditing={onSubmit}
          onTextChange={text => onTextChange(text)}>
          {state.passConfirm.length > 0 && (
            <PasswordLabelBox
              isValid={state.pass === state.passConfirm}
              text={
                state.pass === state.passConfirm
                  ? 'Passwords matches'
                  : "Passwords didn't match "
              }
            />
          )}
        </PasswordForm>
      )}

      <Button
        onClick={onSubmit}
        isActivated={
          step === 1 ? isValidPassword : state.pass === state.passConfirm
        }
        isLoading={isLoading}>
        Continue
      </Button>
    </Container>
  );
};

const Container = styled.ScrollView`
  height: 100%;
  width: 100%;
  padding: 22px;
  height: 100%;
  width: 100%;
  flex-direction: column;
  background-color: ${colors.white};
`;
