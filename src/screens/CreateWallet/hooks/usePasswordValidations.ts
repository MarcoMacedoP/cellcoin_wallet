import {validations} from 'shared/validations';
import {useValidation} from 'shared/hooks';
import {useEffect, useState} from 'react';

export function usePasswordValidations(text: string) {
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [textHasMinorCase] = useValidation({
    validation: validations.hasLowerCase,
    text,
  });
  const [textHasUpperCase] = useValidation({
    text,
    validation: validations.hasUpperCase,
  });
  const [textHasANumber] = useValidation({
    text,
    validation: validations.hasNumber,
  });
  const [textHasSpecialCharacter] = useValidation({
    text,
    validation: validations.hasSpecialCharacter,
  });
  const [textHasValidLong] = useValidation({
    text,
    validation: validations.eightToThirtyTwoCharacters,
  });
  useEffect(() => {
    const allValidationsPassed =
      textHasMinorCase &&
      textHasUpperCase &&
      textHasANumber &&
      textHasSpecialCharacter &&
      textHasValidLong;
    setIsValidPassword(allValidationsPassed);
  }, [
    textHasMinorCase,
    textHasUpperCase,
    textHasANumber,
    textHasSpecialCharacter,
    textHasValidLong,
  ]);
  return {
    validations: {
      textHasMinorCase,
      textHasUpperCase,
      textHasANumber,
      textHasSpecialCharacter,
      textHasValidLong,
      isValidPassword,
    },
    isValidPassword,
  };
}
