import { useEffect, useRef, useState } from 'react';

/* EUROART — "Studio" (verzia-2): dark cinematic, brand blue + yellow.
   Ported faithfully from the Claude Design source. Styling lives in index.css;
   the vanilla-JS interactions (theme, scroll reveal, parallax, magnetic cube,
   particle network) are reimplemented as React effects below. */

type Particle = { x: number; y: number; vx: number; vy: number };

function App() {
  const [light, setLight] = useState<boolean>(() => {
    try {
      return localStorage.getItem('ea-theme') === 'light';
    } catch {
      return false;
    }
  });
  const [scrolled, setScrolled] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);

  // Theme: reflect state onto <body>; the index.html inline script handles the
  // initial paint so there is no flash on first load.
  useEffect(() => {
    document.body.classList.toggle('light', light);
  }, [light]);

  const toggleTheme = () =>
    setLight((v) => {
      const next = !v;
      try {
        localStorage.setItem('ea-theme', next ? 'light' : 'dark');
      } catch {
        /* ignore storage failures (private mode, etc.) */
      }
      return next;
    });

  // Nav state + scroll reveal + parallax.
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const reveal = () => {
      document.querySelectorAll<HTMLElement>('.rv:not(.in)').forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.9) el.classList.add('in');
      });
    };
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      // Skip the parallax motion for users who prefer reduced motion.
      if (!reduceMotion.matches) {
        document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
          const r = el.getBoundingClientRect();
          const c = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
          el.style.transform = `translateY(${c * -parseFloat(el.dataset.parallax || '0') * 54}px)`;
        });
      }
      reveal();
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    reveal();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Magnetic / tilt brand cube.
  useEffect(() => {
    const cube = cubeRef.current;
    if (!cube) return;
    const onMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      cube.style.transform = `rotateX(${-18 - y * 26}deg) rotateY(${x * 60}deg)`;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // Particle network over the hero.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const cv = canvasRef.current;
    const ctx = cv?.getContext('2d');
    if (!cv || !ctx) return;

    let w = 0;
    let h = 0;
    let pts: Particle[] = [];
    let raf = 0;

    const resize = () => {
      const parent = cv.parentElement;
      if (!parent) return;
      w = cv.width = parent.clientWidth;
      h = cv.height = parent.clientHeight;
      const n = Math.min(70, Math.round((w * h) / 22000));
      pts = [];
      for (let i = 0; i < n; i++) {
        pts.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i];
          const b = pts[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < 140) {
            ctx.strokeStyle = `rgba(140,170,255,${0.16 * (1 - d / 140)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      for (const p of pts) {
        ctx.fillStyle = 'rgba(255,210,90,.55)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.7, 0, 7);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const year = new Date().getFullYear();

  return (
    <>
      <header className={`nav${scrolled ? ' scrolled' : ''}`}>
        <div className="wrap nav-row">
          <a href="#top" className="logo">
            <span>EURO</span>
            <span className="a">ART</span>
          </a>
          <nav className="menu">
            <a href="#about">O nás</a>
            <a href="#services">Služby</a>
            <a href="#offer">Naša ponuka</a>
            <a href="#accounting">Účtovníctvo</a>
            <a href="#contact">Kontakt</a>
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              className="theme-tog"
              onClick={toggleTheme}
              aria-label="Prepnúť svetlý a tmavý režim"
              title="Svetlý / tmavý režim"
            >
              <svg className="i-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
              <svg className="i-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="12" r="4.2" />
                <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
              </svg>
            </button>
            <a href="#contact" className="nav-cta">
              Spojte sa s nami
            </a>
          </div>
        </div>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="hero" data-screen-label="Hero">
          <div className="hero-bg">
            <img src="/images/cubes-wide-web.jpg" alt="3D kocky — kreatívne pozadie" />
          </div>
          <canvas id="net" ref={canvasRef}></canvas>
          <div className="cube-stage">
            <div className="cube" ref={cubeRef}>
              <div className="cf-front">EUROART</div>
              <div className="cf-right"></div>
              <div className="cf-top"></div>
              <div className="cf-back"></div>
              <div className="cf-left"></div>
              <div className="cf-bottom"></div>
            </div>
          </div>
          <div className="wrap">
            <div className="since rv">Reklamná agentúra &amp; vydavateľstvo · od 1997</div>
            <h1 className="rv d1">
              Vy viete, čo potrebujete,<span className="em">… my vieme, ako na to!</span>
            </h1>
            <p className="lede rv d2">
              Počítačová grafika a vydavateľská činnosť už od roku 1997. Vyčnievame z radu — rovnako ako jediná
              farebná kocka medzi tisíckami sivých.
            </p>
            <div className="rv d3" style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
              <a href="#services" className="btn btn-primary">
                Objavte naše služby <span className="arr">→</span>
              </a>
              <a href="#offer" className="btn btn-ghost">
                Čo vytlačíme
              </a>
            </div>
          </div>
          <div className="scroll-hint">
            <span className="ln"></span>Scrollujte
          </div>
        </section>

        {/* O NÁS */}
        <section className="pad" id="about" data-screen-label="O nás">
          <div className="wrap about-grid">
            <div className="about rv">
              <div className="eyebrow">O nás</div>
              <h2 style={{ fontSize: 'clamp(32px,3.8vw,52px)', margin: '14px 0 0' }}>
                Skúsenosti
                <br />
                od roku 1997
              </h2>
              <p className="quiet" style={{ marginTop: '24px' }}>
                Zameriavame sa najmä na spoluprácu s obcami, mestami, vzdelávacími inštitúciami, občianskymi
                združeniami a mikroregiónmi.
              </p>
              <p className="quiet">
                Poznáme ich špecifické požiadavky pri tvorbe propagačno-informačných tlačovín. Naším cieľom je „ušiť
                produkt na mieru“ — vymyslieť ho a navrhnúť dizajn, s ktorým sa stotožní nielen grafik, ale predovšetkým
                užívateľ.
              </p>
              <div className="callout">
                Potrebujete navrhnúť a vytlačiť leták, skladačku, kalendár, cyklomapu, brožúru alebo vydať knihu? Ste na
                správnom mieste.
              </div>
              <div className="stat-row">
                <div className="stat">
                  <b>{year - 1997}</b>
                  <span>rokov na trhu</span>
                </div>
                <div className="stat">
                  <b>6+</b>
                  <span>ocenení poroty</span>
                </div>
                <div className="stat">
                  <b>1997</b>
                  <span>založenie</span>
                </div>
              </div>
            </div>
            <div className="rv d1">
              <div className="bleed fade" data-parallax="0.1">
                <img
                  src="/images/brain-web.jpg"
                  alt="Ruka s kresbou mozgu a sieťou — kreativita"
                  style={{ aspectRatio: '3/2' }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* SLUŽBY */}
        <section className="pad svc-band" id="services" data-screen-label="Služby">
          <div className="wrap">
            <div className="sec-head center rv">
              <div className="eyebrow">Služby</div>
              <h2>Komplexné služby</h2>
              <div className="sub">„… originálne riešenia!“</div>
            </div>
            <div className="svc-grid">
              <div className="svc rv" data-n="01">
                <div className="ico">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                    <path d="M12 19l7-7 3 3-7 7-3-3z" />
                    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                    <circle cx="11" cy="11" r="2" />
                  </svg>
                </div>
                <h3>Grafický dizajn</h3>
                <p>
                  Pretavenie predstáv klienta do návrhu. Štylizácia textov, výber formátu, práca na kalibrovaných
                  monitoroch EIZO.
                </p>
              </div>
              <div className="svc rv d1" data-n="02">
                <div className="ico">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                    <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
                    <path d="M9 7h7M9 11h7" />
                  </svg>
                </div>
                <h3>Redakčné práce</h3>
                <p>Príprava textového obsahu, štylizácia, jazyková korektúra či preklad do iného jazyka.</p>
              </div>
              <div className="svc rv d2" data-n="03">
                <div className="ico">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                    <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                </div>
                <h3>Fotografia</h3>
                <p>Profesionálne fotenie interiérov a exteriérov. Canon EOS, 22 Mpx, až do formátu A2+.</p>
              </div>
              <div className="svc rv d1" data-n="04">
                <div className="ico">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <path d="M8 21h8M12 17v4" />
                  </svg>
                </div>
                <h3>Výroba web-stránok</h3>
                <p>Web, ktorý vás odlíši od konkurencie — vrátane crossmedia publikovania pre tlač aj internet.</p>
              </div>
              <div className="svc rv d2" data-n="05">
                <div className="ico">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                    <path d="M20 12v9H4v-9" />
                    <path d="M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" />
                  </svg>
                </div>
                <h3>Doplnkové reklamné služby</h3>
                <p>
                  Reklamné predmety, textil, potlač, gravírovanie, puzzle, magnetky, bannery, informačné tabule, polep
                  vozidiel.
                </p>
              </div>
              <div className="svc feat rv d3" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h3>Od nápadu po realizáciu.</h3>
                <p>
                  Návrh aj profesionálne technické spracovanie pod jednou strechou — od kreatívy až po hotovú tlačovinu.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PONUKA */}
        <section className="pad" id="offer" data-screen-label="Naša ponuka">
          <div className="wrap">
            <div className="offer-top">
              <div className="rv">
                <div className="eyebrow">Naša ponuka</div>
                <h2 style={{ fontSize: 'clamp(30px,3.6vw,50px)', margin: '14px 0 0' }}>
                  Na trhu je veľa ponúk,
                  <br />
                  <span className="grad">šijeme ju na mieru.</span>
                </h2>
                <p className="quiet" style={{ marginTop: '24px' }}>
                  Až profesionálna technická realizácia je zárukou úspešného výsledku. Vyberieme správny formát, papier,
                  druh tlače aj väzbu.
                </p>
                <p className="quiet">
                  Tvoríme tlačoviny od najjednoduchších po najzložitejšie — s knihárskym spracovaním, laminovaním,
                  lakovaním či výsekom.
                </p>
              </div>
              <div className="rv d1">
                <div className="bleed fade" data-parallax="0.1">
                  <img
                    src="/images/phone-wide-web.jpg"
                    alt="Ruka ukazujúca na nákres mobilu — kresba kriedou"
                    style={{ aspectRatio: '4/3' }}
                  />
                </div>
              </div>
            </div>
            <div className="offer-cols">
              <div className="ocol rv">
                <h3>
                  <span className="num">1</span>Firemné tlačoviny
                </h3>
                <ul>
                  <li>Vizitky, hlavičkové papiere, obálky</li>
                  <li>Manuály a servisné knižky</li>
                  <li>Poznámkové bloky, diáre</li>
                  <li>Letáky, plagáty, skladačky</li>
                  <li>Katalógy, zakladače</li>
                  <li>Kalendáre, výročné správy</li>
                </ul>
              </div>
              <div className="ocol rv d1">
                <h3>
                  <span className="num">2</span>Pre inštitúcie
                </h3>
                <ul>
                  <li>Brožúry</li>
                  <li>Skriptá</li>
                  <li>Knihy</li>
                  <li>Noviny, časopisy</li>
                  <li>Puzzle</li>
                </ul>
              </div>
              <div className="ocol rv d2">
                <h3>
                  <span className="num">3</span>Pre obce a mestá
                </h3>
                <ul>
                  <li>Pohľadnice, skladačky</li>
                  <li>Turistickí sprievodcovia, mapy</li>
                  <li>Kalendáre s vašimi fotkami</li>
                  <li>Monografie</li>
                  <li>Noviny</li>
                  <li>Bannery, informačné tabule</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* OCENENIA */}
        <section className="pad svc-band" id="awards" data-screen-label="Ocenenia">
          <div className="wrap">
            <div className="sec-head rv">
              <div className="eyebrow">Ocenenia</div>
              <h2 style={{ fontSize: 'clamp(30px,3.6vw,50px)', marginTop: '12px' }}>Naša práca, ocenená porotami</h2>
            </div>
            <div className="awards">
              <div className="award rv">
                <div className="yr">Slovenská kronika</div>
                <div className="ttl">
                  Monografia Žemberovce<span>Kategória monografia</span>
                </div>
                <div className="medal">Hlavná cena</div>
              </div>
              <div className="award rv">
                <div className="yr">Najkrajšia kniha</div>
                <div className="ttl">
                  Chotár pod Čiernym Kameňom<span>Nominácia na Krištáľové krídlo</span>
                </div>
                <div className="medal">1. miesto</div>
              </div>
              <div className="award rv">
                <div className="yr">Slovenská kronika</div>
                <div className="ttl">
                  Monografia Devičany<span>Kategória monografia</span>
                </div>
                <div className="medal">Čestné uznanie</div>
              </div>
              <div className="award rv">
                <div className="yr">Najkrajšia kniha</div>
                <div className="ttl">
                  Tu spočíva kvet, čo zanechal svet<span>Propagačný materiál</span>
                </div>
                <div className="medal">3. miesto</div>
              </div>
              <div className="award rv">
                <div className="yr">Najkrajší kalendár SR</div>
                <div className="ttl">
                  Čarokrásna Záhrada Eden<span>Kategória Obce — nástenný</span>
                </div>
                <div className="medal">3. miesto</div>
              </div>
            </div>
          </div>
        </section>

        {/* ÚČTOVNÍCTVO */}
        <section className="pad" id="accounting" data-screen-label="Účtovníctvo">
          <div className="wrap acc-grid">
            <div className="acc rv">
              <div className="eyebrow">Účtovníctvo</div>
              <h2 style={{ fontSize: 'clamp(30px,3.6vw,48px)', margin: '14px 0 0' }}>
                Vy viete, čo potrebujete,
                <br />
                <span className="grad" style={{ fontSize: '.82em' }}>
                  … my vieme, ako na to!
                </span>
              </h2>
              <p className="quiet" style={{ marginTop: '22px' }}>
                Vedenie jednoduchého aj podvojného účtovníctva pre živnostníkov a malé s.r.o.
              </p>
              <ul>
                <li>Vedenie účtovných kníh, denníka a analytických evidencií</li>
                <li>Daňové priznania — daň z príjmov FO a PO, DPH, motorové vozidlá a nehnuteľnosti</li>
                <li>Pravidelný prehľad o ekonomickom stave vašej firmy</li>
              </ul>
              <a href="#contact" className="btn btn-primary">
                Dohodnite si stretnutie <span className="arr">→</span>
              </a>
              <p className="note">Prvá konzultácia je bezplatná.</p>
            </div>
            <div className="rv d1">
              <div className="bleed fade" data-parallax="0.1">
                <img
                  src="/images/hammer-money-web.jpg"
                  alt="Kladivko a kresba mincí — financie"
                  style={{ aspectRatio: '3/2' }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* KONTAKT */}
        <section className="pad contact-band" id="contact" data-screen-label="Kontakt">
          <div className="wrap">
            <div className="sec-head center rv">
              <div className="eyebrow">Kontakt</div>
              <h2>Dohodnite si stretnutie</h2>
              <div className="sub">„… za opýtanie nič nedáte :)“</div>
            </div>
            <div className="contact-card rv d1">
              <div className="coffee-pane">
                <img src="/images/coffee-wide-web.jpg" alt="Ruka držiaca kresbu šálky kávy s parou" />
                <div className="steam">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <div className="contact-info">
                <div className="eyebrow">Spojte sa s nami</div>
                <h3>Pri dobrej káve to ide ľahšie</h3>
                <div className="cline">
                  <div className="ci">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="M22 7l-10 6L2 7" />
                    </svg>
                  </div>
                  <div>
                    <div className="lbl">E-mail</div>
                    <div className="val">info@euroart.sk</div>
                  </div>
                </div>
                <div className="cline">
                  <div className="ci">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0122 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <div className="lbl">Telefón</div>
                    <div className="val">+421 900 000 000</div>
                  </div>
                </div>
                <p className="note">* Kontaktné údaje sú momentálne ilustračné.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer data-screen-label="Footer">
        <div className="wrap">
          <a href="#top" className="logo" style={{ fontSize: '28px' }}>
            <span>EURO</span>
            <span className="a">ART</span>
          </a>
          <p>Reklamná agentúra &amp; účtovníctvo · originálne riešenia od roku 1997</p>
          <div className="fne">© {year} EUROART. Všetky práva vyhradené. · Návrh dizajnu — verzia „Studio“</div>
        </div>
      </footer>
    </>
  );
}

export default App;
