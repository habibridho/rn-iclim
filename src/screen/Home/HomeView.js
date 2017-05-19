import React, { Component } from 'react'
import { Dimensions, Image, View, TouchableOpacity } from 'react-native'
import { Button, Card, CardItem, Container, Content, Input, Item, Text } from 'native-base'
import { sendHttpRequest } from '@lib/ajax';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mountains: []
    }
  }

  componentDidMount() {
    sendHttpRequest({
      method: 'GET',
      url: 'http://' + this.props.setting.baseUrl + '/api/v1/mountains',
      headers: new Headers({
        'x-access-token' : this.props.auth.token
      }),
      onSuccess: json => {
        if (json.mountain) {
          this.setState({
            mountains: json.mountain
          })
        }
      },
      onError: err => {
        console.log(err)
      }
    })
  }

  renderCards = (item, index) => {
    let iclimUrl = this.props.setting.baseUrl.slice(0, -5)

    return (
      <TouchableOpacity key={index}
        onPress={() => {
          this.props.navigation.navigate('MountainScreen', {...item})
        }}
      >
        <Card>
          <CardItem cardBody>
            <Image source={{ uri: 'http://' + iclimUrl + '/iclim/pic/files/' + item.pic }} style={{height: 200, width: screenWidth}}/>
          </CardItem>
          <CardItem style={{flexDirection: 'column', alignItems: 'flex-start'}}>
            <Text>{item.nama}, {item.ketinggian} m</Text>
            <Text>Kuota: {item.quota}</Text>
          </CardItem>
        </Card>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <Container>
        <Content style={{flex: 1}} contentContainerStyle={{padding: 16}}>
          { this.state.mountains.map(this.renderCards) }
        </Content>
      </Container>
    )
  }
}

const mountains = [{
  name: 'Bromo',
  mdpl: 2329
}, {
  name: 'Tangkuban Perahu',
  mdpl: 1825
}, {
  name: 'Cikuray',
  mdpl: 2821
}, {
  name: 'Lawu',
  mdpl: 3265
}]

export default Home