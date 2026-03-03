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
      "Vous êtes un aventurier dans l'âme ! Le Crétacé est fait pour vous. Imaginez-vous face à face avec un T-Rex, survolant des paysages vierges et découvrant une nature à l'état pur, des millions d'années avant l'Homme.",
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

  const handleAnswer = (option) => {
    const newScores = { ...scores };
    Object.entries(option.scores).forEach(([key, val]) => {
      newScores[key] += val;
    });
    setScores(newScores);

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      const winner = Object.entries(newScores).reduce((a, b) =>
        a[1] > b[1] ? a : b
      )[0];
      setResult(results[winner]);
    }
  };

  const reset = () => {
    setCurrentQ(0);
    setScores({ paris: 0, cretace: 0, florence: 0 });
    setResult(null);
    setStarted(false);
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
          <span className="text-gold text-sm uppercase tracking-widest">Recommandation IA</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4 font-['Playfair_Display']">
            Trouvez votre <span className="shimmer-text">Destination</span> Idéale
          </h2>
          <p className="text-gray-400">
            Répondez à 4 questions et notre algorithme trouvera l'époque parfaite pour vous.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass rounded-2xl p-8 md:p-10"
        >
          <AnimatePresence mode="wait">
            {!started && !result && (
              <motion.div
                key="start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-8"
              >
                <div className="text-6xl mb-6">⏳</div>
                <h3 className="text-2xl font-bold text-white mb-3 font-['Playfair_Display']">
                  Quiz : Quelle époque êtes-vous ?
                </h3>
                <p className="text-gray-400 mb-8 max-w-md mx-auto">
                  4 questions rapides pour découvrir la destination temporelle qui correspond
                  à votre personnalité.
                </p>
                <button
                  onClick={() => setStarted(true)}
                  className="bg-gradient-to-r from-gold to-gold-dark text-dark font-semibold px-8 py-3 rounded-lg hover:from-gold-light hover:to-gold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gold/20 inline-flex items-center gap-2"
                >
                  Commencer le Quiz <ChevronRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}

            {started && !result && (
              <motion.div
                key={`q-${currentQ}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
              >
                {/* Progress */}
                <div className="flex items-center justify-between mb-8">
                  <span className="text-sm text-gray-500">
                    Question {currentQ + 1} / {questions.length}
                  </span>
                  <div className="flex gap-1.5">
                    {questions.map((_, i) => (
                      <div
                        key={i}
                        className={`h-1.5 w-8 rounded-full transition-colors duration-300 ${
                          i <= currentQ ? 'bg-gold' : 'bg-dark-border'
                        }`}
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
                    return (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.02, x: 8 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleAnswer(option)}
                        className="w-full flex items-center gap-4 p-4 rounded-xl border border-dark-border hover:border-gold/40 bg-dark-lighter/50 hover:bg-gold/5 transition-all duration-300 text-left group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                          <Icon className="w-5 h-5 text-gold" />
                        </div>
                        <span className="text-gray-200 group-hover:text-white transition-colors">
                          {option.label}
                        </span>
                        <ChevronRight className="w-4 h-4 text-gold/0 group-hover:text-gold ml-auto transition-all duration-300" />
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center py-4"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 10, stiffness: 100, delay: 0.2 }}
                  className="text-7xl mb-6"
                >
                  {result.emoji}
                </motion.div>
                <p className="text-gold text-sm uppercase tracking-widest mb-2">
                  Votre destination idéale
                </p>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 font-['Playfair_Display']">
                  {result.title}
                </h3>
                <p className={`text-transparent bg-clip-text bg-gradient-to-r ${result.color} font-semibold mb-4`}>
                  {result.subtitle}
                </p>
                <p className="text-gray-400 leading-relaxed max-w-lg mx-auto mb-8">
                  {result.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href="#destinations"
                    className="bg-gradient-to-r from-gold to-gold-dark text-dark font-semibold px-6 py-3 rounded-lg hover:from-gold-light hover:to-gold transition-all duration-300"
                  >
                    Voir cette destination
                  </a>
                  <button
                    onClick={reset}
                    className="border border-dark-border text-gray-400 hover:text-white hover:border-gold/30 px-6 py-3 rounded-lg transition-all duration-300 inline-flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Recommencer
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
