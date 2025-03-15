import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Award, GraduationCap, Timer } from "lucide-react";
import { Link } from "wouter";


const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export default function StudentDashboard() {
  const stats = [
    { label: "Presence", value: "300", icon: Clock },
    { label: "Test", value: "40", icon: Award },
    { label: "Exam", value: "30", icon: GraduationCap },
    { label: "Finish this Week", value: "10", icon: Timer }
  ];

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

  return (
    <motion.div 
      className="p-4 lg:p-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            variants={itemVariants}
          >
            <Card>
              <CardContent className="p-6 flex items-center gap-4">
                <stat.icon className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-bold mb-6">Upcoming Tests</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {upcomingTests.map((test) => (
            <motion.div
              key={test.subject}
              variants={itemVariants}
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
                  <Link href="/quiz">
      <Button className="w-full">Start Test</Button>
    </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}