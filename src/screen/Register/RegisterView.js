import React, { Component } from 'react'
import { Dimensions, Image, View } from 'react-native'
import { Button, Container, Content, Input, Item, Text, Spinner } from 'native-base'

let { width: screenWidth, height: screenHeight } = Dimensions.get('window')

class Register extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      no_card: '',
      no_telp: '',
      age: ''
    }
  }

  render() {
    let button
    if (this.props.auth.isRegistering) {
      button = <Spinner color='green' />
    } else {
      button = (
        <Button success full rounded style={{marginVertical: 16}}
          onPress={() => {
            this.props.register({
              ...this.state
            })
            .then(() => {
              if (this.props.auth.token != '') this.props.navigation.navigate('DrawerScreen')
            })
          }}
        >
            <Text>Sign Up</Text>
        </Button>
      )
    }

    return (
      <Container>
        <Content style={{flex: 1}} contentContainerStyle={styles.container}>
          <Image source={require('@images/logo2.png')} style={{width: screenWidth, height: 56, marginTop: 64, marginBottom: 32}} />
          <Item rounded style={styles.inputContainer}>
            <Input placeholder="email" onChangeText={ text => this.setState({username: text})} keyboardType="email-address" />
          </Item>
          <Item rounded style={styles.inputContainer}>
            <Input placeholder="no identitas" onChangeText={ text => this.setState({no_card: text})} keyboardType="numeric" />
          </Item>
          <Item rounded style={styles.inputContainer}>
            <Input placeholder="no handphone" onChangeText={ text => this.setState({no_telp: text})} keyboardType="phone-pad" />
          </Item>
          <Item rounded style={styles.inputContainer}>
            <Input placeholder="umur" onChangeText={ text => this.setState({age: text})} keyboardType="numeric" />
          </Item>
          <Item rounded style={styles.inputContainer}>
            <Input placeholder="password" onChangeText={ text => this.setState({password: text})} secureTextEntry={true} />
          </Item>
          { button }
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

export default Register