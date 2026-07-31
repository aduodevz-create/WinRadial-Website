import React, { useState, useEffect, useRef } from 'react';
import { 
  FiZap, FiFolder, FiMoon, FiTrash2, FiCamera, FiCoffee,
  FiTerminal, FiLayers, FiSettings 
} from 'react-icons/fi';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [activeItem, setActiveItem] = useState(null);
  const [activeSection, setActiveSection] = useState('hero');

  // Refs for sections
  const sections = {
    hero: useRef(null),
    'how-it-works': useRef(null),
    features: useRef(null),
    download: useRef(null),
  };

  useEffect(() => {
    // Generate radial items
    const numItems = 6;
    const radius = 120; 
    const newItems = [];
    
    for (let i = 0; i < numItems; i++) {
      const angle = (i * (360 / numItems)) * (Math.PI / 180);
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      newItems.push({ 
        id: i, 
        x, 
        y,
        delay: `${i * 0.15}s` 
      });
    }
    setItems(newItems);

    // Setup Intersection Observer for Scroll Spy
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    Object.values(sections).forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  const icons = [<FiZap/>, <FiFolder/>, <FiMoon/>, <FiTrash2/>, <FiCamera/>, <FiCoffee/>];
  const labels = ["Launch App", "Open Folder", "Dark Mode", "Empty Bin", "Screenshot", "Sleep"];

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    sections[sectionId].current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="app-container">
      {/* Ambient Animated Background */}
      <div className="ambient-background">
        <div className="ambient-orb orb-1"></div>
        <div className="ambient-orb orb-2"></div>
        <div className="ambient-orb orb-3"></div>
      </div>

      <header className="header">
        <div className="container">
          <div className="logo" onClick={(e) => scrollToSection(e, 'hero')} style={{cursor: 'pointer'}}>
            Win<span className="logo-accent">Radial</span>.exe
          </div>
          <nav className="nav-links">
            <a 
              href="#how-it-works" 
              className={activeSection === 'how-it-works' ? 'active' : ''}
              onClick={(e) => scrollToSection(e, 'how-it-works')}
            >
              How it works
            </a>
            <a 
              href="#features" 
              className={activeSection === 'features' ? 'active' : ''}
              onClick={(e) => scrollToSection(e, 'features')}
            >
              Features
            </a>
            <a 
              href="#download" 
              className={activeSection === 'download' ? 'active' : ''}
              onClick={(e) => scrollToSection(e, 'download')}
            >
              Download
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section id="hero" className="hero" ref={sections.hero}>
          <div className="container">
            <div className="hero-content">
              <h1 className="hero-title">
                We <span className="red-accent">build</span> <br />
                frictionless <br />
                desktop <br />
                <span style={{display: 'flex', alignItems: 'center'}}>
                  workflows
                  <div className="floating-pill">
                    <FiZap size={18} /> Fast
                  </div>
                </span>
              </h1>
              <p className="hero-subtitle">
                From simple app launchers to full-blown global hotkey orchestration — we at WinRadial design desktop utilities that transform how power users interact with their operating systems. 
              </p>
              
              <div className="cta-wrapper">
                <a href="/WinRadial.exe" download="WinRadial.exe" className="btn-black" style={{display: 'inline-flex', alignItems: 'center', gap: '8px'}}>
                  <FiZap size={20} color="#e31f26" /> Download WinRadial.exe
                </a>
                <a href="#how-it-works" className="btn-outline" style={{marginLeft: '15px'}} onClick={(e) => scrollToSection(e, 'how-it-works')}>See how it works</a>
                <svg className="doodle-arrow" viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5,45 C30,45 40,5 95,25" stroke="#e31f26" strokeWidth="2" fill="none" strokeLinecap="round" />
                  <path d="M85,15 L95,25 L80,30" stroke="#e31f26" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            <div className="hero-media">
              <div className="media-text-bg">/RADIAL</div>
              
              {/* 3D Floating Elements */}
              <div className="model-3d-1"></div>
              <div className="model-3d-2"></div>
              <div className="model-3d-3"></div>
              
              <div className="radial-demo-container">
                <div className="radial-center" onMouseEnter={() => setActiveItem(null)}>
                  WR
                </div>
                {items.map((item, index) => (
                  <div 
                    key={item.id} 
                    className="radial-item"
                    style={{
                      transform: `translate(calc(-50% + ${item.x}px), calc(-50% + ${item.y}px)) scale(${activeItem === index ? 1.2 : 1})`,
                      animation: `fadeIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${item.delay} both`,
                      zIndex: activeItem === index ? 20 : 1
                    }}
                    title={labels[index]}
                    onMouseEnter={() => setActiveItem(index)}
                    onMouseLeave={() => setActiveItem(null)}
                  >
                    {icons[index]}
                    
                    {activeItem === index && (
                      <div style={{
                        position: 'absolute',
                        top: '120%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'white',
                        color: 'black',
                        padding: '6px 16px',
                        borderRadius: '20px',
                        fontSize: '0.95rem',
                        fontWeight: '600',
                        whiteSpace: 'nowrap',
                        pointerEvents: 'none',
                        boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                      }}>
                        {labels[index]}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="showcase" ref={sections['how-it-works']}>
          <div className="container">
            <h2 className="section-title">Visual Settings Editor</h2>
            <p className="section-subtitle">
              All behavior and styling in WinRadial is driven by a powerful visual settings editor. Customize your wheel exactly how you want it with live previews and intuitive controls.
            </p>
            
            <div className="showcase-grid">
              <div className="showcase-text">
                <h3>Fully customizable. <br/>Down to the pixel.</h3>
                <p>
                  Our built-in settings window lets you tweak colors, sizes, and layout in real-time. No more messing with text files—see your changes instantly as you build your perfect workspace.
                </p>
                <ul className="showcase-features-list">
                  <li>
                    <span className="check-icon"><FiTerminal size={12}/></span>
                    Define custom hotkeys (e.g., Ctrl+Alt+Space)
                  </li>
                  <li>
                    <span className="check-icon"><FiLayers size={12}/></span>
                    Control inner/outer radii and slice gaps
                  </li>
                  <li>
                    <span className="check-icon"><FiSettings size={12}/></span>
                    Inject ARGB hex gradients and glow effects
                  </li>
                </ul>
              </div>

              <div className="mockup-window">
                <div className="mockup-header">
                  <div className="mockup-dot red"></div>
                  <div className="mockup-dot yellow"></div>
                  <div className="mockup-dot green"></div>
                  <div style={{marginLeft: 'auto', fontSize: '0.8rem', color: '#999', fontFamily: 'Inter'}}>config.json</div>
                </div>
                <div className="mockup-body">
                  <span style={{color: '#d32f2f'}}>&#123;</span><br/>
                  &nbsp;&nbsp;<span style={{color: '#1976d2'}}>"hotkey"</span>: <span style={{color: '#388e3c'}}>"Ctrl+Alt+Space"</span>,<br/>
                  &nbsp;&nbsp;<span style={{color: '#1976d2'}}>"appearance"</span>: &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span style={{color: '#1976d2'}}>"innerRadius"</span>: <span style={{color: '#f57c00'}}>80</span>,<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span style={{color: '#1976d2'}}>"outerRadius"</span>: <span style={{color: '#f57c00'}}>250</span>,<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span style={{color: '#1976d2'}}>"accentColor"</span>: <span style={{color: '#388e3c'}}>"#e31f26"</span>,<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span style={{color: '#1976d2'}}>"sliceGapDegrees"</span>: <span style={{color: '#f57c00'}}>2.5</span><br/>
                  &nbsp;&nbsp;&#125;,<br/>
                  &nbsp;&nbsp;<span style={{color: '#1976d2'}}>"categories"</span>: [<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span style={{color: '#9e9e9e'}}>// Define your slots here</span><br/>
                  &nbsp;&nbsp;]<br/>
                  <span style={{color: '#d32f2f'}}>&#125;</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="features-grid-section" ref={sections.features}>
          <div className="container" style={{maxWidth: '1200px'}}>
            <h2 className="section-title">Core Architecture</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon"><FiTerminal /></div>
                <h3>C# / WPF Native</h3>
                <p>Built native for Windows. Uses frameless, transparent windows with minimal overhead. Our single instance Mutex ensures only one instance of the app runs at a time for maximum stability.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon"><FiZap /></div>
                <h3>Global Hook</h3>
                <p>We use a specialized HotkeyManager to register system-wide hotkeys that intercept keystrokes regardless of which window is in focus. It's always there when you need it.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon"><FiFolder /></div>
                <h3>Visual Wheel Layout</h3>
                <p>Easily manage your apps with our drag-and-drop inspired Wheel Layout tab. Left-click any segment to open submenus or right-click to instantly assign or remove your favorite software.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="download" className="download-section" ref={sections.download}>
          <div className="container">
            <div className="download-box">
              <h3>Ready to transform your desktop?</h3>
              <p style={{fontSize: '1.25rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto', lineHeight: '1.6'}}>
                Stop searching through cluttered taskbars and start menus. Get friction-less access to your tools today.
              </p>
              <a href="/WinRadial.exe" download="WinRadial.exe" className="download-btn">
                <FiZap size={22} color="#e31f26"/> Download WinRadial.exe
              </a>
              <p style={{marginTop: '2rem', fontSize: '0.95rem', opacity: 0.7}}>Version 1.0.0 • Requires Windows 10/11 (64-bit)</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <div className="footer-col" style={{maxWidth: '300px'}}>
              <div className="logo" style={{marginBottom: '1rem', cursor: 'pointer'}} onClick={(e) => scrollToSection(e, 'hero')}>
                Win<span className="logo-accent">Radial</span>
              </div>
              <p style={{color: 'var(--text-muted)', lineHeight: '1.6'}}>
                Designing tools that transform how power users interact with Windows.
              </p>
            </div>
            <div className="footer-col">
              <h4>Product</h4>
              <ul>
                <li><a href="#download" onClick={(e) => scrollToSection(e, 'download')}>Download</a></li>
                <li><a href="#">Documentation</a></li>
                <li><a href="#">Changelog</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Resources</h4>
              <ul>
                <li><a href="#">GitHub</a></li>
                <li><a href="#">Community</a></li>
                <li><a href="#">Support</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Legal</h4>
              <ul>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} WinRadial. All rights reserved.</p>
            <p>Designed and Developed by DuoDevs</p>
            <p>Made for Windows</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
