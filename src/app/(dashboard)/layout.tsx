import Sidebar from "../components/Sidebar"; // Verify your file path configurations match

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen w-screen bg-[#09090b] overflow-hidden">
      {/* Sidebar remains locked and initialized here across sub-routes */}
      <Sidebar />

      {/* Main Content Render Window */}
      <div className="flex-1 h-full overflow-y-auto p-6 md:p-8 custom-scrollbar">
        {children}
      </div>
    </div>
  );
}
