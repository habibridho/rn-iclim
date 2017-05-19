import React, { Component } from 'react'
import { BackHandler } from 'react-native'
import { connect } from 'react-redux';
import { DrawerNavigator, StackNavigator, addNavigationHelpers } from 'react-navigation';

import HomeScreen from '@screen/Home/HomeContainer'
import BookingScreen from '@screen/Booking/BookingContainer'
import BookingStatusScreen from '@screen/BookingStatus/BookingStatusContainer'
import LoginScreen from '@screen/Login/LoginContainer'
import MountainScreen from '@screen/Mountain/MountainContainer'
import ProfileScreen from '@screen/Profile/ProfileContainer'
import RegisterScreen from '@screen/Register/RegisterContainer'
import SettingScreen from '@screen/Setting/SettingContainer'
import navOptions from '@nav/navOptions'

const HomeStack = StackNavigator({
  HomeScreen: {
    screen: HomeScreen
  },
  MountainScreen: {
    screen: MountainScreen
  },
  BookingScreen: {
    screen: BookingScreen
  }
}, {
  navigationOptions: navOptions
})

const BookingStatusStack = StackNavigator({
  BookingStatusScreen: {
    screen: BookingStatusScreen
  }
}, {
  navigationOptions: navOptions
})

const DrawerScreen = DrawerNavigator({
  HomeStack: {
    screen: HomeStack,
    navigationOptions: {
      drawerLabel: 'Home'
    }
  },
  BookingStatusStack: {
    screen: BookingStatusStack,
    navigationOptions: {
      drawerLabel: 'Status Booking'
    }
  },
});

export const AppNavigator = StackNavigator({
  LoginScreen: {
    screen: LoginScreen
  },
  RegisterScreen: {
    screen: RegisterScreen
  },
  SettingScreen: {
    screen: SettingScreen
  },
  DrawerScreen: {
    screen: DrawerScreen
  }
}, {
  navigationOptions: {
    header: null
  }
})

class AppWithNavigationState extends Component {
  handleBackPress = () => {
    const { dispatch, nav } = this.props;
    const navigation = addNavigationHelpers({
      dispatch,
      state: nav,
    });
    console.log(navigation.state)
    let currentIndex = navigation.state.index
    if (currentIndex === 0) return false

    if (navigation.state.routes[currentIndex].routes) {
      let routes = navigation.state.routes[currentIndex].routes
      console.log(routes)
      let menuIndex = routes[0].index
      let stack = routes[0].routes[menuIndex]
      let stackIndex = stack.index
      if (stackIndex === 0) return false
    }

    navigation.goBack();
    return true;
  };
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  render() {
    return (
      <AppNavigator navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.nav,
      })} />
    )
  }
}

const mapStateToProps = (state) => ({
  nav: state.nav
});

export default connect(mapStateToProps)(AppWithNavigationState)