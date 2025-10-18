'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiPenTool, FiCode, FiZap, FiChevronDown, FiChevronUp } from 'react-icons/fi';

const processSteps = [
  {
    icon: <FiSearch className="w-6 h-6 md:w-8 md:h-8" />,
    title: "Discovery & Strategy",
    shortTitle: "Discovery",
    description: "We dive deep into your business goals, target audience, and market position to create a tailored digital strategy.",
    details: [
      "Market research & analysis",
      "Competitor assessment",
      "User persona development",
      "Strategic roadmap creation"
    ],
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: <FiPenTool className="w-6 h-6 md:w-8 md:h-8" />,
    title: "Design & Prototype",
    shortTitle: "Design",
    description: "Our creative team crafts stunning, user-centric designs that capture your brand essence and engage your audience.",
    details: [
      "UI/UX design",
      "Interactive prototypes",
      "Brand identity integration",
      "User testing & feedback"
    ],
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: <FiCode className="w-6 h-6 md:w-8 md:h-8" />,
    title: "Development & Testing",
    shortTitle: "Development",
    description: "We build robust, scalable solutions using cutting-edge technologies, ensuring flawless performance across all devices.",
    details: [
      "Agile development",
      "Quality assurance",
      "Performance optimization",
      "Security implementation"
    ],
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: <FiZap className="w-6 h-6 md:w-8 md:h-8" />,
    title: "Launch & Growth",
    shortTitle: "Launch",
    description: "We deploy your solution and provide ongoing support to ensure continuous improvement and sustained growth.",
    details: [
      "Deployment & go-live",
      "Performance monitoring",
      "Continuous optimization",
      "Growth strategy execution"
    ],
    color: "from-orange-500 to-red-500"
  }
];

export default function Process() {
  const [activeStep, setActiveStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Open first accordion by default on mobile
      if (mobile && expandedStep === null) {
        setExpandedStep(0);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [expandedStep]);

  // Auto-advance on desktop
  useEffect(() => {
    if (!isMobile) {
      const interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % processSteps.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isMobile]);

  return (
    <section className="py-12 md:py-20 bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-purple-500/10 rounded-full blur-3xl" />
        {isMobile && (
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/5 via-transparent to-blue-900/5" />
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-16"
        >
          <span className="text-purple-400 text-xs md:text-sm font-medium uppercase tracking-wider">
            How We Work
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-3 md:mt-4 mb-4 md:mb-6 leading-tight">
            Our Process
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
              Perfected
            </span>
          </h2>
        </motion.div>

        {isMobile ? (
          // Mobile Layout: Accordion Style
          <div className="space-y-4">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <motion.div
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setExpandedStep(expandedStep === index ? null : index)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 border ${
                    expandedStep === index
                      ? `bg-gradient-to-r ${step.color} bg-opacity-20 border-purple-500/50`
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl transition-all duration-300 ${
                        expandedStep === index
                          ? `bg-gradient-to-r ${step.color}`
                          : 'bg-white/10'
                      }`}>
                        {step.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {step.shortTitle}
                        </h3>
                        <div className="text-xs text-purple-400 font-medium">
                          Step {index + 1}
                        </div>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedStep === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FiChevronDown className="w-5 h-5 text-gray-400" />
                    </motion.div>
                  </div>

                  <AnimatePresence>
                    {expandedStep === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 border-t border-white/20 mt-4">
                          <p className="text-white text-base mb-5 leading-relaxed font-medium">
                            {step.description}
                          </p>
                          <div className="space-y-3">
                            {step.details.map((detail, detailIndex) => (
                              <motion.div
                                key={detailIndex}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: detailIndex * 0.1 }}
                                className="flex items-center gap-3"
                              >
                                <div className={`w-2 h-2 bg-gradient-to-r ${step.color} rounded-full flex-shrink-0`} />
                                <span className="text-gray-200 text-base leading-relaxed">{detail}</span>
                              </motion.div>
                            ))}
                          </div>
                          
                          {/* Progress for expanded step */}
                          <div className="mt-5 pt-4 border-t border-white/10">
                            <div className="flex justify-between text-sm text-gray-300 mb-2 font-medium">
                              <span>Step {index + 1} of {processSteps.length}</span>
                              <span>{Math.round(((index + 1) / processSteps.length) * 100)}%</span>
                            </div>
                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                              <motion.div
                                className={`h-full bg-gradient-to-r ${step.color}`}
                                initial={{ width: 0 }}
                                animate={{ width: `${((index + 1) / processSteps.length) * 100}%` }}
                                transition={{ duration: 0.5 }}
                              />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            ))}
          </div>
        ) : (
          // Desktop Layout: Two Columns (existing layout)
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Steps */}
            <div className="space-y-4">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => setActiveStep(index)}
                  className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                    activeStep === index
                      ? 'bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/50'
                      : 'bg-white/5 border border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl transition-all duration-300 ${
                      activeStep === index
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600'
                        : 'bg-white/10'
                    }`}>
                      {step.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-400">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right - Details */}
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-purple-600/10 to-blue-600/10 rounded-3xl p-8 border border-white/10">
                <div className="mb-6">
                  <div className="p-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl inline-block mb-4">
                    {processSteps[activeStep].icon}
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">
                    {processSteps[activeStep].title}
                  </h3>
                </div>
                <div className="space-y-3">
                  {processSteps[activeStep].details.map((detail, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full" />
                      <span className="text-gray-300">{detail}</span>
                    </motion.div>
                  ))}
                </div>
                
                {/* Progress Bar */}
                <div className="mt-8">
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>Step {activeStep + 1} of {processSteps.length}</span>
                    <span>{Math.round(((activeStep + 1) / processSteps.length) * 100)}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${((activeStep + 1) / processSteps.length) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}