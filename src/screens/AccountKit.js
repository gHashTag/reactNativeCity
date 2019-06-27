/*eslint-disable*/
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
//const UPDATE_TOKEN = gql`
//  mutation UpdateToken($token: String!) {
//    updateToken(token: $token) {
//      user {
//        name
//        phone
//      }
//      token
//    }
//  }
//`
const AccountKit = ({ navigation }) => {
  const sign = useMutation(SIGN_IN)
  //const update = useMutation(UPDATE_TOKEN)
  //const [check, setCheck] = useState(false)

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

  const transition = () => {
    navigation.navigate('HOME')
  }

  // const refreshToken = token => {
  //   console.log('refreshToken', token)
  //   update({
  //     variables: { token },
  //     update: async (cache, { data }) => {
  //       const username = 'token'
  //       const password = data.updateToken.token
  //       await Keychain.setGenericPassword(username, password)
  //     }
  //   })
  // }

  const getToken = async () => {
    RNAccountKit.configure({
      responseType: 'code',
      initialPhoneCountryPrefix: '+7',
      initialPhoneNumber: '9855316514',
      defaultCountry: 'RU'
    })
    const payload = await RNAccountKit.loginWithPhone()
    console.log('payload.code', payload.code)
    handleSignIn(payload.code)
    transition()
  }

  //  const checkToken = async () => {
  //    const credentials = await Keychain.getGenericPassword()
  //    if (credentials) {
  //      setCheck(true)
  //      refreshToken(credentials.password)
  //    } else {
  //      setCheck(false)
  //    }
  //  }

  //  checkToken()
  const { container } = styles
  return (
    <View style={container}>
      <Button title="Login" onPress={getToken} />
    </View>
  )
}

export { AccountKit }
