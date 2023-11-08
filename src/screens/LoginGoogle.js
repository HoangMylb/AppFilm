import { Button, StyleSheet, View } from 'react-native';
import React from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

const LoginGoogle = () => {
  GoogleSignin.configure({
    webClientId: '453299861632-2rgp3trk74pnt4p52i7eba5bsjf8nv7v.apps.googleusercontent.com',
  });

  const signInWithGoogleAsync = async () => {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    const user_sign_in = auth().signInWithCredential(googleCredential);

    user_sign_in.then((user) => {
      console.log(user);
    }).catch((error) => {
      console.log(error);
    })
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Button
        title='Sign in with Google'
        onPress={signInWithGoogleAsync}
      />
    </View>
  )
}

export default LoginGoogle

const styles = StyleSheet.create({})