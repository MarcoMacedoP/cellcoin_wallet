import styled from 'styled-components/native';
import {colors} from 'shared/styles';

type ViewProps = {
  light?: boolean;
  center?: string;
};

export const PageContainer = styled.View<ViewProps>`
  padding: 22px;
  height: 100%;
  width: 100%;
  justify-content: ${props => (props.center ? props.center : 'flex-start')};
  align-items: center;
  background-color: ${props => (props.light ? colors.white : colors.whiteDark)};
`;
