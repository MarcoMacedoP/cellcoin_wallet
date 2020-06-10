import React from 'react';
import styled from 'styled-components/native';
import {Dimensions} from 'react-native';
import {spacings} from 'shared/styles';

type WalkthroughItemProps = {
  image: any;
  title: string;
  desc: string;
};

export const WalkthroughItem: React.FC<WalkthroughItemProps> = ({
  image,
  title,
  desc,
}) => {
  const containerWidth = Dimensions.get('window').width - spacings.left;
  return (
    <Container style={{width: containerWidth}}>
      <ImageBox>
        <Image source={image} resizeMode="contain" />
      </ImageBox>

      <ContainerText>
        <Title>{title}</Title>
        <Label>{desc}</Label>
      </ContainerText>
    </Container>
  );
};

const Container = styled.View`
  height: 100%;
  justify-content: space-between;
  padding-bottom: 8px;
`;
const Image = styled.Image`
  width: 100%;
  height: 100%;
`;
const ImageBox = styled.View`
  width: 100%;
  height: 60%;
  margin-bottom: 16px;
  justify-content: flex-end;
  align-items: center;
`;
const ContainerText = styled.View`
  padding: 22px;
  width: 100%;
`;
const Title = styled.Text`
  font-size: 30px;
  margin-bottom: 16px;
  font-weight: bold;
  text-align: center;
`;
const Label = styled.Text`
  font-size: 12px;
  color: #8d8d8d;
  text-align: center;
`;
