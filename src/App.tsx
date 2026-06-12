import { useState, useEffect } from 'react';

// Icons
const CheckIcon = () => (
  <svg className="w-5 h-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
);

const SunIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
);

const MoonIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
);

const SectionHeading = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="mb-12 text-center">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-900 dark:text-blue-400 mb-4 transition-colors">{title}</h2>
    {subtitle && <p className="text-xl text-yellow-600 dark:text-yellow-400 font-medium italic transition-colors">"{subtitle}"</p>}
    <div className="w-24 h-1 bg-yellow-400 mx-auto mt-6 rounded-full"></div>
  </div>
);

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Initialize dark mode based on user preference
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'O Nás', href: '#o-nas' },
    { name: 'Služby', href: '#sluzby' },
    { name: 'Naša Ponuka', href: '#ponuka' },
    { name: 'Účtovníctvo', href: '#uctovnictvo' },
    { name: 'Kontakt', href: '#kontakt' },
  ];

  return (
    <div className="min-h-screen font-sans">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white dark:bg-gray-900 shadow-md py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <a href="#" className="flex items-center dark:bg-white/90 dark:p-1.5 dark:rounded-lg transition-colors">
            <img src="/images/logo/logo.svg" alt="Euro-Art Logo" className="h-10 w-auto" />
          </a>
          
          <div className="flex items-center gap-6">
            {/* Desktop Nav */}
            <div className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  className={`font-semibold text-sm uppercase tracking-wider transition-colors ${isScrolled ? 'text-blue-900 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400' : 'text-white/90 hover:text-yellow-400'} underline-anim`}
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Dark Mode Toggle */}
            <button 
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-colors ${isScrolled ? 'bg-blue-50 dark:bg-gray-800 text-blue-900 dark:text-yellow-400' : 'bg-white/10 hover:bg-white/20 text-white'}`}
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <SunIcon /> : <MoonIcon />}
            </button>

            {/* Mobile Menu Button */}
            <button 
              className={`md:hidden focus:outline-none transition-colors ${isScrolled ? 'text-blue-900 dark:text-white' : 'text-white'}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-lg py-4 px-4 flex flex-col space-y-4 transition-colors">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-semibold text-blue-900 dark:text-gray-200 hover:text-yellow-500 dark:hover:text-yellow-400 border-b border-gray-100 dark:border-gray-800 pb-2 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden bg-[#909090] dark:bg-[#707070] transition-colors">
        <div className="absolute inset-0 z-0 flex items-center justify-center p-4 md:p-12">
          <img 
            src="/images/sections/00_intro.png" 
            alt="Euro-Art Background" 
            className="w-full h-full object-contain"
            loading="eager"
          />
        </div>
        
        {/* Overlays applied to the whole section to create the dark blue effect */}
        <div className="absolute inset-0 bg-blue-900/70 dark:bg-gray-900/80 mix-blend-multiply transition-colors pointer-events-none"></div>
        <div className="absolute inset-0 bg-black/30 dark:bg-black/50 transition-colors pointer-events-none"></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mt-12 bg-black/20 p-8 rounded-3xl backdrop-blur-sm border border-white/10">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
            Vy viete, čo potrebujete,<br/>
            <span className="text-yellow-400">... my vieme, ako na to!</span>
          </h1>
          <p className="text-lg md:text-2xl text-blue-100 dark:text-gray-200 mb-10 max-w-2xl mx-auto transition-colors">
            Reklamná agentúra EUROART pôsobí v oblasti počítačovej grafiky a vydavateľskej činnosti už od roku 1997.
          </p>
          <a href="#sluzby" className="inline-block bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-4 px-8 rounded-full transition-colors shadow-lg">
            Objavte naše služby
          </a>
        </div>
      </header>

      {/* O NÁS Section */}
      <section id="o-nas" className="py-24 bg-white dark:bg-gray-900 transition-colors">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="overflow-hidden rounded-2xl shadow-xl border-4 border-yellow-400/20 dark:border-yellow-400/10">
                <img 
                  src="/images/sections/01_about_us.png" 
                  alt="O nás" 
                  className="w-full h-auto image-zoom-hover"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-sm font-bold text-yellow-600 dark:text-yellow-400 uppercase tracking-widest mb-2 transition-colors">O NÁS</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-blue-900 dark:text-blue-400 mb-6 transition-colors">Skúsenosti od roku 1997</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed text-lg transition-colors">
                Zameriavame sa najmä na spoluprácu s obcami, mestami, vzdelávacími inštitúciami, občianskymi združeniami a mikroregiónmi.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed transition-colors">
                Poznáme ich špecifické požiadavky pri tvorbe propagačno-informačných tlačovín a publikácií, ktoré majú „zasiahnuť“ predovšetkým obyvateľa a návštevníka obce – mesta - regiónu. Napĺňanie tohto cieľa si vyžaduje poznať jeho očakávania a „ušiť mu produkt na mieru“ - vymyslieť produkt, jeho formu, navrhnúť dizajn, s ktorým sa stotožní nielen grafik, ale predovšetkým užívateľ. Náš produkt, ktorý prinesie tie najlepšie výsledky Vášmu snaženiu.
              </p>
              <div className="bg-yellow-50 dark:bg-gray-800 p-6 rounded-xl border-l-4 border-yellow-400 transition-colors">
                <p className="font-semibold text-blue-900 dark:text-gray-200 transition-colors">
                  Potrebujete graficky navrhnúť a vytlačiť propagačný leták či skladačku, kalendár, cyklomapu, informačnú brožúru alebo vydať knihu? Potom ste na správnom mieste.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SLUŽBY Section */}
      <section id="sluzby" className="py-24 bg-blue-50/50 dark:bg-gray-800/50 transition-colors">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading title="Naše Služby" subtitle="Komplexné služby, ... originálne riešenia!" />
          
          <div className="mb-16 overflow-hidden rounded-3xl shadow-xl border-2 border-yellow-400/20">
            <img src="/images/sections/02_services.png" alt="Služby" className="w-full h-64 md:h-96 object-cover image-zoom-hover" loading="lazy" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 card-hover flex flex-col h-full border border-yellow-100 dark:border-gray-700 hover:border-yellow-400 dark:hover:border-yellow-400 transition-colors">
              <div className="w-16 h-16 bg-blue-100 dark:bg-gray-700 text-blue-700 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-6 shadow-inner transition-colors">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-blue-900 dark:text-gray-100 mb-4 transition-colors">Grafický dizajn</h3>
              <p className="text-gray-600 dark:text-gray-400 flex-grow transition-colors">
                Predstavuje pretavenie predstáv zadávateľa do grafického návrhu. Pomôžeme so štylizáciou textov a výberom formátu. Pracujeme s profesionálnymi grafickými programami na kalibrovaných monitoroch EIZO.
              </p>
            </div>

            {/* Service 2 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 card-hover flex flex-col h-full border border-yellow-100 dark:border-gray-700 hover:border-yellow-400 dark:hover:border-yellow-400 transition-colors">
              <div className="w-16 h-16 bg-blue-100 dark:bg-gray-700 text-blue-700 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-6 shadow-inner transition-colors">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-blue-900 dark:text-gray-100 mb-4 transition-colors">Redakčné práce</h3>
              <p className="text-gray-600 dark:text-gray-400 flex-grow transition-colors">
                Pomôžeme Vám s prípravou textového obsahu, štylizáciou, jazykovou korektúrou či prekladom do iného jazyka.
              </p>
            </div>

            {/* Service 3 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 card-hover flex flex-col h-full border border-yellow-100 dark:border-gray-700 hover:border-yellow-400 dark:hover:border-yellow-400 transition-colors">
              <div className="w-16 h-16 bg-blue-100 dark:bg-gray-700 text-blue-700 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-6 shadow-inner transition-colors">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-blue-900 dark:text-gray-100 mb-4 transition-colors">Fotografia</h3>
              <p className="text-gray-600 dark:text-gray-400 flex-grow transition-colors">
                Profesionálne nafotíme interiéry a exteriéry pre potreby Vašich materiálov. Fotíme profesionálnym fotoaparátom Canon EOS (22 Mpx).
              </p>
            </div>

            {/* Service 4 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 card-hover flex flex-col h-full border border-yellow-100 dark:border-gray-700 hover:border-yellow-400 dark:hover:border-yellow-400 transition-colors">
              <div className="w-16 h-16 bg-blue-100 dark:bg-gray-700 text-blue-700 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-6 shadow-inner transition-colors">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-blue-900 dark:text-gray-100 mb-4 transition-colors">Výroba web-stránok</h3>
              <p className="text-gray-600 dark:text-gray-400 flex-grow transition-colors">
                Web-stránka je častokrát zdrojom prvotnej informácie. Jej dizajn by mal byť čo najlepší. Pripravíme aj crossmedia publishing pre krížové publikovanie.
              </p>
            </div>

            {/* Service 5 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 card-hover flex flex-col h-full border border-yellow-100 dark:border-gray-700 hover:border-yellow-400 dark:hover:border-yellow-400 transition-colors md:col-span-2 lg:col-span-2">
              <div className="w-16 h-16 bg-blue-100 dark:bg-gray-700 text-blue-700 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-6 shadow-inner transition-colors">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-blue-900 dark:text-gray-100 mb-4 transition-colors">Doplnkové reklamné služby</h3>
              <p className="text-gray-600 dark:text-gray-400 flex-grow transition-colors">
                Reklamné predmety, textil, potlač, gravírovanie, puzzle, magnetky, záložky, bannery, informačné tabule či polep vozidiel patria do nášho portfólia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* NAŠA PONUKA Section */}
      <section id="ponuka" className="py-24 bg-white dark:bg-gray-900 transition-colors">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading title="Naša Ponuka" subtitle="Na trhu je veľa ponúk, ... ale my vám ju šijeme na mieru!" />
          
          <div className="mb-16 overflow-hidden rounded-3xl shadow-xl border-2 border-yellow-400/20 max-w-5xl mx-auto">
            <img src="/images/sections/03_our_offer.png" alt="Naša Ponuka" className="w-full h-64 md:h-96 object-cover image-zoom-hover" loading="lazy" />
          </div>

          <div className="max-w-4xl mx-auto mb-16 text-center text-gray-600 dark:text-gray-400 text-lg transition-colors">
            <p className="mb-4">
              Samotný grafický návrh nie je všetko. Až jeho profesionálna technická realizácia je zárukou úspešného konečného výsledku.
            </p>
            <p>
              Vytvárame rôzne tlačoviny – od tých najjednoduchších až po tie najzložitejšie, ktoré si vyžadujú knihárske spracovanie, laminovanie, parciálne lakovanie či výsek.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-blue-50/50 dark:bg-gray-800 rounded-2xl p-8 border border-blue-100 dark:border-gray-700 transition-colors">
              <h3 className="text-xl font-bold text-blue-900 dark:text-blue-400 mb-6 flex items-center transition-colors">
                <span className="w-8 h-8 rounded-full bg-yellow-400 text-blue-900 flex items-center justify-center mr-3 text-sm font-bold">1</span>
                Firemné tlačoviny
              </h3>
              <ul className="space-y-3 dark:text-gray-300 transition-colors">
                <li className="flex"><CheckIcon /> Vizitky, hlavičkové papiere, pozvánky, obálky</li>
                <li className="flex"><CheckIcon /> Produktové a užívateľské manuály, servisné knižky (aj samoprepis)</li>
                <li className="flex"><CheckIcon /> Poznámkové bloky, diáre</li>
                <li className="flex"><CheckIcon /> Letáky, plagáty</li>
                <li className="flex"><CheckIcon /> Skladačky, spisové obaly (foldre)</li>
                <li className="flex"><CheckIcon /> Produktové katalógy</li>
                <li className="flex"><CheckIcon /> Zakladače</li>
                <li className="flex"><CheckIcon /> Kalendáre – s Vašimi fotkami</li>
                <li className="flex"><CheckIcon /> Firemné profily, Výročné správy</li>
              </ul>
            </div>

            <div className="bg-blue-50/50 dark:bg-gray-800 rounded-2xl p-8 border border-blue-100 dark:border-gray-700 transition-colors">
              <h3 className="text-xl font-bold text-blue-900 dark:text-blue-400 mb-6 flex items-center transition-colors">
                <span className="w-8 h-8 rounded-full bg-yellow-400 text-blue-900 flex items-center justify-center mr-3 text-sm font-bold">2</span>
                Tlačoviny pre inštitúcie
              </h3>
              <ul className="space-y-3 mb-8 dark:text-gray-300 transition-colors">
                <li className="flex"><CheckIcon /> Brožúry</li>
                <li className="flex"><CheckIcon /> Skriptá</li>
                <li className="flex"><CheckIcon /> Knihy</li>
                <li className="flex"><CheckIcon /> Noviny, časopisy</li>
                <li className="flex"><CheckIcon /> Puzzle</li>
              </ul>
            </div>

            <div className="bg-blue-50/50 dark:bg-gray-800 rounded-2xl p-8 border border-blue-100 dark:border-gray-700 transition-colors">
              <h3 className="text-xl font-bold text-blue-900 dark:text-blue-400 mb-6 flex items-center transition-colors">
                <span className="w-8 h-8 rounded-full bg-yellow-400 text-blue-900 flex items-center justify-center mr-3 text-sm font-bold">3</span>
                Tlačoviny pre obce a mestá
              </h3>
              <ul className="space-y-3 dark:text-gray-300 transition-colors">
                <li className="flex"><CheckIcon /> Pohľadnice</li>
                <li className="flex"><CheckIcon /> Skladačky</li>
                <li className="flex"><CheckIcon /> Turistický sprievodcovia, mapy</li>
                <li className="flex"><CheckIcon /> Kalendáre – s Vašimi fotkami</li>
                <li className="flex"><CheckIcon /> Monografie</li>
                <li className="flex"><CheckIcon /> Noviny</li>
                <li className="flex"><CheckIcon /> Bannery, Informačné tabule</li>
              </ul>
            </div>
          </div>
          
          {/* Awards */}
          <div className="mt-16 bg-blue-800 dark:bg-blue-900 text-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden border-t-4 border-yellow-400 transition-colors">
            <div className="absolute top-0 right-0 opacity-10">
              <img src="/images/idea-web.png" alt="Idea Decoration" className="w-64 h-64 object-contain" loading="lazy" />
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-8 flex items-center text-yellow-400">
                <svg className="w-8 h-8 text-yellow-400 mr-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                Naše Ocenenia
              </h3>
              <ul className="space-y-4 text-white/90">
                <li className="bg-white/10 rounded-lg p-4 border-l-4 border-yellow-400"><strong>Monografia Žemberovce</strong> – hlavná cena v súťaži Slovenská kronika</li>
                <li className="bg-white/10 rounded-lg p-4 border-l-4 border-yellow-400"><strong>Chotár pod Čiernym Kameňom</strong> – 1. miesto Najkrajšia kniha a propagačný materiál a 2. miesto Najkrajší kalendár Slovenska</li>
                <li className="bg-white/10 rounded-lg p-4 border-l-4 border-yellow-400"><strong>Monografia Devičany</strong> – čestné uznanie v súťaži Slovenská kronika</li>
                <li className="bg-white/10 rounded-lg p-4 border-l-4 border-yellow-400"><strong>Tu spočíva kvet...</strong> – 3. miesto v súťaži Najkrajšia kniha a propagačný materiál</li>
                <li className="bg-white/10 rounded-lg p-4 border-l-4 border-yellow-400"><strong>Čarokrásna Záhrada Eden</strong> – 3. miesto Najkrajší kalendár Slovenska</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ÚČTOVNÍCTVO Section */}
      <section id="uctovnictvo" className="py-24 bg-blue-50/30 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800 transition-colors">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <SectionHeading title="Účtovníctvo" subtitle="Vy viete, čo potrebujete, ... my vieme, ako na to!" />
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed text-lg transition-colors">
                Vedenie jednoduchého aj podvojného účtovníctva pre živnostníkov a malé spoločnosti s ručením obmedzeným.
              </p>
              <ul className="space-y-4 mb-8 text-gray-700 dark:text-gray-300 transition-colors">
                <li className="flex items-start"><CheckIcon /> <span>Vedenie účtovných kníh, účtovného denníka a analytických evidencií.</span></li>
                <li className="flex items-start"><CheckIcon /> <span>Vypracovanie daňových priznaní k dani z príjmov fyzických a právnických osôb, DPH, motorových vozidiel a nehnuteľností.</span></li>
                <li className="flex items-start"><CheckIcon /> <span>Vďaka pravidelnému informovaniu máte vždy prehľad o ekonomickom stave svojej firmy.</span></li>
              </ul>
              <div className="inline-block bg-yellow-400 text-blue-900 font-bold py-3 px-6 rounded-lg shadow-md hover:bg-yellow-500 transition-colors">
                Dohodnite si stretnutie, prvá konzultácia je bezplatná.
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="overflow-hidden rounded-2xl shadow-xl relative group border-4 border-blue-900/10 dark:border-gray-700 transition-colors">
                <img 
                  src="/images/graphs-web.jpg" 
                  alt="Účtovníctvo" 
                  className="w-full h-auto image-zoom-hover"
                  loading="lazy"
                />
                <div className="gallery-overlay">
                  <span className="bg-yellow-400 text-blue-900 font-bold py-2 px-6 rounded-full shadow-lg transform -translate-y-4 group-hover:translate-y-0 transition-all duration-300">Presné Výsledky</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KONTAKT Section */}
      <section id="kontakt" className="py-24 bg-white dark:bg-gray-900 transition-colors">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <SectionHeading title="Kontakt" subtitle="Dohodnite si stretnutie, ... za opýtanie nič nedáte :)" />
          
          <div className="mb-16 overflow-hidden rounded-3xl shadow-xl border-2 border-yellow-400/20 max-w-5xl mx-auto">
            <img src="/images/sections/05_contact.png" alt="Kontakt" className="w-full h-64 md:h-96 object-cover image-zoom-hover" loading="lazy" />
          </div>

          <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-10 border-t-4 border-yellow-400 transition-colors">
            <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-400 mb-8 transition-colors">Spojte sa s nami</h3>
            
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-50 dark:bg-gray-700 text-yellow-500 rounded-full flex items-center justify-center mb-4 shadow-inner transition-colors">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </div>
                <h4 className="font-bold text-blue-900 dark:text-gray-100 mb-1 transition-colors">Email</h4>
                <a href="mailto:info@euroart-placeholder.sk" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline transition-colors">info@euroart-placeholder.sk</a>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-50 dark:bg-gray-700 text-yellow-500 rounded-full flex items-center justify-center mb-4 shadow-inner transition-colors">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                </div>
                <h4 className="font-bold text-blue-900 dark:text-gray-100 mb-1 transition-colors">Telefón</h4>
                <a href="tel:+421900000000" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline transition-colors">+421 900 000 000</a>
              </div>
            </div>
            
            <div className="mt-12 text-sm text-gray-500 dark:text-gray-400 transition-colors">
              * Kontaktné údaje sú momentálne ilustračné.
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-950 dark:bg-gray-950 text-white py-12 transition-colors">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/90 p-2 rounded-xl inline-block">
              <img src="/images/logo/logo.svg" alt="Euro-Art Logo" className="h-12 w-auto" />
            </div>
          </div>
          <p className="text-blue-200 dark:text-gray-400 mb-6 transition-colors">
            Reklamná agentúra & Účtovníctvo <br/>
            Skúsenosti a originálne riešenia od roku 1997.
          </p>
          <div className="text-sm text-blue-400/50 dark:text-gray-600 border-t border-blue-900 dark:border-gray-800 pt-8 transition-colors">
            &copy; {new Date().getFullYear()} Euro-Art. Všetky práva vyhradené.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
