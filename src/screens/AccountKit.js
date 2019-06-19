/* eslint-disable */
import React from 'react'
import { StyleSheet, View, Button } from 'react-native'
import { useMutation } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import RNAccountKit from 'react-native-facebook-account-kit'
import * as Keychain from 'react-native-keychain'
//import { Spinner } from '../components'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const REFRESH_TOKEN_QUERY = gql`
  mutation UpdateToken($token: String!) {
    updateToken(token: $token) {
      user {
        name
        phone
      }
      token
    }
  }
`

const SIGN_IN = gql`
  mutation SignIn($code: String!) {
    signIn(code: $code) {
      user {
        phone
        name
        id
      }
      token
    }
  }
`

const AccountKit = ({ navigation }) => {
  const sign = useMutation(SIGN_IN)

  const handleSignIn = code => {
    sign({
      variables: { code },
      update: async (cache, { data }) => {
        const username = 'token'
        const password = data.signIn.token
        await Keychain.setGenericPassword(username, password)
      }
    })
  }

  const getToken = async () => {
    RNAccountKit.configure({
      responseType: 'code',
      initialPhoneCountryPrefix: '+7',
      initialPhoneNumber: '9261439109',
      defaultCountry: 'RU'
      //hello Jenya
    })
    const payload = await RNAccountKit.loginWithPhone()
    handleSignIn(payload.code)
  }

  const { container } = styles
  return (
    <View style={container}>
      <Button title="Login" onPress={getToken} />
    </View>
  )
}

export { AccountKit }
