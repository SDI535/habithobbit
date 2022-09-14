import React from 'react'
import { Text } from 'react-native-paper'
import { styles } from '../styles/styles'


export default function Header(props) {
  return <Text style={styles.welcomeheader} {...props} />
}