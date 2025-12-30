function Contact() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-6">
            Get In <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">Touch</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
            Ready to start your martial arts journey? Have questions about our programs? 
            We're here to help you every step of the way.
          </p>
        </div>
      </section>

      <div className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div>
              <div className="bg-white rounded-3xl p-12 shadow-2xl">
                <h2 className="text-3xl font-black text-slate-800 mb-8">Contact Information</h2>
                
                <div className="space-y-8">
                  <div className="flex items-start space-x-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 mb-2">Academy Location</h3>
                      <p className="text-slate-600 leading-relaxed">
                        Combat Warrior Taekwon-do Association<br />
                        Karnataka, India<br />
                        <span className="text-sm text-slate-500">Exact address provided upon enrollment</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 mb-2">Phone Number</h3>
                      <p className="text-slate-600 text-lg font-semibold">+91 9019157225</p>
                      <p className="text-slate-500 text-sm">Available 9:00 AM - 8:00 PM</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 mb-2">Email Address</h3>
                      <p className="text-slate-600 text-lg">hello@parnetsgroup.com</p>
                      <p className="text-slate-500 text-sm">We respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 mb-2">Training Schedule</h3>
                      <div className="text-slate-600">
                        <p className="mb-1"><strong>Monday - Friday:</strong> 6:00 AM - 8:00 PM</p>
                        <p><strong>Saturday - Sunday:</strong> 8:00 AM - 6:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-12 pt-8 border-t-2 border-slate-100">
                  <h3 className="text-xl font-bold text-slate-800 mb-6">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button className="bg-gradient-to-r from-amber-500 to-orange-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-700 transition-all duration-300 text-sm">
                      Schedule Visit
                    </button>
                    <button className="border-2 border-slate-300 text-slate-700 py-3 px-4 rounded-xl font-semibold hover:bg-slate-50 transition-all duration-300 text-sm">
                      Download Brochure
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-8 text-white">
                <h2 className="text-3xl font-bold mb-2">Send us a Message</h2>
                <p className="text-slate-300">We'll get back to you as soon as possible</p>
              </div>
              
              <form className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                </div>

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
                    Inquiry Type *
                  </label>
                  <select className="w-full px-4 py-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300">
                    <option value="">Select inquiry type</option>
                    <option value="admission">Admission Information</option>
                    <option value="courses">Course Details</option>
                    <option value="schedule">Class Schedules</option>
                    <option value="fees">Fee Structure</option>
                    <option value="trial">Trial Class</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">
                    Message *
                  </label>
                  <textarea
                    rows="6"
                    className="w-full px-4 py-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell us about your interest in Taekwon-do, any specific questions, or how we can help you..."
                  ></textarea>
                </div>

                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    className="w-5 h-5 text-amber-500 border-2 border-slate-300 rounded focus:ring-amber-500 mt-1"
                  />
                  <label className="text-sm text-slate-600">
                    I agree to receive communications about programs, events, and updates from Combat Warrior Taekwon-do Academy.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-4 rounded-xl font-bold text-lg hover:from-amber-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-24 bg-white rounded-3xl p-12 shadow-2xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black text-slate-800 mb-6">
                Frequently Asked <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">Questions</span>
              </h2>
              <p className="text-xl text-slate-600">Quick answers to common questions about our academy</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-slate-50 p-6 rounded-2xl">
                <h4 className="font-bold text-slate-800 mb-3">What age groups do you accept?</h4>
                <p className="text-slate-600">We welcome students from 6 years old to adults. Our programs are designed for all age groups and fitness levels.</p>
              </div>
              
              <div className="bg-slate-50 p-6 rounded-2xl">
                <h4 className="font-bold text-slate-800 mb-3">Do I need prior experience?</h4>
                <p className="text-slate-600">No prior experience is required. Our Foundation Level program is perfect for complete beginners.</p>
              </div>
              
              <div className="bg-slate-50 p-6 rounded-2xl">
                <h4 className="font-bold text-slate-800 mb-3">What should I bring to class?</h4>
                <p className="text-slate-600">Just comfortable workout clothes and a water bottle. We provide all necessary equipment for beginners.</p>
              </div>
              
              <div className="bg-slate-50 p-6 rounded-2xl">
                <h4 className="font-bold text-slate-800 mb-3">Can I try a class before enrolling?</h4>
                <p className="text-slate-600">Yes! We offer free trial classes so you can experience our training before making a commitment.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;