import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, Clock, Users, Award } from 'lucide-react';

function AnimatedCounter({ target, suffix = '', duration = 2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const num = parseInt(target) || 0;
    if (num === 0) { setCount(target); return; }
    let start = 0;
    const step = num / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= num) { setCount(num); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return (
    <span ref={ref}>
      {typeof count === 'number' ? count : target}{suffix}
    </span>
  );
}

const features = [
  {
    icon: Shield,
    title: 'Sécurité Maximale',
    description: "Protocoles certifiés et dispositifs de retour d'urgence pour chaque voyageur.",
  },
  {
    icon: Clock,
    title: 'Précision Temporelle',
    description: 'Notre technologie garantit un positionnement à la seconde et au mètre près.',
  },
  {
    icon: Users,
    title: 'Guides Experts',
    description: "Des historiens et scientifiques passionnés vous accompagnent à chaque époque.",
  },
  {
    icon: Award,
    title: 'Expérience Premium',
    description: "Hébergement d'époque authentique, cuisine locale et immersion totale.",
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      {/* Background decorative element */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        className="absolute -right-40 top-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-gold/5 rounded-full pointer-events-none"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
        className="absolute -right-20 top-1/2 -translate-y-1/2 w-[350px] h-[350px] border border-gold/5 rounded-full pointer-events-none"
      />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span
              initial={{ opacity: 0, letterSpacing: '0.1em' }}
              whileInView={{ opacity: 1, letterSpacing: '0.2em' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-gold text-sm uppercase tracking-widest"
            >
              À propos
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-6 font-['Playfair_Display']">
              Pionniers du <span className="shimmer-text">Voyage Temporel</span>
            </h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 60 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="h-[2px] bg-gradient-to-r from-gold to-gold-light mb-6"
            />
            <p className="text-gray-400 leading-relaxed mb-6">
              Depuis notre fondation, TimeTravel Agency repousse les limites du possible.
              Notre mission : offrir des expériences de voyage extraordinaires à travers
              les époques les plus fascinantes de l'histoire.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              Chaque voyage est minutieusement préparé par notre équipe d'historiens,
              de scientifiques et d'experts en voyage temporel.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '500', suffix: '+', label: 'Voyages réalisés' },
                { value: '100', suffix: '%', label: 'Retours sécurisés' },
                { value: '3', suffix: '', label: 'Époques accessibles' },
                { value: '24', suffix: '/7', label: 'Support temporel' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1, type: 'spring' }}
                  whileHover={{ scale: 1.05, borderColor: 'rgba(212,168,83,0.3)' }}
                  className="glass rounded-xl p-4"
                >
                  <p className="text-2xl font-bold text-gold font-['Playfair_Display']">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4"
          >
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.12 }}
                  whileHover={{ x: 10, boxShadow: '0 0 20px rgba(212,168,83,0.1)' }}
                  className="glass rounded-xl p-5 flex items-start gap-4 group hover:border-gold/30 transition-all duration-300"
                >
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center shrink-0 group-hover:bg-gold/20 transition-colors"
                  >
                    <Icon className="w-6 h-6 text-gold" />
                  </motion.div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">{feature.title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
