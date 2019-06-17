import React, { memo } from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const Spinner = memo(() => {
  const { container } = styles
  return (
    <View style={container}>
      <ActivityIndicator size="large" color="black" />
    </View>
  )
})

export { Spinner }
