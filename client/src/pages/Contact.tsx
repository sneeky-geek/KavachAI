import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import Navbar from "@/components/shared/Navbar";

export default function Contact() {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "support@kavachai.com",
      detail: "24/7 Support Available"
    },
    {
      icon: Phone,
      title: "Phone",
      content: "+1 (555) 123-4567",
      detail: "Mon-Fri 9:00 AM - 6:00 PM"
    },
    {
      icon: MapPin,
      title: "Address",
      content: "123 AI Innovation Center",
      detail: "Silicon Valley, CA 94025"
    },
    {
      icon: Clock,
      title: "Business Hours",
      content: "Monday - Friday",
      detail: "9:00 AM - 6:00 PM PST"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Have questions about KAVACH AI? Our team is here to help you with any inquiries
              about our proctoring system.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <info.icon className="h-10 w-10 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">{info.title}</h3>
                    <p className="text-gray-900 mb-1">{info.content}</p>
                    <p className="text-sm text-gray-500">{info.detail}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
