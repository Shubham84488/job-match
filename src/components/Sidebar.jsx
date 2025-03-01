const Sidebar = () => {
    return (
      <div className="h-screen w-64 bg-gray-900 text-white fixed top-0 left-0 flex flex-col p-5">
        <h2 className="text-xl font-bold mb-6">Job Match</h2>
        <ul className="space-y-4">
          <li><a href="/dashboard" className="hover:text-gray-400">Dashboard</a></li>
          <li><a href="/jobs" className="hover:text-gray-400">Jobs</a></li>
          <li><a href="/profile" className="hover:text-gray-400">Profile</a></li>
          <li><a href="/aboutUs" className="hover:text-gray-400">About Us</a></li>
        </ul>
        <ul className="absolute bottom-5">
            <li><a href="/aboutUs" className="hover:text-gray-400"> Logout</a></li>
        </ul>
      </div>
    );
  };

export default Sidebar;