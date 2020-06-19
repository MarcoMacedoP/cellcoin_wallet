import {Linking, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import {colors} from 'shared/styles/variables';

export const NotificationCard = ({data: {img, title_es, msg_es, link}}) => {
  const uri = img
    ? img
    : 'https://ctt.trains.com/sitefiles/images/no-preview-available.png';
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
            imageStyle={{
              borderTopLeftRadius: 25,
              borderTopRightRadius: 25,
            }}
            source={{
              uri,
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
  width: 100%;
  max-width: 300px;
  max-height: 300px;
  flex: 1;
  margin-top: 25px;
  background-color: ${colors.white};
  border-radius: 25px;
`;
const CardHeader = styled.View`
  width: 100%;
  flex: 2;
  justify-content: center;
  align-items: center;
  background-color: ${colors.white};
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
`;

const CardBody = styled.View`
  width: 100%;
  flex: 1;
  background-color: ${colors.white};
  border-radius: 25px;
  max-height: 100px;
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
  font-size: 24px;
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
