import React from 'react';
import styled from 'styled-components/native';
import {Image} from 'react-native';
import {colors} from '../styles';
type EmptyStateProps = {
  message: string;
  hasImage?: boolean;
};
export const EmptyState: React.FC<EmptyStateProps> = ({
  message,
  hasImage = true,
}) => (
  <Container>
    {hasImage && <Image source={require('/assets/icons/empty_icon.png')} />}
    <Message>{message}</Message>
  </Container>
);

const Container = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
const Message = styled.Text`
  margin-top: 12px;
  font-size: 18px;
  color: ${colors.blackLigth};
`;
