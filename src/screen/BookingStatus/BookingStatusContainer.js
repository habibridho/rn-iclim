import { connect } from 'react-redux';

// Actions

import BookingStatus from './BookingStatusView'

const mapStateToProps = (state) => ({
  setting: state.setting,
  auth: state.auth
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingStatus)