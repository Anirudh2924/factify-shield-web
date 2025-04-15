
import React, { useState, useRef } from 'react';
import { Image, UploadCloud, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import Layout from '@/components/Layout';
import LoadingSpinner from '@/components/LoadingSpinner';
import ResultDisplay from '@/components/ResultDisplay';
import { analyzeImage } from '@/services/api';

const ImageDetector: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid File",
        description: "Please select a valid image file (JPEG, PNG, etc).",
        variant: "destructive"
      });
      return;
    }
    
    setImage(file);
    setResult(null);
    
    // Create preview URL
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreview(null);
    setResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!image) {
      toast({
        title: "No Image Selected",
        description: "Please select an image to analyze.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsLoading(true);
      setResult(null);
      
      const analysis = await analyzeImage(image);
      setResult(analysis);
      
      toast({
        title: "Analysis Complete",
        description: "Image has been successfully analyzed.",
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing the image. Please try again.",
        variant: "destructive"
      });
      console.error('Image analysis error:', error);
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
              <Image className="h-6 w-6 text-factify-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Image Detector</h1>
              <p className="text-gray-600">
                Analyze images for signs of manipulation or AI generation
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
                      Drag and drop an image here, or click to select
                    </p>
                    <p className="text-gray-500 text-sm">
                      Supported formats: JPEG, PNG, WebP
                    </p>
                  </div>
                ) : (
                  <div className="relative">
                    <img 
                      src={preview} 
                      alt="Preview"
                      className="max-h-[400px] mx-auto rounded-lg"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8 rounded-full"
                      onClick={handleRemoveImage}
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
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
              
              <div className="flex justify-end">
                <Button 
                  type="submit"
                  className="bg-factify-600 hover:bg-factify-700"
                  disabled={isLoading || !image}
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
                Analyzing Image
              </h3>
              <p className="text-gray-600 animate-pulse-slow">
                Our AI is examining the image for signs of manipulation...
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
                  {Object.entries(result.details).map(([key, value]) => (
                    <div key={key} className="flex items-center">
                      <div className="w-3 h-3 bg-factify-400 rounded-full mr-3"></div>
                      <div className="text-sm text-gray-600">{value}</div>
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

export default ImageDetector;
