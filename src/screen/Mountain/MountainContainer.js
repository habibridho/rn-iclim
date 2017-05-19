import { connect } from 'react-redux';

// Actions

import Mountain from './MountainView'

const mapStateToProps = (state) => ({
  setting: state.setting
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Mountain)