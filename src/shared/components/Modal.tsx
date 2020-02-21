import React from 'react';
import {Modal as NativeModal, Dimensions} from 'react-native';
import {colors} from 'shared/styles';
import styled from 'styled-components/native';
import {
  Label as BaseLabel,
} from 'shared/styled-components';
import FIcon from 'react-native-vector-icons/Feather';
/**
 *  A component to manage modals through app.
 *  @param  isShowed indicates if modal is showed
 *  @param onClose a function to be called when the modal closes.
 *  @param icon a function to be called when the modal closes.
 *  @param image (optional) an image showed in the top of modal
 */
type ModalProps = {
  isShowed: boolean;
  onClose: () => void;
  icon?: string;
  image?: string;
};

export const Modal: React.FC<ModalProps> = ({
  isShowed,
  onClose,
  icon,
  image,
  children,
}) => (
  <Container
    animationType="fade"
    transparent={true}
    visible={isShowed}
    onRequestClose={onClose}>
    <ScrollView
      alwaysBounceVertical
      style={{backgroundColor: 'rgba(0,0,0,0.8)'}}
      contentContainerStyle={{
        justifyContent: 'center',
        alignItems: 'center',
        height: Dimensions.get('window').height,
      }}>
      <ContainerModal>
        {image && (
          <IconBoxModal style={{borderRadius: 25}}>
            <IconModal source={image} />
          </IconBoxModal>
        )}
        {icon && (
          <HeaderModal>
            <IconButton onPress={() => onClose()}>
              <FIcon name="x" size={25} color={colors.black} />
            </IconButton>
            <Label>Add new address</Label>
          </HeaderModal>
        )}
        <ModalBox>{children}</ModalBox>
      </ContainerModal>
    </ScrollView>
  </Container>
);
const Container = styled(NativeModal)`
  align-items: center;
  justify-content: center;
`;
const ScrollView = styled.ScrollView`
  background-color: ${colors.blackTransparent};
`;
const ContainerModal = styled.View`
  justify-content: space-between;
  background-color: white;
  align-items: center;
  border-radius: 25px;
  height: ${Dimensions.get('window').height * 0.8}px;
  width: 90%;
`;
const IconButton  = styled.TouchableOpacity`

`;
const IconBoxModal = styled.View`
  width: 100%;
  height: 10%;
  margin-top: 16px;
  justify-content: center;
  align-items: center;
  background-color: white;
`;
const HeaderModal = styled.View`
  width: 100%;
  height: 10%;
  margin-top: 16px;
  justify-content: center;
  align-items: center;
  background-color: white;  
  border-radius: 15px;
`;
const Label = styled(BaseLabel)`
  position: relative;
  top: 4px;
`;
const IconModal = styled.Image`
  width: 80%;
  height: 80%;
  resize-mode: contain;
`;
const ModalBox = styled.View`
  height: 90%;
  width: 100%;
  align-items: center;
`;
