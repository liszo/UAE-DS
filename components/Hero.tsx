'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float } from '@react-three/drei';
import Link from 'next/link';
import gsap from 'gsap';
import { FiArrowRight, FiZap, FiTrendingUp, FiCpu, FiPlay } from 'react-icons/fi';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isMobile) {
        const { clientX, clientY } = e;
        const x = (clientX / window.innerWidth - 0.5) * 2;
        const y = (clientY / window.innerHeight - 0.5) * 2;
        setMousePosition({ x, y });
      }
    };

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    // Animate heading letters
    if (headingRef.current) {
      const letters = headingRef.current.querySelectorAll('.letter');
      gsap.fromTo(letters, 
        { 
          y: isMobile ? 30 : 100, 
          opacity: 0,
          rotateX: isMobile ? -30 : -90 
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: isMobile ? 0.6 : 1,
          stagger: isMobile ? 0.02 : 0.05,
          ease: "power4.out",
          delay: 0.2
        }
      );
    }

    return () => {
      if (!isMobile) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [isMobile]);

  const floatingCards = [
    {
      icon: <FiCpu className="w-5 h-5" />,
      title: "AI-Powered",
      description: "Smart automation solutions",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <FiZap className="w-5 h-5" />,
      title: "Lightning Fast",
      description: "Optimized performance",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <FiTrendingUp className="w-5 h-5" />,
      title: "Growth Focused",
      description: "10x ROI guaranteed",
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* 3D Background - Hidden on mobile for performance */}
      {!isMobile && (
        <div className="absolute inset-0">
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <Float speed={2} rotationIntensity={1} floatIntensity={2}>
              <Sphere args={[1, 64, 64]} scale={2.5} position={[2, 0, -2]}>
                <MeshDistortMaterial
                  color="#8B5CF6"
                  attach="material"
                  distort={0.5}
                  speed={2}
                  roughness={0}
                />
              </Sphere>
            </Float>
            <Float speed={3} rotationIntensity={0.5} floatIntensity={1}>
              <Sphere args={[1, 64, 64]} scale={1.5} position={[-3, -1, -3]}>
                <MeshDistortMaterial
                  color="#3B82F6"
                  attach="material"
                  distort={0.3}
                  speed={3}
                  roughness={0}
                />
              </Sphere>
            </Float>
          </Canvas>
        </div>
      )}

      {/* Enhanced Mobile Background */}
      {isMobile && (
        <div className="absolute inset-0">
          {/* Primary gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black to-blue-900/30" />
          
          {/* Animated gradient overlay */}
          <motion.div
            className="absolute inset-0 opacity-40"
            style={{
              background: 'linear-gradient(45deg, rgba(139, 92, 246, 0.3), rgba(59, 130, 246, 0.3), rgba(16, 185, 129, 0.2))',
              backgroundSize: '400% 400%'
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
          
          {/* Floating orbs */}
          <motion.div
            className="absolute top-1/4 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-1/4 left-0 w-48 h-48 bg-gradient-to-tr from-pink-500/20 to-purple-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.7, 0.4]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Animated particles */}
          <motion.div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(139, 92, 246, 0.4) 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}
            animate={{ 
              backgroundPosition: ['0px 0px', '40px 40px'] 
            }}
            transition={{ 
              duration: 25, 
              repeat: Infinity, 
              ease: 'linear' 
            }}
          />
        </div>
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

      {/* Mouse Follow Light - Desktop Only */}
      {!isMobile && (
        <motion.div
          className="absolute w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
            x: mousePosition.x * 50,
            y: mousePosition.y * 50,
            filter: 'blur(40px)',
          }}
        />
      )}

      {/* Content */}
      <motion.div 
        style={{ y: isMobile ? 0 : y, opacity }}
        className={`relative z-20 container mx-auto px-4 md:px-6 ${isMobile ? 'pt-8' : ''}`}
      >
        <div className={`${isMobile ? 'text-center space-y-8' : 'grid lg:grid-cols-2 gap-8 md:gap-12 items-center'}`}>
          {/* Left Content */}
          <div className="text-white text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={`mb-4 md:mb-6 ${isMobile ? 'flex justify-center' : ''}`}
            >
              <span className={`inline-block bg-white/10 backdrop-blur-sm rounded-full font-medium border border-white/20 ${
                isMobile ? 'px-4 py-2 text-sm' : 'px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm'
              }`}>
                Next-Gen Digital Solutions
              </span>
            </motion.div>

            <h1 
              ref={headingRef}
              className={`font-black mb-4 md:mb-6 ${
                isMobile 
                  ? 'text-4xl sm:text-5xl' 
                  : 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl'
              }`}
              style={{ 
                fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
                fontWeight: '900',
                letterSpacing: '-0.02em',
                lineHeight: '1.2',
                paddingBottom: '0.1em'
              }}
            >
              {['We', 'craft', 'digital', 'experiences'].map((word, wordIndex) => (
                <span 
                  key={wordIndex} 
                  className={`inline-block ${isMobile ? 'mr-3 mb-1' : 'mr-2 md:mr-4'}`}
                  style={{ 
                    paddingBottom: '0.05em',
                    overflow: 'visible'
                  }}
                >
                  {word.split('').map((letter, letterIndex) => (
                    <span
                      key={letterIndex}
                      className="letter inline-block"
                      style={{ 
                        display: 'inline-block',
                        background: wordIndex < 2 
                          ? 'linear-gradient(135deg, #ffffff 0%, #e5e7eb 100%)' 
                          : 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        textShadow: wordIndex >= 2 ? '0 0 30px rgba(139, 92, 246, 0.5)' : 'none',
                        paddingBottom: '0.08em',
                        overflow: 'visible',
                        position: 'relative'
                      }}
                    >
                      {letter}
                    </span>
                  ))}
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`text-gray-300 mb-6 md:mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0 ${
                isMobile ? 'text-base px-2' : 'text-sm sm:text-base md:text-lg lg:text-xl'
              }`}
            >
              Transform your business with AI-powered solutions that drive innovation, 
              boost performance, and deliver exceptional results.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className={`flex gap-3 md:gap-4 justify-center lg:justify-start ${
                isMobile ? 'flex-col max-w-xs mx-auto' : 'flex-col sm:flex-row'
              }`}
            >
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: isMobile ? 1.02 : 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 ${
                    isMobile 
                      ? 'w-full px-6 py-4 text-base' 
                      : 'w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 text-sm md:text-base'
                  }`}
                >
                  Start Your Project
                  <FiArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                </motion.button>
              </Link>
              <Link href="/cases">
                <motion.button
                  whileHover={{ scale: isMobile ? 1.02 : 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`bg-white/10 backdrop-blur-sm rounded-full font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300 ${
                    isMobile 
                      ? 'w-full px-6 py-4 text-base' 
                      : 'w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 text-sm md:text-base'
                  }`}
                >
                  View Our Work
                </motion.button>
              </Link>
            </motion.div>
          </div>

          {/* Right Content - Mobile Optimized */}
          <div className={`relative ${isMobile ? 'mt-8' : 'mt-8 lg:mt-0'}`}>
            {isMobile ? (
              // Mobile: Stacked feature cards
              <div className="space-y-4 max-w-sm mx-auto">
                {floatingCards.map((card, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  >
                    <motion.div
                      whileTap={{ scale: 0.98 }}
                      className={`bg-gradient-to-br ${card.color} p-0.5 rounded-2xl`}
                    >
                      <div className="bg-black/85 backdrop-blur-md rounded-2xl p-5">
                        <div className="flex items-center gap-4 mb-3">
                          <div className={`p-3 bg-gradient-to-r ${card.color} rounded-xl flex-shrink-0`}>
                            {card.icon}
                          </div>
                          <div>
                            <h3 className="text-white font-bold text-lg">{card.title}</h3>
                            <p className="text-gray-400 text-sm">{card.description}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            ) : (
              // Desktop: Floating positioned cards
              <div className="relative h-[600px] z-20">
                {floatingCards.map((card, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
                    className="absolute z-20"
                    style={{
                      top: `${index * 30}%`,
                      right: `${index * 15}%`,
                    }}
                  >
                    <motion.div
                      animate={{
                        y: [0, -20, 0],
                      }}
                      transition={{
                        duration: 4 + index,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      whileHover={{ scale: 1.05, rotateY: 10 }}
                      className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:border-purple-500/50 transition-all duration-300 cursor-pointer"
                      style={{
                        transform: 'perspective(1000px)',
                        transformStyle: 'preserve-3d',
                      }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg">
                          {card.icon}
                        </div>
                        <h3 className="text-white font-semibold">{card.title}</h3>
                      </div>
                      <p className="text-gray-400 text-sm">{card.description}</p>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator - Enhanced for mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className={`border-2 border-white/30 rounded-full flex justify-center ${
            isMobile ? 'w-6 h-10' : 'w-5 h-8 md:w-6 md:h-10'
          }`}
        >
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className={`bg-white/50 rounded-full ${
              isMobile ? 'w-1 h-3 mt-2' : 'w-0.5 h-2 md:w-1 md:h-3 mt-1.5 md:mt-2'
            }`}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}