import "./button.scss";

// eslint-disable-next-line react/prop-types
function Button ({ text, className, onClick }) {
  return (
    <button className={className} onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;