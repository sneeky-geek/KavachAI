import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, Clock, Timer } from "lucide-react";

export default function TeacherDashboard() {
  const upcomingTests = [
    {
      subject: "Mathematics Mid-Term",
      duration: "2 hours",
      date: "March 15, 2025"
    },
    {
      subject: "Physics Quiz",
      duration: "1 hour",
      date: "March 17, 2025"
    },
    {
      subject: "Chemistry Lab Test",
      duration: "1.5 hours",
      date: "March 20, 2025"
    }
  ];

  const testResults = [
    { subject: "Mathematics Mid-Term", passRate: "85%" },
    { subject: "Physics Quiz", passRate: "92%" }
  ];

  return (
    <div className="p-8">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h2 className="text-2xl font-bold mb-6">Upcoming Tests</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {upcomingTests.map((test, index) => (
            <motion.div
              key={test.subject}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">{test.subject}</h3>
                  <div className="space-y-2 mb-6">
                    <p className="text-muted-foreground flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {test.duration}
                    </p>
                    <p className="text-muted-foreground flex items-center gap-2">
                      <Timer className="h-4 w-4" />
                      {test.date}
                    </p>
                  </div>
                  <Button className="w-full">Start Test</Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-green-50">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Test Results
                </h3>
                <div className="space-y-4">
                  {testResults.map((result) => (
                    <div key={result.subject} className="flex justify-between items-center">
                      <p>{result.subject}</p>
                      <p className="font-semibold text-green-600">{result.passRate}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-orange-50">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  Risk Scores
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <p>High Risk Students</p>
                    <p className="font-semibold text-orange-600">5</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p>Average Risk Level</p>
                    <p className="font-semibold text-green-600">Low</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
