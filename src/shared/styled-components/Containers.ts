import styled from 'styled-components/native';
import {colors} from 'shared/styles';
import {spacings} from 'shared/styles';

type ViewProps = {
  light?: boolean;
  justify?: 'center' | 'flex-start' | 'flex-end' | 'space-between';
  align?: 'center' | 'flex-start' | 'flex-end';
};

export const PageContainer = styled.View<ViewProps>`
  padding: ${spacings.top}px ${spacings.right}px ${spacings.bottom}px;
  height: 100%;
  width: 100%;
  justify-content: ${props => (props.justify ? props.justify : 'flex-start')};
  align-items: ${props => (props.align ? props.align : 'center')};
  background-color: ${props => (props.light ? colors.white : colors.whiteDark)};
`;
export const IconContainer = styled.TouchableOpacity.attrs(props => ({}))`
  padding: 8px;
  border-radius: 50px;
`;
