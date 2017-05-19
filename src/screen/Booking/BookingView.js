import React, { Component } from 'react'
import { DatePickerAndroid, Dimensions, Image, Modal, TouchableOpacity, View } from 'react-native'
import { Button, Card, CardItem, Container, Content, Footer, Input, Item, Text } from 'native-base'
import Camera from 'react-native-camera';
import { sendHttpRequest } from '@lib/ajax';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

class Booking extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tgl_naik: '',
      tgl_turun: '',
      path_ktp: '',
      path_payment: '',
      openCamera: false,
      cameraActiveType: ''
    }
  }

  openDatePicker = async (dateType) => {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        date: new Date()
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        if (dateType == 'naik') {
          this.setState({
            tgl_naik: year + '-' + month + '-' + day
          })
        } else {
          this.setState({
            tgl_turun: year + '-' + month + '-' + day
          })
        }
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }

  sendBooking = () => {
    let { params } = this.props.navigation.state

    let body = new FormData();
    if (this.state.path_ktp != '') {
      body.append('ktp', {
        uri: this.state.path_ktp,
        name: 'ktp.jpg',
        type: 'image/jpeg'
      });
    }
    if (this.state.path_payment != '') {
      body.append('payment', {
        uri: this.state.path_payment,
        name: 'payment.jpg',
        type: 'image/jpeg'
      });
    }
    body.append('gunung_id', params.mountainId)
    body.append('tgl_naik', this.state.tgl_naik)
    body.append('tgl_turun', this.state.tgl_turun)

    sendHttpRequest({
      method: 'POST',
      url: 'http://' + this.props.setting.baseUrl + '/api/v1/book',
      body: body,
      headers: new Headers({
        'x-access-token' : this.props.auth.token
      }),
      onSuccess: json => {
        alert('Booking sukses. Daftar booking dapat dilihat di menu booking.')
      },
      onError: (err) => {
        alert('Booking gagal.')
      }
    })
  }

  takePicture = () => {
    const options = {};
    //options.location = ...
    this.camera.capture({metadata: options})
      .then((data) => {
        console.log(data)
        if (this.state.cameraActiveType == 'ktp') {
          this.setState({
            openCamera: false,
            path_ktp: data.path
          })
        } else {
          this.setState({
            openCamera: false,
            path_payment: data.path
          })
        }
      })
      .catch(err => console.error(err));
  }

  renderPicKTP() {
    let content
    if (this.state.path_ktp == '') {
      content = <Text style={{color: 'white'}}>Upload Foto KTP</Text>
    } else {
      content = <Image source={{uri: this.state.path_ktp}} style={{height: 150, width: screenWidth-32}} />
    }

    return (
      <TouchableOpacity style={{marginTop: 16, height: 150, backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center'}}
        onPress={() => {
          this.setState({
            cameraActiveType: 'ktp',
            openCamera: true
          })
        }}
      >
        { content }
      </TouchableOpacity>
    )
  }

  renderPicPayment() {
    let content
    if (this.state.path_payment == '') {
      content = <Text style={{color: 'white'}}>Upload Foto Bukti Pembayaran</Text>
    } else {
      content = <Image source={{uri: this.state.path_payment}} style={{height: 150, width: screenWidth-32}} />
    }

    return (
      <TouchableOpacity style={{marginTop: 16, height: 150, backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center'}}
        onPress={() => {
          this.setState({
            cameraActiveType: 'payment',
            openCamera: true
          })
        }}
      >
        { content }
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <Container>
        <Content style={{flex: 1}} contentContainerStyle={{padding: 16}}>
          <Text style={{fontSize: 24}}>Persyaratan</Text>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 3}}>
              <Text style={{color: 'blue'}}>Foto KTP</Text>
              <Text style={{color: 'green'}}>Surat Keterangan Sehat</Text>
              <Text style={{color: 'green'}}>Surat Izin Orang Tua (-17)</Text>
              <Text style={{color: 'green'}}>Form Barang Bawaan</Text>
              <Text style={{color: 'blue'}}>Bukti Pembayaran</Text>
            </View>
            <View style={{flex: 1}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{height: 8, width: 8, backgroundColor: 'blue', marginRight: 8}}></View>
                <Text style={{fontSize: 12}}>Upload</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{height: 8, width: 8, backgroundColor: 'green', marginRight: 8}}></View>
                <Text style={{fontSize: 12}}>Bawa Hari H</Text>
              </View>
            </View>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 16}}>
            <Text style={{marginRight: 16}}>Tanggal Naik</Text>
            <Button rounded light
              onPress={() => { this.openDatePicker('naik') }}
            >
              <Text>{this.state.tgl_naik}</Text>
            </Button>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 16}}>
            <Text style={{marginRight: 16}}>Tanggal Turun</Text>
            <Button rounded light
              onPress={() => { this.openDatePicker('turun') }}
            >
              <Text>{this.state.tgl_turun}</Text>
            </Button>
          </View>

          { this.renderPicKTP() }
          { this.renderPicPayment() }
        </Content>
        <Footer style={{backgroundColor: '#05a6b0'}}>
          <TouchableOpacity style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
            onPress={this.sendBooking}
          >
            <Text style={{color: 'white'}}>Ajukan</Text>
          </TouchableOpacity>
        </Footer>

        <Modal visible={this.state.openCamera} style={styles.container} onRequestClose={() => {}}>
          <Camera
            ref={(cam) => {
              this.camera = cam;
            }}
            style={styles.preview}
            aspect={Camera.constants.Aspect.fill}>
            <Text style={styles.capture} onPress={this.takePicture}>[CAPTURE]</Text>
          </Camera>
        </Modal>
      </Container>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
}

export default Booking