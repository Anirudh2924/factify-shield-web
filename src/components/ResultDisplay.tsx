
import React from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

interface ResultDisplayProps {
  result: 'real' | 'fake' | 'deepfake' | 'original' | null;
  confidence?: number;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, confidence = 0 }) => {
  if (!result) return null;
  
  const isPositive = result === 'real' || result === 'original';
  const title = isPositive ? 'Authentic Content' : 'Misleading Content';
  const description = isPositive 
    ? 'This content appears to be authentic.' 
    : 'This content appears to be manipulated.';
  
  const Icon = isPositive ? CheckCircle : AlertCircle;
  const confidenceDisplay = confidence ? ` (${confidence}% confidence)` : '';

  return (
    <Alert 
      className={`border-l-4 ${
        isPositive 
          ? 'border-l-green-500 bg-green-50' 
          : 'border-l-red-500 bg-red-50'
      } animate-fade-in`}
    >
      <Icon 
        className={`h-5 w-5 ${isPositive ? 'text-green-500' : 'text-red-500'}`} 
      />
      <AlertTitle className="font-medium ml-2">
        {title}
        <span className="text-sm font-normal text-gray-500">{confidenceDisplay}</span>
      </AlertTitle>
      <AlertDescription className="ml-2 mt-1 text-sm">
        {description}
        <div className="mt-1">
          <span className="font-medium">Result:</span>{' '}
          {result === 'fake' && 'Fake content detected'}
          {result === 'real' && 'Real content verified'}
          {result === 'deepfake' && 'Deepfake video detected'}
          {result === 'original' && 'Original video verified'}
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default ResultDisplay;
