import React from 'react'
import { View, Button, Text } from 'react-native'
import * as Keychain from 'react-native-keychain'

const HomeScreen = ({ navigation }) => {
  const logOut = async () => {
    await Keychain.resetGenericPassword()
    navigation.navigate('ACCOUNT_KIT')
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button title="LogOut" onPress={logOut} />
    </View>
  )
}
export { HomeScreen }
