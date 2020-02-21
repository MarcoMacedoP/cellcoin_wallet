import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import styles from './styles/styles';
import Toast from 'react-native-simple-toast';

//components
import { TouchableOpacity, Text, View, ScrollView } from 'react-native';
export const TermsScreen = ({ route,  navigation }) => {
    const [count, setCount] = useState(2);  

    return (
      <Container>
        <ContainerText>
          <Title>Dear User,</Title>
          <ScrollView>
            <Label>The Agave Coin App is a mobile-terminal 
              based platform provided by Lomelí Technology Co., for security management of  digital assets that provides the users thereof
              with security management og digital assets( hereinafter referred as "The platform"). The platform provides services to the users registered with the platform ( hereinafter referred to as "the Users") in accordance with the terms and conditions of this Agrement (defined below), and this Agreement shall be legally binding on and between the users and the platform. The platform hereby reminds the Users to carefully read and fully understand the terms and conditions of this Agreement, especially those terms and conditions of this Agreement that exclude or limit the liability of the platform and exclude or restrict the rights  the rights and interests of the users. The users shall read carefully and choose to acepts all the terms and conditions of this Agreement, the user shall not be entitled to use the services provided by the platform on the basis of this agreement. If the user does not agree to the content of this agreement, 
              or refuses  to recognize the right of 
              The Agave Coin App is a mobile-terminal 
              based platform provided by Lomelí Technology Co., for security management of  digital assets that provides the users thereof
              with security management og digital assets( hereinafter referred as "The platform"). The platform provides services to the users registered with the platform ( hereinafter referred to as "the Users") in accordance with the terms and conditions of this Agrement (defined below), and this Agreement shall be legally binding on and between the users and the platform. The platform hereby reminds the Users to carefully read and fully understand the terms and conditions of this Agreement, especially those terms and conditions of this Agreement that exclude or limit the liability of the platform and exclude or restrict the rights  the rights and interests of the users. The users shall read carefully and choose to acepts all the terms and conditions of this Agreement, the user shall not be entitled to use the services provided by the platform on the basis of this agreement. If the user does not agree to the content of this agreement, 
              or refuses  to recognize the right of 
              The Agave Coin App is a mobile-terminal 
              based platform provided by Lomelí Technology Co., for security management of  digital assets that provides the users thereof
              with security management og digital assets( hereinafter referred as "The platform"). The platform provides services to the users registered with the platform ( hereinafter referred to as "the Users") in accordance with the terms and conditions of this Agrement (defined below), and this Agreement shall be legally binding on and between the users and the platform. The platform hereby reminds the Users to carefully read and fully understand the terms and conditions of this Agreement, especially those terms and conditions of this Agreement that exclude or limit the liability of the platform and exclude or restrict the rights  the rights and interests of the users. The users shall read carefully and choose to acepts all the terms and conditions of this Agreement, the user shall not be entitled to use the services provided by the platform on the basis of this agreement. If the user does not agree to the content of this agreement, 
              or refuses  to recognize the right of 
              The Agave Coin App is a mobile-terminal 
              based platform provided by Lomelí Technology Co., for security management of  digital assets that provides the users thereof
              with security management og digital assets( hereinafter referred as "The platform"). The platform provides services to the users registered with the platform ( hereinafter referred to as "the Users") in accordance with the terms and conditions of this Agrement (defined below), and this Agreement shall be legally binding on and between the users and the platform. The platform hereby reminds the Users to carefully read and fully understand the terms and conditions of this Agreement, especially those terms and conditions of this Agreement that exclude or limit the liability of the platform and exclude or restrict the rights  the rights and interests of the users. The users shall read carefully and choose to acepts all the terms and conditions of this Agreement, the user shall not be entitled to use the services provided by the platform on the basis of this agreement. If the user does not agree to the content of this agreement, 
              or refuses  to recognize the right of </Label>
          </ScrollView>
        </ContainerText>
        <BodyBox>
          <ContainerButtons>
            <TouchableOpacity style={styles.dotBox} onPress={() => 
                {
                  if (count == 1) {
                    setCount(2);
                  } else {
                    setCount(1);
                  }
                }}>
              <View style={styles.dotBlueRound}>
                <View style={count == 1 ? styles.dotBlue : styles.dotGray}></View>
              </View>
              <LabelGreen>I agree to the above terms  </LabelGreen>
            </TouchableOpacity>
            {count == 1 ?
              <TouchableOpacity
              style={[{height: 50, backgroundColor: '#2FA0A8'}, styles.button]}
              onPress={() => {
                if (count == 1) {
                  navigation.replace('Create', route.params)
                } else {
                  Toast.show('Acepta los terminos y condiciones para continuar', Toast.SHORT);
                }
              }}>
                  <Text style={{color: 'white', fontSize: 18}}>Confirm</Text>
              </TouchableOpacity>
            :
              <View style={[{height: 50, backgroundColor: '#E2E3E5'}, styles.button]}>
                <Text style={{color: 'white', fontSize: 18}}>Confirm</Text>
              </View>
            }
            
          </ContainerButtons>
        </BodyBox>
      </Container>
    );
};

const Container = styled.View`
  padding: 22px;
  height: 100%;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
`;
const BodyBox = styled.View`
  height: 20%;
  width: 100%;
  align-self: flex-end;
`;

const ContainerText = styled.View`
  padding: 22px;
  width: 100%;
  height: 80%;
`;
const ContainerButtons = styled.View`
  padding: 22px;
  width: 100%;
`;
const Title = styled.Text`
  font-size: 18px;
  margin-bottom: 5px;
  font-weight: bold;
  color: #8D8D8D;
`;
const Label = styled.Text`
  font-size: 12px;
  color: #8D8D8D;
  text-align: justify;
  
`;
const LabelGreen = styled.Text`
  font-size: 15px;
  margin-left: 5px;
  color: #2FA0A8;
  text-align: center;
`;
