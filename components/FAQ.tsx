'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiMinus, FiHelpCircle } from 'react-icons/fi';

const faqs = [
  {
    question: "How long does it take to build a website?",
    answer: "Typically, a custom website takes 4-8 weeks depending on complexity. We'll provide a detailed timeline after understanding your requirements.",
    category: "Timeline"
  },
  {
    question: "Do you provide ongoing support?",
    answer: "Yes! We offer comprehensive maintenance packages including updates, security monitoring, and 24/7 support.",
    category: "Support"
  },
  {
    question: "What technologies do you use?",
    answer: "We use cutting-edge technologies like Next.js, React, Node.js, and AI-powered tools to build fast, scalable solutions.",
    category: "Technology"
  },
  {
    question: "Can you help with digital marketing?",
    answer: "Absolutely! We offer complete digital marketing services including SEO, PPC, social media, and content marketing.",
    category: "Services"
  },
  {
    question: "What's included in your pricing?",
    answer: "Our pricing includes design, development, testing, deployment, and 30 days of free support. Additional services are clearly outlined.",
    category: "Pricing"
  },
  {
    question: "Do you work with small businesses?",
    answer: "Yes! We work with businesses of all sizes, from startups to enterprises. We have packages tailored for every budget.",
    category: "Business"
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="py-12 md:py-20 bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-48 md:w-96 h-48 md:h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-48 md:w-96 h-48 md:h-96 bg-blue-500/20 rounded-full blur-3xl" />
        {isMobile && (
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/5 via-transparent to-blue-900/5" />
        )}
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-16"
        >
          {isMobile && (
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FiHelpCircle className="w-8 h-8 text-white" />
            </div>
          )}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            Frequently Asked
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
              Questions
            </span>
          </h2>
          {isMobile && (
            <p className="text-gray-400 text-sm leading-relaxed">
              Find answers to common questions about our services
            </p>
          )}
        </motion.div>

        <div className={`space-y-3 md:space-y-4`}>
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileTap={{ scale: isMobile ? 0.98 : 1 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className={`w-full text-left ${isMobile ? 'p-4' : 'p-6'} bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300 ${
                  openIndex === index ? 'border-purple-500/50 bg-white/10' : ''
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1 pr-4">
                    {isMobile && (
                      <span className="text-xs text-purple-400 font-medium uppercase tracking-wider mb-1 block">
                        {faq.category}
                      </span>
                    )}
                    <h3 className={`font-semibold text-white ${isMobile ? 'text-sm leading-tight' : 'text-lg md:text-xl'}`}>
                      {faq.question}
                    </h3>
                  </div>
                  <div className="flex-shrink-0">
                    <motion.div
                      animate={{ rotate: openIndex === index ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={`${isMobile ? 'w-6 h-6' : 'w-8 h-8'} bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center`}
                    >
                      <FiPlus className={`text-white ${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
                    </motion.div>
                  </div>
                </div>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className={`${isMobile ? 'pt-3 border-t border-white/10 mt-3' : 'pt-4 border-t border-white/10 mt-4'}`}>
                        <p className={`text-white/70 leading-relaxed ${isMobile ? 'text-sm' : 'text-base'}`}>
                          {faq.answer}
                        </p>
                        
                        {/* Mobile: Category Tag */}
                        {!isMobile && (
                          <div className="mt-3 pt-3 border-t border-white/5">
                            <span className="inline-block px-2 py-1 bg-purple-500/20 rounded-full text-xs text-purple-300">
                              {faq.category}
                            </span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Mobile: Contact CTA */}
        {isMobile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 text-center"
          >
            <p className="text-gray-400 text-sm mb-4">
              Still have questions?
            </p>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full text-sm"
            >
              Contact Support
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
}