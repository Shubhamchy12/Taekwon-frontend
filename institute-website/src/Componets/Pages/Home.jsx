import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const heroSlides = [
    {
      title: "Master the Ancient Art of Taekwon-Do",
      subtitle: "Discipline • Honor • Excellence • Tradition",
      description: "Join Karnataka's premier ITF Taekwon-Do Dojang with over 15 years of authentic martial arts mastery. Train under certified masters in the true spirit of Korean martial arts.",
      image: "/combat-warrior-logo.png",
      gradient: "from-yellow-400 via-yellow-500 to-red-600"
    },
    {
      title: "Forge Champions Through Discipline",
      subtitle: "Traditional Training • Modern Champions • Timeless Values",
      description: "Our certified black belt masters have forged over 50 state and national champions. Your journey from white belt to mastery begins here.",
      image: "/combat-warrior-logo.png",
      gradient: "from-red-600 via-yellow-500 to-black"
    },
    {
      title: "ITF Taekwon-Do Excellence",
      subtitle: "Authentic Techniques • Korean Heritage • Global Standards",
      description: "Experience true International Taekwon-Do Federation training with traditional Korean values and cutting-edge martial arts methodology.",
      image: "/combat-warrior-logo.png",
      gradient: "from-black via-red-600 to-yellow-400"
    }
  ];

  const features = [
    {
      icon: '🥋',
      title: 'Authentic ITF Taekwon-Do',
      description: 'Learn traditional International Taekwon-Do Federation patterns, techniques, and philosophy under certified Korean masters',
      color: 'from-yellow-400 to-yellow-600',
      delay: '0ms'
    },
    {
      icon: '🏆',
      title: 'Championship Dojang',
      description: 'Train in Karnataka\'s most successful competition dojang with proven track record of state and national champions',
      color: 'from-red-500 to-red-700',
      delay: '200ms'
    },
    {
      icon: '🎯',
      title: 'Traditional Discipline',
      description: 'Develop mental fortitude, respect, and self-control through authentic Korean martial arts training methods',
      color: 'from-yellow-400 to-yellow-600',
      delay: '400ms'
    },
    {
      icon: '⚡',
      title: 'Combat Effectiveness',
      description: 'Master practical self-defense techniques and powerful striking methods rooted in centuries of martial tradition',
      color: 'from-red-500 to-red-700',
      delay: '600ms'
    }
  ];

  const programs = [
    {
      title: 'Little Tigers (4-7 years)',
      description: 'Traditional martial arts foundation with Korean terminology, basic patterns, and character development through disciplined training',
      duration: '45 minutes',
      schedule: 'Mon, Wed, Fri - 4:00 PM',
      icon: '🐅',
      color: 'from-yellow-400 to-red-500',
      features: ['Korean Commands', 'Basic Patterns (Tul)', 'Respect & Discipline', 'White to Yellow Belt']
    },
    {
      title: 'Young Warriors (8-12 years)',
      description: 'Structured ITF curriculum with traditional patterns, sparring fundamentals, and Korean martial arts philosophy',
      duration: '60 minutes',
      schedule: 'Tue, Thu, Sat - 5:00 PM',
      icon: '🦅',
      color: 'from-red-500 to-black',
      features: ['ITF Patterns (Tul)', 'Sparring Basics', 'Breaking Techniques', 'Yellow to Green Belt']
    },
    {
      title: 'Adult Mastery (13+ years)',
      description: 'Advanced ITF Taekwon-Do with competition training, black belt preparation, and traditional Korean martial arts mastery',
      duration: '90 minutes',
      schedule: 'Mon-Sat - 6:30 PM',
      icon: '🥷',
      color: 'from-black to-yellow-400',
      features: ['Advanced Patterns', 'Competition Sparring', 'Black Belt Training', 'Instructor Development']
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Parent",
      text: "My daughter has gained so much confidence since joining. The instructors are amazing!",
      rating: 5,
      image: "👩"
    },
    {
      name: "Rajesh Kumar",
      role: "Adult Student",
      text: "Best decision I made for my fitness and mental discipline. Highly recommended!",
      rating: 5,
      image: "👨"
    },
    {
      name: "Anita Reddy",
      role: "Teen Student",
      text: "Won my first state championship thanks to the excellent training here!",
      rating: 5,
      image: "👧"
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Enhanced Hero Section with Slider */}
      <section className="relative min-h-screen flex items-center">
        {/* Background with animated gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${heroSlides[currentSlide].gradient} transition-all duration-1000`}>
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          {/* Animated particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white bg-opacity-30 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 3}s`
                }}
              ></div>
            ))}
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="mb-6">
                <span className="inline-block px-6 py-3 bg-black bg-opacity-80 rounded-full text-sm font-bold backdrop-blur-sm border-2 border-yellow-400">
                  🥋 Karnataka's Premier ITF Taekwon-Do Dojang
                </span>
              </div>
              
              <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
                {heroSlides[currentSlide].title.split(' ').map((word, index) => (
                  <span
                    key={index}
                    className="inline-block animate-fade-in-up"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    {word}{' '}
                  </span>
                ))}
              </h1>
              
              <p className="text-2xl mb-4 font-bold text-yellow-300 tracking-wide">
                {heroSlides[currentSlide].subtitle}
              </p>
              
              <p className="text-xl mb-8 leading-relaxed text-gray-100 max-w-2xl">
                {heroSlides[currentSlide].description}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  to="/admission"
                  className="group bg-yellow-400 text-black px-8 py-4 rounded-full text-lg font-bold hover:bg-yellow-300 hover:shadow-2xl transition-all duration-300 text-center transform hover:scale-105 border-2 border-yellow-400"
                >
                  <span className="flex items-center justify-center">
                    🚀 Begin Your Journey
                    <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </Link>
                <Link
                  to="/courses"
                  className="border-2 border-red-500 text-red-500 bg-black bg-opacity-50 px-8 py-4 rounded-full text-lg font-bold hover:bg-red-500 hover:text-white transition-all duration-300 text-center backdrop-blur-sm transform hover:scale-105"
                >
                  ⚔️ Training Programs
                </Link>
              </div>

              {/* Achievement Stats */}
              <div className="grid grid-cols-3 gap-6 text-center">
                <div className="bg-black bg-opacity-60 backdrop-blur-sm rounded-lg p-4 border border-yellow-400">
                  <div className="text-2xl font-bold text-yellow-400">500+</div>
                  <div className="text-sm text-white">Students Trained</div>
                </div>
                <div className="bg-black bg-opacity-60 backdrop-blur-sm rounded-lg p-4 border border-red-500">
                  <div className="text-2xl font-bold text-red-500">15+</div>
                  <div className="text-sm text-white">Years Excellence</div>
                </div>
                <div className="bg-black bg-opacity-60 backdrop-blur-sm rounded-lg p-4 border border-yellow-400">
                  <div className="text-2xl font-bold text-yellow-400">50+</div>
                  <div className="text-sm text-white">Champions</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              {/* Martial Arts Visual Design */}
              <div className="relative">
                {/* Background Elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-red-500 to-black rounded-full blur-3xl opacity-30 animate-pulse"></div>
                
                {/* Main Visual Container */}
                <div className="relative bg-gradient-to-br from-black via-red-900 to-yellow-600 rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition-all duration-500 border-4 border-yellow-400">
                  
                  {/* Martial Arts Background */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-10">
                    <div className="text-6xl font-bold text-white">TAEKWON-DO</div>
                  </div>
                  
                  {/* Central Logo */}
                  <div className="relative z-10 bg-white rounded-full shadow-2xl p-6 mb-6">
                    <img 
                      src="/combat-warrior-logo.png" 
                      alt="Combat Warrior Taekwon-Do" 
                      className="w-full h-auto"
                    />
                  </div>
                  
                  {/* Martial Arts Elements */}
                  <div className="relative z-10 text-center">
                    <div className="text-yellow-400 text-2xl font-bold mb-2">ITF TAEKWON-DO</div>
                    <div className="text-white text-lg mb-4">International Federation</div>
                    
                    {/* Belt Ranking Display */}
                    <div className="flex justify-center space-x-2 mb-4">
                      {['white', 'yellow', 'green', 'blue', 'red', 'black'].map((color, index) => (
                        <div 
                          key={index}
                          className={`w-8 h-3 rounded-sm ${
                            color === 'white' ? 'bg-white' :
                            color === 'yellow' ? 'bg-yellow-400' :
                            color === 'green' ? 'bg-green-500' :
                            color === 'blue' ? 'bg-blue-500' :
                            color === 'red' ? 'bg-red-500' :
                            'bg-black border border-yellow-400'
                          }`}
                          style={{ animationDelay: `${index * 200}ms` }}
                        />
                      ))}
                    </div>
                    
                    {/* Traditional Values */}
                    <div className="text-yellow-300 text-sm font-semibold">
                      COURTESY • INTEGRITY • PERSEVERANCE • SELF-CONTROL • INDOMITABLE SPIRIT
                    </div>
                    <div className="text-white text-xs mt-1">
                      The Five Tenets of Taekwon-Do
                    </div>
                  </div>
                  
                  {/* Rotating Elements */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce"></div>
                  <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-red-500 rounded-full animate-pulse"></div>
                  
                  {/* Decorative Border */}
                  <div className="absolute inset-0 border-2 border-yellow-400 rounded-3xl animate-pulse opacity-50"></div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-8 left-8 text-4xl animate-bounce" style={{ animationDelay: '1s' }}>🥋</div>
                <div className="absolute -bottom-8 right-8 text-4xl animate-bounce" style={{ animationDelay: '2s' }}>🏆</div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white scale-125' : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-8 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-black mb-6">
                About <span className="text-red-600">Combat Warrior</span> <span className="text-yellow-600">Dojang</span>
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Established in 2010, Combat Warrior Taekwon-Do Association of Karnataka is dedicated to 
                preserving and teaching authentic International Taekwon-Do Federation (ITF) training. 
                We follow the original teachings of General Choi Hong Hi, the founder of Taekwon-Do.
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Our certified masters have trained over 500 students and produced 50+ state and national 
                champions. We emphasize traditional values, discipline, and character development alongside 
                physical fitness and martial arts excellence.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center bg-gradient-to-r from-yellow-400 to-red-500 text-black px-8 py-4 rounded-full text-lg font-bold hover:from-yellow-300 hover:to-red-400 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Read More About Us
                <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-yellow-100 to-red-100 rounded-3xl p-8 border-4 border-black shadow-2xl">
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-yellow-500">
                    <div className="text-3xl font-bold text-red-600 mb-2">500+</div>
                    <div className="text-sm font-semibold text-black">Students Trained</div>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-red-500">
                    <div className="text-3xl font-bold text-yellow-600 mb-2">15+</div>
                    <div className="text-sm font-semibold text-black">Years Excellence</div>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-yellow-500">
                    <div className="text-3xl font-bold text-red-600 mb-2">50+</div>
                    <div className="text-sm font-semibold text-black">Champions</div>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-red-500">
                    <div className="text-3xl font-bold text-yellow-600 mb-2">10+</div>
                    <div className="text-sm font-semibold text-black">Black Belts</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-yellow-50 to-red-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-100 via-white to-red-100 opacity-50"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            id="features-title"
            data-animate
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible['features-title'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-5xl font-bold text-black mb-4">
              Why Train at <span className="text-red-600">Combat Warrior</span> <span className="text-yellow-600">Dojang?</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Experience authentic Korean martial arts training with traditional values and modern excellence
            </p>
            <div className="w-32 h-2 bg-gradient-to-r from-yellow-500 via-red-500 to-black mx-auto mt-6 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`group text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border-t-4 ${
                  index % 2 === 0 ? 'border-yellow-500 hover:border-yellow-600' : 'border-red-500 hover:border-red-600'
                }`}
                style={{ 
                  animationDelay: feature.delay,
                  background: `linear-gradient(135deg, white 0%, ${index % 2 === 0 ? '#fefce8' : '#fef2f2'} 100%)`
                }}
              >
                <div className={`text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className={`text-xl font-bold mb-4 transition-colors ${
                  index % 2 === 0 ? 'text-black group-hover:text-yellow-600' : 'text-black group-hover:text-red-600'
                }`}>
                  {feature.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">{feature.description}</p>
                
                {/* Hover effect decoration */}
                <div className={`mt-6 h-2 bg-gradient-to-r ${feature.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Programs Section */}
      <section className="py-20 bg-gradient-to-br from-black via-gray-900 to-red-900 text-white relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-yellow-600/10 to-red-600/10"></div>
          {/* Martial Arts pattern background */}
          <div className="absolute inset-0 opacity-5">
            <div className="text-9xl font-bold text-yellow-400 absolute top-20 left-20 rotate-12">TKD</div>
            <div className="text-9xl font-bold text-red-400 absolute bottom-20 right-20 -rotate-12">ITF</div>
            <div className="text-6xl font-bold text-yellow-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">MARTIAL ARTS</div>
          </div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">
              Traditional <span className="text-yellow-400">Training</span> Programs
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Authentic ITF Taekwon-Do curriculum designed for every age and skill level, from white belt to black belt mastery
            </p>
            <div className="w-32 h-2 bg-gradient-to-r from-yellow-400 via-red-500 to-black mx-auto mt-6 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <div 
                key={index} 
                className="group relative bg-black/40 backdrop-blur-sm rounded-2xl p-8 hover:bg-black/60 transition-all duration-500 transform hover:-translate-y-4 border-2 border-yellow-400/30 hover:border-yellow-400"
              >
                {/* Program icon with gradient background */}
                <div className={`absolute -top-6 left-8 w-16 h-16 bg-gradient-to-r ${program.color} rounded-full flex items-center justify-center text-3xl shadow-lg border-2 border-white`}>
                  {program.icon}
                </div>
                
                <div className="mt-12">
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-yellow-400 transition-colors">
                    {program.title}
                  </h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">{program.description}</p>
                  
                  {/* Program details */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm">
                      <span className="text-yellow-400 font-semibold w-24 flex items-center">
                        ⏱️ Duration:
                      </span>
                      <span className="text-gray-200">{program.duration}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="text-yellow-400 font-semibold w-24 flex items-center">
                        📅 Schedule:
                      </span>
                      <span className="text-gray-200">{program.schedule}</span>
                    </div>
                  </div>

                  {/* Program features */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-yellow-400 mb-3">Training Focus:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {program.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-xs text-gray-300">
                          <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Link
                    to="/admission"
                    className={`inline-block w-full text-center bg-gradient-to-r from-yellow-400 to-red-500 text-black px-6 py-3 rounded-lg font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-300 hover:from-yellow-300 hover:to-red-400`}
                  >
                    Join This Program
                  </Link>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 to-red-500/0 group-hover:from-yellow-400/5 group-hover:to-red-500/5 rounded-2xl transition-all duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-50 via-white to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-black mb-4">
              What Our <span className="text-red-600">Martial Artists</span> Say
            </h2>
            <p className="text-xl text-gray-700">Testimonials from our Taekwon-Do family</p>
            <div className="w-32 h-2 bg-gradient-to-r from-yellow-500 via-red-500 to-black mx-auto mt-6 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-xl p-8 transform hover:-translate-y-2 transition-all duration-300 border-t-4 border-yellow-500 hover:border-red-500">
                <div className="flex items-center mb-6">
                  <div className="text-4xl mr-4">{testimonial.image}</div>
                  <div>
                    <h4 className="font-bold text-black">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-500 text-xl">⭐</span>
                  ))}
                </div>
                
                <p className="text-gray-700 italic leading-relaxed">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Dojang Excellence</h2>
            <p className="text-xl text-gray-300">Proven results in traditional martial arts training</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '500+', label: 'Students Trained', icon: '🥋', color: 'from-yellow-400 to-yellow-600' },
              { number: '15+', label: 'Years Excellence', icon: '🏛️', color: 'from-red-500 to-red-700' },
              { number: '50+', label: 'Champions Forged', icon: '🏆', color: 'from-yellow-400 to-yellow-600' },
              { number: '10+', label: 'Black Belt Masters', icon: '🥷', color: 'from-red-500 to-red-700' }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className={`w-20 h-20 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center text-3xl text-black mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg border-2 border-white`}>
                  {stat.icon}
                </div>
                <div className={`text-4xl font-bold mb-2 group-hover:scale-105 transition-all duration-300 ${
                  index % 2 === 0 ? 'text-yellow-400' : 'text-red-500'
                }`}>
                  {stat.number}
                </div>
                <div className="text-gray-300 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 via-black to-yellow-600 relative overflow-hidden">
        {/* Background animation */}
        <div className="absolute inset-0">
          {/* Martial Arts background */}
          <div className="absolute inset-0 opacity-10">
            <div className="text-9xl font-bold text-yellow-400 absolute top-10 left-10 rotate-12">TAEKWON-DO</div>
            <div className="text-6xl font-bold text-red-400 absolute bottom-10 right-10 -rotate-12">ITF</div>
          </div>
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-4 h-4 bg-yellow-400 rounded-full opacity-20 animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-bold text-white mb-6">
            Ready to Begin Your <span className="text-yellow-400">Taekwon-Do Journey?</span>
          </h2>
          <p className="text-xl text-gray-200 mb-8 leading-relaxed">
            Join hundreds of martial artists who have discovered strength, discipline, and honor through authentic Korean Taekwon-Do. 
            Your path to black belt mastery starts with a single step into our dojang.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
            <Link
              to="/admission"
              className="group bg-yellow-400 text-black px-10 py-4 rounded-full text-lg font-bold hover:bg-yellow-300 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-yellow-400"
            >
              <span className="flex items-center justify-center">
                🥋 Start Training Today
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
            </Link>
            <Link
              to="/contact"
              className="border-2 border-red-500 text-red-500 bg-black bg-opacity-50 px-10 py-4 rounded-full text-lg font-bold hover:bg-red-500 hover:text-white transition-all duration-300 backdrop-blur-sm transform hover:scale-105"
            >
              🏛️ Visit Our Dojang
            </Link>
          </div>

          {/* Contact info */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-gray-200">
            <div className="flex items-center">
              <span className="text-yellow-400 mr-2">📞</span>
              <span>Call: +91 98765 43210</span>
            </div>
            <div className="flex items-center">
              <span className="text-yellow-400 mr-2">📧</span>
              <span>Email: info@combatwarrior.com</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;