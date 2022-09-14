import React from 'react'
import { ImageBackground, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { theme } from '../core/theme'
import { styles } from '../styles/styles'

export default function Background({ children }) {
  return (
    <ImageBackground
      source={require('../assets/welcomepage.png')}
      style={styles.welcomebg}

    >
      <KeyboardAvoidingView style={styles.welcomecontainer} behavior="padding">
        {children}
      </KeyboardAvoidingView>
    </ImageBackground>
  )
}
