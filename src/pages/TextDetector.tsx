
import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import Layout from '@/components/Layout';
import LoadingSpinner from '@/components/LoadingSpinner';
import ResultDisplay from '@/components/ResultDisplay';
import { analyzeText } from '@/services/api';

const TextDetector: React.FC = () => {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    
    // Reset results when text changes
    if (result) {
      setResult(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!text.trim()) {
      toast({
        title: "Error",
        description: "Please enter some text to analyze.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsLoading(true);
      setResult(null);
      
      const analysis = await analyzeText(text);
      setResult(analysis);
      
      toast({
        title: "Analysis Complete",
        description: "Text has been successfully analyzed.",
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing the text. Please try again.",
        variant: "destructive"
      });
      console.error('Text analysis error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 detector-container">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center mb-8">
            <div className="bg-factify-100 p-3 rounded-full mr-4">
              <FileText className="h-6 w-6 text-factify-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Text Detector</h1>
              <p className="text-gray-600">
                Analyze news articles and text content for misinformation
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label 
                  htmlFor="content" 
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Paste text content to analyze
                </label>
                <Textarea
                  id="content"
                  placeholder="Paste or type news article, social media post, or any text content you want to verify..."
                  value={text}
                  onChange={handleTextChange}
                  className="min-h-[200px]"
                />
              </div>
              
              <div className="flex justify-end">
                <Button 
                  type="submit"
                  className="bg-factify-600 hover:bg-factify-700"
                  disabled={isLoading || !text.trim()}
                >
                  {isLoading ? 'Analyzing...' : 'Check Authenticity'}
                </Button>
              </div>
            </form>
          </div>

          {/* Analysis Results */}
          {isLoading && (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center animate-fade-in">
              <div className="mb-4 flex justify-center">
                <LoadingSpinner size="lg" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                Analyzing Content
              </h3>
              <p className="text-gray-600 animate-pulse-slow">
                Our AI is examining the text for signs of misinformation...
              </p>
            </div>
          )}
          
          {result && !isLoading && (
            <div className="animate-fade-in">
              <ResultDisplay 
                result={result.result}
                confidence={result.confidence}
              />
              
              <div className="bg-white rounded-lg shadow-sm p-6 mt-4">
                <h3 className="text-lg font-medium text-gray-800 mb-3">
                  Analysis Details
                </h3>
                <div className="space-y-3">
                  {Object.entries(result.details || {}).map(([key, value]) => (
                    <div key={key} className="flex items-center">
                      <div className="w-3 h-3 bg-factify-400 rounded-full mr-3"></div>
                      <div className="text-sm text-gray-600">{String(value)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default TextDetector;
