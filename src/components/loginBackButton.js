import React from 'react'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { styles } from '../styles/styles'

export default function BackButton({ goBack }) {
  return (
    <TouchableOpacity onPress={goBack} style={styles.backbtncontainer}>
      <Image
        style={styles.backbtn}
        source={require('../assets/loginarrow_back.png')}
      />
    </TouchableOpacity>
  )
}

// const styles = StyleSheet.create({
//   backbtncontainer: {
//     position: 'absolute',
//     top: 10 + getStatusBarHeight(),
//     left: 4,
//   },
//   backbtn: {
//     width: 24,
//     height: 24,
//   },
// })
