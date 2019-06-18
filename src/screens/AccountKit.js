/*eslint-disable*/
import React, { useState } from 'react'
import { StyleSheet, View, AsyncStorage, Button } from 'react-native'
import { useMutation } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import RNAccountKit from 'react-native-facebook-account-kit'
import { TOKEN_KEY } from '../constants'
import { Spinner } from '../components'

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
        email
        id
      }
      token
    }
  }
`

const AccountKit = ({ navigation }) => {
  const [code, setCode] = useState(null)

  const getToken = async () => {
    let token
    token = await AsyncStorage.getItem(TOKEN_KEY) // eslint-disable-line
    //token = await AsyncStorage.removeItem(TOKEN_KEY)
    console.log('token', token)

    if (token !== null) {
      //setToken(token)
      console.log('Token is not a null')
    } else {
      try {
        RNAccountKit.configure({
          responseType: 'code',
          initialPhoneCountryPrefix: '+7',
          initialPhoneNumber: '9261439109',
          defaultCountry: 'RU'
        })
        const payload = await RNAccountKit.loginWithPhone()
        if (!payload) {
          console.log('Login cancelled', payload)
        } else {
          const { data, error } = useMutation(SIGN_IN, { variables: { code: payload.code } })
          console.log('data', data)
          await AsyncStorage.setItem(TOKEN_KEY, payload.code)
        }
      } catch (err) {
        console.log('Error', err)
        throw err
      }
    }
  }

  const { container } = styles
  return (
    <View style={container}>
      <Button title="Login" onPress={getToken} />
    </View>
  )
}

export { AccountKit }
