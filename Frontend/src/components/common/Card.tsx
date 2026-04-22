import React from 'react';
import { cn } from '../../lib/utils';

type CardPadding = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: CardPadding;
  paddingResponsive?: {
    sm?: CardPadding;
    md?: CardPadding;
    lg?: CardPadding;
    xl?: CardPadding;
  };
  hoverable?: boolean;
  clickable?: boolean;
  onClick?: () => void;
  bordered?: boolean;
}

const paddingStyles: Record<CardPadding, string> = {
  none: 'p-0',
  xs: 'p-2 sm:p-3',
  sm: 'p-3 sm:p-4',
  md: 'p-4 sm:p-5 md:p-6',
  lg: 'p-5 sm:p-6 md:p-8',
  xl: 'p-6 sm:p-8 md:p-10',
};

function getResponsivePaddingClasses(
  responsive?: CardProps['paddingResponsive']
): string {
  if (!responsive) return '';
  const classes: string[] = [];
  if (responsive.sm) classes.push(`sm:${paddingStyles[responsive.sm]}`);
  if (responsive.md) classes.push(`md:${paddingStyles[responsive.md]}`);
  if (responsive.lg) classes.push(`lg:${paddingStyles[responsive.lg]}`);
  if (responsive.xl) classes.push(`xl:${paddingStyles[responsive.xl]}`);
  return classes.join(' ');
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  padding = 'md',
  paddingResponsive,
  hoverable = false,
  clickable = false,
  onClick,
  bordered = true,
}) => {
  const isInteractive = hoverable || clickable || onClick;
  const responsivePaddingClasses = getResponsivePaddingClasses(paddingResponsive);

  return (
    <div
      className={cn(
        'rounded-xl bg-white dark:bg-gray-800',
        'shadow-soft dark:shadow-none',
        'transition-all duration-200',
        bordered && 'border border-gray-200 dark:border-gray-700',
        paddingStyles[padding],
        responsivePaddingClasses,
        isInteractive && [
          'cursor-pointer',
          'touch-manipulation',
          hoverable && 'hover:shadow-medium hover:-translate-y-0.5',
          clickable && 'active:scale-[0.99]',
        ],
        className
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {children}
    </div>
  );
};

interface CardSectionProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardSectionProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        'mb-3 sm:mb-4 border-b border-gray-200 pb-3 sm:pb-4 dark:border-gray-700',
        className
      )}
    >
      {children}
    </div>
  );
};

export const CardTitle: React.FC<CardSectionProps> = ({ children, className }) => {
  return (
    <h3
      className={cn(
        'text-base sm:text-lg md:text-xl font-semibold text-gray-900 dark:text-white',
        className
      )}
    >
      {children}
    </h3>
  );
};

export const CardDescription: React.FC<CardSectionProps> = ({ children, className }) => {
  return (
    <p
      className={cn(
        'text-xs sm:text-sm text-gray-500 dark:text-gray-400',
        className
      )}
    >
      {children}
    </p>
  );
};

export const CardContent: React.FC<CardSectionProps> = ({ children, className }) => {
  return <div className={cn('', className)}>{children}</div>;
};

export const CardFooter: React.FC<CardSectionProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        'mt-3 sm:mt-4 border-t border-gray-200 pt-3 sm:pt-4 dark:border-gray-700',
        className
      )}
    >
      {children}
    </div>
  );
};