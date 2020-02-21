import {useState, useEffect} from 'react';

export function useValidation({
  validation,
  text,
}: {
  validation: RegExp;
  text: string;
}) {
  const [isValidate, setValidate] = useState(false);
  useEffect(() => {
    const isValidate = validation.test(text);
    console.log({isValidate, text});
    isValidate ? setValidate(true) : setValidate(false);
  }, [text]);
  return [isValidate];
}
