import { connect } from 'react-redux';

// Actions

import Home from './HomeView'

const mapStateToProps = (state) => ({
  auth: state.auth,
  setting: state.setting
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Home)