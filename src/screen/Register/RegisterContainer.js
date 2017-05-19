import { connect } from 'react-redux';
import { register } from '@redux/auth/action'

// Actions

import Register from './RegisterView'

const mapStateToProps = (state) => ({
  auth: state.auth
});

const mapDispatchToProps = {
  register: data => register(data)
};

export default connect(mapStateToProps, mapDispatchToProps)(Register)