import { Link } from 'react-router-dom';
import { FaPhone, FaMapMarkerAlt, FaArrowRight, FaEnvelope } from 'react-icons/fa';

interface CtaButtonProps {
  to: string;
  text: string;
  className?: string;
  external?: boolean;
  color?: 'green' | 'blue' | 'turquoise';
  size?: 'default' | 'large' | 'slim';
  fullWidth?: boolean;
  icon?: 'arrow' | 'phone' | 'map' | 'envelope';
  outline?: boolean;
}

const CtaButton: React.FC<CtaButtonProps> = ({ 
  to, 
  text, 
  className = '', 
  external = false,
  color = 'green',
  size = 'default',
  fullWidth = false,
  icon = 'arrow',
  outline = false
}) => {
  const getColorClasses = (color: string, outline: boolean) => {
    const colorMap = {
      green: outline 
        ? 'border-kote-green text-kote-green hover:bg-kote-green/90 hover:text-white' 
        : 'border-kote-green/50 text-kote-green hover:border-kote-green hover:bg-kote-green/90 hover:text-white',
      blue: outline 
        ? 'border-kote-blue-light text-kote-blue-light hover:bg-kote-blue-light/90 hover:text-white' 
        : 'border-kote-blue-light/50 text-kote-blue-light hover:border-kote-blue-light hover:bg-kote-blue-light/90 hover:text-white',
      turquoise: outline 
        ? 'border-kote-turquoise text-kote-turquoise hover:bg-kote-turquoise/90 hover:text-white' 
        : 'border-kote-turquoise/50 text-kote-turquoise hover:border-kote-turquoise hover:bg-kote-turquoise/90 hover:text-white'
    };
    
    return colorMap[color as keyof typeof colorMap];
  };

  const sizeClasses = {
    default: 'px-8 py-3',
    large: 'px-10 py-4 text-lg',
    slim: 'px-6 py-2 text-sm'
  };

  const widthClasses = fullWidth ? 'w-full justify-center' : '';
  
  const buttonClasses = `
    relative inline-flex items-center rounded-full border
    ${sizeClasses[size]} 
    ${getColorClasses(color, outline)} 
    ${widthClasses}
    backdrop-blur-sm ${outline ? 'bg-transparent' : 'bg-white/5'}
    hover:scale-105 will-change-transform transform-gpu transform 
    transition-all duration-500 ease-out ${className}
  `;
  
  const contentClasses = `
    relative flex items-center justify-center 
    font-normal 
    transition-all duration-500 ease-out
  `;
  
  const renderIcon = () => {
    switch (icon) {
      case 'phone':
        return <FaPhone className="w-4 h-4 mt-0.5 ml-2.5 transform transition-transform duration-500 ease-out group-hover:translate-x-1" />;
      case 'map':
        return <FaMapMarkerAlt className="w-4 h-4 mt-0.5 ml-2.5 transform transition-transform duration-500 ease-out group-hover:translate-x-1" />;
      case 'envelope':
        return <FaEnvelope className="w-4 h-4 mt-0.5 ml-2.5 transform transition-transform duration-500 ease-out group-hover:translate-x-1" />;
      case 'arrow':
      default:
        return <FaArrowRight className="w-4 h-4 mt-0.5 ml-2.5 transform transition-transform duration-500 ease-out group-hover:translate-x-1" />;
    }
  };
  
  if (external) {
    return (
      <a 
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClasses}
      >
        <span className={contentClasses}>
          <span className='mb-0.5'>{text}</span>
          {renderIcon()}
        </span>
      </a>
    );
  }
  
  return (
    <Link 
      to={to}
      className={buttonClasses}
    >
      <span className={contentClasses}>
        <span className='mb-0.5'>{text}</span>
        {renderIcon()}
      </span>
    </Link>
  );
};

export default CtaButton; 