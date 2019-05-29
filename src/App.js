import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
})

const App = () => {
  const { container, welcome, instructions } = styles
  return (
    <View style={container}>
      <Text style={welcome}>Welcome to React Native!</Text>
      <Text style={instructions}>To get started, edit App.js</Text>
    </View>
  )
}

export default App
