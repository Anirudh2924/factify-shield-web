
import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import Layout from '@/components/Layout';
import LoadingSpinner from '@/components/LoadingSpinner';
import ResultDisplay from '@/components/ResultDisplay';
import { analyzeText } from '@/services/api';
import '../styles/detector-theme.css';

const TextDetector = () => {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const { toast } = useToast();

  const handleTextChange = (e) => {
    setText(e.target.value);
    
    // Reset results when text changes
    if (result) {
      setResult(null);
    }
  };

  const handleSubmit = async (e) => {
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
      
      // Add to history
      const now = new Date();
      const historyItem = {
        time: now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        result: analysis.result
      };
      setHistory(prevHistory => [historyItem, ...prevHistory.slice(0, 4)]);
      
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

  const handleReset = () => {
    setText('');
    setResult(null);
  };

  return (
    <Layout>
      <div className="detector-page flex flex-col items-center py-8 px-4">
        {/* Animated background circles */}
        <div className="bg-circle bg-circle1"></div>
        <div className="bg-circle bg-circle2"></div>
        <div className="bg-circle bg-circle3"></div>
        
        <h1 className="suite-title">🛡️ Fake News & Deepfake Detector Suite - Text Detector</h1>
        
        <div className="detector-grid">
          <div className="detector-container">
            <div className="header-anim">
              <span className="icon"><FileText size={32} className="text-factify-600" /></span>
              <h1>Fake News Text Detector</h1>
            </div>
            
            <p>Paste or type news text to check for misinformation or fake content.</p>
            
            <form onSubmit={handleSubmit}>
              <Textarea
                id="newsText"
                value={text}
                onChange={handleTextChange}
                placeholder="Paste news text here..."
                className="text-input"
              />
              
              <div className="btn-group">
                <Button 
                  type="submit"
                  className="check-btn" 
                  disabled={isLoading || !text.trim()}
                >
                  Check Text
                </Button>
                
                <Button 
                  type="button"
                  className="reset-btn"
                  onClick={handleReset}
                >
                  Reset
                </Button>
              </div>
              
              {isLoading && (
                <div className="flex flex-col items-center mt-6">
                  <div className="progress-bar">
                    <div className="progress-bar-inner" style={{ width: '100%' }}></div>
                  </div>
                  <div className="mt-4 flex justify-center">
                    <LoadingSpinner size="lg" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-800 mt-2">
                    Analyzing Content
                  </h3>
                  <p className="text-gray-600 animate-pulse-slow">
                    Our AI is examining the text for signs of misinformation...
                  </p>
                </div>
              )}
              
              {result && !isLoading && (
                <div className="result-area animate-fade-in">
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
              
              <div className="history-section">
                <h4>Recent Checks</h4>
                <ul className="history-list">
                  {history.map((item, index) => (
                    <li key={index}>
                      <span style={{color: '#1976d2'}}>{item.time}</span> - {item.result}
                    </li>
                  ))}
                </ul>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TextDetector;
