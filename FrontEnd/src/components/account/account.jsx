import PropTypes from 'prop-types';
import './account.scss';
import Button from '../button/button';

function Account(props) {
  return (
    <section className="account">
      <div className="account-content-wrapper">
          <h3 className="account-title">{props.title}</h3>
          <p className="account-amount">{props.amount}</p>
          <p className="account-amount-description">{props.description}</p>
      </div>
      <div className="account-content-wrapper cta">
        <Button className="transaction-button" text="View transactions" />
      </div>
    </section>
  );
}

Account.propTypes = {
  title: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Account;