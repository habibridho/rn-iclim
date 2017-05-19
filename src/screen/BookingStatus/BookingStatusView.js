import React, { Component } from 'react'
import { Dimensions, Image, View } from 'react-native'
import { Button, Container, Content, Input, Item, Text } from 'native-base'
import { sendHttpRequest } from '@lib/ajax';
import moment from 'moment'

let { width: screenWidth, height: screenHeight } = Dimensions.get('window')

class BookingStatus extends Component {
  constructor(props) {
    super(props)

    this.state = {
      list: []
    }
  }

  componentDidMount() {
    sendHttpRequest({
      method: 'GET',
      headers: new Headers({
        'x-access-token' : this.props.auth.token
      }),
      url: 'http://' + this.props.setting.baseUrl + '/api/v1/booking-status',
      onSuccess: json => {
        if (json.list)
        this.setState({list: json.list})
      },
      onError: err => {
        console.log(err)
      }
    })
  }

  getStatusText = (status) => {
    let statusStr = status.toString()
    if (statusStr == 1) return 'Pending'
    if (statusStr == 2) return 'Sukses'
    if (statusStr == 3) return 'Rejected'

    return 'Pending'
  }

  renderStatus = (item, index) => {
    return (
      <View key={index} style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: screenWidth-32, marginVertical: 8}}>
        <View>
          <Text style={{fontSize: 18}}>{item.mountain.nama}</Text>
          <Text>{moment(item.tgl_naik).format('DD/MM/YYYY')} - {moment(item.tgl_turun).format('DD/MM/YYYY')}</Text>
        </View>
        <Text>{this.getStatusText(item.status_booking)}</Text>
      </View>
    )
  }

  render() {
    return (
      <Container>
        <Content style={{flex: 1}} contentContainerStyle={styles.container}>
          { this.state.list.map(this.renderStatus) }
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

export default BookingStatus