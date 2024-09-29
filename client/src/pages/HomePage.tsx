import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';
import CategoryCard from '../components/CategoryCard';
import WhatsAppButton from '../components/WhatsAppButton';
import ChatButton from '../components/ChatButton';
import TryDemoButton from '../components/TryDemoButton';
import Footer from '../components/Footer'; // Import the Footer component

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  // Remove the unused showHeader state
  // const [showHeader, setShowHeader] = useState(false);
  
  const hompageRef = useRef<HTMLImageElement | null>(null);
  const wrapperHomeRef = useRef<HTMLDivElement | null>(null);

  const paymentScrollRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollInterval = useRef<NodeJS.Timeout | null>(null);

  const startScroll = useCallback(() => {
    if (paymentScrollRef.current && !isScrolling) {
      setIsScrolling(true);
      scrollInterval.current = setInterval(() => {
        if (paymentScrollRef.current) {
          paymentScrollRef.current.scrollLeft += 1;
          if (
            paymentScrollRef.current.scrollLeft >=
            paymentScrollRef.current.scrollWidth - paymentScrollRef.current.clientWidth
          ) {
            paymentScrollRef.current.scrollLeft = 0;
          }
        }
      }, 20);
    }
  }, [isScrolling]);

  const stopScroll = useCallback(() => {
    if (scrollInterval.current) {
      clearInterval(scrollInterval.current);
      setIsScrolling(false);
    }
  }, []);

  useEffect(() => {
    startScroll();
    return () => stopScroll();
  }, [startScroll, stopScroll]);

  useEffect(() => {
    const updateWrapperHeight = () => {
      if (hompageRef.current && wrapperHomeRef.current) {
        const hompageHeight = hompageRef.current.offsetHeight;
        wrapperHomeRef.current.style.height = `${hompageHeight}px`; // Adjusts height to hompage
      }
    };

    updateWrapperHeight();
    window.addEventListener('resize', updateWrapperHeight);

    return () => window.removeEventListener('resize', updateWrapperHeight);
  }, []);

  const handleSearch = () => {
    navigate(`/search?q=${searchTerm}`);
  };

  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow animate-fadeIn font-sans">
        {/* Hero Section */}
        <section className="relative overflow-hidden hero-section">
          <div className="relative">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img src="/home-wrapper.webp" alt="Background" className="w-full h-full object-cover" />
            </div>

            {/* Image Positioned to the Right */}
            <div className="relative flex justify-end items-start">
              <img 
                ref={hompageRef}
                src="/hompage.webp" 
                alt="Homepage" 
                className="w-full md:w-1/2 object-contain object-bottom"
                style={{ 
                  filter: 'brightness(1)',
                  '--translate-y-mobile': '-12rem',
                  '--translate-y-tablet': '-2rem' 
                } as React.CSSProperties}
              />
              <div 
                ref={wrapperHomeRef}
                className="absolute inset-0 w-full h-full overflow-hidden"
                style={{
                  clipPath: 'inset(0 0 0 0)',
                  height: '100%', // Ensures it takes the full height of the section
                }}
              >
                <img 
                  src="/wrapper-home.webp" 
                  alt="Wrapper Home" 
                  className="w-full h-full object-cover object-bottom"
                  style={{
                    height: '100%', // Ensures it covers the height set above
                  }}
                />
              </div>
            </div>
          </div>

          {/* Content Description */}
          <div className="absolute inset-0 flex items-center justify-center lg:justify-start lg:pl-24">
            <div className="text-center lg:text-left max-w-2xl px-4 bg-black bg-opacity-50 md:bg-transparent p-6 md:p-0 rounded-lg">
              <h1 className="text-4xl md:text-6xl font-extra-bold text-white mb-4 md:mb-8 tracking-extra-tight leading-tight">Find Local Businesses Anywhere, Anytime</h1>
              <p className="text-white text-lg md:text-xl mb-4 md:mb-6 tracking-tight">
                Discover and connect with trusted local businesses. Get reviews, listings, and easy search all in one place.
              </p>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                <SearchBar 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)} 
                  onSearch={handleSearch} 
                  placeholder="Search for local businesses..."
                  className="w-full sm:w-auto"
                />
              </div>
              <div className="mt-4 md:mt-6">
                <TryDemoButton />
              </div>
            </div>  
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="bg-gray-100 py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center items-center text-center">
              <div className="w-full sm:w-1/2 md:w-1/4 mb-8 md:mb-0">
                <h3 className="text-3xl font-bold text-primary">2.5M+</h3>
                <p className="text-gray-600">Users worldwide</p>
              </div>
              <div className="w-full sm:w-1/2 md:w-1/4 mb-8 md:mb-0">
                <h3 className="text-3xl font-bold text-primary">$650B+</h3>
                <p className="text-gray-600">Monthly volume</p>
              </div>
              <div className="w-full sm:w-1/2 md:w-1/4 mb-8 md:mb-0">
                <h3 className="text-3xl font-bold text-primary">1999</h3>
                <p className="text-gray-600">Established since</p>
              </div>
              <div className="w-full sm:w-1/2 md:w-1/4">
                <h3 className="text-3xl font-bold text-primary">168M+</h3>
                <p className="text-gray-600">Monthly deals</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section (modified) */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-extra-bold text-center mb-12 tracking-extra-tight">We're 25 years strong</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-primary text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-semibold mb-2">Dependable</h3>
                <p className="text-gray-600 text-base md:text-lg">Our 99.97% uptime ensures your uninterrupted access to businesses.</p>
              </div>
              <div className="text-center">
                <div className="bg-primary text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-semibold mb-2">Safe & Secure</h3>
                <p className="text-gray-600 text-base md:text-lg">Your data and transactions are protected with state-of-the-art security measures.</p>
              </div>
              <div className="text-center">
                <div className="bg-primary text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-semibold mb-2">Regulated</h3>
                <p className="text-gray-600 text-base md:text-lg">We operate under strict regulatory guidelines to ensure fair and transparent services.</p>
              </div>
              <div className="text-center">
                <div className="bg-primary text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-semibold mb-2">24/7 Support</h3>
                <p className="text-gray-600 text-base md:text-lg">Our dedicated support team is always available to assist you with any queries or issues.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Platforms Showcase */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-extra-bold text-center mb-12 tracking-extra-tight">User-friendly platforms, on any device</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-2xl font-semibold mb-4">Local Search</h3>
                <p className="text-gray-600 mb-4">Find businesses near you with our powerful search tool.</p>
                <button className="text-primary font-semibold">Learn more →</button>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-2xl font-semibold mb-4">Business Listings</h3>
                <p className="text-gray-600 mb-4">Comprehensive listings with all the information you need.</p>
                <button className="text-primary font-semibold">Learn more →</button>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-2xl font-semibold mb-4">Review System</h3>
                <p className="text-gray-600 mb-4">Read and write reviews to make informed decisions.</p>
                <button className="text-primary font-semibold">Learn more →</button>
              </div>
            </div>
          </div>
        </section>

        {/* Getting Started Steps */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-extra-bold text-center mb-12 tracking-extra-tight">Start discovering in 3 steps</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-white text-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">1</div>
                <h3 className="text-xl font-semibold mb-2">Sign up and explore</h3>
                <p>Create your account and start browsing local businesses.</p>
              </div>
              <div className="text-center">
                <div className="bg-white text-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">2</div>
                <h3 className="text-xl font-semibold mb-2">Find what you need</h3>
                <p>Use our search tools to discover businesses that match your needs.</p>
              </div>
              <div className="text-center">
                <div className="bg-white text-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">3</div>
                <h3 className="text-xl font-semibold mb-2">Connect and engage</h3>
                <p>Reach out to businesses, read reviews, and make informed decisions.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Boost Local Presence Section */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-extra-bold text-center mb-8 tracking-extra-tight">Boost Your Local Presence</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="w-full h-64 md:h-auto overflow-hidden rounded-lg">
                <img src="/marketplace.webp" alt="Marketing" className="w-full h-full object-cover" />
              </div>
              <div>
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <svg className="w-6 h-6 mr-2 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-lg md:text-xl">Increase your visibility to local customers</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-6 h-6 mr-2 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-lg md:text-xl">Showcase your products and services</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-6 h-6 mr-2 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-lg md:text-xl">Connect with potential customers directly</span>
                  </li>
                </ul>
                <button className="mt-8 bg-white text-primary font-bold py-3 px-6 rounded-full hover:bg-primary-light transition duration-300">
                  List Your Business Now
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Payment Methods */}
        <section className="py-16 bg-gray-100 overflow-hidden">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-extra-bold text-center mb-8 tracking-extra-tight">Fast, hassle-free payments</h2>
            <p className="text-center text-gray-600 mb-12">Multiple payment options for businesses and customers. Quick and secure transactions.</p>
            <div className="relative w-full">
              <div 
                className="flex payment-scroll"
                onMouseEnter={() => setIsScrolling(false)}
                onMouseLeave={() => setIsScrolling(true)}
              >
                <div className="flex space-x-8 payment-scroll-content">
                  <img src="/visa-logo.png" alt="Visa" className="h-12" />
                  <img src="/mastercard-logo.png" alt="Mastercard" className="h-12" />
                  <img src="/paypal-logo.png" alt="PayPal" className="h-12" />
                  <img src="/bitcoin-logo.png" alt="Bitcoin" className="h-12" />
                  <img src="/helppay-logo.png" alt="HelpPay" className="h-12" />
                  <img src="/perfectmoney-logo.png" alt="Perfect Money" className="h-12" />
                </div>
                <div className="flex space-x-8 payment-scroll-content">
                  <img src="/visa-logo.png" alt="Visa" className="h-12" />
                  <img src="/mastercard-logo.png" alt="Mastercard" className="h-12" />
                  <img src="/paypal-logo.png" alt="PayPal" className="h-12" />
                  <img src="/bitcoin-logo.png" alt="Bitcoin" className="h-12" />
                  <img src="/helppay-logo.png" alt="HelpPay" className="h-12" />
                  <img src="/perfectmoney-logo.png" alt="Perfect Money" className="h-12" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Categories Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-extra-bold text-center mb-12 tracking-extra-tight">Explore Our Featured Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <CategoryCard
                icon={<i className="fas fa-utensils text-4xl text-primary"></i>}
                title="Restaurants"
                description="Discover local eateries and cuisines"
              />
              <CategoryCard
                icon={<i className="fas fa-shopping-bag text-4xl text-primary"></i>}
                title="Retail Shops"
                description="Find unique local stores and products"
              />
              <CategoryCard
                icon={<i className="fas fa-tools text-4xl text-primary"></i>}
                title="Home Services"
                description="Connect with trusted local professionals"
              />
              <CategoryCard
                icon={<i className="fas fa-heartbeat text-4xl text-primary"></i>}
                title="Health & Wellness"
                description="Explore local health and fitness options"
              />
              <CategoryCard
                icon={<i className="fas fa-graduation-cap text-4xl text-primary"></i>}
                title="Education"
                description="Discover schools and learning centers"
              />
              <CategoryCard
                icon={<i className="fas fa-car text-4xl text-primary"></i>}
                title="Automotive"
                description="Find local auto services and dealerships"
              />
              <CategoryCard
                icon={<i className="fas fa-paint-brush text-4xl text-primary"></i>}
                title="Beauty & Spa"
                description="Pamper yourself with local beauty services"
              />
              <CategoryCard
                icon={<i className="fas fa-briefcase text-4xl text-primary"></i>}
                title="Professional Services"
                description="Connect with local experts and consultants"
              />
            </div>
            <div className="text-center mt-12">
              <button className="bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-primary-dark transition duration-300">
                View All Categories
              </button>
            </div>
          </div>
        </section>

        {/* WhatsApp Button */}
        <WhatsAppButton />

        {/* Chat Button */}
        <ChatButton isOpen={isChatOpen} toggleChat={() => setIsChatOpen(!isChatOpen)} />

        {/* Chat Window */}
        {isChatOpen && (
          <div className="fixed bottom-20 right-20 w-80 h-96 bg-white shadow-lg rounded-lg z-50">
            {/* ... chat window content ... */}
          </div>
        )}
      </main>

      <Footer />

      {/* WhatsApp Button */}
      <WhatsAppButton />

      {/* Chat Button */}
      <ChatButton isOpen={isChatOpen} toggleChat={() => setIsChatOpen(!isChatOpen)} />

      {/* Chat Window */}
      {isChatOpen && (
        <div className="fixed bottom-20 right-20 w-80 h-96 bg-white shadow-lg rounded-lg z-50">
          {/* ... chat window content ... */}
        </div>
      )}
    </div>
  );
};

export default HomePage;

