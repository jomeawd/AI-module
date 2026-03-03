import { Clock, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-dark-border bg-dark-card/50 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <a href="#hero" className="flex items-center gap-2 mb-4">
              <Clock className="w-6 h-6 text-gold" />
              <span className="text-xl font-bold font-['Playfair_Display'] text-white">
                Time<span className="text-gold">Travel</span>
              </span>
            </a>
            <p className="text-gray-500 text-sm leading-relaxed">
              Votre agence de voyage temporel de luxe. Explorez les époques les plus
              fascinantes de l'histoire en toute sécurité.
            </p>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="text-white font-semibold mb-4">Destinations</h4>
            <ul className="space-y-2.5">
              {['Paris 1889', 'Crétacé -65M', 'Florence 1504'].map((d) => (
                <li key={d}>
                  <a href="#destinations" className="text-gray-500 hover:text-gold text-sm transition-colors">
                    {d}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2.5">
              {['Voyages sur mesure', 'Quiz personnalisé', 'Guide temporel IA', 'Assurance temporelle'].map((s) => (
                <li key={s}>
                  <a href="#" className="text-gray-500 hover:text-gold text-sm transition-colors">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-500 text-sm">
                <Mail className="w-4 h-4 text-gold" />
                contact@timetravel.agency
              </li>
              <li className="flex items-center gap-2 text-gray-500 text-sm">
                <Phone className="w-4 h-4 text-gold" />
                +33 1 23 45 67 89
              </li>
              <li className="flex items-center gap-2 text-gray-500 text-sm">
                <MapPin className="w-4 h-4 text-gold" />
                Paris, France — Hors du temps
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-dark-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">
            &copy; {new Date().getFullYear()} TimeTravel Agency. Tous droits réservés.
          </p>
          <p className="text-gray-700 text-xs">
            Projet pédagogique M1/M2 Digital & IA — Généré avec Claude Code (Claude 4.5 Sonnet)
          </p>
        </div>
      </div>
    </footer>
  );
}
