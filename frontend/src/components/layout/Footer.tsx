import { Link } from 'react-router-dom';
import LogoHorizontal from '../../images/logo/Blanc Horizontal.png';
import contact from '../../config/contact';
import { getMenuItems } from '../../config/navbar.config';
console.log('FOOTER contact.address =', contact.address);

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { address } = contact;
  const menuItems = getMenuItems();

  return (
    <footer className="relative">
      {/* Overlay foncé */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Contenu du footer */}
      <div className="relative backdrop-blur-xl bg-white/5">
        <div className="container-kote py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Colonne Koté Piscine */}
            <div>
              <img 
                src={LogoHorizontal} 
                alt="Koté Piscine" 
                className="h-12 mb-6"
              />
              <p className="mb-6 text-white/80">Votre spécialiste en Guadeloupe depuis plus de 20 ans.</p>
              
              {/* Liens utiles - généré dynamiquement depuis navbar.config */}
              <div className="mb-6">
                <h5 className="text-white font-bold mb-3">Liens utiles</h5>
                <ul className="grid grid-cols-2 gap-2">
                  {menuItems.map((item) => (
                    <li key={item.name}>
                      <Link 
                        to={item.to} 
                        className="text-white/80 hover:text-kote-turquoise transition-all duration-300"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex space-x-4">
                <a 
                  href={contact.social.facebook}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-kote-turquoise/20 transition-all duration-300 group"
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5 text-white/80 group-hover:text-kote-turquoise transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a 
                  href={contact.social.instagram}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-kote-turquoise/20 transition-all duration-300 group"
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5 text-white/80 group-hover:text-kote-turquoise transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a 
                  href={contact.social.maps}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-kote-turquoise/20 transition-all duration-300 group"
                  aria-label="Itinéraire"
                >
                  <svg className="w-5 h-5 text-white/80 group-hover:text-kote-turquoise transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Colonne Contact */}
            <div>
              <h4 className="text-xl font-bold mb-4 text-white">Contact</h4>
              <address className="not-italic text-white/80">
                <p>{address?.road || 'Adresse non renseignée'}</p>
                <p>{address?.city || 'Ville non renseignée'}</p>
                <p>{address?.region || 'Région non renseignée'}</p>
                <p className="mt-4">
                  <a 
                    href={`tel:${contact.phone.tel}`} 
                    className="flex items-center text-white/80 hover:text-kote-turquoise transition-all duration-300"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {contact.phone.display}
                  </a>
                </p>
                <p className="mt-2">
                  <a 
                    href={`mailto:${contact.email}`} 
                    className="flex items-center text-white/80 hover:text-kote-turquoise transition-all duration-300"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {contact.email}
                  </a>
                </p>
              </address>
              
              <div className="mt-6 pt-6 border-t border-white/10">
                <h5 className="font-bold mb-3 text-white">Horaires d'ouverture</h5>
                <ul className="space-y-2 text-white/80">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-kote-turquoise" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Lundi - Vendredi: 8h - 12h, 14h30 - 17h
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-kote-turquoise" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Samedi: 8h - 12h
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-kote-turquoise" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Dimanche: Fermé
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Copyright et liens légaux */}
          <div className="mt-12 pt-8 border-t border-white/10 text-center">
            <p className="text-white/60">© {currentYear} Koté Piscine. Tous droits réservés.</p>
            <div className="mt-4 flex justify-center space-x-8">
              <Link 
                to="/mentions-legales" 
                className="text-white/60 hover:text-kote-turquoise transition-all duration-300"
              >
                Mentions légales
              </Link>
              <Link 
                to="/politique-confidentialite" 
                className="text-white/60 hover:text-kote-turquoise transition-all duration-300"
              >
                Politique de confidentialité
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 