import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Star, ArrowRight, X, Users, Clock, Shield } from 'lucide-react';

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
      "Inauguration de la Tour Eiffel",
      "Exposition Universelle de 1889",
      "Cafés de Montmartre avec les Impressionnistes",
      "Gastronomie de la Belle Époque",
    ],
    color: 'from-amber-500/20 to-orange-600/20',
    accent: '#f59e0b',
  },
  {
    id: 'cretace',
    title: 'Crétacé -65M',
    subtitle: 'L\'Ère des Dinosaures',
    period: 'Mésozoïque',
    price: '18 900',
    rating: 4.8,
    duration: '2-5 jours',
    groupSize: '2-4 personnes',
    image: 'https://images.unsplash.com/photo-1606567595334-d39972c85dbe?w=800&q=80',
    description:
      "Explorez des forêts luxuriantes peuplées de créatures majestueuses. Observez les dinosaures dans leur habitat naturel depuis nos zones d'observation sécurisées.",
    highlights: [
      "Observation de T-Rex et Tricératops",
      "Survol en aéronef sécurisé",
      "Flore préhistorique unique",
      "Coucher de soleil sur le Gondwana",
    ],
    color: 'from-emerald-500/20 to-teal-600/20',
    accent: '#10b981',
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
      "Atelier de Michel-Ange et le David",
      "Rencontre avec Léonard de Vinci",
      "Palais des Médicis",
      "Cuisine toscane authentique du XVIe",
    ],
    color: 'from-violet-500/20 to-purple-600/20',
    accent: '#8b5cf6',
  },
];

function DestinationCard({ dest, onClick, index }) {
  const imgSrc = dest.image;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ y: -8 }}
      onClick={onClick}
      className="group cursor-pointer relative rounded-2xl overflow-hidden bg-dark-card border border-dark-border hover:border-gold/30 transition-all duration-500 card-glow"
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={imgSrc}
          alt={dest.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-transparent to-transparent" />
        <div className="absolute top-4 right-4 glass px-3 py-1 rounded-full text-xs text-gold-light flex items-center gap-1">
          <Star className="w-3 h-3 fill-gold text-gold" />
          {dest.rating}
        </div>
        <div className="absolute top-4 left-4 glass px-3 py-1 rounded-full text-xs text-white">
          {dest.period}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-white mb-1 font-['Playfair_Display']">
          {dest.title}
        </h3>
        <p className="text-gold text-sm mb-3">{dest.subtitle}</p>
        <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-4">
          {dest.description}
        </p>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500">à partir de</span>
            <p className="text-gold text-xl font-bold">{dest.price}€</p>
          </div>
          <div className="flex items-center gap-2 text-gold-light text-sm group-hover:gap-3 transition-all duration-300">
            Découvrir <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function DestinationModal({ dest, onClose }) {
  if (!dest) return null;
  const imgSrc = dest.image;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="bg-dark-card border border-dark-border rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal image */}
        <div className="relative h-64 md:h-72">
          <img src={imgSrc} alt={dest.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-card to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 glass p-2 rounded-full text-white hover:text-gold transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 md:p-8 -mt-8 relative">
          <div className="flex items-center gap-2 mb-2">
            <span className="glass text-xs text-gold-light px-2 py-1 rounded-full">{dest.period}</span>
            <span className="flex items-center gap-1 text-xs text-gold">
              <Star className="w-3 h-3 fill-gold" /> {dest.rating}
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-1 font-['Playfair_Display']">
            {dest.title}
          </h2>
          <p className="text-gold mb-4">{dest.subtitle}</p>
          <p className="text-gray-400 leading-relaxed mb-6">{dest.description}</p>

          {/* Info grid */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="glass rounded-xl p-3 text-center">
              <Clock className="w-5 h-5 text-gold mx-auto mb-1" />
              <p className="text-xs text-gray-400">Durée</p>
              <p className="text-sm text-white font-medium">{dest.duration}</p>
            </div>
            <div className="glass rounded-xl p-3 text-center">
              <Users className="w-5 h-5 text-gold mx-auto mb-1" />
              <p className="text-xs text-gray-400">Groupe</p>
              <p className="text-sm text-white font-medium">{dest.groupSize}</p>
            </div>
            <div className="glass rounded-xl p-3 text-center">
              <Shield className="w-5 h-5 text-gold mx-auto mb-1" />
              <p className="text-xs text-gray-400">Sécurité</p>
              <p className="text-sm text-white font-medium">Maximale</p>
            </div>
          </div>

          {/* Highlights */}
          <h4 className="text-white font-semibold mb-3">Points forts</h4>
          <ul className="space-y-2 mb-6">
            {dest.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                {h}
              </li>
            ))}
          </ul>

          {/* Price and CTA */}
          <div className="flex items-center justify-between pt-4 border-t border-dark-border">
            <div>
              <p className="text-xs text-gray-500">À partir de</p>
              <p className="text-3xl font-bold text-gold">{dest.price}€</p>
              <p className="text-xs text-gray-500">par personne</p>
            </div>
            <button className="bg-gradient-to-r from-gold to-gold-dark text-dark font-semibold px-6 py-3 rounded-lg hover:from-gold-light hover:to-gold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gold/20">
              Réserver maintenant
            </button>
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
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm uppercase tracking-widest">Nos destinations</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4 font-['Playfair_Display']">
            Trois Époques, Trois <span className="shimmer-text">Aventures</span>
          </h2>
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
