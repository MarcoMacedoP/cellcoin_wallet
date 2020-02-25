import {Linking} from 'react-native';
import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import {colors} from 'shared/styles/variables';

export const NotificationCard = ({data: {img, title_es, msg_es, link}}) => {
  return (
    <Card
      onPress={() => {
        if (link) {
          Linking.canOpenURL(link).then(supported => {
            if (supported) {
              Linking.openURL(link);
            } else {
              console.log("Don't know how to open URI: " + link);
            }
          });
        }
      }}>
      <CardHeader>
        <Image
          imageStyle={{borderTopLeftRadius: 25, borderTopRightRadius: 25}}
          source={{
            uri: img
              ? img
              : 'https://ctt.trains.com/sitefiles/images/no-preview-available.png',
          }}>
          <Title>{title_es}</Title>
        </Image>
      </CardHeader>
      <CardBody>
        <Text>{msg_es}</Text>
      </CardBody>
    </Card>
  );
};

const Card = styled.TouchableOpacity`
  width: 90%;
  height: 300px;
  margin-top: 25px;
  align-self: center;
  justify-content: center;
  align-items: center;
  background-color: ${colors.white};
  border-radius: 25px;
`;
const CardHeader = styled.View`
  width: 100%;
  height: 60%;
  justify-content: center;
  align-items: center;
  background-color: ${colors.white};
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
`;

const CardBody = styled.View`
  width: 100%;
  height: 40%;
  background-color: ${colors.white};
  border-radius: 25px;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 15px;
`;

const Image = styled.ImageBackground`
  width: 100%;
  height: 100%;
  justify-content: flex-end;
  align-items: flex-start;
  background-color: ${colors.white};
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
`;

const Title = styled.Text`
  font-size: 25px;
  color: ${colors.white};
  background-color: ${colors.blackTransparentLight};
  width: 100%;
  padding-left: 5px;
`;

const Text = styled.Text`
  font-size: 15px;
  color: ${colors.black};
  text-align: justify;
  width: 100%;
  height: 100%;
`;
