import React, {Component} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Text,
  Animated,
  Button,
} from 'react-native';
import imageLogo from '../assets/imagens/logo.png';
import styles from '../estilo/Padrao';

export default class Cadastro extends React.Component {
  render(props) {
    return (
      <View style={styles.container}>
        <Image source={imageLogo} style={styles.smallLogo} />
        <Text style={styles.paragraph}>
          <Text style={{fontWeight: 'normal'}}>
            Now you should have a basic understanding of how this app works.
            Please sign up and take part in this fantastic user experience!
          </Text>
        </Text>
        <Text style={styles.paragraph}>
          This is the last page of the onboarding.
        </Text>
        <Button title="Back" onPress={() => this.props.navigation.goBack()} />
      </View>
    );
  }
}
