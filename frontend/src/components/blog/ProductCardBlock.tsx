import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { productsData } from '../../config/products';
import { categories } from '../../config/categories';

interface ProductCardBlockProps {
  productId?: string;
  productName?: string;
  autoDescription?: boolean;
  layout?: 'left' | 'right' | 'top' | 'simple';
}

const ProductCardBlock: React.FC<ProductCardBlockProps> = ({ 
  productId, 
  productName, 
  autoDescription = true,
  layout 
}) => {
  // Recherche du produit par ID ou nom
  const product = productId 
    ? productsData.find(p => p._id === productId)
    : productsData.find(p => p.name.toLowerCase() === productName?.toLowerCase());
  
  // Gestion produit non trouvé
  if (!product && process.env.NODE_ENV === 'development') {
    return (
      <div className="my-6 p-4 bg-red-900/30 border border-red-500/30 rounded-lg text-red-300">
        <p className="font-bold">Produit non trouvé</p>
        <p className="text-sm">{productId ? `ID: ${productId}` : `Nom: ${productName}`}</p>
      </div>
    );
  }
  
  if (!product) return null;

  // Recherche de la catégorie
  const category = categories.find(c => c.id === product.category);
  
  // Détermination du layout final
  const finalLayout = layout || (() => {
    // Fallback si pas de layout spécifié
    const productIdNum = parseInt(product._id.substring(product._id.length - 3), 16);
    return ['left', 'right', 'top', 'simple'][productIdNum % 4] as 'left' | 'right' | 'top' | 'simple';
  })();

  console.log(`ProductCardBlock: Produit ${product.name}, layout=${finalLayout} (props layout: ${layout || 'non spécifié'})`);

  // Layout SIMPLE : Version ultra simplifiée sans image
  if (finalLayout === 'simple') {
    return (
      <div className="my-4 max-w-xl ml-0 mr-auto" data-layout="simple" data-product-name={product.name}>
        <div className="bg-white/5 border border-white/10 rounded-lg hover:border-kote-turquoise/50 transition-all duration-300 hover:shadow-md p-4">
          <Link to={`/catalogue/${category?.slug}/${product.slug}`} className="flex justify-between items-center group">
            <div className="flex-grow">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-kote-turquoise text-xs px-2 py-0.5 rounded-full bg-kote-turquoise/10 font-medium">
                  Recommandé
                </span>
                {product.price && (
                  <span className="text-kote-green text-sm font-semibold">
                    {product.price.toFixed(2)} €
                  </span>
                )}
              </div>
              
              <h4 className="text-white text-lg font-bold group-hover:text-kote-turquoise transition-colors">
                {product.name}
              </h4>
              
              {autoDescription && (
                <p className="text-white/80 text-sm line-clamp-1 mt-1">
                  {product.description}
                </p>
              )}
            </div>
            
            <div className="ml-4 w-8 h-8 rounded-full bg-kote-turquoise/20 flex items-center justify-center group-hover:bg-kote-turquoise/30 transition-colors flex-shrink-0">
              <FaArrowRight className="text-kote-turquoise transform group-hover:translate-x-1 transition-transform text-sm" />
            </div>
          </Link>
        </div>
      </div>
    );
  }

  // Layout TOP : Image au-dessus, texte en dessous
  if (finalLayout === 'top') {
    return (
      <div className="my-6 max-w-xl ml-0 mr-auto" data-layout="top" data-product-name={product.name}>
        <div className="bg-white/5 border border-white/10 rounded-2xl hover:border-kote-turquoise/50 transition-all duration-300 hover:shadow-lg overflow-hidden">
          <Link to={`/catalogue/${category?.slug}/${product.slug}`} className="flex flex-col group">
            {/* Image en haut - taille réduite pour correspondre aux autres layouts */}
            <div className="w-full h-40 md:h-80">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            
            {/* Contenu en bas */}
            <div className="p-5 flex flex-col justify-between border-t border-white/10">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-kote-turquoise text-sm font-medium">Recommandé</p>
                </div>
                <h4 className="text-white text-xl font-bold mb-3 group-hover:text-kote-turquoise transition-colors">
                  {product.name}
                </h4>
                {autoDescription && (
                  <p className="text-white/80 text-sm line-clamp-3 mb-4">{product.description}</p>
                )}
              </div>
              
              <div className="flex items-center justify-between mt-auto">
                {product.price && (
                  <p className="text-kote-green font-bold text-lg">
                    {product.price.toFixed(2)} €
                  </p>
                )}
                
                <div className="w-10 h-10 rounded-full bg-kote-turquoise/20 flex items-center justify-center group-hover:bg-kote-turquoise/30 transition-colors ml-auto">
                  <FaArrowRight className="text-kote-turquoise transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    );
  }
  
  // Layout RIGHT : Image à droite, texte à gauche
  if (finalLayout === 'right') {
    return (
      <div className="my-6 max-w-xl ml-0 mr-auto" data-layout="right" data-product-name={product.name}>
        <div className="bg-white/5 border border-white/10 rounded-2xl hover:border-kote-turquoise/50 transition-all duration-300 hover:shadow-lg overflow-hidden">
          <Link to={`/catalogue/${category?.slug}/${product.slug}`} className="flex flex-col md:flex-row group">
            {/* Contenu à gauche */}
            <div className="p-5 flex flex-col justify-between flex-1">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-kote-turquoise text-sm font-medium">Recommandé</p>
                </div>
                <h4 className="text-white text-xl font-bold mb-3 group-hover:text-kote-turquoise transition-colors">
                  {product.name}
                </h4>
                {autoDescription && (
                  <p className="text-white/80 text-sm line-clamp-3 mb-4">{product.description}</p>
                )}
              </div>
              
              <div className="flex items-center justify-between mt-auto">
                {product.price && (
                  <p className="text-kote-green font-bold text-lg">
                    {product.price.toFixed(2)} €
                  </p>
                )}
                
                <div className="w-10 h-10 rounded-full bg-kote-turquoise/20 flex items-center justify-center group-hover:bg-kote-turquoise/30 transition-colors ml-auto">
                  <FaArrowRight className="text-kote-turquoise transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
            
            {/* Image à droite - cachée sur mobile */}
            <div className="hidden md:block md:w-1/2 aspect-square md:aspect-auto">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </Link>
        </div>
      </div>
    );
  }
  
  // Layout LEFT (default) : Image à gauche, texte à droite
  return (
    <div className="my-6 max-w-xl ml-0 mr-auto" data-layout="left" data-product-name={product.name}>
      <div className="bg-white/5 border border-white/10 rounded-2xl hover:border-kote-turquoise/50 transition-all duration-300 hover:shadow-lg overflow-hidden">
        <Link to={`/catalogue/${category?.slug}/${product.slug}`} className="flex flex-col md:flex-row-reverse group">
          {/* Contenu à droite */}
          <div className="p-5 flex flex-col justify-between flex-1">
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-kote-turquoise text-sm font-medium">Recommandé</p>
              </div>
              <h4 className="text-white text-xl font-bold mb-3 group-hover:text-kote-turquoise transition-colors">
                {product.name}
              </h4>
              {autoDescription && (
                <p className="text-white/80 text-sm line-clamp-3 mb-4">{product.description}</p>
              )}
            </div>
            
            <div className="flex items-center justify-between mt-auto">
              {product.price && (
                <p className="text-kote-green font-bold text-lg">
                  {product.price.toFixed(2)} €
                </p>
              )}
              
              <div className="w-10 h-10 rounded-full bg-kote-turquoise/20 flex items-center justify-center group-hover:bg-kote-turquoise/30 transition-colors ml-auto">
                <FaArrowRight className="text-kote-turquoise transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
          
          {/* Image à gauche - cachée sur mobile */}
          <div className="hidden md:block md:w-1/2 aspect-square md:aspect-auto">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProductCardBlock; 