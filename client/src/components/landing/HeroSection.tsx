import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Shield, Lock, Eye } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="min-h-screen flex items-center bg-gradient-to-b from-blue-50 to-white pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl font-bold mb-6 text-gray-900">
              Advanced AI-Powered Proctoring System
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              KAVACH AI combines cutting-edge technology with practical feasibility to 
              deliver a secure and user-friendly assessment environment. Our system ensures 
              academic integrity while maintaining student privacy.
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Start Assessment
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full aspect-square">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-6 p-8">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="flex items-center justify-center bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg"
                    >
                      <Shield className="h-12 w-12 text-primary" />
                    </motion.div>
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.7 }}
                      className="flex items-center justify-center bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg"
                    >
                      <Lock className="h-12 w-12 text-primary" />
                    </motion.div>
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.9 }}
                      className="flex items-center justify-center bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg"
                    >
                      <Eye className="h-12 w-12 text-primary" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}