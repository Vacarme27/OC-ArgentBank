import PropTypes from 'prop-types';
import './featureItem.scss';

function FeatureItem({ logo, title, text }) {
  return (
    <div className="feature-item">
      <img src={logo} alt={title} className="feature-icon" />
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

FeatureItem.propTypes = {
  logo: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default FeatureItem;