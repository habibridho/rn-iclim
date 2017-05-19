import { connect } from 'react-redux';

// Actions

import Booking from './BookingView'

const mapStateToProps = (state) => ({
  setting: state.setting,
  auth: state.auth
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Booking)