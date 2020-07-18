import React, {useState} from 'react';
import styled from 'styled-components/native';

//components
import {ScrollView} from 'react-native';
import {Button} from 'shared/components/Button';
import {RadioButton} from 'shared/components/RadioButton';
//styled-component
import {ScreenContainer} from 'shared/styled-components/Containers';
import {Subtitle, Title as BaseTitle, Text} from 'shared/styled-components';

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
    <ScreenContainer light>
      <ScrollView>
        <Subtitle>Dear user:</Subtitle>
        <Terms>
          {`CellCoin Terms of use Index

1. Welcome 
1.1 CellCoin operates a platform accessible through the CellCoin Wallet and website, which is available for download on your mobile device that allows users to carry out an manage the CellCoin Token (XOY) transactions.

2. Warning and advice
2.1 Dealing or trading with XOY is inherently risky, as the prices of XOY can change rapidly. We cannot guarantee that the value of any XOY that you purchase will not fall. Therefore, you, while buying or selling any XOY, thought the CellCoin Wallet is at your own risk. 

2.2 The contract wallet that executes your XOY transactions is only accessible through a combination of a particular private key and public key form your unique identifier on the Ethereum network. (your Public and Private Key Pair). The application will generate your Public and Private key pair when you downloaded and set up the CellCoin Wallet. 

2.3 Your Public and Private key pair will be paired with and stored on the device you download and install the CellCoin Wallet (your device). Therefore, you will need to keep your device safe and secure following the best practices recommended by the provider of your operating system, such as setting up a secure PIN to prevent unauthorized access and ensuring that you keep your software up to date.

2.4 You are responsible for ensuring that your device is secure. Do not use the CellCoin Wallet on a device that has been "jailbroken," "cracked," "rooted," or otherwise had restrictions in the software removed, as this may compromise the security of your public and private Key Pair.

2.5 You can recover your Public and Private Key Pair by using a specific "recovery code" (also known as a "Seed," "Seed phrase," or "Mnemonic"). The application will generate the code; this code is a series of 12 or 2 random words which will be given to you when you download and set up the CellCoin Wallet.

2.6 You should never give your Public and Private Key Pair or your recovery code to any other person, as this will enable them to execute transactions using your contract wallet. We will never ask you to share the private key or your recovery code with us. We will not be responsible for any losses you might suffer from disclosing your Public and Private Key Pair or recovery code to another person.

2.7 If you lose your device or you got your device stolen, you will lose access to your Public and Private Key Pair, and you will need to recover it by using your unique recovery code (It is essential to write this code and store it somewhere safe).

2.8 Do not store your recovery code on your device. If you lose your device and your recovery code, you will not be able to recover your Public and Private Key Pair, and you will lose access to your contract wallet and XOY stored. We will not be responsible for any losses you may suffer if you lose your device or recovery code. 

2.9 Please note that if you delete the CellCoin Wallet from your device or disable the security features on your device, your contract wallet will no longer be paired with your device. Therefore, your Public and Private Key Pair will 00be removed from your device's storage. 
To recover your Public and Private Key Pair, you will need to use your recovery code. We will not be responsible for any losses you might suffer due to losing your Public and Private Key Pair if you delete the CellCoin Wallet. 

3. Your relationship with us

3.1 This document and any documents referred to within it (collectively, the "Terms of Services") set out the terms of your relationship. You must read and understand the Terms of Services before using the CellCoin Wallet.

3.2 Using and accessing the CellCoin Wallet, you agree to these Terms of Services, if you do not agree to these, please do not use the CellCoin Wallet.

4. About us

4.1 The Company XOY Asesores en Inversión Independiente S.A.P.I. DE C.V. with a registered address at: 
"Av. Providencia, 2610. Providencia 3.a Secc. 44630, Guadalajara, Jalisco."


Av Providencia 2610
Providencia 3a. Secc
44630 Guadalajara, Jal.
 

5. About your privacy

5.1 Your privacy is important to us. 
Please read our Privacy Policy to understand how we collect, use, and share information about you.

5.2 If we are obliged, for any reason, to comply with "Know Your Customer" or similar identification requirements:

5.2.1 You agree that we may use any relevant information you have provided to us or one of our affiliates; and

5.2.2 Where the necessary information is not already available to one of our members or us, you shall promptly supply (or procure the supply of) such documentation and other evidence as is reasonably requested.

We must carry out and be satisfied that we have complied with all necessary "Know You Customer" or other similar checks under all applicable laws and regulations.

6. About CellCoin Wallet for funding and view your account

6.1 Account information services and the ability to make payments through the CellCoin Wallet, whether to top fund or buy XOY, are subject to separate terms.

6.2 Your use of credit or debit card are governed by different terms of services.

7. Accessing your CellCoin Wallet

7.1 You will need to download the CellCoin Wallet on our device and set up an account (your "CellCoin" account) to use the CellCoin Wallet. You will be asked to secure access to this Token Account on your device with a PIN. You are responsible for maintaining the confidentiality of this PIN and any activities that occur using the CellCoin Wallet. 

7.2 Depending on the type of device you use, you may also be able to configure the CellCoin Wallet to allow you to use your fingerprint or Face ID to access your Token Account. 

7.3 You must be over 18 years or older and capable in your country of residence of entering into a legally binding agreement to use the CellCoin Wallet.

7.4 You must not download or use the CellCoin Wallet on a device that has been "jailbroken," "cracked," "rooted," or otherwise had restrictions in the software removed, as this may compromise the security of your Public and Private Key Pair.

8. Your rights to use the CellCoin Wallet

8.1 Your right to use the CellCoin Wallet is personal to you, and you are not allowed to give this right to another person. Your right to use the CellCoin Wallet does not stop us from giving other people the right to use the CellCoin Wallet.

8.2 We allow you to download the CellCoin Wallet Application for use on your device to access and use the CellCoin Wallet under these Terms of Services. We grant you a non-exclusive, personal, non-transferable license for this purpose only.

8.3 Unless allowed by these Terms of Service and as permitted by the CellCoin Wallet's functionality, you agree:

8.3.1. Not to copy any portion of the CellCoin Wallet;
8.3.2. Not to give or sell or otherwise make available any part of the CellCoin Wallet to anybody else;
8.3.3. Not to change any section of the CellCoin Wallet in any way;
8.3.4.  Not to look for or access the code of any part of the CellCoin Wallet that we have not expressly published publicly for general use.

8.4 You agree that all confidential information, copyright, and other intellectual property right in the CellCoin Wallet belong to the people who have licensed those rights to us or us. 

8.5. You agree that you have no rights in or any portion of the CellCoin Wallet other than the right to use it following these Terms of Services. 

9. Executing transactions on the Ethereum network and transaction fees

9.1 The CellCoin Wallet allows you to operate a contract wallet deployed on the Ethereum network, which is a public, Blockchain-based distributed platform.

9.2 To execute transactions on the Ethereum network, you will need to pay transaction fees in the form of "gas." You will need to maintain a reserve of Ether (ETH), the cryptocurrency used to power the Ethereum network, to ensure that you can pay for the gas required to execute any transactions you make on the Ethereum network. 

9.3. We will ask you to specify how much you are willing to pay for gas for each transaction you create through the CellCoin Wallet and provide you with an estimate of how much gas a transaction is likely to cost.

9.4. We do not determine gas prices, and these may increase during busy periods. You are responsible for allocating sufficient gas to each transaction that you wish to execute through the CellCoin Wallet. To the extent permitted by law, we will not be liable if a transaction initiated through the CellCoin Wallet is not completed because you allocated insufficient gas to pay for it. 

10. Apple App Store Provisions

10.1. This clause applies where the CellCoin Wallet has been acquired from the Apple App Store. You acknowledge and agree that the Terms of Services is solely between you and Token, not Apple Inc. The company Apple has no responsibility for the CellCoin Wallet or content thereof. Your use of the CellCoin Wallet must comply with the App Store Terms of Service.

10.2. You acknowledge that Apple has no obligation whatsoever to furnish any maintenance and support services concerning the CellCoin Wallet, In the event of any failure of the CellCoin Wallet. In the event of any failure of the application to conform to any applicable warranty, you may notify Apple, and (where applicable) Apple will refund the purchase price of the CellCoin Wallet to you; to the maximum extent permitted by applicable law. Apple will have no other warranty obligation whatsoever concerning the CellCoin Wallet, and any other claims, losses, liabilities, damages, costs, or expenses attributable to any failure to conform. Any warranty will be solely governed by the Terms of Servies and any law applicable to XOY as a provider of the CellCoin Wallet. 

10.3. You acknowledge that Apple is not responsible for addressing any claims of you or any third party relating to the CellCoin Wallet, including, but not limited to: (i) product liability claims. (ii) any claim that the CellCoin Wallet fails to conform to any applicable legal or regulatory requirement. (iii) claims arising under consumer protection or similar legislation, and all such claims are governed solely by the Terms of Servies and any law applicable to XOY as the software provider. 

10.4. You acknowledge that, in the event of any third-party claim that the CellCoin Wallet or your possession and use of that CellCoin Wallet infringe that third party's intellectual property rights, Token, not Apple, will be solely responsible for the investigation, defense, settlement and discharge of any such intellectual property infringement claim to the extent required by the Terms of Services. 

10.5. You represent and warrant that (i) you are not located in a country that is subject to U.S. Government embargo, or the U.S. Government has designated that as a "terrorist supporting" country. (ii) you are not listed on any U.S. Government list of prohibited or restricted parties. 

10.6. You and XOY acknowledge and agree that Apple's subsidiaries are third-party beneficiaries of the Terms of Services as relates to your license of the App. Upon your acceptance of the Terms and Conditions of the Terms of Services, Apple will have the right to enforce the Terms of Services as relates to your license of the CellCoin Wallet against you as a third-party beneficiary thereof. 

11. Other marketplaces and platforms

11.1The present clause applies where the CellCoin Wallet has been acquired from any app store or distribution platform other than the Apple App Store, including the Google Play Store and the Windows Store (the "Distribution Platform"):

11.1.1  You acknowledge that the Terms of Services are between you and XOY, and not with the provider of the Distribution Platform ("Store Provider") ;
11.1.2. Your use of the CellCoin Wallet must comply with the Store Provider's then-current Distribution Platform Terms of Services;
11.1.3. The Store Provider is only a provider of the Distribution Platform where you obtained the CellCoin Wallet;
11.1.4. CellCoinm and not the Store Provider is solely responsible for the CellCoin Wallet;
11.1.5. The Store Provider has no obligation or liability to you concerning the CellCoin Wallet or the Terms of Services;
11.1.6. You acknowledge and agree that the Store Provider is a third-party beneficiary to the Terms of Services as it relates to the CellCoin Wallet.

12. Other Third-Party Services

12.1. To provide you with a better user experience, the CellCoin Walletmay enables you to access features, functionalities, or services which are provided by third parties, including cryptocurrency exchange aggregators and decentralized lending platforms (Third-party services).

12.2. In connection with your use of those Third Party Services via the CellCoinWallet, you agree and acknowledge that:

12.2.1. The Third-Party Services are made available to you on an "as-is" basis. We have no control over the Third Party Services and shall have no liability to you in connection with those Third Party Services.
12.2.2. Your use of those Third Party Services may be subject to the terms and conditions of those third parties, and you agree to comply with those terms and conditions.
12.2.3. The information received from the Third Party Services and displayed on the AgeveCoin Wallet may be incorrect, incomplete, and out of date.
12.2.4. If you have any questions or require any assistance in connection with a Third Party Service, please contact us via email at info@yox.mx, and we will direct you to the relevant third party for support.
12.2.5. We are not your broker, intermediary, agent, or advisor concerning any action you take or intend to take in connection with the Third Party Services. 
12.2.6. The Third-Party Services may be subject to fees imposed by third parties. You shall be responsible for paying those fees to the relevant third parties. 

12.3. We do not guarantee that your access to the Third Party Services via the CellCoin Wallet will always be available or uninterrupted. We may suspend, withdraw, or restrict access to all or any part of third parties Services via the CellCoin Wallet for business and operational reasons. We will try to give you reasonable notice of any suspension or withdrawal. 

13. Rules of Acceptable use

13.1. In addition to the other requirements within these Terms of Service, this section describes specific rules that apply to your use of the CellCoin Wallet (the "Rules of Acceptable Use"). 

13.2. When using the CellCoin Wallet, you must not:

13.2.1. Circumvent, disable or otherwise interfere with any security-related features of the CellCoin Wallet;
13.2.2. Permit another person to use the CellCoin Wallet on your behalf unless you authorize such person;
13.2.3. Use the CellCoin Wallet if we have suspended or banned you from using it;
13.2.4. Advocate, promote or engage in any illegal or unlawful conduct, including any criminal activity, fraud or money laundering, or behavior that causes damage or injury to any persona or property;
13.2.5. Modify, interfere, intercept, disrupt, or hack the CellCoin Wallet.
13.2.6. Misuse the CellCoin Wallet by knowingly introducing viruses, Trojans, worms, logic bombs or other harmful material to the CellCoin Wallet or any user of the software;
13.2.7. Collect any data from the CellCoin Wallet other than under these Terms of Service;
13.2.8. Use any automated system, including without limitation "robots," "Spiders," or "offline readers" to access the CellCoin Wallet in a manner that sends more request messages to the CellCoin Wallet than a human can reasonably produce in the same period. 

13.3. We may monitor the transactions you execute through the CellCoin Wallet. We will perform checks on the XOY in the contract wallet that you manage using the CellCoin Wallet to ensure that you comply with the Rules of Acceptable Use. This including to ensure that the XOY in your contract wallet is not, or is not purchased with funds obtained illegally.

13.4. Failure to comply with Rules of Acceptable Use constitutes a severe breach of these Terms of Services, and may result in our taking all or any of the following actions (with or without notice):

13.4.1. immediate, temporary or permanent withdrawal of your rights to use our CellCoin Wallet;
13.4.2. Issuing of a warning to you;
13.4.3. legal action against you including proceedings for reimbursement of all costs (including but not limited to, reasonable administrative and legal prices) resulting from the breach;
13.4.4. Disclosure of such information to law enforcement authorities as we reasonably feel is necessary. 

13.5.  The responses described in paragraph 13.4. Are not limited, and we may take any other action we reasonably deem appropriate.

14. Ending our Relationship

14.1. If, at any time, you do not feel that you can agree to these Terms of Service or any changes made to the Terms of Service or the CellCoin Wallet, you must immediately stop using the CellCoin Wallet.

14.2.  We may immediately end your use of the CellCoin Wallet if you break the Rules of Acceptable Use, any other important rule(s), or terms and conditions we set for accessing and using the CellCoin Wallet, including these Terms of Servies.

14.3. We may also withdraw the CellCoin Wallet as long as we give you reasonable notice that we plan to do so. 

14.4. If you or we end your use of the CellCoin Wallet or we withdraw the CellCoin Wallet as described in this section, you will lose any rights you have to use the CellCoin Wallet; this will not affect your right to use your contract wallet; however, if you delete the CellCoinWallet from your device, or disable any security settings on your device, your contract wallet will no longer be paired to your device and your Public and Private Key Pair will be removed from your device's storage. We will not offer you compensation for any losses you might suffer as a result. 

14.5. The termination of your use on the CellCoin Wallet shall not affect your obligations to pay any sums due to us.

14.6. Nothing in this clause affects any legal rights you may have under the law of the country in which you are resident. 

15. Our Responsibility to you

15.1. Some of the information provided to you on the CellCoin Wallet may contain content owned or developed by third parties. The network's content and materials that you interact with through the CellCoin Wallet (such as the Ethereum network or your contract wallet) are owned or developed by third parties. As we do not own or produce such third party content, we cannot be responsible for it in any way. 

15.2. While we do our best to ensure that the features and functionalities of the CellCoin Wallet are of a reasonably satisfactory standard, certain features may rely on networks and connections beyond our control.

15.3. Due to the nature of the Internet and technology, the CellCoin Wallet is provided on an "as available" and "as is" basis. We are unable to promise that your use of the CellCoin Wallet will be uninterrupted, without delay, error-free, or meet your expectations. We do not commit to the performance or availability of the CellCoin Wallet in these Terms of Services, and, to the extent we can so, we exclude any liabilities that may be implied by law. 

15.4. Since we provide the CellCoin Wallet for free, we shall not be responsible to you for any claim arising from the CellCoin Wallet provision. 

15.5. In every case, we will never be responsible for any loss or damage that is not reasonably foreseeable or caused by a failure by you to comply with these Terms of Service. 

16. LAW

16.1. Mexican law will apply to all disputes and the interpretation of these Terms of Service. The Mexican court will have non-exclusive jurisdiction over any dispute arising from or related to your use of the CellCoin Wallet. This does not affect your rights under the law of the country in which you are resident, including (where applicable) your right to have a dispute concerning your use of the CellCoin Wallet heard in the courts of that country. 

17. Contact

17.1. If you need to contact us about these Terms of Service or any other document mentioned in them, please contact us via email at info@yox.mx, 0and we will direct you to the relevant third party for support.

17.2. We value hearing from our users and are always interested in learning how to improve the CellCoin Wallet. By providing your feedback, you agree that you are giving up any rights you have in your feedback to use and allow others to use it without any restriction and payment for you.
`}
        </Terms>
      </ScrollView>

      <ContainerButtons>
        <RadioButton
          isActivated={hasAccepted}
          onClick={onRadioButtonClick}
          text="I agree with the terms above."
        />
        <ButtonContainer>
          <Button isActivated={hasAccepted} onClick={onSubmit}>
            Confirm
          </Button>
        </ButtonContainer>
      </ContainerButtons>
    </ScreenContainer>
  );
};

const ContainerButtons = styled.View`
  margin-top: 24px;
  width: 100%;
`;
const ButtonContainer = styled.View`
  margin: 8px 0 0;
`;
const Terms = styled(Text)`
  font-size: 12px;
  margin-top: 12px;
`;
