import React, { Component } from 'react'
import { Dimensions, Image, TouchableOpacity, View } from 'react-native'
import { Button, Card, CardItem, Container, Content, Footer, Input, Item, Text } from 'native-base'

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

class Mountain extends Component {
  render() {
    let { params } = this.props.navigation.state
    let iclimUrl = this.props.setting.baseUrl.slice(0, -5)

    return (
      <Container>
        <Content>
          <Image source={{ uri: 'http://' + iclimUrl + '/iclim/pic/files/' + params.pic }} style={{height: 200, width: screenWidth}}/>
          <View style={{padding: 16}}>
            <Text style={{fontSize: 18}}>{params.nama}</Text>
            <Text>Ketinggian: {params.ketinggian}m</Text>
            <Text>Status: {params.status}</Text>
            <Text>Kuota: {params.quota}</Text>
            <Text>Tiket: {params.harga_tiket}</Text>
          </View>
        </Content>
        <Footer style={{backgroundColor: '#05a6b0'}}>
          <TouchableOpacity style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
            onPress={() => { this.props.navigation.navigate('BookingScreen', { mountainId: params.id_gunung }) }}
          >
            <Text style={{color: 'white'}}>Booking</Text>
          </TouchableOpacity>
        </Footer>
      </Container>
    )
  }
}

export default Mountain