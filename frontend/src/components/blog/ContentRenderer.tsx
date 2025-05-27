import React from 'react';
import { ContentBlock } from '../../config/blog.posts';
import ProductCardBlock from './ProductCardBlock';
import ArticleCTABlock from './ArticleCTABlock';
import ServiceCTABlock from './ServiceCTABlock';

interface ContentRendererProps {
  blocks: ContentBlock[];
}

const ContentRenderer: React.FC<ContentRendererProps> = ({ blocks }) => {
  const renderBlock = (block: ContentBlock) => {
    switch (block.type) {
      case 'text':
        return (
          <div key={block.id} className="mb-6">
            {renderMarkdown(block.content)}
          </div>
        );
      
      case 'product-card':
        return (
          <ProductCardBlock 
            key={block.id}
            productId={block.productId}
            productName={block.productName}
            autoDescription={block.autoDescription}
            layout={block.layout}
          />
        );
      
      case 'article-cta':
        return (
          <ArticleCTABlock
            key={block.id}
            articleId={block.articleId}
            articleTitle={block.articleTitle}
            customTitle={block.customTitle}
            customText={block.customText}
            autoExcerpt={block.autoExcerpt}
          />
        );
      
      case 'service-cta':
        return (
          <ServiceCTABlock
            key={block.id}
            serviceId={block.serviceId}
            serviceName={block.serviceName}
            customTitle={block.customTitle}
            customText={block.customText}
            autoDescription={block.autoDescription}
            layout={block.layout}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="prose prose-lg prose-invert max-w-none">
      {blocks.map(renderBlock)}
    </div>
  );
};

// Fonction simplifiée pour rendre le markdown
const renderMarkdown = (content: string) => {
  // Diviser le contenu par double saut de ligne pour les paragraphes
  const paragraphs = content.split('\n\n');
  
  return paragraphs.map((paragraph, index) => {
    // Traiter les titres
    if (paragraph.startsWith('### ')) {
      return (
        <h3 key={index} className="text-xl font-bold text-white mt-8 mb-4">
          {paragraph.replace('### ', '')}
        </h3>
      );
    }
    if (paragraph.startsWith('## ')) {
      return (
        <h2 key={index} className="text-2xl font-bold text-white mt-10 mb-5">
          {paragraph.replace('## ', '')}
        </h2>
      );
    }
    if (paragraph.startsWith('# ')) {
      return (
        <h1 key={index} className="text-3xl font-bold text-white mt-12 mb-6">
          {paragraph.replace('# ', '')}
        </h1>
      );
    }
    
    // Traiter les listes
    if (paragraph.includes('\n- ')) {
      const items = paragraph.split('\n- ').filter(item => item);
      return (
        <ul key={index} className="list-disc list-inside space-y-2 my-4">
          {items.map((item, i) => (
            <li key={i} className="text-white/90">
              <span className="ml-2">{item.replace('- ', '')}</span>
            </li>
          ))}
        </ul>
      );
    }
    
    // Paragraphe normal
    return (
      <p key={index} className="text-white/90 leading-relaxed mb-4">
        {renderInlineElements(paragraph)}
      </p>
    );
  });
};

// Fonction pour traiter les éléments inline (gras, italique, liens)
const renderInlineElements = (text: string) => {
  // Remplacer **text** par du gras
  let processedText = text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-white">$1</strong>');
  
  // Remplacer *text* par de l'italique
  processedText = processedText.replace(/\*(.*?)\*/g, '<em class="italic text-white/90">$1</em>');
  
  // Remplacer [text](url) par des liens
  processedText = processedText.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g, 
    '<a href="$2" class="text-kote-turquoise hover:text-kote-turquoise/80 underline transition-colors">$1</a>'
  );
  
  return <span dangerouslySetInnerHTML={{ __html: processedText }} />;
};

export default ContentRenderer; 