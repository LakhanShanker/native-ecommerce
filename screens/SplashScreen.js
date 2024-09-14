import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SplashScreen = () => {
  return (
    <Image
    style={{ width: 140, height: 120, resizeMode: "contain" }}
    source={{
      uri: "https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c518.png",
    }}/>
  )
}

export default SplashScreen

const styles = StyleSheet.create({})