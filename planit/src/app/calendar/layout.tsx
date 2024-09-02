import Navbar from "@/components/navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Main Content */}
        <main className="flex-1 bg-white">{children}</main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-100 p-4 text-center">
        <p>© Planit</p>
      </footer>
    </div>
  );
};

export default Layout;
