function About() {
  const instructors = [
    {
      name: 'Sabum Nim Ravi Kumar',
      title: 'Chief Instructor & Founder',
      belt: '5th Dan Black Belt ITF',
      experience: '20+ Years',
      specialization: 'ITF Patterns & Traditional Forms',
      image: '🥋'
    },
    {
      name: 'Sabum Nim Deepa Rao',
      title: 'Senior Instructor',
      belt: '3rd Dan Black Belt ITF',
      experience: '12+ Years',
      specialization: 'Children Programs & Breaking Techniques',
      image: '🥋'
    },
    {
      name: 'Boosabum Nim Arjun Shetty',
      title: 'Assistant Instructor',
      belt: '1st Dan Black Belt ITF',
      experience: '6+ Years',
      specialization: 'Sparring & Self-Defense',
      image: '🥋'
    }
  ];

  const achievements = [
    { year: '2024', title: 'Karnataka State ITF Championship', count: '8 Gold, 12 Silver' },
    { year: '2023', title: 'South India ITF Tournament', count: '5 Gold Medals' },
    { year: '2022', title: 'ITF India Grading Success', count: '95% Pass Rate' },
    { year: '2021', title: 'Best Dojang Award', count: 'ITF India Recognition' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-yellow-100 to-red-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-800 mb-6">About Combat Warrior Taekwon-Do</h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Authentic ITF Taekwon-Do training in Karnataka, preserving the traditional 
              martial art founded by General Choi Hong Hi while building strong character 
              and physical fitness in our students.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Dojang Story</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Established in 2010, Combat Warrior Taekwon-Do Association of Karnataka 
                  was founded with the vision of bringing authentic International Taekwon-Do 
                  Federation (ITF) training to Karnataka. Our dojang follows the original 
                  teachings of General Choi Hong Hi, the founder of Taekwon-Do.
                </p>
                <p>
                  Starting with just 8 dedicated students in a small training hall in Bangalore, 
                  we have grown to serve over 300 active practitioners across Karnataka. 
                  Our commitment to traditional ITF curriculum includes all 24 patterns 
                  (Tul), fundamental movements, sparring, and breaking techniques.
                </p>
                <p>
                  We are affiliated with ITF India and regularly participate in national 
                  and international seminars, gradings, and tournaments. Our students 
                  have successfully graded up to 3rd Dan Black Belt under certified 
                  ITF masters and international instructors.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-yellow-200 to-red-200 rounded-2xl p-8 border-4 border-yellow-400">
                <img 
                  src="/combat-warrior-logo.png" 
                  alt="Combat Warrior ITF Taekwon-Do Logo" 
                  className="w-full h-auto max-w-md mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gradient-to-r from-yellow-100 to-red-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-yellow-500">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h3>
              <p className="text-gray-700">
                To preserve and teach authentic ITF Taekwon-Do as established by General Choi Hong Hi, 
                developing physical fitness, mental discipline, and moral character. We aim to create 
                confident martial artists who embody the tenets of Taekwon-Do: Courtesy, Integrity, 
                Perseverance, Self-Control, and Indomitable Spirit.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-red-600">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h3>
              <p className="text-gray-700">
                To be Karnataka's leading ITF Taekwon-Do institution, recognized for excellence 
                in traditional martial arts education and character development. We strive to 
                produce skilled practitioners who can represent India in international ITF 
                competitions and seminars.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values - ITF Tenets */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">The Five Tenets of Taekwon-Do</h2>
            <p className="text-xl text-gray-700">The fundamental principles that guide every ITF practitioner</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {[
              { title: 'Courtesy', korean: '예의 (Ye Ui)', description: 'Respect and politeness towards others', icon: '🙏', color: 'bg-yellow-100 border-yellow-400' },
              { title: 'Integrity', korean: '염치 (Yom Chi)', description: 'Honesty and moral uprightness', icon: '💎', color: 'bg-red-100 border-red-400' },
              { title: 'Perseverance', korean: '인내 (In Nae)', description: 'Persistence in achieving goals', icon: '💪', color: 'bg-yellow-100 border-yellow-400' },
              { title: 'Self-Control', korean: '극기 (Guk Gi)', description: 'Discipline over mind and body', icon: '🧘', color: 'bg-red-100 border-red-400' },
              { title: 'Indomitable Spirit', korean: '백절불굴 (Baekjul Boolgool)', description: 'Unbreakable will and courage', icon: '🔥', color: 'bg-yellow-100 border-yellow-400' }
            ].map((tenet, index) => (
              <div key={index} className={`text-center p-6 rounded-xl ${tenet.color} border-2 hover:shadow-lg transition-all duration-200`}>
                <div className="text-4xl mb-4">{tenet.icon}</div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">{tenet.title}</h3>
                <p className="text-sm text-red-600 font-semibold mb-2">{tenet.korean}</p>
                <p className="text-sm text-gray-700">{tenet.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructors Section */}
      <section className="py-20 bg-gradient-to-r from-red-100 to-yellow-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our ITF Certified Instructors</h2>
            <p className="text-xl text-gray-700">Learn from qualified masters trained in authentic ITF curriculum</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {instructors.map((instructor, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-200 border-t-4 border-yellow-500">
                <div className="text-6xl mb-4">{instructor.image}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{instructor.name}</h3>
                <p className="text-red-600 font-bold mb-1">{instructor.title}</p>
                <p className="text-yellow-600 font-semibold text-sm mb-4">{instructor.belt}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Experience:</span>
                    <span className="font-semibold text-gray-800">{instructor.experience}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Specialization:</span>
                    <span className="font-semibold text-gray-800">{instructor.specialization}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Tournament Achievements</h2>
            <p className="text-xl text-gray-700">Celebrating our students' success in ITF competitions</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-gradient-to-br from-yellow-100 to-red-100 hover:from-yellow-200 hover:to-red-200 transition-all duration-200 border-2 border-yellow-300">
                <div className="text-2xl font-bold text-red-600 mb-2">{achievement.year}</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{achievement.title}</h3>
                <p className="text-yellow-700 font-semibold">{achievement.count}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ITF Affiliation */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-yellow-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">ITF Certified Training</h2>
          <p className="text-xl text-yellow-100 mb-8">
            We are proud members of the International Taekwon-Do Federation (ITF), 
            ensuring authentic and standardized training according to General Choi Hong Hi's 
            original teachings and philosophy. Our curriculum includes all 24 ITF patterns, 
            fundamental movements, sparring techniques, and breaking methods.
          </p>
          <div className="bg-white bg-opacity-20 rounded-xl p-8 backdrop-blur-sm border-2 border-yellow-300">
            <p className="text-white text-lg font-semibold mb-4">
              "The ultimate aim of Taekwon-Do lies not in winning or losing, 
              but in the perfection of the character of its participants."
            </p>
            <p className="text-yellow-200 font-medium">- General Choi Hong Hi, Founder of ITF Taekwon-Do</p>
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <h4 className="font-bold text-lg mb-2">24 ITF Patterns</h4>
              <p className="text-sm">Complete Tul curriculum from Chon-Ji to Tong-Il</p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <h4 className="font-bold text-lg mb-2">Authentic Techniques</h4>
              <p className="text-sm">Traditional ITF fundamental movements and applications</p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <h4 className="font-bold text-lg mb-2">International Standards</h4>
              <p className="text-sm">Grading and competition rules as per ITF guidelines</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;