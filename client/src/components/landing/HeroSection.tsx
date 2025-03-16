import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, Clock, Calendar, Bell } from "lucide-react";

export default function HeroSection() {
  // Set the exam date (example: 7 days from now)
  const examDate = new Date();
  examDate.setDate(examDate.getDate() + 7);
  
  // State for countdown
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  // Animation variants for number changes
  const variants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 }
  };
  
  // Calculate time remaining
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = examDate.getTime() - now.getTime();
      
      if (difference <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const formatNumber = (num: number): string => {
    return num < 10 ? `0${num}` : `${num}`;
  };
  
  const handleStartExam = () => {
    window.location.href = "/exam";
  };

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
            
            {/* Countdown Timer */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="space-y-4"
            >
              <div className="flex items-center space-x-2 text-primary">
                <Calendar className="h-5 w-5" />
                <span className="font-semibold">
                  Exam starts: {examDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
              
              <motion.div 
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">Countdown to Exam</h3>
                  </div>
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      repeatType: "loop", 
                      duration: 2,
                      ease: "easeInOut" 
                    }}
                    className="bg-red-100 rounded-full p-1"
                  >
                    <Bell className="h-4 w-4 text-red-500" />
                  </motion.div>
                </div>
                
                <div className="grid grid-cols-4 gap-2 text-center">
                  <motion.div
                    key={`days-${timeLeft.days}`}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={variants}
                    className="bg-gray-50 rounded-lg p-3"
                  >
                    <motion.div 
                      className="text-3xl font-bold text-primary"
                      key={timeLeft.days}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {formatNumber(timeLeft.days)}
                    </motion.div>
                    <div className="text-xs text-gray-500 mt-1">DAYS</div>
                  </motion.div>
                  
                  <motion.div
                    key={`hours-${timeLeft.hours}`}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={variants}
                    className="bg-gray-50 rounded-lg p-3"
                  >
                    <motion.div 
                      className="text-3xl font-bold text-primary"
                      key={timeLeft.hours}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {formatNumber(timeLeft.hours)}
                    </motion.div>
                    <div className="text-xs text-gray-500 mt-1">HOURS</div>
                  </motion.div>
                  
                  <motion.div
                    key={`minutes-${timeLeft.minutes}`}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={variants}
                    className="bg-gray-50 rounded-lg p-3"
                  >
                    <motion.div 
                      className="text-3xl font-bold text-primary"
                      key={timeLeft.minutes}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {formatNumber(timeLeft.minutes)}
                    </motion.div>
                    <div className="text-xs text-gray-500 mt-1">MINUTES</div>
                  </motion.div>
                  
                  <motion.div
                    key={`seconds-${timeLeft.seconds}`}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={variants}
                    className="bg-gray-50 rounded-lg p-3"
                  >
                    <motion.div 
                      className="text-3xl font-bold text-primary"
                      key={timeLeft.seconds}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {formatNumber(timeLeft.seconds)}
                    </motion.div>
                    <div className="text-xs text-gray-500 mt-1">SECONDS</div>
                  </motion.div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleStartExam}
                  className="mt-6 w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Enter Exam Portal
                </motion.button>
              </motion.div>
            </motion.div>
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
                      whileHover={{ scale: 1.05, rotate: 5 }}
                      className="flex items-center justify-center bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg"
                    >
                      <Shield className="h-12 w-12 text-primary" />
                    </motion.div>
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.7 }}
                      whileHover={{ scale: 1.05, rotate: -5 }}
                      className="flex items-center justify-center bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg"
                    >
                      <Lock className="h-12 w-12 text-primary" />
                    </motion.div>
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.9 }}
                      whileHover={{ scale: 1.05, rotate: 5 }}
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