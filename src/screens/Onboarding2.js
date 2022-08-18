import React from 'react'
import Header from '../components/loginHeader'
import Button from '../components/loginButton'
import Paragraph from '../components/loginParagraph'
import { Image, View } from 'react-native'
import { styles } from '../styles/styles'


export default function Onboarding2({ navigation }) {
  return (
    <View style={styles.onboardcontainer}>
      <Image source={require('../assets/onboarding2.png')} style={styles.onboard2} resizeMode='contain'/>
      <Header>Join Habit Groups</Header>
      <Paragraph>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </Paragraph>
      <View style={styles.roundcontainer}>
        <View style={styles.lightround} /><View style={styles.darkround} /><View style={styles.lightround} />
      </View>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Onboarding3')}
      >
        Next
      </Button>
    </View>
  )
}
