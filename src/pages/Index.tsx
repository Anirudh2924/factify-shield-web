import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Image, Video, ArrowRight, ShieldCheck, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import '../styles/home-theme.css';

const Index: React.FC = () => {
  const detectorCards = [
    {
      title: "Text Detector",
      description: "Analyze news articles, social media posts, and other text content for misinformation and fake news.",
      icon: FileText,
      path: "/text-detector",
      color: "bg-blue-100"
    },
    {
      title: "Image Detector",
      description: "Detect manipulated or AI-generated images with our advanced image analysis technology.",
      icon: Image,
      path: "/image-detector",
      color: "bg-purple-100"
    },
    {
      title: "Video Detector",
      description: "Identify deepfake videos and manipulated video content with high accuracy.",
      icon: Video,
      path: "/video-detector",
      color: "bg-indigo-100"
    },
  ];

  return (
    <Layout>
      <div className="home-page">
        <div className="home-bg-circle home-bg-circle1"></div>
        <div className="home-bg-circle home-bg-circle2"></div>
        <div className="home-bg-circle home-bg-circle3"></div>
        <div className="home-bg-circle home-bg-circle4"></div>
        
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-12 md:mb-0">
                <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  Fight <span className="gradient-text">Misinformation</span> with AI Precision
                </h1>
                <p className="hero-subtitle text-lg md:text-xl mb-8 max-w-lg">
                  Factify uses advanced artificial intelligence to help you verify the authenticity of text, images, and videos in an era of increasing misinformation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    className="hero-btn text-lg py-6 px-8"
                    asChild
                  >
                    <Link to="/text-detector">
                      Try Factify Now
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="hero-btn-outline text-lg py-6 px-8"
                    asChild
                  >
                    <a href="#detectors">
                      Learn More
                    </a>
                  </Button>
                </div>
              </div>
              <div className="md:w-1/2 hero-image-container">
                <svg className="hero-blob" width="500" height="500" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
                  <g transform="translate(300,300)">
                    <path d="M120,-157.6C152.7,-141.5,174.8,-102.6,184.9,-62.4C195,-22.1,193.2,19.6,181.8,64.9C170.4,110.2,149.4,159,115.6,185.3C81.8,211.6,35.2,215.4,-8.4,203.8C-52.1,192.2,-92.8,165.1,-128.9,133.6C-165.1,102.1,-196.6,66.3,-206.6,22.9C-216.5,-20.5,-204.8,-71.4,-175.9,-103C-147,-134.6,-101,-146.9,-60.9,-157.8C-20.7,-168.6,13.5,-178,49.6,-178C85.7,-177.9,123.7,-168.5,120,-157.6Z" fill="#8B5CF6" />
                  </g>
                </svg>
                <div className="relative z-10 p-3 rounded-xl shadow-lg">
                  <img 
                    src="/lovable-uploads/e75dc68a-8c27-4be9-9fc1-e7c500ec6bc1.png"
                    alt="GitHub Octocat mascot"
                    className="w-full h-auto rounded-lg shadow-lg object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="stats-container p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="stat-card p-6 text-center">
                  <p className="stat-number text-4xl md:text-5xl font-bold mb-2">95%</p>
                  <p className="text-gray-700 font-medium">Accuracy Rate</p>
                </div>
                <div className="stat-card p-6 text-center">
                  <p className="stat-number text-4xl md:text-5xl font-bold mb-2">10M+</p>
                  <p className="text-gray-700 font-medium">Content Items Analyzed</p>
                </div>
                <div className="stat-card p-6 text-center">
                  <p className="stat-number text-4xl md:text-5xl font-bold mb-2">500K+</p>
                  <p className="text-gray-700 font-medium">Users Trust Factify</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="detectors" className="detector-section py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-center text-3xl md:text-4xl font-bold mb-16 hero-title">
              Our Detection <span className="gradient-text">Tools</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {detectorCards.map((card) => (
                <Link 
                  to={card.path} 
                  key={card.title}
                  className="detector-card"
                >
                  <div className={`${card.color} p-8 h-full flex flex-col`}>
                    <div className="card-icon-container">
                      <card.icon className="h-6 w-6 text-factify-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{card.title}</h3>
                    <p className="text-gray-700 mb-6">{card.description}</p>
                    <div className="mt-auto flex items-center text-factify-600 font-medium">
                      Try it now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="trust-section p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="md:w-1/2">
                  <ShieldCheck className="h-12 w-12 text-factify-600 mb-4" />
                  <h2 className="text-3xl font-bold mb-6 hero-title">
                    Why Trust <span className="gradient-text">Factify?</span>
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-factify-600 mt-1" />
                      <p className="text-gray-700">
                        Our platform uses advanced machine learning algorithms trained on millions of verified and fake content samples.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-factify-600 mt-1" />
                      <p className="text-gray-700">
                        Factify is constantly learning and improving, with regular updates to keep up with the latest misinformation techniques.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-factify-600 mt-1" />
                      <p className="text-gray-700">
                        We're committed to transparency and education, helping users understand how to identify misinformation themselves.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <img 
                    src="https://images.unsplash.com/photo-1557200134-90327ee9fafa?q=80&auto=format&fit=crop&w=1200"
                    alt="Trust and security illustration"
                    className="trust-image w-full h-auto rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 mb-16">
          <div className="container mx-auto px-4">
            <div className="cta-section py-16 px-8 text-center text-white">
              <div className="cta-circle cta-circle1"></div>
              <div className="cta-circle cta-circle2"></div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Fight Misinformation?
              </h2>
              <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
                Join thousands of users who are already using Factify to verify content and combat the spread of fake news.
              </p>
              <Button 
                size="lg"
                className="cta-btn text-lg py-6 px-8"
                asChild
              >
                <Link to="/text-detector">
                  Get Started Now
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
