import PropTypes from 'prop-types';
import clsx from 'clsx';

export default function Button({ children, className, ...props }) {
  return (
    <button
      {...props}
      className={clsx(
        'inline-flex items-center justify-center w-full font-medium tracking-wide transition duration-200 ease-in-out rounded shadow-md text-white bg-black hover:bg-white hover:text-black  focus:shadow-outline focus:outline-none transform active:scale-95',
        className
      )}
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
