import PropTypes from 'prop-types';
import clsx from 'clsx';

export default function Button({ children, className, ...props }) {
  return (
    <button
      {...props}
      className={clsx(
        'w-full py-2 px-4 font-medium tracking-wide rounded shadow-md text-white bg-black hover:bg-white hover:text-black dark:hover:bg-gray-600 dark:hover:text-white focus:outline-none focus:bg-gray-600 transform transition duration-200 ease-in-out active:scale-95',
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
