import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import harshitImg from '/src/assets/harshit.png';
import rahulImg from '/src/assets/rahul.png';

const TestimonialsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const testimonials = [
    {
      name: "Harshit",
      image: harshitImg,
      alt: "Harshit Testimonial"
    },
    {
      name: "Rahul", 
      image: rahulImg,
      alt: "Rahul Testimonial"
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-2 md:p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            className="bg-gray-800 rounded-2xl p-3 md:p-6 max-w-4xl w-full max-h-[95vh] overflow-y-auto border-2 border-yellow-500"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-3 md:mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-yellow-500">Testimonials</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-700 transition-colors"
              >
                ×
              </button>
            </div>

            {/* Testimonials Images */}
            <div className="grid grid-cols-1 gap-2 md:gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.2 }}
                  className="flex justify-center"
                >
                  <img
                    src={testimonial.image}
                    alt={testimonial.alt}
                    className="w-full md:max-w-2xl h-auto rounded-lg shadow-lg object-contain"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TestimonialsModal;
