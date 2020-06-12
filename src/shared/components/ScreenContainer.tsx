import React from 'react';
import styled from 'styled-components/native';
import {Color, spacings, colors} from 'shared/styles';
import {StatusBar, StatusBarProps} from 'react-native';

type StyledContainerProps = {
  light?: boolean;
  color?: Color;
  justify?: 'center' | 'flex-start' | 'flex-end' | 'space-between';
  align?: 'center' | 'flex-start' | 'flex-end';
};
interface ScreenContainerProps extends StyledContainerProps {
  statusBarProps?: StatusBarProps;
}

export const ScreenContainer: React.FC<ScreenContainerProps> = ({
  statusBarProps = {
    barStyle: 'dark-content',
  },
  children,
  ...styledContainerProps
}) => {
  return (
    <Container {...styledContainerProps}>
      <StatusBar {...statusBarProps} />
      {children}
    </Container>
  );
};

const Container = styled.View<StyledContainerProps>`
  padding: ${spacings.top}px ${spacings.right}px ${spacings.bottom}px;
  height: 100%;
  width: 100%;
  flex: 1;
  justify-content: ${props => (props.justify ? props.justify : 'flex-start')};
  align-items: ${props => (props.align ? props.align : 'center')};
  background-color: ${props =>
    props.light
      ? colors.white
      : props.color
      ? colors[props.color]
      : colors.whiteDark};
`;
