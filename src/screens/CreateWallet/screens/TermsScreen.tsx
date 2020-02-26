import React, {useState} from 'react';
import styled from 'styled-components/native';

//components
import {ScrollView} from 'react-native';
import {Button} from 'shared/components/Button';
import {RadioButton} from 'shared/components/RadioButton';
//styled-component
import {SmallText, Title as BaseTitle} from 'shared/styled-components/Texts';
import {PageContainer} from 'shared/styled-components/Containers';

export const TermsScreen = ({route, navigation}) => {
  const [hasAccepted, setHasAccepted] = useState(false);

  function onRadioButtonClick() {
    const toggledRadioButtonValue = hasAccepted ? false : true;
    setHasAccepted(toggledRadioButtonValue);
  }

  function onSubmit() {
    navigation.navigate('SetPassword', route.params);
  }

  return (
    <PageContainer light>
      <ContainerText>
        <Title>Dear user:</Title>
        <ScrollView>
          <Terms color="ligth">
            The Agave Coin App is a mobile-terminal based platform provided by
            Lomelí Technology Co., for security management of digital assets
            that provides the users thereof with security management og digital
            assets( hereinafter referred as "The platform"). The platform
            provides services to the users registered with the platform (
            hereinafter referred to as "the Users") in accordance with the terms
            and conditions of this Agrement (defined below), and this Agreement
            shall be legally binding on and between the users and the platform.
            The platform hereby reminds the Users to carefully read and fully
            understand the terms and conditions of this Agreement, especially
            those terms and conditions of this Agreement that exclude or limit
            the liability of the platform and exclude or restrict the rights the
            rights and interests of the users. The users shall read carefully
            and choose to acepts all the terms and conditions of this Agreement,
            the user shall not be entitled to use the services provided by the
            platform on the basis of this agreement. If the user does not agree
            to the content of this agreement, or refuses to recognize the right
            of The Agave Coin App is a mobile-terminal based platform provided
            by Lomelí Technology Co., for security management of digital assets
            that provides the users thereof with security management og digital
            assets( hereinafter referred as "The platform"). The platform
            provides services to the users registered with the platform (
            hereinafter referred to as "the Users") in accordance with the terms
            and conditions of this Agrement (defined below), and this Agreement
            shall be legally binding on and between the users and the platform.
            The platform hereby reminds the Users to carefully read and fully
            understand the terms and conditions of this Agreement, especially
            those terms and conditions of this Agreement that exclude or limit
            the liability of the platform and exclude or restrict the rights the
            rights and interests of the users. The users shall read carefully
            and choose to acepts all the terms and conditions of this Agreement,
            the user shall not be entitled to use the services provided by the
            platform on the basis of this agreement. If the user does not agree
            to the content of this agreement, or refuses to recognize the right
            of The Agave Coin App is a mobile-terminal based platform provided
            by Lomelí Technology Co., for security management of digital assets
            that provides the users thereof with security management og digital
            assets( hereinafter referred as "The platform"). The platform
            provides services to the users registered with the platform (
            hereinafter referred to as "the Users") in accordance with the terms
            and conditions of this Agrement (defined below), and this Agreement
            shall be legally binding on and between the users and the platform.
            The platform hereby reminds the Users to carefully read and fully
            understand the terms and conditions of this Agreement, especially
            those terms and conditions of this Agreement that exclude or limit
            the liability of the platform and exclude or restrict the rights the
            rights and interests of the users. The users shall read carefully
            and choose to acepts all the terms and conditions of this Agreement,
            the user shall not be entitled to use the services provided by the
            platform on the basis of this agreement. If the user does not agree
            to the content of this agreement, or refuses to recognize the right
            of The Agave Coin App is a mobile-terminal based platform provided
            by Lomelí Technology Co., for security management of digital assets
            that provides the users thereof with security management og digital
            assets( hereinafter referred as "The platform"). The platform
            provides services to the users registered with the platform (
            hereinafter referred to as "the Users") in accordance with the terms
            and conditions of this Agrement (defined below), and this Agreement
            shall be legally binding on and between the users and the platform.
            The platform hereby reminds the Users to carefully read and fully
            understand the terms and conditions of this Agreement, especially
            those terms and conditions of this Agreement that exclude or limit
            the liability of the platform and exclude or restrict the rights the
            rights and interests of the users. The users shall read carefully
            and choose to acepts all the terms and conditions of this Agreement,
            the user shall not be entitled to use the services provided by the
            platform on the basis of this agreement. If the user does not agree
            to the content of this agreement, or refuses to recognize the right
            of
          </Terms>
        </ScrollView>
      </ContainerText>

      <ContainerButtons>
        <RadioButton
          isActivated={hasAccepted}
          onClick={onRadioButtonClick}
          text="I agree to the above terms"
        />
        <ButtonContainer>
          <Button isActivated={hasAccepted} onClick={onSubmit}>
            Confirm
          </Button>
        </ButtonContainer>
      </ContainerButtons>
    </PageContainer>
  );
};

const ContainerText = styled.View`
  width: 100%;
  height: 80%;
`;
const ContainerButtons = styled.View`
  padding-bottom: 8px;
  height: 20%;
  width: 100%;
  justify-content: flex-end;
  align-self: flex-end;
`;
const ButtonContainer = styled.View`
  margin: 8px 0 0;
`;
const Title = styled(BaseTitle)`
  font-size: 18px;
  margin-bottom: 8px;
  text-transform: none;
`;
const Terms = styled(SmallText)`
  text-align: left;
  text-transform: none;
`;
