import { Link } from 'react-router-dom';

interface CtaButtonProps {
  to: string;
  text: string;
  className?: string;
  external?: boolean;
}

const CtaButton: React.FC<CtaButtonProps> = ({ 
  to, 
  text, 
  className = '', 
  external = false 
}) => {
  const buttonClasses = `relative inline-flex items-center rounded-full px-8 py-3 border border-kote-green/50 backdrop-blur-sm bg-white/5 hover:border-kote-green hover:bg-kote-green/90 hover:scale-105 will-change-transform transform-gpu transform transition-all duration-500 ease-out will-change-transform group/button ${className}`;
  
  const contentClasses = `relative flex items-center justify-center text-kote-green font-normal group-hover/button:text-white transition-all duration-500 ease-out`;
  
  if (external) {
    return (
      <a 
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClasses}
      >
        <span className={contentClasses}>
          <span>{text}</span>
          <svg className="w-4 h-4 ml-2 transform transition-transform duration-500 ease-out group-hover/button:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
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
        <span>{text}</span>
        <svg className="w-4 h-4 ml-2 transform transition-transform duration-500 ease-out group-hover/button:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
        </svg>
      </span>
    </Link>
  );
};

export default CtaButton; 