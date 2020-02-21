import React from 'react';
import {Text} from 'shared/styled-components/Texts';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';
import { colors } from 'shared/styles';
import { ClipboardComponent } from 'shared/components/Clipboard';

type RecieveTransferScreenProps = {
  route: any,
};

export const RecieveTransferScreen: React.FC<RecieveTransferScreenProps> = ({ route }) => {
  const { params : {currency}} = route
  console.log(currency)
  return (
    <>
      <LinearGradient colors={['#26777D', '#26777D', '#50CDD5', '#50CDD5']} style={{
        flex: 1,
      }}>
        <Container>
          <Box>
            <ImageBox>
              <Image
                source={
                  currency.type === 'AGVC'
                    ? require('assets/icons/agave_coin_icon.png')
                    : require('assets/icons/ethereum_icon.png')
                }
                style={{width: 35, height: 35,}}
              />
              <Image source={{uri: 'https://chart.googleapis.com/chart?chs=300x300&chld=L|1&cht=qr&chl=ethereum:0xa25beef0b1d60ca40990a7b3164da84eaa9c2395'}} />
            </ImageBox>
            <AddressBox>
              <ClipboardComponent text="0xa25beef0b1d60ca40990a7b3164da84eaa9c2395" />
            </AddressBox>
          </Box>

          <TextBox>
            <SmallText> Attention: please do not deposit any digital assets other than {currency.type} to the above address</SmallText>
            <Logo source={require('assets/icons/logo_mini.png')} />
          </TextBox>
        </Container>
      </LinearGradient>
    </>
  );
};
const Container = styled.View`
  margin-top: 50px;
  height:100%;
  justify-content: space-around;
  align-items: center;
`;

const Box = styled.View`
  background-color: ${colors.white}
  justify-content: space-around;
  align-items: center;
  width: 75%;
  padding-top: 10px;
  border-radius: 25px;
`;

const ImageBox = styled.View`
  justify-content: center;
  align-items: center;
`;

const Image = styled.Image`
  width: 200px;
  height: 200px;
`;
const Logo = styled.Image`
  width: 150px;
  height: 150px;
  resize-mode: contain;
`;

const SmallText = styled.Text`
  color: rgba(255,255,255,5);
  text-align: center;
`;
const AddressBox = styled.View`
  background-color: transparent;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 10px 0;
  border-top-width: .5px;
`;
const TextBox = styled.View`
  background-color: transparent;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 300px;
`;