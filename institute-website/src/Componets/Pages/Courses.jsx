import { Link } from 'react-router-dom';

function Courses() {
  const programs = [
    {
      title: 'Little Warriors',
      ageGroup: '4-7 Years',
      duration: '45 Minutes',
      schedule: 'Mon, Wed, Fri - 4:00 PM',
      price: '₹2,500/month',
      description: 'Fun introduction to martial arts focusing on basic movements, coordination, and discipline.',
      features: [
        'Basic stances and movements',
        'Simple self-defense techniques',
        'Character development',
        'Coordination and balance',
        'Fun games and activities'
      ],
      color: 'from-yellow-400 to-orange-500'
    },
    {
      title: 'Junior Program',
      ageGroup: '8-12 Years',
      duration: '60 Minutes',
      schedule: 'Tue, Thu, Sat - 5:00 PM',
      price: '₹3,000/month',
      description: 'Structured learning of fundamental Taekwon-Do techniques, forms, and basic sparring.',
      features: [
        'ITF patterns (Tul)',
        'Fundamental techniques',
        'Basic sparring',
        'Breaking techniques',
        'Belt progression system'
      ],
      color: 'from-blue-400 to-blue-600'
    },
    {
      title: 'Teen Program',
      ageGroup: '13-17 Years',
      duration: '75 Minutes',
      schedule: 'Mon-Sat - 6:00 PM',
      price: '₹3,500/month',
      description: 'Advanced techniques, competitive training, and leadership development for teenagers.',
      features: [
        'Advanced patterns',
        'Competition sparring',
        'Self-defense applications',
        'Leadership training',
        'Tournament preparation'
      ],
      color: 'from-green-400 to-green-600'
    },
    {
      title: 'Adult Program',
      ageGroup: '18+ Years',
      duration: '90 Minutes',
      schedule: 'Mon-Sat - 7:30 PM',
      price: '₹4,000/month',
      description: 'Comprehensive training for adults focusing on fitness, self-defense, and traditional Taekwon-Do.',
      features: [
        'Complete ITF curriculum',
        'Advanced self-defense',
        'Fitness and conditioning',
        'Stress relief',
        'Black belt training'
      ],
      color: 'from-red-400 to-red-600'
    },
    {
      title: 'Competition Team',
      ageGroup: 'All Ages',
      duration: '2 Hours',
      schedule: 'Sat-Sun - 9:00 AM',
      price: '₹5,000/month',
      description: 'Elite training for students preparing for state, national, and international competitions.',
      features: [
        'Advanced sparring techniques',
        'Competition strategies',
        'Mental preparation',
        'Individual coaching',
        'Tournament participation'
      ],
      color: 'from-purple-400 to-purple-600'
    },
    {
      title: 'Women\'s Self-Defense',
      ageGroup: '16+ Years',
      duration: '60 Minutes',
      schedule: 'Tue, Thu - 10:00 AM',
      price: '₹2,800/month',
      description: 'Specialized program focusing on practical self-defense techniques for women.',
      features: [
        'Situational awareness',
        'Escape techniques',
        'Pressure point attacks',
        'Confidence building',
        'Real-world scenarios'
      ],
      color: 'from-pink-400 to-rose-500'
    }
  ];

  const belts = [
    { name: 'White Belt', requirements: 'Basic stances, blocks, and kicks', duration: '2-3 months' },
    { name: 'Yellow Belt', requirements: 'Chon-Ji pattern, basic combinations', duration: '3-4 months' },
    { name: 'Green Belt', requirements: 'Dan-Gun pattern, intermediate techniques', duration: '4-5 months' },
    { name: 'Blue Belt', requirements: 'Do-San pattern, advanced kicks', duration: '5-6 months' },
    { name: 'Red Belt', requirements: 'Won-Hyo pattern, sparring techniques', duration: '6-8 months' },
    { name: 'Black Belt 1st Dan', requirements: 'All color belt patterns, breaking', duration: '12+ months' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-50 to-yellow-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">Training Programs</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our comprehensive Taekwon-Do programs designed for every age and skill level. 
            From beginners to black belts, we have the perfect program for your martial arts journey.
          </p>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className={`h-2 bg-gradient-to-r ${program.color}`}></div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-gray-800">{program.title}</h3>
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {program.ageGroup}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-6">{program.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Duration:</span>
                      <span className="font-semibold">{program.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Schedule:</span>
                      <span className="font-semibold text-sm">{program.schedule}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Price:</span>
                      <span className="font-bold text-red-600">{program.price}</span>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3">What You'll Learn:</h4>
                    <ul className="space-y-2">
                      {program.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600">
                          <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Link
                    to="/admission"
                    className="block w-full text-center bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200"
                  >
                    Enroll Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Belt System */}
      <section className="py-20 bg-gradient-to-r from-yellow-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">ITF Belt System</h2>
            <p className="text-xl text-gray-600">Progress through the traditional ranking system</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {belts.map((belt, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-center mb-4">
                  <div className={`w-8 h-8 rounded-full mr-3 ${
                    belt.name.includes('White') ? 'bg-gray-200 border-2 border-gray-400' :
                    belt.name.includes('Yellow') ? 'bg-yellow-400' :
                    belt.name.includes('Green') ? 'bg-green-500' :
                    belt.name.includes('Blue') ? 'bg-blue-600' :
                    belt.name.includes('Red') ? 'bg-red-600' :
                    'bg-black'
                  }`}></div>
                  <h3 className="text-lg font-bold text-gray-800">{belt.name}</h3>
                </div>
                <p className="text-gray-600 text-sm mb-3">{belt.requirements}</p>
                <p className="text-red-600 font-semibold text-sm">Typical Duration: {belt.duration}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Training Schedule */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Weekly Schedule</h2>
            <p className="text-xl text-gray-600">Find the perfect time for your training</p>
          </div>
          
          <div className="bg-gradient-to-br from-yellow-50 to-red-50 rounded-xl p-8 overflow-x-auto">
            <table className="w-full min-w-full">
              <thead>
                <tr className="border-b-2 border-red-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-800">Time</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-800">Monday</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-800">Tuesday</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-800">Wednesday</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-800">Thursday</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-800">Friday</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-800">Saturday</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-red-100">
                  <td className="py-3 px-4 font-semibold">9:00 AM</td>
                  <td className="py-3 px-4">-</td>
                  <td className="py-3 px-4 bg-pink-100 rounded">Women's Self-Defense</td>
                  <td className="py-3 px-4">-</td>
                  <td className="py-3 px-4 bg-pink-100 rounded">Women's Self-Defense</td>
                  <td className="py-3 px-4">-</td>
                  <td className="py-3 px-4 bg-purple-100 rounded">Competition Team</td>
                </tr>
                <tr className="border-b border-red-100">
                  <td className="py-3 px-4 font-semibold">4:00 PM</td>
                  <td className="py-3 px-4 bg-yellow-100 rounded">Little Warriors</td>
                  <td className="py-3 px-4">-</td>
                  <td className="py-3 px-4 bg-yellow-100 rounded">Little Warriors</td>
                  <td className="py-3 px-4">-</td>
                  <td className="py-3 px-4 bg-yellow-100 rounded">Little Warriors</td>
                  <td className="py-3 px-4">-</td>
                </tr>
                <tr className="border-b border-red-100">
                  <td className="py-3 px-4 font-semibold">5:00 PM</td>
                  <td className="py-3 px-4">-</td>
                  <td className="py-3 px-4 bg-blue-100 rounded">Junior Program</td>
                  <td className="py-3 px-4">-</td>
                  <td className="py-3 px-4 bg-blue-100 rounded">Junior Program</td>
                  <td className="py-3 px-4">-</td>
                  <td className="py-3 px-4 bg-blue-100 rounded">Junior Program</td>
                </tr>
                <tr className="border-b border-red-100">
                  <td className="py-3 px-4 font-semibold">6:00 PM</td>
                  <td className="py-3 px-4 bg-green-100 rounded">Teen Program</td>
                  <td className="py-3 px-4 bg-green-100 rounded">Teen Program</td>
                  <td className="py-3 px-4 bg-green-100 rounded">Teen Program</td>
                  <td className="py-3 px-4 bg-green-100 rounded">Teen Program</td>
                  <td className="py-3 px-4 bg-green-100 rounded">Teen Program</td>
                  <td className="py-3 px-4 bg-green-100 rounded">Teen Program</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold">7:30 PM</td>
                  <td className="py-3 px-4 bg-red-100 rounded">Adult Program</td>
                  <td className="py-3 px-4 bg-red-100 rounded">Adult Program</td>
                  <td className="py-3 px-4 bg-red-100 rounded">Adult Program</td>
                  <td className="py-3 px-4 bg-red-100 rounded">Adult Program</td>
                  <td className="py-3 px-4 bg-red-100 rounded">Adult Program</td>
                  <td className="py-3 px-4 bg-red-100 rounded">Adult Program</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-500 to-red-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Your Training?</h2>
          <p className="text-xl text-red-100 mb-8">
            Choose the program that's right for you and begin your martial arts journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/admission"
              className="bg-white text-red-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Enroll Now
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-red-600 transition-all duration-200"
            >
              Schedule a Visit
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Courses;