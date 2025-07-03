'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import CountUp from 'react-countup';

const stats = [
  {
    value: 150,
    suffix: '+',
    label: 'Projects Completed',
    description: 'Successful digital transformations',
    icon: '🚀'
  },
  {
    value: 98,
    suffix: '%',
    label: 'Client Satisfaction',
    description: 'Average client satisfaction rate',
    icon: '⭐'
  },
  {
    value: 10,
    suffix: 'x',
    label: 'ROI Increase',
    description: 'Average return on investment',
    icon: '📈'
  },
  {
    value: 24,
    suffix: '/7',
    label: 'Support Available',
    description: 'Round-the-clock assistance',
    icon: '🛠️'
  }
];

export default function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-48 md:w-96 h-48 md:h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 md:w-96 h-48 md:h-96 bg-blue-500/10 rounded-full blur-3xl" />
        {isMobile && (
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(139, 92, 246, 0.05) 0%, transparent 50%), 
                             radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)`,
          }} />
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-16"
        >
          <span className="text-purple-400 text-xs md:text-sm font-medium uppercase tracking-wider">
            Our Impact
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-3 md:mt-4 leading-tight">
            Numbers that
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
              speak volumes
            </span>
          </h2>
        </motion.div>

        <div className={`grid ${isMobile ? 'grid-cols-2 gap-4' : 'grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8'}`}>
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <div className={`bg-white/5 backdrop-blur-sm rounded-2xl ${isMobile ? 'p-4' : 'p-6 md:p-8'} border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105`}>
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                
                <div className="relative z-10 text-center">
                  {/* Icon - Mobile Only */}
                  {isMobile && (
                    <div className="text-2xl mb-2">
                      {stat.icon}
                    </div>
                  )}

                  <div className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl lg:text-6xl'} font-bold text-white mb-2`}>
                    {hasAnimated && (
                      <CountUp
                        start={0}
                        end={stat.value}
                        duration={2.5}
                        separator=","
                        suffix={stat.suffix}
                      />
                    )}
                  </div>
                  
                  <h3 className={`${isMobile ? 'text-sm' : 'text-lg md:text-xl'} font-semibold text-white mb-1 md:mb-2 leading-tight`}>
                    {stat.label}
                  </h3>
                  
                  <p className={`text-gray-400 ${isMobile ? 'text-xs leading-tight' : 'text-sm'}`}>
                    {isMobile ? stat.label.split(' ')[0] : stat.description}
                  </p>

                  {/* Mobile: Subtle gradient line */}
                  {isMobile && (
                    <div className="mt-3 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-50" />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile: Additional Info */}
        {isMobile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 text-center"
          >
            <p className="text-gray-400 text-sm leading-relaxed">
              Trusted by businesses worldwide to deliver exceptional digital experiences
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}