import React, {useMemo} from 'react';
import {colors} from 'shared/styles';
import styled from 'styled-components/native';
import Modal from 'react-native-modal';
import {StatusBar, StyleSheet, View} from 'react-native';
/**
 *  A component to manage modals through app.
 *  @param  isShowed indicates if modal is showed
 *  @param onClose a function to be called when the modal closes.
 */
type ModalProps = {
  isShowed: boolean;
  onClose: () => void;
  title?: string;
  contentContainerStyle?: any;
  /**
   * Should render the line in the top of header ? Defaults to true.
   */
  renderHeaderLine?: boolean;
};

export const RawModal: React.FC<ModalProps> = ({
  isShowed,
  onClose,
  contentContainerStyle,
  renderHeaderLine = true,
  children,
}) => {
  const renderStyles = useMemo(
    () => ({
      modalContent: {
        paddingTop: renderHeaderLine ? 40 : 12,
      },
    }),
    [renderHeaderLine],
  );
  return (
    <>
      {isShowed && (
        <StatusBar
          backgroundColor={colors.blackTransparent}
          barStyle="light-content"
        />
      )}
      <Modal
        isVisible={isShowed}
        style={styles.modal}
        onSwipeComplete={onClose}
        swipeDirection={['down']}>
        <View
          style={[
            renderStyles.modalContent,
            styles.modalContentContainer,
            contentContainerStyle,
          ]}>
          {renderHeaderLine && <View style={styles.headerLine} />}
          {children}
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContentContainer: {
    backgroundColor: colors.white,
    padding: 20,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  headerLine: {
    position: 'absolute',
    top: 10,
    height: 5,
    backgroundColor: colors.blackLigth,
    borderRadius: 150,
  },
});
