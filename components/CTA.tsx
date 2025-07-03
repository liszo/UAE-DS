'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { Canvas } from '@react-three/fiber';
import { Torus, MeshDistortMaterial } from '@react-three/drei';
import gsap from 'gsap';
import { FaArrowRight, FaWhatsapp, FaEnvelope, FaPhone, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

export default function CTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      const ctx = gsap.context(() => {
        gsap.fromTo('.cta-text',
          {
            opacity: 0,
            y: 50,
            scale: 0.9
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }, containerRef);
      return () => ctx.revert();
    }
  }, [isMobile]);

  return (
    <section ref={containerRef} className="relative py-16 md:py-32 bg-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-blue-50" />
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgb(0 0 0 / 0.05) 1px, transparent 1px)`,
          backgroundSize: isMobile ? '20px 20px' : '40px 40px'
        }} />
        
        {/* Mobile: Animated gradient */}
        {isMobile && (
          <motion.div
            className="absolute inset-0 opacity-30"
            style={{
              background: 'linear-gradient(45deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))',
              backgroundSize: '400% 400%'
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        )}
      </div>

      {/* 3D Element - Desktop Only */}
      {!isMobile && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-30">
          <Canvas>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <Torus args={[1, 0.4, 16, 100]} rotation={[Math.PI / 4, 0, 0]}>
              <MeshDistortMaterial
                color="#8B5CF6"
                attach="material"
                distort={0.3}
                speed={2}
                roughness={0}
                metalness={0.8}
              />
            </Torus>
          </Canvas>
        </div>
      )}

      <motion.div
        style={isMobile ? {} : { scale, opacity }}
        className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 bg-black/5 rounded-full text-black/60 text-xs md:text-sm font-medium mb-6 md:mb-8"
        >
          <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
          Let's work together
        </motion.div>

        {/* Main Heading */}
        <h2 className="cta-text text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-bold text-black mb-4 md:mb-6 leading-tight">
          Ready to start your
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
            next project?
          </span>
        </h2>

        {/* Description */}
        <p className="cta-text text-sm md:text-lg lg:text-xl xl:text-2xl text-black/60 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed">
          Let's create something extraordinary together. Get in touch and let's discuss how we can transform your digital presence.
        </p>

        {/* CTA Buttons */}
        <div className={`cta-text ${isMobile ? 'space-y-3' : 'flex flex-col sm:flex-row gap-4 justify-center'} mb-8 md:mb-12`}>
          <Link href="/booking" className={isMobile ? 'block' : ''}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`group relative ${isMobile ? 'w-full' : ''} px-6 md:px-8 py-3 md:py-4 bg-black text-white font-semibold rounded-full overflow-hidden transition-all hover:scale-105`}
            >
              <span className="relative z-10 flex items-center justify-center text-sm md:text-base">
                Schedule a Call
                <FaArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </motion.button>
          </Link>

          <div className={`${isMobile ? 'grid grid-cols-2 gap-2' : 'flex gap-4'}`}>
            <a 
              href="https://wa.me/971501234567"
              className={`group ${isMobile ? 'block' : ''}`}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`${isMobile ? 'w-full' : ''} px-4 md:px-8 py-3 md:py-4 bg-green-500 text-white font-semibold rounded-full hover:bg-green-600 transition-all hover:scale-105 flex items-center justify-center text-sm md:text-base`}
              >
                <FaWhatsapp className="mr-2 text-lg" />
                {isMobile ? 'WhatsApp' : 'WhatsApp Us'}
              </motion.button>
            </a>

            <a 
              href="mailto:hello@uaedigital.ae"
              className={`group ${isMobile ? 'block' : ''}`}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`${isMobile ? 'w-full' : ''} px-4 md:px-8 py-3 md:py-4 bg-white text-black font-semibold rounded-full border-2 border-black/10 hover:border-black/20 transition-all hover:scale-105 flex items-center justify-center text-sm md:text-base`}
              >
                <FaEnvelope className="mr-2" />
                {isMobile ? 'Email' : 'Send Email'}
              </motion.button>
            </a>
          </div>
        </div>

        {/* Contact Info */}
        <div className={`cta-text ${isMobile ? 'space-y-4' : 'grid grid-cols-1 md:grid-cols-3 gap-8'} mt-12 md:mt-20`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`${isMobile ? 'flex items-center gap-4 p-4 bg-black/5 rounded-2xl' : 'text-center'}`}
          >
            <div className={`${isMobile ? 'w-12 h-12' : 'w-16 h-16'} bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center ${isMobile ? '' : 'mx-auto mb-4'}`}>
              <FaMapMarkerAlt className={`text-white ${isMobile ? 'text-lg' : 'text-2xl'}`} />
            </div>
            <div className={isMobile ? 'flex-1' : ''}>
              <h3 className={`font-semibold text-black mb-1 ${isMobile ? 'text-base' : 'text-lg'}`}>Visit Us</h3>
              <p className={`text-black/60 ${isMobile ? 'text-sm' : 'text-base'}`}>Dubai, UAE</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`${isMobile ? 'flex items-center gap-4 p-4 bg-black/5 rounded-2xl' : 'text-center'}`}
          >
            <div className={`${isMobile ? 'w-12 h-12' : 'w-16 h-16'} bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center ${isMobile ? '' : 'mx-auto mb-4'}`}>
              <FaClock className={`text-white ${isMobile ? 'text-lg' : 'text-2xl'}`} />
            </div>
            <div className={isMobile ? 'flex-1' : ''}>
              <h3 className={`font-semibold text-black mb-1 ${isMobile ? 'text-base' : 'text-lg'}`}>Working Hours</h3>
              <p className={`text-black/60 ${isMobile ? 'text-sm' : 'text-base'}`}>Sun - Thu: 9AM - 6PM</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={`${isMobile ? 'flex items-center gap-4 p-4 bg-black/5 rounded-2xl' : 'text-center'}`}
          >
            <div className={`${isMobile ? 'w-12 h-12' : 'w-16 h-16'} bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center ${isMobile ? '' : 'mx-auto mb-4'}`}>
              <FaPhone className={`text-white ${isMobile ? 'text-lg' : 'text-2xl'}`} />
            </div>
            <div className={isMobile ? 'flex-1' : ''}>
              <h3 className={`font-semibold text-black mb-1 ${isMobile ? 'text-base' : 'text-lg'}`}>Call Us</h3>
              <p className={`text-black/60 ${isMobile ? 'text-sm' : 'text-base'}`}>+971 50 123 4567</p>
            </div>
          </motion.div>
        </div>

        {/* Mobile: Additional Quick Actions */}
        {isMobile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 pt-8 border-t border-black/10"
          >
            <p className="text-black/60 text-sm mb-4">
              Or explore our services
            </p>
            <div className="flex gap-2 justify-center">
              <Link href="/services">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-black/5 text-black text-sm rounded-full hover:bg-black/10 transition-colors"
                >
                  Our Services
                </motion.button>
              </Link>
              <Link href="/cases">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-black/5 text-black text-sm rounded-full hover:bg-black/10 transition-colors"
                >
                  Case Studies
                </motion.button>
              </Link>
            </div>
          </motion.div>
        )}

        {/* Response Time Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className={`inline-flex items-center px-4 py-2 bg-green-50 border border-green-200 rounded-full text-green-700 text-xs md:text-sm font-medium ${isMobile ? 'mt-6' : 'mt-12'}`}
        >
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
          We typically respond within 2 hours
        </motion.div>
      </motion.div>
    </section>
  );
}