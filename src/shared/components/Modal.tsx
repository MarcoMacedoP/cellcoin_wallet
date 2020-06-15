import React from 'react';
import {Modal as NativeModal, Dimensions} from 'react-native';
import {colors} from 'shared/styles';
import styled from 'styled-components/native';
import {Label as BaseLabel} from 'shared/styled-components';
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
  title?: string;
  style?: any;
};

export const Modal: React.FC<ModalProps> = ({
  isShowed,
  onClose,
  icon,
  image,
  title,
  children,
}) => (
  <NativeModal
    animationType="fade"
    transparent={true}
    visible={isShowed}
    onRequestClose={onClose}>
    <ScrollView
      contentContainerStyle={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        height: Dimensions.get('window').height - 25,
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
            {title && <Label>{title}</Label>}
          </HeaderModal>
        )}
        <ModalBox
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{alignItems: 'center'}}>
          {children}
        </ModalBox>
      </ContainerModal>
    </ScrollView>
  </NativeModal>
);
const ScrollView = styled.ScrollView`
  background-color: ${colors.blackTransparent};
  flex: 1;
`;
const ContainerModal = styled.View`
  justify-content: space-between;
  background-color: white;
  align-items: center;
  border-radius: 25px;
  max-height: ${Dimensions.get('window').height * 0.8}px;
  /* width: 90%; */
  flex: 1;
`;
const IconButton = styled.TouchableOpacity``;
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
  align-items: flex-end;
  padding: 0 16px;
  background-color: white;
  border-radius: 15px;
`;
const Label = styled(BaseLabel)`
  position: relative;
  top: 0;
  align-self: flex-start;
  width: 80%;
`;
const IconModal = styled.Image`
  width: 80%;
  height: 80%;
  resize-mode: contain;
`;
const ModalBox = styled.ScrollView`
  height: 90%;
  width: 100%;
`;
