
import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Image, Video, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';

const Index: React.FC = () => {
  const detectorCards = [
    {
      title: "Text Detector",
      description: "Analyze news articles, social media posts, and other text content for misinformation and fake news.",
      icon: FileText,
      path: "/text-detector",
      color: "bg-blue-50"
    },
    {
      title: "Image Detector",
      description: "Detect manipulated or AI-generated images with our advanced image analysis technology.",
      icon: Image,
      path: "/image-detector",
      color: "bg-purple-50"
    },
    {
      title: "Video Detector",
      description: "Identify deepfake videos and manipulated video content with high accuracy.",
      icon: Video,
      path: "/video-detector",
      color: "bg-indigo-50"
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-factify-50 to-white pt-16 pb-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Detect <span className="gradient-text">Misinformation</span> with AI Precision
              </h1>
              <p className="text-lg text-gray-700 mb-8">
                Factify uses advanced artificial intelligence to help you verify the authenticity of text, images, and videos in an era of increasing misinformation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="bg-factify-600 hover:bg-factify-700 text-white font-medium py-2 px-6"
                  asChild
                >
                  <Link to="/text-detector">
                    Try Factify Now
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <a href="#detectors">
                    Learn More
                  </a>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center md:justify-end">
              <div className="relative">
                <div className="absolute -left-6 -top-6 w-24 h-24 bg-factify-100 rounded-full z-0"></div>
                <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-factify-200 rounded-full z-0"></div>
                <div className="relative z-10 bg-white p-3 rounded-xl shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&auto=format&fit=crop&w=500"
                    alt="Factify platform illustration"
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-factify-50 p-6 rounded-lg text-center">
              <p className="text-4xl font-bold text-factify-600 mb-2">95%</p>
              <p className="text-gray-700">Accuracy Rate</p>
            </div>
            <div className="bg-factify-50 p-6 rounded-lg text-center">
              <p className="text-4xl font-bold text-factify-600 mb-2">10M+</p>
              <p className="text-gray-700">Content Items Analyzed</p>
            </div>
            <div className="bg-factify-50 p-6 rounded-lg text-center">
              <p className="text-4xl font-bold text-factify-600 mb-2">500K+</p>
              <p className="text-gray-700">Users Trust Factify</p>
            </div>
          </div>
        </div>
      </section>

      {/* Detector Cards */}
      <section id="detectors" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Detection <span className="gradient-text">Tools</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {detectorCards.map((card) => (
              <Link 
                to={card.path} 
                key={card.title}
                className="feature-card"
              >
                <div className={`${card.color} p-8 rounded-lg h-full flex flex-col`}>
                  <div className="mb-4 p-3 rounded-full bg-white inline-block">
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

      {/* Trust Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <ShieldCheck className="h-12 w-12 text-factify-600 mb-4" />
              <h2 className="text-3xl font-bold mb-6">
                Why Trust <span className="gradient-text">Factify?</span>
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Our platform uses advanced machine learning algorithms trained on millions of verified and fake content samples to provide accurate detection results.
                </p>
                <p className="text-gray-700">
                  Factify is constantly learning and improving, with regular updates to keep up with the latest misinformation techniques and trends.
                </p>
                <p className="text-gray-700">
                  We're committed to transparency and education, helping users understand how to identify misinformation themselves.
                </p>
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1557200134-90327ee9fafa?q=80&auto=format&fit=crop&w=500"
                alt="Trust and security illustration"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-factify-600 to-factify-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Fight Misinformation?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already using Factify to verify content and combat the spread of fake news.
          </p>
          <Button 
            size="lg"
            variant="secondary"
            asChild
          >
            <Link to="/text-detector">
              Get Started Now
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
