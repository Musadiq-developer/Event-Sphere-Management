import Sidebar from './Sidebar';

const DashboardLayout = ({ children, title }) => {
  return (
    <div className="min-h-screen flex text-white overflow-hidden" 
         style={{ background: "radial-gradient(circle at top right, #773962 0%, #111720 50%, #1c2c50 100%)" }}>
      
      <Sidebar />
      
      <main className="ml-64 flex-1 p-8 overflow-y-auto">
        <header className="mb-8 page-transition">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            {title}
          </h1>
        </header>
        

        <div className="glass-card p-6 rounded-3xl min-h-[80vh] border border-white/10">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;