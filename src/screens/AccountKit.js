/*eslint-disable*/
import React, { Component } from 'react'
import { StyleSheet, View, AsyncStorage, Button } from 'react-native'
import { Mutation } from 'react-apollo'
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

const Update = ({ token, navigate }) => (
  <Mutation mutation={REFRESH_TOKEN_QUERY} variables={{ token }}>
    {({ loading, error, data }) => {
      if (loading) return <Spinner />
      // console.log('error', error)
      //console.log('dataFromUpdate', data)
      AsyncStorage.setItem(TOKEN_KEY, data.updateToken.token).then(() => navigate('HOME'))
      return null
    }}
  </Mutation>
)

const Signup = ({ code, navigate }) => (
  <Mutation mutation={SIGN_IN} variables={{ code }}>
    {({ loading, error, data }) => {
      if (loading) return <Spinner fullscreen />
      //console.log('error', error)
      //console.log('dataFromSignUp', data)
      return <Update token={data.signIn.token} navigate={navigate} />
    }}
  </Mutation>
)

class AccountKit extends Component {
  state = {
    code: '',
    token: '',
    visible: false
  }

  componentDidMount = async () => {
    const token = await AsyncStorage.getItem(TOKEN_KEY)
    if (token !== null) {
      this._getToken()
    } else {
      this.setState({ visible: true })
    }
  }

  _onPress = () => this._getToken()

  _getToken = async () => {
    let token
    token = await AsyncStorage.getItem(TOKEN_KEY) // eslint-disable-line
    //token = await AsyncStorage.removeItem(TOKEN_KEY)

    if (token !== null) {
      this.setState({ token })
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
          // console.warn('Login cancelled', payload)
        } else {
          this.setState({ code: payload.code, visible: false })
          await AsyncStorage.setItem(TOKEN_KEY, payload.code)
        }
      } catch (err) {
        //console.log('Error', err)
        throw err
      }
    }
  }

  render() {
    const {
      state: { code, token, visible },
      props: {
        navigation: { navigate }
      }
    } = this
    const { container } = styles
    return (
      <View style={container}>
        {!!token ? <Update token={token} navigate={navigate} /> : !!code && <Signup code={code} navigate={navigate} />}
        {visible && <Button title="Login" onPress={this._onPress} />}
      </View>
    )
  }
}

export { AccountKit }
