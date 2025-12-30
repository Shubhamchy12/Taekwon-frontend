import { Link } from 'react-router-dom';

function Home() {
  const features = [
    {
      icon: '🥋',
      title: 'Traditional ITF Taekwon-Do',
      description: 'Learn authentic International Taekwon-Do Federation techniques and forms'
    },
    {
      icon: '🏆',
      title: 'Championship Training',
      description: 'Train with certified masters and compete at state and national levels'
    },
    {
      icon: '👨‍👩‍👧‍👦',
      title: 'All Ages Welcome',
      description: 'Programs designed for children, teens, adults, and families'
    },
    {
      icon: '🎯',
      title: 'Self-Defense Focus',
      description: 'Practical self-defense techniques for real-world situations'
    }
  ];

  const programs = [
    {
      title: 'Little Warriors (4-7 years)',
      description: 'Fun introduction to martial arts with focus on discipline and coordination',
      duration: '45 minutes',
      schedule: 'Mon, Wed, Fri - 4:00 PM'
    },
    {
      title: 'Junior Program (8-12 years)',
      description: 'Structured learning of basic techniques, forms, and sparring',
      duration: '60 minutes',
      schedule: 'Tue, Thu, Sat - 5:00 PM'
    },
    {
      title: 'Teen & Adult Program (13+ years)',
      description: 'Advanced techniques, self-defense, and competitive training',
      duration: '90 minutes',
      schedule: 'Mon-Sat - 6:30 PM'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-red-50 to-yellow-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-gray-800 mb-6">
                Master the Art of
                <span className="text-red-600 block">Taekwon-Do</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Join Karnataka's premier ITF Taekwon-Do association. Build confidence, 
                discipline, and physical fitness through traditional martial arts training.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/admission"
                  className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200 text-center shadow-lg"
                >
                  Start Your Journey
                </Link>
                <Link
                  to="/courses"
                  className="border-2 border-red-500 text-red-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-50 transition-all duration-200 text-center"
                >
                  View Programs
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <img 
                  src="/combat-warrior-logo.png" 
                  alt="Combat Warrior Taekwon-Do" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose Combat Warrior?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the best in traditional Taekwon-Do training with modern teaching methods
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-yellow-50 hover:bg-yellow-100 transition-colors duration-200">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Training Programs</h2>
            <p className="text-xl text-gray-600">Structured programs for every age and skill level</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-200">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{program.title}</h3>
                <p className="text-gray-600 mb-6">{program.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <span className="text-red-600 font-semibold w-20">Duration:</span>
                    <span className="text-gray-700">{program.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-red-600 font-semibold w-20">Schedule:</span>
                    <span className="text-gray-700">{program.schedule}</span>
                  </div>
                </div>
                <Link
                  to="/admission"
                  className="inline-block mt-6 bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200"
                >
                  Enroll Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">500+</div>
              <div className="text-gray-600">Active Students</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">15+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">50+</div>
              <div className="text-gray-600">Championships Won</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">10+</div>
              <div className="text-gray-600">Certified Instructors</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-500 to-red-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Begin Your Martial Arts Journey?</h2>
          <p className="text-xl text-red-100 mb-8">
            Join hundreds of students who have transformed their lives through Taekwon-Do
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/admission"
              className="bg-white text-red-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Apply Now
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-red-600 transition-all duration-200"
            >
              Visit Our Dojo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;