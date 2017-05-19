import React, { Component } from 'react'
import { Dimensions, Image, TouchableOpacity, View } from 'react-native'
import { Button, Container, Content, Input, Item, Text } from 'native-base'

let { width: screenWidth, height: screenHeight } = Dimensions.get('window')

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: ''
    }
  }

  render() {
    return (
      <Container>
        <Content style={{flex: 1}} contentContainerStyle={styles.container}>
          <Image source={require('@images/logo2.png')} style={{width: screenWidth, height: 56, marginTop: 64, marginBottom: 32}} />
          <Item rounded style={styles.inputContainer}>
            <Input placeholder="username" onChangeText={ text => this.setState({username: text})} keyboardType="email-address" />
          </Item>
          <Item rounded style={styles.inputContainer}>
            <Input placeholder="password" onChangeText={ text => this.setState({password: text})} secureTextEntry={true} />
          </Item>
          <Button success full rounded style={{marginVertical: 16}}
            onPress={() => {
              this.props.login({
                ...this.state
              }).then(() => {
                if (this.props.auth.token != '') this.props.navigation.navigate('DrawerScreen')
              })
            }}
          >
              <Text>Login</Text>
          </Button>
          <Text>- Or -</Text>
          <Button info full rounded style={{marginVertical: 16}}
            onPress={() => { this.props.navigation.navigate('RegisterScreen') }}
          >
              <Text>Sign Up</Text>
          </Button>
          <TouchableOpacity
            onPress={() => { this.props.navigation.navigate('SettingScreen') }}
          >
            <Text>Setting</Text>
          </TouchableOpacity>
        </Content>
      </Container>
    )
  }
}

const styles = {
  container: {
    alignItems: 'center',
    flex: 1,
    padding: 16
  },
  inputContainer: {
    marginTop: 4,
    marginBottom: 4
  }
}

export default Login