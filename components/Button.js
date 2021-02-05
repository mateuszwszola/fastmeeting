import PropTypes from 'prop-types';

export default function Button({ children, className, ...props }) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center w-full font-medium tracking-wide text-white transition duration-500 ease-in-out rounded shadow-md bg-black hover:bg-white hover:text-black focus:shadow-outline focus:outline-none transform active:scale-95 ${className}`}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  className: '',
};

Button.propTypes = {
  className: PropTypes.string,
};
