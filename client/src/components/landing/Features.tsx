import { motion } from "framer-motion";
import { Shield, Users, Globe, Lock, Brain, Scale, Eye, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Shield,
    title: "Academic Integrity",
    description: "Effectively deters cheating by identifying and addressing suspicious behavior in real-time, maintaining assessment credibility."
  },
  {
    icon: Users,
    title: "Candidate Experience",
    description: "Non-invasive approach minimizes resistance and ensures a seamless testing experience while reducing false positives."
  },
  {
    icon: Globe,
    title: "Scalability & Accessibility",
    description: "Supports large-scale assessments across diverse devices and platforms, ensuring accessibility for all technical capabilities."
  },
  {
    icon: Lock,
    title: "Privacy Compliance",
    description: "Adheres to global data privacy regulations (GDPR, FERPA), avoiding storage of sensitive data and reducing legal risks."
  },
  {
    icon: Brain,
    title: "Technological Innovation",
    description: "Real-time risk scoring and behavioral analytics powered by machine learning for adaptive interventions."
  },
  {
    icon: Scale,
    title: "Resource Optimization",
    description: "Leverages existing technologies and frameworks, reducing development time and ensuring compatibility."
  },
  {
    icon: Eye,
    title: "Operational Excellence",
    description: "Automated interventions reduce manual proctoring needs, minimizing administrative burden."
  },
  {
    icon: DollarSign,
    title: "Cost Efficiency",
    description: "Scalable design ensures long-term cost-effectiveness for large-scale implementations."
  }
];

export default function Features() {
  return (
    <div className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">
            Comprehensive Proctoring Solution
          </h2>
          <p className="text-lg text-muted-foreground">
            Our risk-based proctoring system combines advanced technology with practical feasibility to
            deliver a robust and user-friendly assessment environment.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <feature.icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
