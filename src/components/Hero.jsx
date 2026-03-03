import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';

const letterVariants = {
  hidden: { opacity: 0, y: 50, rotateX: -90 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.6, delay: 0.8 + i * 0.05, ease: [0.22, 1, 0.36, 1] },
  }),
};

function AnimatedText({ text, className }) {
  return (
    <span className={className}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={letterVariants}
          initial="hidden"
          animate="visible"
          className="inline-block"
          style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

const PARTICLES = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  duration: 4 + Math.random() * 6,
  delay: Math.random() * 4,
}));

export default function Hero() {
  const { scrollY } = useScroll();
  const videoY = useTransform(scrollY, [0, 800], [0, 200]);
  const contentY = useTransform(scrollY, [0, 600], [0, -100]);
  const overlayOpacity = useTransform(scrollY, [0, 400], [0.4, 0.9]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Video background with parallax */}
      <motion.div className="absolute inset-0" style={{ y: videoY }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-110"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Dark overlay with scroll-driven opacity */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-dark/60 via-dark/30 to-dark z-10"
        style={{ opacity: overlayOpacity }}
      />

      {/* Animated particles */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              background: `radial-gradient(circle, rgba(212,168,83,0.8), rgba(212,168,83,0))`,
            }}
            animate={{
              y: [0, -60, 0],
              x: [0, Math.sin(p.id) * 20, 0],
              opacity: [0, 0.9, 0],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Radial glow pulse */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(ellipse at center, rgba(212,168,83,0.04) 0%, transparent 60%)',
            'radial-gradient(ellipse at center, rgba(212,168,83,0.1) 0%, transparent 70%)',
            'radial-gradient(ellipse at center, rgba(212,168,83,0.04) 0%, transparent 60%)',
          ],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Horizontal light sweep */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none opacity-20"
        animate={{ x: ['-100%', '200%'] }}
        transition={{ duration: 6, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(212,168,83,0.15), transparent)',
          width: '30%',
        }}
      />

      {/* Content with parallax */}
      <motion.div
        className="relative z-20 text-center px-6 max-w-5xl mx-auto"
        style={{ y: contentY }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 glass px-5 py-2.5 rounded-full mb-8"
        >
          <motion.div
            animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Sparkles className="w-4 h-4 text-gold" />
          </motion.div>
          <span className="text-sm text-gold-light tracking-wide">
            Agence de Voyage Temporel de Luxe
          </span>
        </motion.div>

        {/* Title with letter-by-letter animation */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
          <AnimatedText text="Explorez le " className="text-white" />
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="shimmer-text"
          >
            Temps
          </motion.span>
        </h1>

        {/* Subtitle with slide-up + blur */}
        <motion.p
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 1.8, ease: 'easeOut' }}
          className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Voyagez à travers les époques les plus fascinantes de l'histoire.
          De la Belle Époque parisienne aux terres préhistoriques, vivez
          l'extraordinaire.
        </motion.p>

        {/* Buttons with stagger */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.a
            href="#destinations"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 2.3, ease: 'easeOut' }}
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(212,168,83,0.4)' }}
            whileTap={{ scale: 0.97 }}
            className="bg-gradient-to-r from-gold to-gold-dark text-dark font-semibold px-8 py-3.5 rounded-lg text-base inline-block"
          >
            Découvrir nos Destinations
          </motion.a>
          <motion.a
            href="#quiz"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 2.5, ease: 'easeOut' }}
            whileHover={{ scale: 1.05, borderColor: 'rgba(212,168,83,0.6)' }}
            whileTap={{ scale: 0.97 }}
            className="border border-gold/30 text-gold px-8 py-3.5 rounded-lg text-base inline-block"
          >
            Trouver mon Voyage Idéal
          </motion.a>
        </motion.div>

        {/* Stats with count-up effect */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.8 }}
          className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
        >
          {[
            { value: '3', label: 'Époques' },
            { value: '∞', label: 'Aventures' },
            { value: '5★', label: 'Expérience' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 3 + i * 0.15, type: 'spring', stiffness: 200 }}
              className="text-center"
            >
              <motion.div
                className="text-2xl md:text-3xl font-bold text-gold font-['Playfair_Display']"
                animate={{ textShadow: ['0 0 0px rgba(212,168,83,0)', '0 0 15px rgba(212,168,83,0.5)', '0 0 0px rgba(212,168,83,0)'] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.a
          href="#destinations"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="text-gold/50 hover:text-gold transition-colors flex flex-col items-center gap-2"
        >
          <motion.span
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-xs text-gold/60 tracking-widest uppercase"
          >
            Scroll
          </motion.span>
          <ChevronDown size={28} />
        </motion.a>
      </motion.div>
    </section>
  );
}
