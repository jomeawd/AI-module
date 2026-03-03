import { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { MapPin, Star, ArrowRight, X, Users, Clock, Shield } from 'lucide-react';

const destinations = [
  {
    id: 'paris',
    title: 'Paris 1889',
    subtitle: 'La Belle Époque',
    period: 'XIXe siècle',
    price: '12 500',
    rating: 4.9,
    duration: '3-7 jours',
    groupSize: '1-6 personnes',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
    description:
      "Vivez l'effervescence de l'Exposition Universelle et admirez la Tour Eiffel fraîchement construite. Flânez dans les cafés de Montmartre et rencontrez les esprits les plus brillants de l'époque.",
    highlights: [
      'Inauguration de la Tour Eiffel',
      'Exposition Universelle de 1889',
      'Cafés de Montmartre avec les Impressionnistes',
      'Gastronomie de la Belle Époque',
    ],
    emoji: '🗼',
  },
  {
    id: 'cretace',
    title: 'Crétacé -65M',
    subtitle: "L'Ère des Dinosaures",
    period: 'Mésozoïque',
    price: '18 900',
    rating: 4.8,
    duration: '2-5 jours',
    groupSize: '2-4 personnes',
    image: 'https://images.unsplash.com/photo-1606567595334-d39972c85dbe?w=800&q=80',
    description:
      "Explorez des forêts luxuriantes peuplées de créatures majestueuses. Observez les dinosaures dans leur habitat naturel depuis nos zones d'observation sécurisées.",
    highlights: [
      'Observation de T-Rex et Tricératops',
      'Survol en aéronef sécurisé',
      'Flore préhistorique unique',
      'Coucher de soleil sur le Gondwana',
    ],
    emoji: '🦕',
  },
  {
    id: 'florence',
    title: 'Florence 1504',
    subtitle: 'La Renaissance Italienne',
    period: 'XVIe siècle',
    price: '14 200',
    rating: 4.9,
    duration: '4-8 jours',
    groupSize: '1-8 personnes',
    image: 'https://images.unsplash.com/photo-1543429776-2782fc8e6e2d?w=800&q=80',
    description:
      "Plongez au cœur de la Renaissance florentine. Assistez à la création du David de Michel-Ange et côtoyez Léonard de Vinci dans son atelier.",
    highlights: [
      'Atelier de Michel-Ange et le David',
      'Rencontre avec Léonard de Vinci',
      'Palais des Médicis',
      'Cuisine toscane authentique du XVIe',
    ],
    emoji: '🎨',
  },
];

function DestinationCard({ dest, onClick, index }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 80, rotateX: 15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="group cursor-pointer relative rounded-2xl overflow-hidden bg-dark-card border border-dark-border hover:border-gold/40 transition-all duration-500"
    >
      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
        style={{
          background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(212,168,83,0.08), transparent 60%)',
        }}
      />

      {/* Image with zoom */}
      <div className="relative h-64 overflow-hidden">
        <motion.img
          src={dest.image}
          alt={dest.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.12 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-dark-card/20 to-transparent" />

        {/* Floating emoji */}
        <motion.div
          className="absolute top-4 left-4 text-3xl"
          animate={{ y: [0, -5, 0], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          {dest.emoji}
        </motion.div>

        <div className="absolute top-4 right-4 glass px-3 py-1 rounded-full text-xs text-gold-light flex items-center gap-1">
          <Star className="w-3 h-3 fill-gold text-gold" />
          {dest.rating}
        </div>

        {/* Period badge that slides in */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + index * 0.2, duration: 0.5 }}
          className="absolute bottom-4 left-4 glass px-3 py-1 rounded-full text-xs text-white"
        >
          {dest.period}
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-white mb-1 font-['Playfair_Display'] group-hover:text-gold transition-colors duration-300">
          {dest.title}
        </h3>
        <p className="text-gold text-sm mb-3">{dest.subtitle}</p>
        <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-4">
          {dest.description}
        </p>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500">à partir de</span>
            <motion.p
              className="text-gold text-xl font-bold"
              whileHover={{ scale: 1.1 }}
            >
              {dest.price}€
            </motion.p>
          </div>
          <motion.div
            className="flex items-center gap-2 text-gold-light text-sm"
            whileHover={{ x: 5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            Découvrir <ArrowRight className="w-4 h-4" />
          </motion.div>
        </div>
      </div>

      {/* Bottom border animation on hover */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-gold to-gold-light"
        initial={{ width: '0%' }}
        whileHover={{ width: '100%' }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
}

function DestinationModal({ dest, onClose }) {
  if (!dest) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{ type: 'spring', damping: 22, stiffness: 250 }}
        className="bg-dark-card border border-dark-border rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-64 md:h-72 overflow-hidden">
          <motion.img
            src={dest.image}
            alt={dest.title}
            className="w-full h-full object-cover"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-card to-transparent" />
          <motion.button
            onClick={onClose}
            whileHover={{ rotate: 90, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-4 right-4 glass p-2 rounded-full text-white hover:text-gold transition-colors"
          >
            <X size={20} />
          </motion.button>
          <motion.div
            className="absolute top-4 left-4 text-4xl"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', delay: 0.3 }}
          >
            {dest.emoji}
          </motion.div>
        </div>

        <div className="p-6 md:p-8 -mt-8 relative">
          <div className="flex items-center gap-2 mb-2">
            <span className="glass text-xs text-gold-light px-2 py-1 rounded-full">
              {dest.period}
            </span>
            <span className="flex items-center gap-1 text-xs text-gold">
              <Star className="w-3 h-3 fill-gold" /> {dest.rating}
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-1 font-['Playfair_Display']">
            {dest.title}
          </h2>
          <p className="text-gold mb-4">{dest.subtitle}</p>
          <p className="text-gray-400 leading-relaxed mb-6">{dest.description}</p>

          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { icon: Clock, label: 'Durée', value: dest.duration },
              { icon: Users, label: 'Groupe', value: dest.groupSize },
              { icon: Shield, label: 'Sécurité', value: 'Maximale' },
            ].map((info, i) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="glass rounded-xl p-3 text-center"
              >
                <info.icon className="w-5 h-5 text-gold mx-auto mb-1" />
                <p className="text-xs text-gray-400">{info.label}</p>
                <p className="text-sm text-white font-medium">{info.value}</p>
              </motion.div>
            ))}
          </div>

          <h4 className="text-white font-semibold mb-3">Points forts</h4>
          <ul className="space-y-2 mb-6">
            {dest.highlights.map((h, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-start gap-2 text-gray-300 text-sm"
              >
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                {h}
              </motion.li>
            ))}
          </ul>

          <div className="flex items-center justify-between pt-4 border-t border-dark-border">
            <div>
              <p className="text-xs text-gray-500">À partir de</p>
              <p className="text-3xl font-bold text-gold">{dest.price}€</p>
              <p className="text-xs text-gray-500">par personne</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(212,168,83,0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-gold to-gold-dark text-dark font-semibold px-6 py-3 rounded-lg"
            >
              Réserver maintenant
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Destinations() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="destinations" className="py-24 px-6 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, letterSpacing: '0.1em' }}
            whileInView={{ opacity: 1, letterSpacing: '0.2em' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-gold text-sm uppercase tracking-widest"
          >
            Nos destinations
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4 font-['Playfair_Display']">
            Trois Époques, Trois <span className="shimmer-text">Aventures</span>
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-[2px] bg-gradient-to-r from-gold to-gold-light mx-auto mb-4"
          />
          <p className="text-gray-400 max-w-xl mx-auto">
            Chaque destination a été soigneusement sélectionnée pour offrir une expérience
            unique et inoubliable à travers le temps.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {destinations.map((dest, i) => (
            <DestinationCard
              key={dest.id}
              dest={dest}
              index={i}
              onClick={() => setSelected(dest)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <DestinationModal dest={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
