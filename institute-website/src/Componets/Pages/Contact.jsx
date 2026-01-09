import img from '../../assets/img.jpg';
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaClock, 
  FaPaperPlane,
  FaUser,
  FaQuestionCircle,
  FaCheckCircle
} from 'react-icons/fa';

function Contact() {
  return (
    <div>
      {/* Hero Section */}
      <section 
        className="relative py-24 min-h-[60vh] flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url(${img})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'scroll'
        }}
      >
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Get In <span className="text-red-400">Touch</span>
          </h1>
          <p className="text-lg md:text-xl text-white max-w-4xl mx-auto leading-relaxed">
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
              <div className="bg-white rounded-3xl p-12 shadow-2xl transform hover:scale-105 hover:rotate-1 transition-all duration-500"
                   style={{
                     transform: 'rotateX(5deg) rotateY(5deg)',
                     transformStyle: 'preserve-3d'
                   }}>
                <h2 className="text-3xl font-bold text-black mb-8">Contact Information</h2>
                
                <div className="space-y-8">
                  <div className="flex items-start space-x-6 group">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                      <FaMapMarkerAlt className="w-8 h-8 text-white" />
                    </div>
                    <div className="transform group-hover:translate-x-2 transition-transform duration-300">
                      <h3 className="text-xl font-bold text-black mb-2">Academy Location</h3>
                      <p className="text-base text-gray-700 leading-relaxed">
                        Combat Warrior Taekwon-do Association<br />
                        Karnataka, India<br />
                        <span className="text-sm text-slate-500">Exact address provided upon enrollment</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-6 group">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                      <FaPhone className="w-8 h-8 text-white" />
                    </div>
                    <div className="transform group-hover:translate-x-2 transition-transform duration-300">
                      <h3 className="text-xl font-bold text-black mb-2">Phone Number</h3>
                      <p className="text-base text-gray-700 text-lg font-semibold">+91 9019157225</p>
                      <p className="text-base text-gray-700 text-sm">Available 9:00 AM - 8:00 PM</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-6 group">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                      <FaEnvelope className="w-8 h-8 text-white" />
                    </div>
                    <div className="transform group-hover:translate-x-2 transition-transform duration-300">
                      <h3 className="text-xl font-bold text-black mb-2">Email Address</h3>
                      <p className="text-base text-gray-700 text-lg">hello@parnetsgroup.com</p>
                      <p className="text-base text-gray-700 text-sm">We respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-6 group">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                      <FaClock className="w-8 h-8 text-white" />
                    </div>
                    <div className="transform group-hover:translate-x-2 transition-transform duration-300">
                      <h3 className="text-xl font-bold text-black mb-2">Training Schedule</h3>
                      <div className="text-base text-gray-700">
                        <p className="mb-1"><strong>Monday - Friday:</strong> 6:00 AM - 8:00 PM</p>
                        <p><strong>Saturday - Sunday:</strong> 8:00 AM - 6:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-8 text-white">
                <h2 className="text-3xl font-bold mb-2 text-white">Send us a Message</h2>
                <p className="text-base text-slate-300">We'll get back to you as soon as possible</p>
              </div>
              
              <form className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    rows="4"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 resize-none"
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
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-4 rounded-xl font-bold text-lg hover:from-amber-600 hover:to-orange-700 transform hover:scale-105 hover:rotate-1 transition-all duration-500 shadow-lg group"
                  style={{
                    transform: 'rotateX(5deg)',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <span className="flex items-center justify-center">
                    <FaPaperPlane className="mr-2 group-hover:animate-bounce" />
                    Send Message
                  </span>
                </button>
              </form>
            </div>
          </div>

          {/* Google Map Section */}
          <div className="mt-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-black mb-6">
                Find <span className="text-red-600">Our</span> <span className="text-yellow-600">Location</span>
              </h2>
              <p className="text-base text-gray-700">Visit our dojang and experience authentic Taekwon-Do training</p>
            </div>
            
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="h-96 bg-gray-200 flex items-center justify-center">
                {/* Google Map Embed - Replace with actual Google Maps embed code */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.886539092!2d77.49085452148641!3d12.953945614117967!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1703123456789!5m2!1sen!2sin"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-96"
                  title="Combat Warrior Taekwon-Do Location"
                ></iframe>
              </div>
              
             
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-24 bg-white rounded-3xl p-12 shadow-2xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-black mb-6">
                Frequently Asked <span className="text-red-600">Questions</span>
              </h2>
              <p className="text-base text-gray-700">Quick answers to common questions about our academy</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-slate-50 p-6 rounded-2xl transform hover:scale-105 hover:rotate-1 transition-all duration-500 group"
                   style={{
                     transform: 'rotateX(5deg)',
                     transformStyle: 'preserve-3d'
                   }}>
                <div className="flex items-center mb-3">
                  <FaUser className="text-amber-500 mr-2 group-hover:animate-bounce" />
                  <h4 className="font-bold text-black">What age groups do you accept?</h4>
                </div>
                <p className="text-base text-gray-700">We welcome students from 6 years old to adults. Our programs are designed for all age groups and fitness levels.</p>
              </div>
              
              <div className="bg-slate-50 p-6 rounded-2xl transform hover:scale-105 hover:-rotate-1 transition-all duration-500 group"
                   style={{
                     transform: 'rotateX(-5deg)',
                     transformStyle: 'preserve-3d'
                   }}>
                <div className="flex items-center mb-3">
                  <FaQuestionCircle className="text-amber-500 mr-2 group-hover:animate-pulse" />
                  <h4 className="font-bold text-black">Do I need prior experience?</h4>
                </div>
                <p className="text-base text-gray-700">No prior experience is required. Our Foundation Level program is perfect for complete beginners.</p>
              </div>
              
              <div className="bg-slate-50 p-6 rounded-2xl transform hover:scale-105 hover:rotate-1 transition-all duration-500 group"
                   style={{
                     transform: 'rotateX(5deg)',
                     transformStyle: 'preserve-3d'
                   }}>
                <div className="flex items-center mb-3">
                  <FaCheckCircle className="text-amber-500 mr-2 group-hover:animate-spin" />
                  <h4 className="font-bold text-black">What should I bring to class?</h4>
                </div>
                <p className="text-base text-gray-700">Just comfortable workout clothes and a water bottle. We provide all necessary equipment for beginners.</p>
              </div>
              
              <div className="bg-slate-50 p-6 rounded-2xl transform hover:scale-105 hover:-rotate-1 transition-all duration-500 group"
                   style={{
                     transform: 'rotateX(-5deg)',
                     transformStyle: 'preserve-3d'
                   }}>
                <div className="flex items-center mb-3">
                  <FaCheckCircle className="text-amber-500 mr-2 group-hover:animate-bounce" />
                  <h4 className="font-bold text-black">Can I try a class before enrolling?</h4>
                </div>
                <p className="text-base text-gray-700">Yes! We offer free trial classes so you can experience our training before making a commitment.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;