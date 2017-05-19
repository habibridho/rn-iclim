import React, { Component } from 'react'
import { Dimensions, Image, View } from 'react-native'
import { Button, Container, Content, Input, Item, Text } from 'native-base'

let { width: screenWidth, height: screenHeight } = Dimensions.get('window')

class Setting extends Component {
  constructor(props) {
    super(props)

    this.state = {
      ip: ''
    }
  }

  render() {
    return (
      <Container>
        <Content style={{flex: 1}} contentContainerStyle={styles.container}>
          <Text>Current IP Server: {this.props.setting.baseUrl}</Text>
          <Item underline>
              <Input placeholder='IP Server' onChangeText={text => {
                this.setState({ip: text})
              }}/>
          </Item>
          <Button success full rounded style={{marginVertical: 16}}
            onPress={() => {
              this.props.setBaseUrl(this.state.ip)
            }}
          >
              <Text>Save</Text>
          </Button>
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

export default Setting