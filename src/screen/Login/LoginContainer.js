import { connect } from 'react-redux';
import { login } from '@redux/auth/action'

// Actions

import Login from './LoginView'

const mapStateToProps = (state) => ({
  auth: state.auth
});

const mapDispatchToProps = {
  login: data => login(data)
};

export default connect(mapStateToProps, mapDispatchToProps)(Login)