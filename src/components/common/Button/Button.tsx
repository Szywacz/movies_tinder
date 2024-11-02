import { forwardRef } from 'react';
import './Button.scss';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  disabled?: boolean;
  isLoading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline' | 'success' | 'danger';
  size?: 'sm' | 'md' | 'lg';
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      disabled,
      className = '',
      variant = 'primary',
      size = 'md',
      ...props
    },
    ref
  ) => {
    const buttonClasses = [
      'button',
      `button--${variant}`,
      `button--${size}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        className={buttonClasses}
        disabled={disabled}
        {...props}>
        <span className='button__content'>{children}</span>
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
