import { StackNavigationOptions } from "@react-navigation/stack"

interface CreateWalletStackOptions {
    walkthrough: StackNavigationOptions;
    loadWalletScreen: StackNavigationOptions;
    mnemonicBackup: StackNavigationOptions;
    mnemonicImport: StackNavigationOptions;
    mnemonicIntro: StackNavigationOptions;
    setPassword: StackNavigationOptions;
    terms: StackNavigationOptions;
}
export const createWalletStackOptions: CreateWalletStackOptions = {
    walkthrough: {
        headerShown: false,
    },
    loadWalletScreen: {
        title: 'Loading wallet'
    },
    mnemonicBackup: {
        title: ''
    },
    mnemonicImport: {
        title: 'Import Wallet'
    },
    mnemonicIntro: {
        title: '',
        headerTransparent: true
    },
    setPassword: {

    },
    terms: {
        title: 'User service agreement',
    }

}