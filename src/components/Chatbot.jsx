import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';

const SYSTEM_PROMPT = `Tu es l'assistant virtuel de TimeTravel Agency, une agence de voyage temporel de luxe.
Ton rôle : conseiller les clients sur les meilleures destinations temporelles.

Ton ton :
- Professionnel mais chaleureux
- Passionné d'histoire
- Toujours enthousiaste sans être trop familier
- Expertise en voyage temporel (fictif mais crédible)

Tu connais parfaitement ces 3 destinations :

1. **Paris 1889** (Belle Époque, Tour Eiffel, Exposition Universelle)
   - Prix : à partir de 12 500€/personne
   - Durée : 3-7 jours
   - Points forts : Inauguration Tour Eiffel, cafés Montmartre, gastronomie Belle Époque

2. **Crétacé -65 millions d'années** (dinosaures, nature préhistorique)
   - Prix : à partir de 18 900€/personne
   - Durée : 2-5 jours
   - Points forts : Observation T-Rex, survol aéronef sécurisé, paysages vierges

3. **Florence 1504** (Renaissance, art, Michel-Ange, Léonard de Vinci)
   - Prix : à partir de 14 200€/personne
   - Durée : 4-8 jours
   - Points forts : Atelier Michel-Ange, rencontre Léonard de Vinci, Palais Médicis

FAQ :
- Sécurité : protocoles stricts, zones sécurisées, guides temporels certifiés
- Réservation : en ligne ou par notre chatbot, minimum 2 semaines à l'avance
- Annulation : remboursement intégral jusqu'à 7 jours avant le départ
- Langues : nos guides sont multilingues (traducteur temporel intégré)
- Bagages : kit temporel fourni, vêtements d'époque inclus

Tu peux suggérer des destinations selon les intérêts du client. Réponds toujours en français, de manière concise (2-4 phrases max).`;

// Local AI response system (no API key needed)
function generateLocalResponse(userMessage) {
  const msg = userMessage.toLowerCase();

  if (msg.includes('bonjour') || msg.includes('salut') || msg.includes('hello') || msg.includes('coucou')) {
    return "Bienvenue chez TimeTravel Agency ! Je suis ravi de vous accueillir. Comment puis-je vous aider dans votre voyage à travers le temps ? Nous proposons trois destinations exceptionnelles : Paris 1889, le Crétacé et Florence 1504.";
  }

  if (msg.includes('paris') || msg.includes('1889') || msg.includes('tour eiffel') || msg.includes('belle époque')) {
    return "Paris 1889, c'est l'effervescence de la Belle Époque ! Vous pourrez assister à l'inauguration de la Tour Eiffel lors de l'Exposition Universelle, flâner dans les cafés de Montmartre et goûter à la gastronomie parisienne d'exception. À partir de 12 500€ pour 3 à 7 jours. Une expérience inoubliable !";
  }

  if (msg.includes('dinosaure') || msg.includes('crétacé') || msg.includes('cretace') || msg.includes('préhistorique') || msg.includes('t-rex')) {
    return "Le Crétacé, c'est l'aventure ultime ! Imaginez observer des T-Rex et Tricératops depuis nos zones d'observation sécurisées, survoler des paysages vierges en aéronef, et découvrir une nature à l'état pur. À partir de 18 900€ pour 2 à 5 jours. La sécurité est notre priorité absolue !";
  }

  if (msg.includes('florence') || msg.includes('1504') || msg.includes('renaissance') || msg.includes('michel-ange') || msg.includes('vinci')) {
    return "Florence 1504, le berceau de la Renaissance ! Vous pourrez visiter l'atelier de Michel-Ange alors qu'il sculpte le David, rencontrer Léonard de Vinci et explorer les somptueux palais des Médicis. À partir de 14 200€ pour 4 à 8 jours. Une immersion artistique sans pareille !";
  }

  if (msg.includes('prix') || msg.includes('coût') || msg.includes('tarif') || msg.includes('combien') || msg.includes('cher')) {
    return "Nos tarifs varient selon la destination : Paris 1889 à partir de 12 500€, Florence 1504 dès 14 200€, et le Crétacé à partir de 18 900€ par personne. Chaque forfait inclut le transport temporel, l'hébergement d'époque, les guides et le kit vestimentaire. Quelle destination vous intéresse ?";
  }

  if (msg.includes('sécurité') || msg.includes('securite') || msg.includes('danger') || msg.includes('risque') || msg.includes('sûr')) {
    return "La sécurité est notre priorité absolue ! Nos protocoles sont certifiés par l'Agence Temporelle Internationale. Chaque voyageur est équipé d'un dispositif de retour d'urgence, accompagné de guides temporels certifiés, et nos zones d'observation (surtout au Crétacé) sont 100% sécurisées.";
  }

  if (msg.includes('réserv') || msg.includes('reserv') || msg.includes('book') || msg.includes('commander')) {
    return "Pour réserver, c'est très simple ! Vous pouvez choisir votre destination sur notre site et remplir le formulaire. Nous recommandons de réserver au minimum 2 semaines à l'avance. Annulation gratuite jusqu'à 7 jours avant le départ. Voulez-vous que je vous guide vers une destination en particulier ?";
  }

  if (msg.includes('conseil') || msg.includes('recommand') || msg.includes('suggest') || msg.includes('quelle destination') || msg.includes('quoi choisir')) {
    return "Tout dépend de vos envies ! Pour les amateurs d'art et de culture, Florence 1504 est parfaite. Pour l'élégance et l'effervescence urbaine, Paris 1889 est idéale. Et pour les aventuriers dans l'âme, le Crétacé offre une expérience unique. Je vous recommande aussi notre Quiz de personnalité sur le site pour trouver votre match parfait !";
  }

  if (msg.includes('bagage') || msg.includes('vêtement') || msg.includes('vetement') || msg.includes('quoi emporter') || msg.includes('préparer')) {
    return "Pas besoin de vous soucier des bagages ! Chaque forfait inclut un kit temporel complet avec vêtements d'époque authentiques, accessoires adaptés et un traducteur temporel intégré. Vous n'avez qu'à apporter votre sens de l'aventure !";
  }

  if (msg.includes('merci') || msg.includes('super') || msg.includes('parfait') || msg.includes('génial')) {
    return "Avec plaisir ! N'hésitez pas si vous avez d'autres questions. Chez TimeTravel Agency, nous sommes passionnés par chaque époque et nous voulons que votre voyage soit absolument inoubliable. Bon voyage à travers le temps ! ⏳";
  }

  if (msg.includes('annul') || msg.includes('rembours')) {
    return "Notre politique d'annulation est très flexible : remboursement intégral jusqu'à 7 jours avant le départ, et 50% jusqu'à 48h avant. Nous comprenons que voyager dans le temps demande un peu de préparation !";
  }

  return "Merci pour votre question ! Chez TimeTravel Agency, nous proposons trois destinations extraordinaires : Paris 1889 (Belle Époque), le Crétacé (-65M d'années) et Florence 1504 (Renaissance). Dites-moi ce qui vous intéresse — une époque, un budget, un type d'expérience — et je vous guiderai avec plaisir !";
}

// Groq API integration (optional, if API key is provided)
async function fetchGroqResponse(messages, apiKey) {
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });
    const data = await response.json();
    return data.choices?.[0]?.message?.content || null;
  } catch {
    return null;
  }
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        "Bienvenue chez TimeTravel Agency ! ⏳ Je suis votre guide temporel. Posez-moi vos questions sur nos destinations : Paris 1889, le Crétacé ou Florence 1504. Comment puis-je vous aider ?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: 'user', content: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    // Simulate typing delay
    await new Promise((r) => setTimeout(r, 800 + Math.random() * 700));

    let reply = null;

    // Try Groq API if key is set
    if (apiKey) {
      reply = await fetchGroqResponse(
        newMessages.map((m) => ({ role: m.role, content: m.content })),
        apiKey
      );
    }

    // Fallback to local response
    if (!reply) {
      reply = generateLocalResponse(input.trim());
    }

    setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    setIsTyping(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', delay: 1.5 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 ${
          isOpen
            ? 'bg-dark-lighter border border-dark-border text-gray-400 rotate-0'
            : 'bg-gradient-to-r from-gold to-gold-dark text-dark animate-pulse-gold'
        }`}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={22} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle size={22} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[520px] rounded-2xl overflow-hidden flex flex-col bg-dark-card border border-dark-border shadow-2xl shadow-black/40"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-gold/10 to-gold-dark/10 border-b border-dark-border px-5 py-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-r from-gold to-gold-dark flex items-center justify-center">
                <Bot className="w-5 h-5 text-dark" />
              </div>
              <div className="flex-1">
                <h4 className="text-white text-sm font-semibold">Guide Temporel</h4>
                <p className="text-green-400 text-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                  En ligne
                </p>
              </div>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="text-gray-500 hover:text-gold text-xs transition-colors"
                title="Paramètres API"
              >
                {showSettings ? '✕' : '⚙️'}
              </button>
            </div>

            {/* API key settings */}
            <AnimatePresence>
              {showSettings && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-b border-dark-border overflow-hidden"
                >
                  <div className="p-3 bg-dark-lighter/50">
                    <p className="text-xs text-gray-500 mb-2">
                      Clé API Groq (optionnel — pour des réponses IA avancées)
                    </p>
                    <input
                      type="password"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="gsk_..."
                      className="w-full bg-dark border border-dark-border rounded-lg px-3 py-1.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-gold/40"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                      msg.role === 'assistant'
                        ? 'bg-gradient-to-r from-gold/20 to-gold-dark/20'
                        : 'bg-dark-lighter border border-dark-border'
                    }`}
                  >
                    {msg.role === 'assistant' ? (
                      <Bot className="w-3.5 h-3.5 text-gold" />
                    ) : (
                      <User className="w-3.5 h-3.5 text-gray-400" />
                    )}
                  </div>
                  <div
                    className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'assistant'
                        ? 'bg-dark-lighter/70 text-gray-200 rounded-tl-sm'
                        : 'bg-gradient-to-r from-gold to-gold-dark text-dark rounded-tr-sm'
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2.5"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-r from-gold/20 to-gold-dark/20 flex items-center justify-center">
                    <Bot className="w-3.5 h-3.5 text-gold" />
                  </div>
                  <div className="bg-dark-lighter/70 px-4 py-3 rounded-2xl rounded-tl-sm">
                    <Loader2 className="w-4 h-4 text-gold animate-spin" />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-dark-border p-3">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Posez vos questions sur les voyages temporels..."
                  className="flex-1 bg-dark-lighter/50 border border-dark-border rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gold/40 transition-colors"
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isTyping}
                  className="w-10 h-10 rounded-xl bg-gradient-to-r from-gold to-gold-dark text-dark flex items-center justify-center hover:from-gold-light hover:to-gold transition-all disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
