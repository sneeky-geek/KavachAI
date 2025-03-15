import Navbar from "@/components/shared/Navbar";
import Sidebar from "@/components/shared/Sidebar";
import TeacherDashboard from "@/components/dashboard/TeacherDashboard";

export default function Teacher() {
  const teacherData = {
    name: "Dr. Sarah Wilson",
    initials: "SW",
    role: "Professor",
    details: [
      { label: "Age", value: "35 years" },
      { label: "Department", value: "Computer Science & Engineering" },
      { label: "Experience", value: "10 years" },
      { label: "Qualification", value: "Ph.D. in Computer Science" }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-16 flex flex-col lg:flex-row">
        <div className="lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)]">
          <Sidebar user={teacherData} />
        </div>
        <div className="flex-1">
          <TeacherDashboard />
        </div>
      </div>
    </div>
  );
}