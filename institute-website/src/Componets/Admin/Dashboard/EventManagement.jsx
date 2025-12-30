import { useState } from 'react';

function EventManagement() {
  const [events] = useState([
    {
      id: 'EVT001',
      name: 'Karnataka State Championship',
      type: 'Tournament',
      date: '2024-03-15',
      time: '09:00',
      venue: 'Sports Complex, Bangalore',
      description: 'Annual state-level Taekwon-do championship for all belt levels',
      registrationFee: 500,
      maxParticipants: 200,
      registeredCount: 45,
      status: 'Open',
      organizer: 'Combat Warrior Academy'
    },
    {
      id: 'EVT002',
      name: 'Belt Grading Examination',
      type: 'Examination',
      date: '2024-02-28',
      time: '10:00',
      venue: 'Academy Main Hall',
      description: 'Quarterly belt promotion examination for eligible students',
      registrationFee: 300,
      maxParticipants: 50,
      registeredCount: 32,
      status: 'Open',
      organizer: 'Master Instructor'
    },
    {
      id: 'EVT003',
      name: 'Self-Defense Workshop',
      type: 'Workshop',
      date: '2024-02-20',
      time: '14:00',
      venue: 'Academy Training Hall',
      description: 'Special workshop on practical self-defense techniques for beginners',
      registrationFee: 200,
      maxParticipants: 30,
      registeredCount: 28,
      status: 'Almost Full',
      organizer: 'Senior Instructors'
    },
    {
      id: 'EVT004',
      name: 'Annual Sports Day',
      type: 'Sports Day',
      date: '2024-01-30',
      time: '08:00',
      venue: 'School Grounds',
      description: 'Fun-filled sports day with various martial arts demonstrations',
      registrationFee: 0,
      maxParticipants: 100,
      registeredCount: 100,
      status: 'Completed',
      organizer: 'Academy Staff'
    }
  ]);

  const [participants] = useState([
    { eventId: 'EVT001', studentId: 'STU001', studentName: 'Rahul Kumar', belt: 'Yellow', registrationDate: '2024-01-20' },
    { eventId: 'EVT001', studentId: 'STU002', studentName: 'Priya Sharma', belt: 'Green', registrationDate: '2024-01-21' },
    { eventId: 'EVT002', studentId: 'STU003', studentName: 'Amit Singh', belt: 'Blue', registrationDate: '2024-01-22' },
    { eventId: 'EVT003', studentId: 'STU004', studentName: 'Sneha Patel', belt: 'White', registrationDate: '2024-01-23' },
  ]);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showParticipantsModal, setShowParticipantsModal] = useState(false);

  const getStatusColor = (status) => {
    const colors = {
      'Open': 'bg-green-100 text-green-800',
      'Almost Full': 'bg-yellow-100 text-yellow-800',
      'Full': 'bg-red-100 text-red-800',
      'Completed': 'bg-gray-100 text-gray-800',
      'Cancelled': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getTypeIcon = (type) => {
    const icons = {
      'Tournament': '🏆',
      'Examination': '📝',
      'Workshop': '🎯',
      'Sports Day': '🎪',
      'Seminar': '🎓'
    };
    return icons[type] || '📅';
  };

  const viewParticipants = (event) => {
    setSelectedEvent(event);
    setShowParticipantsModal(true);
  };

  const eventParticipants = selectedEvent 
    ? participants.filter(p => p.eventId === selectedEvent.id)
    : [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black text-slate-800 mb-2">Event Management</h1>
          <p className="text-slate-600">Organize tournaments, workshops, and academy events</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-700 transition-all duration-300 flex items-center space-x-2"
        >
          <span>➕</span>
          <span>Create Event</span>
        </button>
      </div>

      {/* Event Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 text-center">
          <div className="text-3xl font-black text-blue-600 mb-2">{events.length}</div>
          <div className="text-slate-600 font-medium">Total Events</div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 text-center">
          <div className="text-3xl font-black text-green-600 mb-2">
            {events.filter(e => e.status === 'Open' || e.status === 'Almost Full').length}
          </div>
          <div className="text-slate-600 font-medium">Active Events</div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 text-center">
          <div className="text-3xl font-black text-amber-600 mb-2">
            {participants.length}
          </div>
          <div className="text-slate-600 font-medium">Total Registrations</div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 text-center">
          <div className="text-3xl font-black text-purple-600 mb-2">
            ₹{events.reduce((sum, e) => sum + (e.registrationFee * e.registeredCount), 0).toLocaleString()}
          </div>
          <div className="text-slate-600 font-medium">Revenue Generated</div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="text-3xl">{getTypeIcon(event.type)}</div>
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">{event.name}</h3>
                  <p className="text-slate-500 text-sm">{event.type}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(event.status)}`}>
                {event.status}
              </span>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-2 text-sm text-slate-600">
                <span>📅</span>
                <span>{event.date} at {event.time}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-slate-600">
                <span>📍</span>
                <span>{event.venue}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-slate-600">
                <span>👥</span>
                <span>{event.registeredCount}/{event.maxParticipants} participants</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-slate-600">
                <span>💰</span>
                <span>{event.registrationFee === 0 ? 'Free' : `₹${event.registrationFee}`}</span>
              </div>
            </div>

            <p className="text-slate-600 text-sm mb-6 line-clamp-2">{event.description}</p>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-slate-600 mb-2">
                <span>Registration Progress</span>
                <span>{Math.round((event.registeredCount / event.maxParticipants) * 100)}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-amber-500 to-orange-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(event.registeredCount / event.maxParticipants) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="flex space-x-2">
              <button 
                onClick={() => viewParticipants(event)}
                className="flex-1 bg-blue-500 text-white py-2 px-3 rounded-lg hover:bg-blue-600 transition-colors text-sm font-semibold"
              >
                View Participants
              </button>
              <button className="flex-1 bg-slate-500 text-white py-2 px-3 rounded-lg hover:bg-slate-600 transition-colors text-sm font-semibold">
                Edit Event
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
        <h3 className="text-xl font-bold text-slate-800 mb-6">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 text-center">
            <div className="text-2xl mb-2">🏆</div>
            <div className="font-semibold">Create Tournament</div>
          </button>
          
          <button className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 text-center">
            <div className="text-2xl mb-2">📝</div>
            <div className="font-semibold">Schedule Exam</div>
          </button>
          
          <button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300 text-center">
            <div className="text-2xl mb-2">🎯</div>
            <div className="font-semibold">Plan Workshop</div>
          </button>
          
          <button className="bg-gradient-to-r from-amber-500 to-orange-600 text-white p-4 rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all duration-300 text-center">
            <div className="text-2xl mb-2">📊</div>
            <div className="font-semibold">Event Reports</div>
          </button>
        </div>
      </div>

      {/* Create Event Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-800">Create New Event</h2>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="text-slate-500 hover:text-slate-700 text-2xl"
              >
                ✕
              </button>
            </div>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Event Name</label>
                  <input type="text" className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Event Type</label>
                  <select className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500">
                    <option>Tournament</option>
                    <option>Examination</option>
                    <option>Workshop</option>
                    <option>Sports Day</option>
                    <option>Seminar</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Date</label>
                  <input type="date" className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Time</label>
                  <input type="time" className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Registration Fee</label>
                  <input type="number" placeholder="0" className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Max Participants</label>
                  <input type="number" placeholder="50" className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Venue</label>
                <input type="text" className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500" />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
                <textarea rows="4" className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"></textarea>
              </div>
              
              <div className="flex space-x-4">
                <button 
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 bg-slate-300 text-slate-700 py-3 rounded-xl font-semibold hover:bg-slate-400 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-amber-500 to-orange-600 text-white py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-700 transition-all duration-300"
                >
                  Create Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Participants Modal */}
      {showParticipantsModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-800">Event Participants - {selectedEvent.name}</h2>
              <button 
                onClick={() => setShowParticipantsModal(false)}
                className="text-slate-500 hover:text-slate-700 text-2xl"
              >
                ✕
              </button>
            </div>
            
            <div className="mb-6 p-4 bg-slate-50 rounded-xl">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-slate-800">{eventParticipants.length}</div>
                  <div className="text-slate-600 text-sm">Registered</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">{selectedEvent.maxParticipants - eventParticipants.length}</div>
                  <div className="text-slate-600 text-sm">Available</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">₹{(selectedEvent.registrationFee * eventParticipants.length).toLocaleString()}</div>
                  <div className="text-slate-600 text-sm">Revenue</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">{Math.round((eventParticipants.length / selectedEvent.maxParticipants) * 100)}%</div>
                  <div className="text-slate-600 text-sm">Filled</div>
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left py-3 px-4 font-bold text-slate-800">Student ID</th>
                    <th className="text-left py-3 px-4 font-bold text-slate-800">Name</th>
                    <th className="text-left py-3 px-4 font-bold text-slate-800">Belt Level</th>
                    <th className="text-left py-3 px-4 font-bold text-slate-800">Registration Date</th>
                    <th className="text-left py-3 px-4 font-bold text-slate-800">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {eventParticipants.map((participant, index) => (
                    <tr key={participant.studentId} className={`border-b border-slate-100 ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                      <td className="py-3 px-4 font-semibold text-slate-800">{participant.studentId}</td>
                      <td className="py-3 px-4 text-slate-700">{participant.studentName}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-semibold">
                          {participant.belt} Belt
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-600">{participant.registrationDate}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                          Confirmed
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EventManagement;