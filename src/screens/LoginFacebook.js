import { StyleSheet, View, Button } from 'react-native'
import React from 'react'
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';

const LoginFacebook = () => {
    async function onFacebookButtonPress() {
        // Attempt login with permissions
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

        if (result.isCancelled) {
            throw 'User cancelled the login process';
        }

        // Once signed in, get the users AccessToken
        const data = await AccessToken.getCurrentAccessToken();

        if (!data) {
            throw 'Something went wrong obtaining access token';
        } else {
            console.log('Success', data);
        }

        // Create a Firebase credential with the AccessToken
        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

        // Sign-in the user with the credential
        return auth().signInWithCredential(facebookCredential);
    }

    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Button
                title='Sign in with Facebook'
                onPress={onFacebookButtonPress}
            />
        </View>
    )
}

export default LoginFacebook

const styles = StyleSheet.create({})