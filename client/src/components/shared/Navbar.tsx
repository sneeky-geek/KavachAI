import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Shield, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/student", label: "Student" },
    { href: "/teacher", label: "Teacher" },
    { href: "/contact", label: "Contact Us" },
  ];

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed w-full bg-white/95 backdrop-blur-sm z-50 border-b"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <Link href="/">
            <a className="flex items-center space-x-2 py-3">
              <Shield className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-primary tracking-tight">KAVACH AI</span>
            </a>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <a className="text-gray-700 hover:text-primary transition-colors duration-200 font-medium">
                  {item.label}
                </a>
              </Link>
            ))}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[240px] sm:w-[280px]">
                <div className="flex flex-col gap-4 py-4">
                  {navItems.map((item) => (
                    <Link key={item.href} href={item.href}>
                      <a className="text-lg font-medium text-gray-700 hover:text-primary transition-colors duration-200">
                        {item.label}
                      </a>
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}