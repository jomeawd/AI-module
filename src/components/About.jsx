import { motion } from 'framer-motion';
import { Shield, Clock, Users, Award } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Sécurité Maximale',
    description: 'Protocoles certifiés et dispositifs de retour d\'urgence pour chaque voyageur.',
  },
  {
    icon: Clock,
    title: 'Précision Temporelle',
    description: 'Notre technologie garantit un positionnement à la seconde et au mètre près.',
  },
  {
    icon: Users,
    title: 'Guides Experts',
    description: 'Des historiens et scientifiques passionnés vous accompagnent à chaque époque.',
  },
  {
    icon: Award,
    title: 'Expérience Premium',
    description: 'Hébergement d\'époque authentique, cuisine locale et immersion totale.',
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 px-6 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-gold text-sm uppercase tracking-widest">À propos</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-6 font-['Playfair_Display']">
              Pionniers du <span className="shimmer-text">Voyage Temporel</span>
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              Depuis notre fondation, TimeTravel Agency repousse les limites du possible.
              Notre mission : offrir des expériences de voyage extraordinaires à travers
              les époques les plus fascinantes de l'histoire.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              Chaque voyage est minutieusement préparé par notre équipe d'historiens,
              de scientifiques et d'experts en voyage temporel. Nous garantissons une
              immersion totale dans le respect absolu de la sécurité de nos voyageurs.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '500+', label: 'Voyages réalisés' },
                { value: '100%', label: 'Retours sécurisés' },
                { value: '3', label: 'Époques accessibles' },
                { value: '24/7', label: 'Support temporel' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="glass rounded-xl p-4"
                >
                  <p className="text-2xl font-bold text-gold font-['Playfair_Display']">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right features */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  whileHover={{ x: 8 }}
                  className="glass rounded-xl p-5 flex items-start gap-4 group hover:border-gold/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center shrink-0 group-hover:bg-gold/20 transition-colors">
                    <Icon className="w-6 h-6 text-gold" />
                  </div>
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
