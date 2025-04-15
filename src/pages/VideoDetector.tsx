
import React, { useState, useRef } from 'react';
import { Video, UploadCloud, X, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import Layout from '@/components/Layout';
import LoadingSpinner from '@/components/LoadingSpinner';
import ResultDisplay from '@/components/ResultDisplay';
import { analyzeVideo } from '@/services/api';

const VideoDetector: React.FC = () => {
  const [video, setVideo] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
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
      <div className="container mx-auto px-4 detector-container">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center mb-8">
            <div className="bg-factify-100 p-3 rounded-full mr-4">
              <Video className="h-6 w-6 text-factify-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Video Detector</h1>
              <p className="text-gray-600">
                Analyze videos for deepfakes and manipulated content
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                {!preview ? (
                  <div 
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-factify-400 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <UploadCloud className="h-12 w-12 text-gray-400 mx-auto mb-3" />
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
                      className="max-h-[400px] mx-auto rounded-lg w-full"
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
              </div>
              
              <div className="flex justify-end">
                <Button 
                  type="submit"
                  className="bg-factify-600 hover:bg-factify-700"
                  disabled={isLoading || !video}
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
                Analyzing Video
              </h3>
              <p className="text-gray-600 animate-pulse-slow">
                Our AI is examining the video for signs of manipulation...
                <br/>This may take a few minutes for longer videos.
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

export default VideoDetector;
