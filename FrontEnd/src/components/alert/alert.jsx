import PropTypes from "prop-types";
import './alert.scss'

function Alert({alert}) {
  return <div className="alert-msg">
            {alert}
          </div>
}

Alert.propTypes = {
  alert: PropTypes.string,
};

export default Alert;