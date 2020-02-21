import React from 'react';
import styled from 'styled-components/native';
import {Label} from 'shared/styled-components';
import {UIActivityIndicator} from 'react-native-indicators';
import {ImageSource} from 'react-native-vector-icons/Icon';

type LoadingProps = {
  image: ImageSource;
  text: string;
};
/**
 * A component for show a loading state.
 */
export const Loading: React.FC<LoadingProps> = ({image, text}) => (
  <Container>
    {image && (
      <ImageContainer>
        <Image source={image} />
      </ImageContainer>
    )}
    <LoaderContainer>
      <UIActivityIndicator size={50} color="#65DDB9" />
    </LoaderContainer>

    <ContainerText>
      <Label center>{text}</Label>
    </ContainerText>
  </Container>
);
const Container = styled.View`
  align-items: center;
  height: 100%;
`;
const ContainerText = styled.View`
  width: 70%;
  padding-left: 8px;
  margin-bottom: 35px;
  align-items: flex-start;
`;
const LoaderContainer = styled.View`
  width: 100%;
  height: 20%;
  align-items: center;
  margin: 16px;
`;
const Image = styled.Image`
  width: 100%;
  height: 100%;
  resize-mode: contain;
`;
const ImageContainer = styled.View`
  width: 60%;
  height: 40%;
  margin-bottom: 16px;
  justify-content: center;
  align-items: center;
`;
