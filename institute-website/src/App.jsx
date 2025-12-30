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

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="admissions" element={<AdmissionManagement />} />
          <Route path="students" element={<div className="p-8"><h1 className="text-2xl font-bold">Student Management - Coming Soon</h1></div>} />
          <Route path="contacts" element={<div className="p-8"><h1 className="text-2xl font-bold">Contact Management - Coming Soon</h1></div>} />
          <Route path="courses" element={<div className="p-8"><h1 className="text-2xl font-bold">Course Management - Coming Soon</h1></div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

