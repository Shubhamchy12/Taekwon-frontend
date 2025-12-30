import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Componets/Navbar';
import Footer from './Componets/Footer';
import Home from './Componets/Pages/Home';
import About from './Componets/Pages/About';
import Courses from './Componets/Pages/Courses';
import Admission from './Componets/Pages/Admission';
import Contact from './Componets/Pages/Contact';

// Admin Components
import AdminLogin from './Componets/Admin/AdminLogin';
import AdminLayout from './Componets/Admin/AdminLayout';
import AdminDashboard from './Componets/Admin/Dashboard/AdminDashboard';
import AdmissionManagement from './Componets/Admin/Dashboard/AdmissionManagement';
import CertificateManagement from './Componets/Admin/CertificateManagement';
import AchievementManagement from './Componets/Admin/AchievementManagement';
import TemplateManagement from './Componets/Admin/TemplateManagement';
import StudentManagement from './Componets/Admin/StudentManagement';
import ContactManagement from './Componets/Admin/ContactManagement';
import CourseManagement from './Componets/Admin/CourseManagement';
import StudentAchievements from './Componets/Student/StudentAchievements';
import CertificateVerification from './Componets/Pages/CertificateVerification';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Home />
            </main>
            <Footer />
          </div>
        } />
        
        <Route path="/about" element={
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <About />
            </main>
            <Footer />
          </div>
        } />
        
        <Route path="/courses" element={
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Courses />
            </main>
            <Footer />
          </div>
        } />
        
        <Route path="/admission" element={
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Admission />
            </main>
            <Footer />
          </div>
        } />
        
        <Route path="/contact" element={
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Contact />
            </main>
            <Footer />
          </div>
        } />

        {/* Certificate Verification - Public Route */}
        <Route path="/verify-certificate" element={
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <CertificateVerification />
            </main>
            <Footer />
          </div>
        } />

        {/* Student Portal */}
        <Route path="/student/achievements" element={
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <StudentAchievements />
            </main>
            <Footer />
          </div>
        } />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="admissions" element={<AdmissionManagement />} />
          <Route path="certificates" element={<CertificateManagement />} />
          <Route path="achievements" element={<AchievementManagement />} />
          <Route path="templates" element={<TemplateManagement />} />
          <Route path="students" element={<StudentManagement />} />
          <Route path="contacts" element={<ContactManagement />} />
          <Route path="courses" element={<CourseManagement />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

