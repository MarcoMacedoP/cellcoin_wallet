import React from 'react';
import {colors} from 'shared/styles';
import styled from 'styled-components/native';
import Modal from 'react-native-modal';
import { StatusBar } from 'react-native';
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
  title?: string;
};

export const RawModal: React.FC<ModalProps> = ({
         isShowed,
         onClose,
         title,
         children,
       }) => (
         <>
           {isShowed && (
             <StatusBar
               backgroundColor={colors.blackTransparent}
               barStyle="light-content"
             />
           )}
           <DraggableModal
             isVisible={isShowed}
             onSwipeComplete={onClose}
             swipeDirection={['down']}>
             <RawModalContent>
               <HrRounded />
               {children}
             </RawModalContent>
           </DraggableModal>
         </>
       );
const DraggableModal = styled(Modal)`
  justify-content: flex-end;
  margin: 0;
`;
const HrRounded = styled.View`
  position: absolute;
  top: 10px;
  height: 5px;
  width: 200px
  background-color: ${colors.blackLigth};
  border-radius: 150px;
`;
const RawModalContent = styled.View`
  background-color: ${colors.white};
  padding: 20px;
  padding-top: 40px;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  justify-content: space-around;
  align-items: center;
`;