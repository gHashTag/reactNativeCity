/* eslint-disable */

import React, { Component } from 'react'
import { StyleSheet, View, Button } from 'react-native'
import RNAccountKit from 'react-native-facebook-account-kit'

export default class App extends Component {
  componentDidMount() {
    RNAccountKit.configure({
      responseType: 'code',
      initialPhoneCountryPrefix: '+66',
      initialPhoneNumber: '633132803',
      defaultCountry: 'AR',
    })
  }

  handleLoginButtonPress = async () => {
    try {
      const payload = await RNAccountKit.loginWithPhone()

      if (!payload) {
        console.warn('Login cancelled', payload)
      } else {
        console.warn('Logged with phone. Payload:', payload)
      }
    } catch (err) {
      console.warn('Error', err.message)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title="Login" onPress={this.handleLoginButtonPress} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
