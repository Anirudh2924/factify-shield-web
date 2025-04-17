
import React, { useState, useRef } from 'react';
import { Video, UploadCloud, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import Layout from '@/components/Layout';
import LoadingSpinner from '@/components/LoadingSpinner';
import ResultDisplay from '@/components/ResultDisplay';
import { analyzeVideo } from '@/services/api';
import '../styles/detector-theme.css';

const VideoDetector = () => {
  const [video, setVideo] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const fileInputRef = useRef(null);
  const { toast } = useToast();

  const handleVideoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!file.type.startsWith('video/')) {
      toast({
        title: "Invalid File",
        description: "Please select a valid video file (MP4, WebM, etc).",
        variant: "destructive"
      });
      return;
    }
    
    setVideo(file);
    setResult(null);
    
    // Create preview URL
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const handleRemoveVideo = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    
    setVideo(null);
    setPreview(null);
    setResult(null);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!video) {
      toast({
        title: "No Video Selected",
        description: "Please select a video to analyze.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsLoading(true);
      setResult(null);
      
      const analysis = await analyzeVideo(video);
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
        description: "Video has been successfully analyzed.",
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing the video. Please try again.",
        variant: "destructive"
      });
      console.error('Video analysis error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="detector-page flex flex-col items-center py-8 px-4">
        {/* Animated background circles */}
        <div className="bg-circle bg-circle1"></div>
        <div className="bg-circle bg-circle2"></div>
        <div className="bg-circle bg-circle3"></div>
        
        <h1 className="suite-title">🛡️ Fake News & Deepfake Detector Suite - Video Detector</h1>
        
        <div className="detector-grid">
          <div className="detector-container">
            <div className="header-anim">
              <span className="icon"><Video size={32} className="text-factify-600" /></span>
              <h1>Deepfake Video Detector</h1>
            </div>
            
            <p>Upload a short video to check for deepfake manipulation.</p>
            
            <form onSubmit={handleSubmit}>
              {!preview ? (
                <div 
                  className="file-input-area flex flex-col items-center cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <UploadCloud className="h-12 w-12 text-gray-400 mb-3" />
                  <p className="text-gray-600 mb-2">
                    Drag and drop a video here, or click to select
                  </p>
                  <p className="text-gray-500 text-sm">
                    Supported formats: MP4, WebM (max 50MB)
                  </p>
                </div>
              ) : (
                <div className="relative">
                  <video 
                    src={preview} 
                    controls
                    className="video-preview mx-auto w-full"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8 rounded-full"
                    onClick={handleRemoveVideo}
                    type="button"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
              
              <input 
                type="file" 
                ref={fileInputRef}
                className="hidden"
                accept="video/*"
                onChange={handleVideoChange}
              />
              
              <div className="btn-group">
                <Button 
                  type="submit"
                  className="check-btn"
                  disabled={isLoading || !video}
                >
                  Check Video
                </Button>
                
                <Button 
                  type="button"
                  className="reset-btn"
                  onClick={handleRemoveVideo}
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
                    Analyzing Video
                  </h3>
                  <p className="text-gray-600 animate-pulse-slow">
                    Our AI is examining the video for signs of manipulation...
                    <br/>This may take a few minutes for longer videos.
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

export default VideoDetector;
