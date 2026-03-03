import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Palette, TreePine, Landmark, ChevronRight, RotateCcw, Sparkles } from 'lucide-react';

const questions = [
  {
    question: "Quel type d'expérience recherchez-vous ?",
    options: [
      { label: 'Culturelle et artistique', icon: Palette, scores: { paris: 2, florence: 3, cretace: 0 } },
      { label: 'Aventure et nature', icon: TreePine, scores: { paris: 0, florence: 0, cretace: 3 } },
      { label: 'Élégance et raffinement', icon: Sparkles, scores: { paris: 3, florence: 2, cretace: 0 } },
    ],
  },
  {
    question: 'Votre période historique préférée ?',
    options: [
      { label: 'Histoire moderne (XIXe siècle)', icon: Landmark, scores: { paris: 3, florence: 0, cretace: 0 } },
      { label: 'Temps anciens et origines', icon: Compass, scores: { paris: 0, florence: 0, cretace: 3 } },
      { label: 'Renaissance et classicisme', icon: Palette, scores: { paris: 1, florence: 3, cretace: 0 } },
    ],
  },
  {
    question: 'Vous préférez :',
    options: [
      { label: "L'effervescence urbaine", icon: Landmark, scores: { paris: 3, florence: 2, cretace: 0 } },
      { label: 'La nature sauvage', icon: TreePine, scores: { paris: 0, florence: 0, cretace: 3 } },
      { label: "L'art et l'architecture", icon: Palette, scores: { paris: 1, florence: 3, cretace: 0 } },
    ],
  },
  {
    question: 'Votre activité idéale :',
    options: [
      { label: 'Visiter des monuments', icon: Landmark, scores: { paris: 3, florence: 2, cretace: 0 } },
      { label: 'Observer la faune', icon: TreePine, scores: { paris: 0, florence: 0, cretace: 3 } },
      { label: 'Explorer des musées', icon: Palette, scores: { paris: 1, florence: 3, cretace: 1 } },
    ],
  },
];

const results = {
  paris: {
    title: 'Paris 1889',
    subtitle: 'La Belle Époque vous attend !',
    description:
      "Votre profil correspond parfaitement à la magie de Paris en 1889. Vous allez adorer l'énergie de l'Exposition Universelle, les lumières de la Tour Eiffel nouvellement construite et l'atmosphère effervescente des cafés de Montmartre.",
    emoji: '🗼',
    color: 'from-amber-500 to-orange-600',
  },
  cretace: {
    title: 'Crétacé -65M',
    subtitle: "L'aventure ultime vous appelle !",
    description:
      "Vous êtes un aventurier dans l'âme ! Le Crétacé est fait pour vous. Imaginez-vous face à face avec un T-Rex, survolant des paysages vierges et découvrant une nature à l'état pur.",
    emoji: '🦕',
    color: 'from-emerald-500 to-teal-600',
  },
  florence: {
    title: 'Florence 1504',
    subtitle: 'La Renaissance vous inspire !',
    description:
      "Votre âme d'artiste s'épanouira dans la Florence de la Renaissance. Entre les ateliers de Michel-Ange, les fresques de Botticelli et les intrigues des Médicis, chaque instant sera une œuvre d'art.",
    emoji: '🎨',
    color: 'from-violet-500 to-purple-600',
  },
};

export default function Quiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState({ paris: 0, cretace: 0, florence: 0 });
  const [result, setResult] = useState(null);
  const [started, setStarted] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleAnswer = (option, i) => {
    setSelectedOption(i);
    setTimeout(() => {
      const newScores = { ...scores };
      Object.entries(option.scores).forEach(([key, val]) => {
        newScores[key] += val;
      });
      setScores(newScores);
      setSelectedOption(null);

      if (currentQ < questions.length - 1) {
        setCurrentQ(currentQ + 1);
      } else {
        const winner = Object.entries(newScores).reduce((a, b) =>
          a[1] > b[1] ? a : b
        )[0];
        setResult(results[winner]);
      }
    }, 400);
  };

  const reset = () => {
    setCurrentQ(0);
    setScores({ paris: 0, cretace: 0, florence: 0 });
    setResult(null);
    setStarted(false);
    setSelectedOption(null);
  };

  return (
    <section id="quiz" className="py-24 px-6 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.span
            initial={{ opacity: 0, letterSpacing: '0.1em' }}
            whileInView={{ opacity: 1, letterSpacing: '0.2em' }}
            viewport={{ once: true }}
            className="text-gold text-sm uppercase tracking-widest"
          >
            Recommandation IA
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4 font-['Playfair_Display']">
            Trouvez votre <span className="shimmer-text">Destination</span> Idéale
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-[2px] bg-gradient-to-r from-gold to-gold-light mx-auto mb-4"
          />
          <p className="text-gray-400">
            Répondez à 4 questions et notre algorithme trouvera l'époque parfaite pour vous.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass rounded-2xl p-8 md:p-10"
        >
          <AnimatePresence mode="wait">
            {!started && !result && (
              <motion.div
                key="start"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                className="text-center py-8"
              >
                <motion.div
                  className="text-6xl mb-6"
                  animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  ⏳
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-3 font-['Playfair_Display']">
                  Quiz : Quelle époque êtes-vous ?
                </h3>
                <p className="text-gray-400 mb-8 max-w-md mx-auto">
                  4 questions rapides pour découvrir la destination temporelle qui correspond
                  à votre personnalité.
                </p>
                <motion.button
                  onClick={() => setStarted(true)}
                  whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(212,168,83,0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-gold to-gold-dark text-dark font-semibold px-8 py-3 rounded-lg inline-flex items-center gap-2"
                >
                  Commencer le Quiz <ChevronRight className="w-5 h-5" />
                </motion.button>
              </motion.div>
            )}

            {started && !result && (
              <motion.div
                key={`q-${currentQ}`}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-center justify-between mb-8">
                  <span className="text-sm text-gray-500">
                    Question {currentQ + 1} / {questions.length}
                  </span>
                  <div className="flex gap-1.5">
                    {questions.map((_, i) => (
                      <motion.div
                        key={i}
                        className={`h-1.5 rounded-full transition-colors duration-300 ${
                          i <= currentQ ? 'bg-gold' : 'bg-dark-border'
                        }`}
                        animate={{ width: i <= currentQ ? 32 : 20 }}
                        transition={{ duration: 0.3 }}
                      />
                    ))}
                  </div>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-white mb-8 font-['Playfair_Display']">
                  {questions[currentQ].question}
                </h3>

                <div className="space-y-3">
                  {questions[currentQ].options.map((option, i) => {
                    const Icon = option.icon;
                    const isSelected = selectedOption === i;
                    return (
                      <motion.button
                        key={i}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.3 }}
                        whileHover={{ scale: 1.02, x: 8 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleAnswer(option, i)}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 text-left group ${
                          isSelected
                            ? 'border-gold bg-gold/10 scale-[1.02]'
                            : 'border-dark-border hover:border-gold/40 bg-dark-lighter/50 hover:bg-gold/5'
                        }`}
                      >
                        <motion.div
                          animate={isSelected ? { rotate: 360, scale: 1.2 } : {}}
                          className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors"
                        >
                          <Icon className="w-5 h-5 text-gold" />
                        </motion.div>
                        <span className="text-gray-200 group-hover:text-white transition-colors flex-1">
                          {option.label}
                        </span>
                        <ChevronRight className="w-4 h-4 text-gold/0 group-hover:text-gold transition-all duration-300" />
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-center py-4"
              >
                {/* Confetti-like particles */}
                <div className="relative">
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 rounded-full"
                      style={{
                        left: '50%',
                        top: '50%',
                        background: ['#d4a853', '#e8c97a', '#f59e0b', '#8b5cf6', '#10b981'][i % 5],
                      }}
                      initial={{ x: 0, y: 0, scale: 0 }}
                      animate={{
                        x: Math.cos((i * Math.PI * 2) / 12) * 120,
                        y: Math.sin((i * Math.PI * 2) / 12) * 80 - 40,
                        scale: [0, 1.5, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{ duration: 1.2, delay: 0.2 + i * 0.05, ease: 'easeOut' }}
                    />
                  ))}

                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', damping: 8, stiffness: 100, delay: 0.2 }}
                    className="text-7xl mb-6 relative z-10"
                  >
                    {result.emoji}
                  </motion.div>
                </div>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-gold text-sm uppercase tracking-widest mb-2"
                >
                  Votre destination idéale
                </motion.p>
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-3xl md:text-4xl font-bold text-white mb-2 font-['Playfair_Display']"
                >
                  {result.title}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className={`text-transparent bg-clip-text bg-gradient-to-r ${result.color} font-semibold mb-4`}
                >
                  {result.subtitle}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-gray-400 leading-relaxed max-w-lg mx-auto mb-8"
                >
                  {result.description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="flex flex-col sm:flex-row gap-3 justify-center"
                >
                  <motion.a
                    href="#destinations"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-gold to-gold-dark text-dark font-semibold px-6 py-3 rounded-lg"
                  >
                    Voir cette destination
                  </motion.a>
                  <motion.button
                    onClick={reset}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border border-dark-border text-gray-400 hover:text-white hover:border-gold/30 px-6 py-3 rounded-lg transition-all duration-300 inline-flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Recommencer
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
