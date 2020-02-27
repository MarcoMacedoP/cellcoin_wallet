import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';

import Toast from 'react-native-simple-toast';
import Wallet from 'erc20-wallet';

//components
import {Button} from 'shared/components/Button';
import {PasswordForm} from '../components/PasswordForm';
import {PasswordLabelBox} from '../components/PasswordLabelBox';

import {usePasswordValidations} from '../hooks/usePasswordValidations';
import {colors} from 'shared/styles';

export const SetPasswordScreen = ({navigation, route}) => {
  const [state, setState] = useState({
    pass: '',
    passConfirm: '',
  });
  const {validations, isValidPassword} = usePasswordValidations(state.pass);
  const [isLoading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  useEffect(() => {
    console.log(route.params);
  }, []);
  const onTextChange = text => {
    if (step === 1) {
      setState({...state, pass: text});
    } else {
      setState({...state, passConfirm: text});
    }
  };

  async function onSubmit() {
    const canUserSubmit = validateSubmit();
    if (canUserSubmit) {
      Wallet.password = state.pass;

      //create the seed to the wallet
      if (route.params.action === 'create') {
        setLoading(true);
        try {
          Wallet.seed = await Wallet.createSeed();
          setLoading(false);
        } catch (error) {
          Toast.show('Error: ' + error);
        }
      }
      const {action} = route.params;
      const urlToRedirect =
        action === 'create' ? 'MnemonicIntro' : 'MnemonicImport';

      navigation.navigate(urlToRedirect);
    }
  }
  function validateSubmit() {
    if (step === 1) {
      if (isValidPassword) {
        setStep(2);
        return false;
      }
    } else {
      return state.pass === state.passConfirm;
    }
  }
  return (
    <Container keyboardShouldPersistTaps="handled">
      {step === 1 ? (
        <PasswordForm
          labelText="Please set security password"
          value={state.pass}
          onSubmitEditing={onSubmit}
          onTextChange={text => onTextChange(text)}>
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
        </PasswordForm>
      ) : (
        <PasswordForm
          labelText="Repeat password"
          value={state.passConfirm}
          onSubmitEditing={onSubmit}
          onTextChange={text => onTextChange(text)}>
          <PasswordLabelBox
            isValid={state.pass === state.passConfirm}
            text={
              state.pass === state.passConfirm
                ? 'Passwords match'
                : "Passwords didn't match "
            }
          />
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
