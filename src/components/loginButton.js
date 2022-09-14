import React from 'react'
import { StyleSheet } from 'react-native'
import { Button as PaperButton } from 'react-native-paper'
import { styles } from '../styles/styles'

export default function Button({ mode, style, ...props }) {
  return (
    <PaperButton
    theme={{ roundness: 100 }}
      style={[
        styles.button,
        mode === 'outlined',
        style,
      ]}
      labelStyle={styles.buttontext}
      mode={mode}
      uppercase={false}
      {...props}
    />
  )
}

