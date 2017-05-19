import { connect } from 'react-redux';
import { setBaseUrl } from '@redux/setting/action'

// Actions

import Setting from './SettingView'

const mapStateToProps = (state) => ({
  setting: state.setting
});

const mapDispatchToProps = {
  setBaseUrl: baseUrl => setBaseUrl(baseUrl)
};

export default connect(mapStateToProps, mapDispatchToProps)(Setting)