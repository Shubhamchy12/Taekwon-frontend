import { useState } from 'react';
import { 
  FaMedal, 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaHistory,
  FaAward,
  FaUsers,
  FaCalendarAlt,
  FaCheckCircle
} from 'react-icons/fa';

function BeltManagement() {
  const [activeTab, setActiveTab] = useState('levels');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPromotionModal, setShowPromotionModal] = useState(false);
  const [showTestModal, setShowTestModal] = useState(false);
  const [beltForm, setBeltForm] = useState({
    name: '',
    level: '',
    color: 'white',
    requirements: ['']
  });

  // Predefined belt colors with names
  const beltColors = [
    { name: 'White', value: 'white', hex: '#FFFFFF' },
    { name: 'Yellow', value: 'yellow', hex: '#FFD700' },
    { name: 'Orange', value: 'orange', hex: '#FFA500' },
    { name: 'Green', value: 'green', hex: '#008000' },
    { name: 'Blue', value: 'blue', hex: '#0000FF' },
    { name: 'Purple', value: 'purple', hex: '#800080' },
    { name: 'Brown', value: 'brown', hex: '#8B4513' },
    { name: 'Red', value: 'red', hex: '#FF0000' },
    { name: 'Black', value: 'black', hex: '#000000' }
  ];

  const [promotionForm, setPromotionForm] = useState({
    studentName: '',
    fromBelt: '',
    toBelt: '',
    date: '',
    instructor: ''
  });
  const [testForm, setTestForm] = useState({
    studentName: '',
    currentBelt: '',
    testingFor: '',
    testDate: '',
    readiness: ''
  });

  // Sample data - replace with actual API calls
  const beltLevels = [
    { id: 1, name: 'White Belt', level: 1, color: 'white', hex: '#FFFFFF', students: 45, requirements: ['Basic stances', 'Basic blocks', 'Basic kicks'] },
    { id: 2, name: 'Yellow Belt', level: 2, color: 'yellow', hex: '#FFD700', students: 38, requirements: ['Pattern Chon-Ji', 'Self-defense basics', 'Breaking techniques'] },
    { id: 3, name: 'Green Belt', level: 3, color: 'green', hex: '#008000', students: 32, requirements: ['Pattern Dan-Gun', 'Advanced kicks', 'Sparring basics'] },
    { id: 4, name: 'Blue Belt', level: 4, color: 'blue', hex: '#0000FF', students: 28, requirements: ['Pattern Do-San', 'Advanced patterns', 'Competition rules'] },
    { id: 5, name: 'Red Belt', level: 5, color: 'red', hex: '#FF0000', students: 22, requirements: ['Pattern Won-Hyo', 'Advanced sparring', 'Teaching basics'] },
    { id: 6, name: 'Black Belt 1st Dan', level: 6, color: 'black', hex: '#000000', students: 18, requirements: ['Pattern Yul-Gok', 'Advanced techniques', 'Leadership skills'] },
    { id: 7, name: 'Black Belt 2nd Dan', level: 7, color: 'black', hex: '#000000', students: 12, requirements: ['Pattern Joong-Gun', 'Master techniques', 'Instructor training'] },
    { id: 8, name: 'Black Belt 3rd Dan', level: 8, color: 'black', hex: '#000000', students: 8, requirements: ['Pattern Toi-Gye', 'Expert techniques', 'Advanced instruction'] }
  ];

  const recentPromotions = [
    { id: 1, studentName: 'John Smith', fromBelt: 'Yellow Belt', toBelt: 'Green Belt', date: '2024-01-15', instructor: 'Master Kim' },
    { id: 2, studentName: 'Sarah Johnson', fromBelt: 'White Belt', toBelt: 'Yellow Belt', date: '2024-01-14', instructor: 'Master Lee' },
    { id: 3, studentName: 'Mike Wilson', fromBelt: 'Green Belt', toBelt: 'Blue Belt', date: '2024-01-12', instructor: 'Master Kim' },
    { id: 4, studentName: 'Emily Davis', fromBelt: 'Blue Belt', toBelt: 'Red Belt', date: '2024-01-10', instructor: 'Master Park' },
    { id: 5, studentName: 'David Brown', fromBelt: 'Red Belt', toBelt: 'Black Belt 1st Dan', date: '2024-01-08', instructor: 'Grand Master' }
  ];

  const upcomingTests = [
    { id: 1, studentName: 'Lisa Anderson', currentBelt: 'Yellow Belt', testingFor: 'Green Belt', testDate: '2024-01-25', readiness: 85 },
    { id: 2, studentName: 'Tom Garcia', currentBelt: 'Green Belt', testingFor: 'Blue Belt', testDate: '2024-01-28', readiness: 92 },
    { id: 3, studentName: 'Anna Martinez', currentBelt: 'Blue Belt', testingFor: 'Red Belt', testDate: '2024-02-01', readiness: 78 },
    { id: 4, studentName: 'Chris Taylor', currentBelt: 'Red Belt', testingFor: 'Black Belt 1st Dan', testDate: '2024-02-05', readiness: 88 }
  ];

  const getBeltColor = (color, hex) => {
    return color === 'white' ? '#E5E7EB' : hex;
  };

  const getReadinessColor = (readiness) => {
    if (readiness >= 90) return 'text-green-600 bg-green-100';
    if (readiness >= 80) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const handleFormChange = (field, value) => {
    setBeltForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRequirementChange = (index, value) => {
    const newRequirements = [...beltForm.requirements];
    newRequirements[index] = value;
    setBeltForm(prev => ({
      ...prev,
      requirements: newRequirements
    }));
  };

  const addRequirement = () => {
    setBeltForm(prev => ({
      ...prev,
      requirements: [...prev.requirements, '']
    }));
  };

  const removeRequirement = (index) => {
    if (beltForm.requirements.length > 1) {
      const newRequirements = beltForm.requirements.filter((_, i) => i !== index);
      setBeltForm(prev => ({
        ...prev,
        requirements: newRequirements
      }));
    }
  };

  const resetForm = () => {
    setBeltForm({
      name: '',
      level: '',
      color: 'white',
      requirements: ['']
    });
  };

  const resetPromotionForm = () => {
    setPromotionForm({
      studentName: '',
      fromBelt: '',
      toBelt: '',
      date: '',
      instructor: ''
    });
  };

  const resetTestForm = () => {
    setTestForm({
      studentName: '',
      currentBelt: '',
      testingFor: '',
      testDate: '',
      readiness: ''
    });
  };

  const handlePromotionFormChange = (field, value) => {
    setPromotionForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTestFormChange = (field, value) => {
    setTestForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddBelt = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!beltForm.name || !beltForm.level) {
      alert('Please fill in all required fields');
      return;
    }

    // Here you would typically make an API call to save the belt
    console.log('Adding new belt:', beltForm);
    
    // Close modal and reset form
    setShowAddModal(false);
    resetForm();
    alert('Belt level added successfully!');
  };

  const handleRecordPromotion = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!promotionForm.studentName || !promotionForm.fromBelt || !promotionForm.toBelt || !promotionForm.date) {
      alert('Please fill in all required fields');
      return;
    }

    // Here you would typically make an API call to save the promotion
    console.log('Recording promotion:', promotionForm);
    
    // Close modal and reset form
    setShowPromotionModal(false);
    resetPromotionForm();
    alert('Promotion recorded successfully!');
  };

  const handleScheduleTest = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!testForm.studentName || !testForm.currentBelt || !testForm.testingFor || !testForm.testDate) {
      alert('Please fill in all required fields');
      return;
    }

    // Here you would typically make an API call to save the test
    console.log('Scheduling test:', testForm);
    
    // Close modal and reset form
    setShowTestModal(false);
    resetTestForm();
    alert('Test scheduled successfully!');
  };

  const renderBeltLevels = () => (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Total Students</p>
              <p className="text-3xl font-bold text-slate-900">203</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FaUsers className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Recent Promotions</p>
              <p className="text-3xl font-bold text-slate-900">12</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <FaAward className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Upcoming Tests</p>
              <p className="text-3xl font-bold text-slate-900">8</p>
            </div>
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
              <FaCalendarAlt className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Black Belts</p>
              <p className="text-3xl font-bold text-slate-900">38</p>
            </div>
            <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
              <FaMedal className="w-6 h-6 text-slate-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Header with Add Button */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-slate-900">Belt Level Management</h3>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <FaPlus className="w-4 h-4" />
          <span>Add Belt Level</span>
        </button>
      </div>

      {/* Belt Levels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {beltLevels.map((belt) => (
          <div key={belt.id} className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-12 h-12 rounded-full border-4 border-slate-300 flex items-center justify-center"
                  style={{ backgroundColor: getBeltColor(belt.color, belt.hex) }}
                >
                  <FaMedal className="w-6 h-6 text-slate-700" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{belt.name}</h4>
                  <p className="text-sm text-slate-500">Level {belt.level}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                  <FaEdit className="w-4 h-4" />
                </button>
                <button className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors">
                  <FaTrash className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-slate-600 mb-2">Students: <span className="font-semibold">{belt.students}</span></p>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${(belt.students / 50) * 100}%` }}
                ></div>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-700 mb-2">Requirements:</p>
              <ul className="text-xs text-slate-600 space-y-1">
                {belt.requirements.map((req, index) => (
                  <li key={index} className="flex items-center">
                    <FaCheckCircle className="w-3 h-3 text-green-500 mr-2" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  const renderPromotions = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-slate-900">Recent Promotions</h3>
        <button 
          onClick={() => setShowPromotionModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <FaPlus className="w-4 h-4" />
          <span>Record Promotion</span>
        </button>
      </div>

      {/* Promotions Table */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-slate-700">Student</th>
                <th className="text-left py-4 px-6 font-semibold text-slate-700">From</th>
                <th className="text-left py-4 px-6 font-semibold text-slate-700">To</th>
                <th className="text-left py-4 px-6 font-semibold text-slate-700">Date</th>
                <th className="text-left py-4 px-6 font-semibold text-slate-700">Instructor</th>
                <th className="text-left py-4 px-6 font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentPromotions.map((promotion) => (
                <tr key={promotion.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-slate-600">
                          {promotion.studentName.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <span className="font-medium text-slate-900">{promotion.studentName}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
                      {promotion.fromBelt}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                      {promotion.toBelt}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-600">{promotion.date}</td>
                  <td className="py-4 px-6 text-slate-600">{promotion.instructor}</td>
                  <td className="py-4 px-6">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderUpcomingTests = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-slate-900">Upcoming Belt Tests</h3>
        <button 
          onClick={() => setShowTestModal(true)}
          className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <FaCalendarAlt className="w-4 h-4" />
          <span>Schedule Test</span>
        </button>
      </div>

      {/* Tests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {upcomingTests.map((test) => (
          <div key={test.id} className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center">
                  <span className="font-semibold text-slate-600">
                    {test.studentName.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{test.studentName}</h4>
                  <p className="text-sm text-slate-500">{test.testDate}</p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getReadinessColor(test.readiness)}`}>
                {test.readiness}% Ready
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Current Belt:</span>
                <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
                  {test.currentBelt}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Testing For:</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  {test.testingFor}
                </span>
              </div>
              <div className="pt-3">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-600">Readiness</span>
                  <span className="font-semibold">{test.readiness}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      test.readiness >= 90 ? 'bg-green-500' : 
                      test.readiness >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${test.readiness}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="flex space-x-2 mt-4">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm transition-colors">
                View Progress
              </button>
              <button className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 py-2 px-4 rounded-lg text-sm transition-colors">
                Reschedule
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center">
            <FaMedal className="mr-3 text-amber-500" />
            Belt Management System
          </h1>
          <p className="text-slate-600 mt-2">Manage student belt levels, promotions, and testing schedules</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-1">
        <div className="flex space-x-1">
          {[
            { id: 'levels', name: 'Belt Levels', icon: FaMedal },
            { id: 'promotions', name: 'Promotions', icon: FaHistory },
            { id: 'tests', name: 'Upcoming Tests', icon: FaCalendarAlt }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="font-medium">{tab.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div>
        {activeTab === 'levels' && renderBeltLevels()}
        {activeTab === 'promotions' && renderPromotions()}
        {activeTab === 'tests' && renderUpcomingTests()}
      </div>

      {/* Add Belt Level Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl">
            {/* Modal Header */}
            <div className="bg-blue-600 px-6 py-4 rounded-t-xl">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">Add New Belt Level</h2>
                <button 
                  onClick={() => {
                    setShowAddModal(false);
                    resetForm();
                  }}
                  className="text-white hover:text-gray-200 text-2xl"
                >
                  ✕
                </button>
              </div>
            </div>
            
            {/* Modal Body */}
            <div className="p-6">
              <form onSubmit={handleAddBelt} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Belt Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={beltForm.name}
                      onChange={(e) => handleFormChange('name', e.target.value)}
                      placeholder="e.g., White Belt"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Belt Level <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={beltForm.level}
                      onChange={(e) => handleFormChange('level', e.target.value)}
                      placeholder="e.g., 1"
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Belt Color <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={beltForm.color}
                    onChange={(e) => handleFormChange('color', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    {beltColors.map((color) => (
                      <option key={color.value} value={color.value}>
                        {color.name} Belt
                      </option>
                    ))}
                  </select>
                  {/* Color Preview */}
                  <div className="mt-2 flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Preview:</span>
                    <div 
                      className="w-8 h-8 rounded-full border-2 border-gray-300"
                      style={{ 
                        backgroundColor: beltColors.find(c => c.value === beltForm.color)?.hex || '#FFFFFF' 
                      }}
                    ></div>
                    <span className="text-sm font-medium text-gray-700">
                      {beltColors.find(c => c.value === beltForm.color)?.name || 'White'} Belt
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Belt Requirements
                    </label>
                    <button
                      type="button"
                      onClick={addRequirement}
                      className="bg-green-500 text-white px-3 py-1 rounded-md text-sm hover:bg-green-600 transition-colors"
                    >
                      <FaPlus className="w-3 h-3 inline mr-1" />
                      Add
                    </button>
                  </div>
                  <div className="space-y-2">
                    {beltForm.requirements.map((requirement, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500 w-6">{index + 1}.</span>
                        <input
                          type="text"
                          value={requirement}
                          onChange={(e) => handleRequirementChange(index, e.target.value)}
                          placeholder={`Requirement ${index + 1}`}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {beltForm.requirements.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeRequirement(index)}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <FaTrash className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3 pt-4 border-t border-gray-200">
                  <button 
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      resetForm();
                    }}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md font-medium hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition-colors"
                  >
                    Add Belt Level
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {/* Record Promotion Modal */}
      {showPromotionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl">
            {/* Modal Header */}
            <div className="bg-green-600 px-6 py-4 rounded-t-xl">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">Record Promotion</h2>
                <button 
                  onClick={() => {
                    setShowPromotionModal(false);
                    resetPromotionForm();
                  }}
                  className="text-white hover:text-gray-200 text-2xl"
                >
                  ✕
                </button>
              </div>
            </div>
            
            {/* Modal Body */}
            <div className="p-6">
              <form onSubmit={handleRecordPromotion} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Student Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={promotionForm.studentName}
                    onChange={(e) => handlePromotionFormChange('studentName', e.target.value)}
                    placeholder="e.g., John Smith"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      From Belt <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={promotionForm.fromBelt}
                      onChange={(e) => handlePromotionFormChange('fromBelt', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select Current Belt</option>
                      <option value="White Belt">White Belt</option>
                      <option value="Yellow Belt">Yellow Belt</option>
                      <option value="Green Belt">Green Belt</option>
                      <option value="Blue Belt">Blue Belt</option>
                      <option value="Red Belt">Red Belt</option>
                      <option value="Black Belt 1st Dan">Black Belt 1st Dan</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      To Belt <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={promotionForm.toBelt}
                      onChange={(e) => handlePromotionFormChange('toBelt', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select New Belt</option>
                      <option value="Yellow Belt">Yellow Belt</option>
                      <option value="Green Belt">Green Belt</option>
                      <option value="Blue Belt">Blue Belt</option>
                      <option value="Red Belt">Red Belt</option>
                      <option value="Black Belt 1st Dan">Black Belt 1st Dan</option>
                      <option value="Black Belt 2nd Dan">Black Belt 2nd Dan</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Promotion Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={promotionForm.date}
                      onChange={(e) => handlePromotionFormChange('date', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Instructor <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={promotionForm.instructor}
                      onChange={(e) => handlePromotionFormChange('instructor', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select Instructor</option>
                      <option value="Master Kim">Master Kim</option>
                      <option value="Master Lee">Master Lee</option>
                      <option value="Master Park">Master Park</option>
                      <option value="Grand Master">Grand Master</option>
                    </select>
                  </div>
                </div>

                <div className="flex space-x-3 pt-4 border-t border-gray-200">
                  <button 
                    type="button"
                    onClick={() => {
                      setShowPromotionModal(false);
                      resetPromotionForm();
                    }}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md font-medium hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 bg-green-600 text-white py-2 rounded-md font-medium hover:bg-green-700 transition-colors"
                  >
                    Record Promotion
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Test Modal */}
      {showTestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl">
            {/* Modal Header */}
            <div className="bg-amber-600 px-6 py-4 rounded-t-xl">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">Schedule Belt Test</h2>
                <button 
                  onClick={() => {
                    setShowTestModal(false);
                    resetTestForm();
                  }}
                  className="text-white hover:text-gray-200 text-2xl"
                >
                  ✕
                </button>
              </div>
            </div>
            
            {/* Modal Body */}
            <div className="p-6">
              <form onSubmit={handleScheduleTest} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Student Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={testForm.studentName}
                      onChange={(e) => handleTestFormChange('studentName', e.target.value)}
                      placeholder="e.g., Lisa Anderson"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Current Belt <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={testForm.currentBelt}
                      onChange={(e) => handleTestFormChange('currentBelt', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select Current Belt</option>
                      <option value="White Belt">White Belt</option>
                      <option value="Yellow Belt">Yellow Belt</option>
                      <option value="Green Belt">Green Belt</option>
                      <option value="Blue Belt">Blue Belt</option>
                      <option value="Red Belt">Red Belt</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Testing For <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={testForm.testingFor}
                      onChange={(e) => handleTestFormChange('testingFor', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select Target Belt</option>
                      <option value="Yellow Belt">Yellow Belt</option>
                      <option value="Green Belt">Green Belt</option>
                      <option value="Blue Belt">Blue Belt</option>
                      <option value="Red Belt">Red Belt</option>
                      <option value="Black Belt 1st Dan">Black Belt 1st Dan</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Test Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={testForm.testDate}
                      onChange={(e) => handleTestFormChange('testDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Readiness Level (%)
                  </label>
                  <input
                    type="number"
                    value={testForm.readiness}
                    onChange={(e) => handleTestFormChange('readiness', e.target.value)}
                    placeholder="e.g., 85"
                    min="0"
                    max="100"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                <div className="flex space-x-3 pt-4 border-t border-gray-200">
                  <button 
                    type="button"
                    onClick={() => {
                      setShowTestModal(false);
                      resetTestForm();
                    }}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md font-medium hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 bg-amber-600 text-white py-2 rounded-md font-medium hover:bg-amber-700 transition-colors"
                  >
                    Schedule Test
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BeltManagement;