
// Simulated API service for Factify platform

// Helper to simulate API delay
const simulateApiDelay = (min = 1500, max = 3000) => {
  const delay = Math.floor(Math.random() * (max - min + 1)) + min;
  return new Promise(resolve => setTimeout(resolve, delay));
};

// Random result with bias
const getRandomResult = (fakeProbability = 0.4) => {
  return Math.random() < fakeProbability;
};

// API for text detection
export const analyzeText = async (text: string) => {
  await simulateApiDelay();
  
  // Very simple "detection" heuristic for demo purposes
  const hasFakeIndicators = text.toLowerCase().includes('breaking') || 
                          text.toLowerCase().includes('shocking') ||
                          text.toLowerCase().includes('you won\'t believe');
  
  const isFake = hasFakeIndicators || getRandomResult();
  const confidence = Math.floor(Math.random() * 30) + 70; // 70-99%
  
  return {
    result: isFake ? 'fake' : 'real',
    confidence,
    details: {
      analysis: "Content analyzed for misinformation patterns",
      source_check: "Source credibility assessment completed",
      fact_check: "Cross-referenced with fact-checking databases"
    }
  };
};

// API for image detection
export const analyzeImage = async (image: File) => {
  await simulateApiDelay(2000, 4000);
  
  const isFake = getRandomResult();
  const confidence = Math.floor(Math.random() * 25) + 75; // 75-99%
  
  return {
    result: isFake ? 'fake' : 'real',
    confidence,
    details: {
      metadata_check: "Image metadata analyzed",
      manipulation_check: "Checked for digital manipulation traces",
      source_check: "Image source verification completed"
    }
  };
};

// API for video detection
export const analyzeVideo = async (video: File) => {
  await simulateApiDelay(3000, 5000);
  
  const isDeepfake = getRandomResult();
  const confidence = Math.floor(Math.random() * 20) + 80; // 80-99%
  
  return {
    result: isDeepfake ? 'deepfake' : 'original',
    confidence,
    details: {
      facial_analysis: "Facial inconsistencies analyzed",
      audio_sync_check: "Audio-visual synchronization verified",
      deepfake_detection: "AI deepfake detection algorithms applied"
    }
  };
};
