function Admission() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center bg-green-500/20 border border-green-500/30 text-green-400 px-6 py-3 rounded-full text-sm font-semibold mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></span>
            Admissions Now Open - Limited Seats Available
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6">
            Join <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">Combat Warrior</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
            Begin your martial arts journey with Karnataka's premier Taekwon-do academy. 
            Complete the application below to secure your spot.
          </p>
        </div>
      </section>

      <div className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Form Header */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-8 text-white text-center">
              <h2 className="text-3xl font-bold mb-2">Student Admission Application</h2>
              <p className="text-slate-300">All fields marked with * are required</p>
            </div>

            <form className="p-12 space-y-10">
              {/* Personal Information */}
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-sm">1</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800">Personal Information</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your complete name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3">
                      Gender *
                    </label>
                    <select className="w-full px-4 py-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300">
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-sm">2</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800">Contact Information</h3>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3">
                      Complete Address *
                    </label>
                    <textarea
                      rows="4"
                      className="w-full px-4 py-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="Enter your complete address with city, state, and pincode"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Course Selection */}
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-sm">3</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800">Course Selection</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3">
                      Training Level *
                    </label>
                    <select className="w-full px-4 py-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300">
                      <option value="">Select Your Level</option>
                      <option value="beginner">Foundation Level (Beginner)</option>
                      <option value="intermediate">Advanced Skills (Intermediate)</option>
                      <option value="advanced">Master Level (Advanced)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3">
                      Preferred Schedule
                    </label>
                    <select className="w-full px-4 py-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300">
                      <option value="">Select Schedule</option>
                      <option value="morning">Morning Sessions (6:00 AM - 8:00 AM)</option>
                      <option value="evening">Evening Sessions (6:00 PM - 8:00 PM)</option>
                      <option value="weekend">Weekend Only (Sat-Sun)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-sm">4</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800">Emergency Contact</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3">
                      Emergency Contact Name *
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                      placeholder="Parent/Guardian name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3">
                      Emergency Contact Phone *
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-700 mb-3">
                      Relationship to Student *
                    </label>
                    <select className="w-full px-4 py-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300">
                      <option value="">Select Relationship</option>
                      <option value="parent">Parent</option>
                      <option value="guardian">Guardian</option>
                      <option value="sibling">Sibling</option>
                      <option value="spouse">Spouse</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Medical Information */}
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-sm">5</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800">Medical Information</h3>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">
                    Any Medical Conditions or Injuries (Optional)
                  </label>
                  <textarea
                    rows="3"
                    className="w-full px-4 py-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Please mention any medical conditions, injuries, or physical limitations we should be aware of"
                  ></textarea>
                </div>
              </div>

              {/* Terms and Submit */}
              <div className="border-t-2 border-slate-200 pt-8">
                <div className="flex items-start space-x-3 mb-8">
                  <input
                    type="checkbox"
                    className="w-5 h-5 text-amber-500 border-2 border-slate-300 rounded focus:ring-amber-500 mt-1"
                  />
                  <label className="text-sm text-slate-600 leading-relaxed">
                    I agree to the terms and conditions, understand the training requirements, 
                    and acknowledge that martial arts training involves physical activity and inherent risks. 
                    I consent to emergency medical treatment if necessary.
                  </label>
                </div>
                
                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-12 py-4 rounded-xl font-bold text-lg hover:from-amber-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-300 shadow-2xl"
                  >
                    Submit Application
                  </button>
                  <p className="text-sm text-slate-500 mt-4">
                    We'll contact you within 24 hours to confirm your application
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admission;