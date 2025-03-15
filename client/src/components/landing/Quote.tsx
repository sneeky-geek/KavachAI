import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export default function Quote() {
  return (
    <div className="bg-primary py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
        >
          <Card className="bg-white/10 backdrop-blur border-none">
            <CardContent className="p-12 text-center">
              <blockquote className="text-2xl font-serif text-white italic">
                "Technology is just a tool. In terms of getting the kids working together and
                motivating them, the teacher is the most important."
              </blockquote>
              <cite className="mt-4 block text-white/80">- Bill Gates</cite>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
