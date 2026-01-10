import { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import DashboardHome from './Dashboard/DashboardHome';
import StudentManagement from './Dashboard/StudentManagement';
import AttendanceTracking from './Dashboard/AttendanceTracking';
import FeeManagement from './Dashboard/FeeManagement';
import EventManagement from './Dashboard/EventManagement';
import CertificationManagement from './Dashboard/CertificationManagement';
import AdmissionManagement from './Dashboard/AdmissionManagement';
import BeltManagement from './Dashboard/BeltManagement';
import ContactManagement from './ContactManagement';

function AdminDashboard({ onLogout }) {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardHome />;
      case 'students':
        return <StudentManagement />;
      case 'attendance':
        return <AttendanceTracking />;
      case 'belts':
        return <BeltManagement />;
      case 'contact':
        return <ContactManagement />;
      case 'fees':
        return <FeeManagement />;
      case 'events':
        return <EventManagement />;
      case 'certificates':
        return <CertificationManagement />;
      case 'admissions':
        return <AdmissionManagement />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50">
      <AdminSidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        onLogout={onLogout}
      />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;