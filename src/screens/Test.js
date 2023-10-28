import { Button, StyleSheet, Text, View, Alert } from 'react-native'
import React,{ useContext} from 'react'
import { ThanhToanContext } from '../context/ThanhToanContext'
import { useStripe } from '@stripe/stripe-react-native';
const Test = () => {
    const {ThanhToan} = useContext(ThanhToanContext);
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const test =  async () => {
        // 1. Create a payment intent
        const q = 200000;
        const a = await ThanhToan(q);
        if (a.error) {
            Alert.alert('Something went wrong');
            return;
          }
          // 2. Initialize the Payment sheet
    const initResponse = await initPaymentSheet({
        merchantDisplayName: 'notJust.dev',
        paymentIntentClientSecret: a.paymentIntent,
      });
      if (initResponse.error) {
        console.log(initResponse.error);
        Alert.alert('Something went wrong');
        return;
      }
       // 3. Present the Payment Sheet from Stripe
    const paymentResponse = await presentPaymentSheet();

    if (paymentResponse.error) {
      Alert.alert(
        `Thanh toán thất bại: ${paymentResponse.error.code}`,
        paymentResponse.error.message
      );
      return;
    }else{
        Alert.alert(
            `Thanh toán thành công`
          );
    }
  
    }
  return (
    <View>
      <Text>Test</Text>
      <Button title='thanh toan' onPress={test}/>
    </View>
  )
}

export default Test

const styles = StyleSheet.create({})