import { useState } from 'react';

function FeeManagement() {
  const [feeRecords, setFeeRecords] = useState([
    {
      id: 'FEE001',
      studentId: 'STU001',
      studentName: 'Rahul Kumar',
      course: 'Intermediate',
      amount: 2500,
      dueDate: '2024-01-31',
      paidDate: '2024-01-28',
      status: 'Paid',
      method: 'UPI',
      transactionId: 'TXN123456789'
    },
    {
      id: 'FEE002',
      studentId: 'STU002',
      studentName: 'Priya Sharma',
      course: 'Advanced',
      amount: 3000,
      dueDate: '2024-01-31',
      paidDate: null,
      status: 'Pending',
      method: null,
      transactionId: null
    },
    {
      id: 'FEE003',
      studentId: 'STU003',
      studentName: 'Amit Singh',
      course: 'Advanced',
      amount: 3000,
      dueDate: '2024-01-31',
      paidDate: '2024-01-30',
      status: 'Paid',
      method: 'Cash',
      transactionId: 'CASH001'
    },
    {
      id: 'FEE004',
      studentId: 'STU004',
      studentName: 'Sneha Patel',
      course: 'Beginner',
      amount: 2000,
      dueDate: '2024-02-28',
      paidDate: null,
      status: 'Overdue',
      method: null,
      transactionId: null
    }
  ]);

  const [selectedMonth, setSelectedMonth] = useState('2024-01');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showAddFeeModal, setShowAddFeeModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [paymentForm, setPaymentForm] = useState({
    method: 'Cash',
    transactionId: '',
    paidDate: new Date().toISOString().split('T')[0]
  });
  const [newFeeForm, setNewFeeForm] = useState({
    studentName: '',
    course: 'Beginner',
    amount: 2000,
    dueDate: ''
  });

  const filteredRecords = feeRecords.filter(record => {
    const matchesMonth = record.dueDate.startsWith(selectedMonth);
    const matchesStatus = filterStatus === 'all' || record.status.toLowerCase() === filterStatus;
    return matchesMonth && matchesStatus;
  });

  const totalAmount = filteredRecords.reduce((sum, record) => sum + record.amount, 0);
  const paidAmount = filteredRecords.filter(r => r.status === 'Paid').reduce((sum, record) => sum + record.amount, 0);
  const pendingAmount = totalAmount - paidAmount;

  const handleRecordPayment = (record) => {
    setSelectedRecord(record);
    setShowPaymentModal(true);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    
    // Update the fee record with payment information
    const updatedRecords = feeRecords.map(record => {
      if (record.id === selectedRecord.id) {
        return {
          ...record,
          status: 'Paid',
          paidDate: paymentForm.paidDate,
          method: paymentForm.method,
          transactionId: paymentForm.transactionId || `${paymentForm.method.toUpperCase()}${Date.now()}`
        };
      }
      return record;
    });

    setFeeRecords(updatedRecords);
    setShowPaymentModal(false);
    setPaymentForm({
      method: 'Cash',
      transactionId: '',
      paidDate: new Date().toISOString().split('T')[0]
    });
    alert('Payment recorded successfully!');
  };

  const handleAddFee = (e) => {
    e.preventDefault();
    
    const newFee = {
      id: `FEE${String(feeRecords.length + 1).padStart(3, '0')}`,
      studentId: `STU${String(feeRecords.length + 1).padStart(3, '0')}`,
      studentName: newFeeForm.studentName,
      course: newFeeForm.course,
      amount: parseInt(newFeeForm.amount),
      dueDate: newFeeForm.dueDate,
      paidDate: null,
      status: 'Pending',
      method: null,
      transactionId: null
    };

    setFeeRecords([...feeRecords, newFee]);
    setShowAddFeeModal(false);
    setNewFeeForm({
      studentName: '',
      course: 'Beginner',
      amount: 2000,
      dueDate: ''
    });
    alert('Fee record added successfully!');
  };

  const handleExportReport = () => {
    const csvContent = [
      ['Fee ID', 'Student Name', 'Course', 'Amount', 'Due Date', 'Status', 'Payment Method', 'Transaction ID'],
      ...filteredRecords.map(record => [
        record.id,
        record.studentName,
        record.course,
        record.amount,
        record.dueDate,
        record.status,
        record.method || '',
        record.transactionId || ''
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fee_report_${selectedMonth}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleViewRecord = (record) => {
    alert(`Fee Details:\n\nStudent: ${record.studentName}\nCourse: ${record.course}\nAmount: ₹${record.amount}\nStatus: ${record.status}\nDue Date: ${record.dueDate}${record.paidDate ? `\nPaid Date: ${record.paidDate}` : ''}`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black text-slate-800 mb-2">Fee Management</h1>
          <p className="text-slate-600">Track and manage student fee payments digitally</p>
        </div>
        <button 
          onClick={() => setShowAddFeeModal(true)}
          className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-700 transition-all duration-300 flex items-center space-x-2"
        >
          <span>💰</span>
          <span>Add Fee Record</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 text-center">
          <div className="text-3xl font-black text-blue-600 mb-2">₹{totalAmount.toLocaleString()}</div>
          <div className="text-slate-600 font-medium">Total Expected</div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 text-center">
          <div className="text-3xl font-black text-green-600 mb-2">₹{paidAmount.toLocaleString()}</div>
          <div className="text-slate-600 font-medium">Amount Collected</div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 text-center">
          <div className="text-3xl font-black text-red-600 mb-2">₹{pendingAmount.toLocaleString()}</div>
          <div className="text-slate-600 font-medium">Pending Amount</div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 text-center">
          <div className="text-3xl font-black text-amber-600 mb-2">
            {Math.round((paidAmount / totalAmount) * 100) || 0}%
          </div>
          <div className="text-slate-600 font-medium">Collection Rate</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Select Month</label>
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Filter by Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <button 
              onClick={handleExportReport}
              className="w-full bg-slate-700 text-white px-4 py-3 rounded-xl hover:bg-slate-800 transition-colors font-semibold"
            >
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Fee Records Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left py-4 px-6 font-bold text-slate-800">Fee ID</th>
                <th className="text-left py-4 px-6 font-bold text-slate-800">Student</th>
                <th className="text-left py-4 px-6 font-bold text-slate-800">Course</th>
                <th className="text-left py-4 px-6 font-bold text-slate-800">Amount</th>
                <th className="text-left py-4 px-6 font-bold text-slate-800">Due Date</th>
                <th className="text-left py-4 px-6 font-bold text-slate-800">Status</th>
                <th className="text-left py-4 px-6 font-bold text-slate-800">Payment Details</th>
                <th className="text-left py-4 px-6 font-bold text-slate-800">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record, index) => (
                <tr key={record.id} className={`border-b border-slate-100 ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'} hover:bg-amber-50 transition-colors`}>
                  <td className="py-4 px-6">
                    <span className="font-semibold text-slate-800">{record.id}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <div className="font-semibold text-slate-800">{record.studentName}</div>
                      <div className="text-sm text-slate-500">{record.studentId}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-slate-600">{record.course}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-semibold text-slate-800">₹{record.amount.toLocaleString()}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-slate-600">{record.dueDate}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      record.status === 'Paid' 
                        ? 'bg-green-100 text-green-800' 
                        : record.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    {record.status === 'Paid' ? (
                      <div className="text-sm">
                        <div className="font-medium text-slate-800">{record.method}</div>
                        <div className="text-slate-500">{record.paidDate}</div>
                        <div className="text-slate-500 text-xs">{record.transactionId}</div>
                      </div>
                    ) : (
                      <span className="text-slate-400">-</span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-2">
                      {record.status !== 'Paid' && (
                        <button 
                          onClick={() => handleRecordPayment(record)}
                          className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition-colors text-sm"
                        >
                          Record Payment
                        </button>
                      )}
                      <button 
                        onClick={() => handleViewRecord(record)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition-colors text-sm"
                      >
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Methods Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
          <h3 className="text-xl font-bold text-slate-800 mb-6">Payment Methods</h3>
          <div className="space-y-4">
            {['UPI', 'Cash', 'Bank Transfer', 'Card'].map((method, index) => {
              const count = feeRecords.filter(r => r.method === method).length;
              const percentage = feeRecords.length > 0 ? (count / feeRecords.length) * 100 : 0;
              return (
                <div key={method} className="flex items-center justify-between">
                  <span className="font-medium text-slate-700">{method}</span>
                  <div className="flex items-center space-x-3">
                    <div className="w-24 bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-amber-500 to-orange-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold text-slate-600 w-12">{count}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
          <h3 className="text-xl font-bold text-slate-800 mb-6">Fee Structure</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
              <span className="font-medium text-slate-700">Beginner Course</span>
              <span className="font-bold text-slate-800">₹2,000/month</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
              <span className="font-medium text-slate-700">Intermediate Course</span>
              <span className="font-bold text-slate-800">₹2,500/month</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
              <span className="font-medium text-slate-700">Advanced Course</span>
              <span className="font-bold text-slate-800">₹3,000/month</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-amber-50 rounded-xl border border-amber-200">
              <span className="font-medium text-amber-800">Registration Fee</span>
              <span className="font-bold text-amber-800">₹500 (One-time)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-800">Record Payment</h2>
              <button 
                onClick={() => setShowPaymentModal(false)}
                className="text-slate-500 hover:text-slate-700 text-2xl"
              >
                ✕
              </button>
            </div>
            
            <div className="mb-6 p-4 bg-slate-50 rounded-xl">
              <div className="text-sm text-slate-600 mb-1">Student</div>
              <div className="font-semibold text-slate-800">{selectedRecord.studentName}</div>
              <div className="text-sm text-slate-600 mt-2">Amount Due</div>
              <div className="text-2xl font-bold text-slate-800">₹{selectedRecord.amount.toLocaleString()}</div>
            </div>
            
            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Payment Method</label>
                <select 
                  value={paymentForm.method}
                  onChange={(e) => setPaymentForm({...paymentForm, method: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="Cash">Cash</option>
                  <option value="UPI">UPI</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Card">Card</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Payment Date</label>
                <input 
                  type="date"
                  value={paymentForm.paidDate}
                  onChange={(e) => setPaymentForm({...paymentForm, paidDate: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Transaction ID (Optional)</label>
                <input 
                  type="text" 
                  value={paymentForm.transactionId}
                  onChange={(e) => setPaymentForm({...paymentForm, transactionId: e.target.value})}
                  placeholder="Enter transaction reference"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500" 
                />
              </div>
              
              <div className="flex space-x-4 mt-6">
                <button 
                  type="button"
                  onClick={() => setShowPaymentModal(false)}
                  className="flex-1 bg-slate-300 text-slate-700 py-3 rounded-xl font-semibold hover:bg-slate-400 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300"
                >
                  Record Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Fee Modal */}
      {showAddFeeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-800">Add Fee Record</h2>
              <button 
                onClick={() => setShowAddFeeModal(false)}
                className="text-slate-500 hover:text-slate-700 text-2xl"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleAddFee} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Student Name</label>
                <input 
                  type="text"
                  value={newFeeForm.studentName}
                  onChange={(e) => setNewFeeForm({...newFeeForm, studentName: e.target.value})}
                  placeholder="Enter student name"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Course</label>
                <select 
                  value={newFeeForm.course}
                  onChange={(e) => {
                    const course = e.target.value;
                    let amount = 2000;
                    if (course === 'Intermediate') amount = 2500;
                    if (course === 'Advanced') amount = 3000;
                    setNewFeeForm({...newFeeForm, course, amount});
                  }}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="Beginner">Beginner Course</option>
                  <option value="Intermediate">Intermediate Course</option>
                  <option value="Advanced">Advanced Course</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Amount</label>
                <input 
                  type="number"
                  value={newFeeForm.amount}
                  onChange={(e) => setNewFeeForm({...newFeeForm, amount: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Due Date</label>
                <input 
                  type="date"
                  value={newFeeForm.dueDate}
                  onChange={(e) => setNewFeeForm({...newFeeForm, dueDate: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>
              
              <div className="flex space-x-4 mt-6">
                <button 
                  type="button"
                  onClick={() => setShowAddFeeModal(false)}
                  className="flex-1 bg-slate-300 text-slate-700 py-3 rounded-xl font-semibold hover:bg-slate-400 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-amber-500 to-orange-600 text-white py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-700 transition-all duration-300"
                >
                  Add Fee Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default FeeManagement;