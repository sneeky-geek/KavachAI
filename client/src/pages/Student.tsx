import Navbar from "@/components/shared/Navbar";
import Sidebar from "@/components/shared/Sidebar";
import StudentDashboard from "@/components/dashboard/StudentDashboard";

export default function Student() {
  const studentData = {
    name: "John Smith",
    initials: "JS",
    role: "Student",
    details: [
      { label: "Age", value: "20 years" },
      { label: "Class", value: "Computer Science - Year 2" },
      { label: "Student ID", value: "CS22-1234" },
      { label: "College", value: "MIT Tech Institute" }
    ],
    stats: [
      { label: "Data Structures", value: "A" },
      { label: "Algorithms", value: "A-" },
      { label: "Database Systems", value: "B+" },
      { label: "CGPA", value: "3.8" }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-16 flex flex-col lg:flex-row">
        <div className="lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)]">
          <Sidebar user={studentData} />
        </div>
        <div className="flex-1">
          <StudentDashboard />
        </div>
      </div>
    </div>
  );
}