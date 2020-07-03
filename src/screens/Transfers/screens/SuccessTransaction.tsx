import React from 'react';
import {RouteProp, useFocusEffect} from '@react-navigation/core';
import {AuthRootStackParams} from 'Router';
import {Title, Text} from 'shared/styled-components';
import {View, StyleSheet, Image, BackHandler} from 'react-native';
import {Button, ScreenContainer, FadeInView} from 'shared/components';
import {StackNavigationProp} from '@react-navigation/stack';
import {getCurrencyInfo} from 'shared/libs/getCurrencyInfo';
import {colors} from 'shared/styles';

type SuccessTransactionProps = {
  navigation: StackNavigationProp<AuthRootStackParams, 'SuccessTransaction'>;
  route: RouteProp<AuthRootStackParams, 'SuccessTransaction'>;
};

export const SuccessTransaction: React.FC<SuccessTransactionProps> = ({
  route,
  navigation,
}) => {
  const tokenInfo = getCurrencyInfo(route.params.type);
  const quantity = parseFloat(route.params.quantity).toFixed(5);
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.push('Balance', {action: 'update'});
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );
  function handleSubmit() {
    navigation.replace('Balance', {
      action: 'update',
    });
  }
  return (
    <ScreenContainer
      color="success"
      statusBarProps={{barStyle: 'light-content'}}>
      <View style={styles.contentContainer}>
        <FadeInView style={styles.header} duration={4000}>
          <Title center color="white">
            Success transaction
          </Title>
          <Image source={tokenInfo.logo} style={styles.logo} />
          <Text color="whiteDark" center style={styles.subTitle}>
            You have sended {quantity} {tokenInfo.tokenName} successfully 🎉
          </Text>
        </FadeInView>
        <SuccessLabel label="From:" content={route.params.from} />
        <SuccessLabel label="To:" content={route.params.to} />
      </View>
      <FadeInView duration={6000} style={styles.buttonContainer}>
        <Button style={styles.button} onClick={handleSubmit}>
          Continue
        </Button>
      </FadeInView>
    </ScreenContainer>
  );
};

interface SuccessLabelProps {
  label: string;
  content: string;
}
const SuccessLabel = (props: SuccessLabelProps) => (
  <FadeInView style={styles.successLabel} duration={3000}>
    <Text isBold color="whiteDark">
      {props.label}
    </Text>
    <Text color="whiteDark" style={styles.successLabelContent}>
      {props.content}
    </Text>
  </FadeInView>
);

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    width: '100%',
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
  },
  logo: {
    marginVertical: 16,
    width: 32 * 2,
    height: 32 * 2,
  },
  title: {
    marginBottom: 8,
  },
  subTitle: {
    width: '80%',
  },
  successLabel: {
    marginVertical: 8,
    width: '100%',
  },
  successLabelContent: {
    marginTop: 4,
    opacity: 0.8,
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    backgroundColor: colors.success,
    borderWidth: 2,
    borderColor: colors.white,
  },
});
