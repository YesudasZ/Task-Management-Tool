import Navbar from '../layout/Navbar';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Your dashboard content goes here */}
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          {/* Add your dashboard components here */}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;