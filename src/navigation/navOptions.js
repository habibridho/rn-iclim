import React from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

const navOptions = ({navigation}) => {
  let headerLeft
  if (navigation.state.key == "Init") {
    headerLeft = (
      <TouchableOpacity
        onPress={() => {
          console.log(navigation)
          navigation.navigate('DrawerOpen')
        }}
        style={{justifyContent: 'center', alignItems: 'center', padding: 8, paddingTop: 12}}>
        <Icon name='menu' color='white' size={24} />
      </TouchableOpacity>
    )
  } else {
    headerLeft = (
      <TouchableOpacity
        onPress={() => {
          console.log(navigation)
          navigation.goBack()
        }}
        style={{justifyContent: 'center', alignItems: 'center', padding: 8, paddingTop: 12}}>
        <Icon name='arrow-back' color='white' size={24} />
      </TouchableOpacity>
    )
  }

  return ({
    title: 'ICLIM',
    headerTintColor: 'white',
    headerStyle: { backgroundColor: '#05a6b0' },
    headerLeft: headerLeft
  })
}

export default navOptions