import { useState, useEffect } from 'react';

const ContactManagement = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data
  const mockContacts = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@email.com',
      phone: '+91 9876543210',
      inquiryType: 'admission',
      message: 'I want to enroll my son in Taekwon-Do classes.',
      submittedAt: '2024-01-15T10:30:00Z',
      status: 'new',
      priority: 'high'
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setContacts(mockContacts);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Management</h1>
        <p className="text-gray-600">Manage inquiries and communication with prospective students</p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Inquiries</h2>
        <div className="space-y-4">
          {contacts.map((contact) => (
            <div key={contact.id} className="border-b pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{contact.name}</h3>
                  <p className="text-sm text-gray-600">{contact.email}</p>
                  <p className="text-sm text-gray-500">{contact.message}</p>
                </div>
                <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                  {contact.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactManagement;
