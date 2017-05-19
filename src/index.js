import React, { Component } from 'react'
import { AsyncStorage, StyleSheet, Text, View } from 'react-native'
import { applyMiddleware, compose, createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import thunk from 'redux-thunk';
import {persistStore, autoRehydrate} from 'redux-persist'
import rootReducer from '@redux/index';

import AppWithNavigationState from '@nav/index'

class Root extends Component {
  constructor() {
    super()

    // Load middleware
    let middleware = [
      thunk, // Allows action creators to return functions (not just plain objects)
    ];

    if (__DEV__) {
      // Dev-only middleware
      middleware = [
        ...middleware
      ];
    }

    const composeEnhancers = composeWithDevTools({ realtime: true, port: 8000 });
    this.store = composeEnhancers(
      applyMiddleware(...middleware),
      autoRehydrate()
    )(createStore)(rootReducer)

    persistStore(this.store, { storage: AsyncStorage })
  }

  render() {
    return (
      <Provider store={this.store}>
        <AppWithNavigationState/>
      </Provider>
    )
  }
}

export default Root