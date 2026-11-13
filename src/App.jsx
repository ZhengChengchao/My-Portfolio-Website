import { useEffect, useRef, useState } from 'react'
import monogramUrl from '../portfolio_logo.png'

const portfolioCategories = [
  {
    id: 'development',
    label: 'Development',
    number: '01',
    title: '[Development project title to add]',
    summary: '[Add the problem, your role, the tools used and the outcome.]',
  },
  {
    id: 'design-ux',
    label: 'Design & UX',
    number: '02',
    title: '[Design or UX project title to add]',
    summary: '[Add the design challenge, process, deliverables and outcome.]',
  },
  {
    id: 'ai-data-automation',
    label: 'AI, Data & Automation',
    number: '03',
    title: '[AI, data or automation project title to add]',
    summary: '[Add the task, your approach, the tools used and the outcome.]',
  },
]

const focusAreas = [
  {
    number: '01',
    title: 'Development',
    detail: 'Add the languages, frameworks and development tools you want recruiters to see.',
  },
  {
    number: '02',
    title: 'Design & UX',
    detail: 'Add the design tools, methods and user-experience skills supported by your work.',
  },
  {
    number: '03',
    title: 'AI, Data & Automation',
    detail: 'Add the platforms, workflows and technical skills supported by your projects.',
  },
]

function Monogram({ compact = false }) {
  return (
    <span className={`monogram ${compact ? 'monogram--compact' : ''}`}>
      <img src={monogramUrl} alt="ZC monogram" />
    </span>
  )
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20">
      <path d="M5 15 15 5M7 5h8v8" />
    </svg>
  )
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [portfolioOpen, setPortfolioOpen] = useState(false)
  const menuButtonRef = useRef(null)

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key !== 'Escape') return

      if (portfolioOpen) {
        setPortfolioOpen(false)
        return
      }

      if (menuOpen) {
        setMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }

    const handleResize = () => {
      if (window.innerWidth > 860) setMenuOpen(false)
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', handleResize)
    }
  }, [menuOpen, portfolioOpen])

  const closeNavigation = () => {
    setMenuOpen(false)
    setPortfolioOpen(false)
  }

  return (
    <header className="site-header">
      <div className="site-header__inner shell">
        <a className="brand" href="#home" onClick={closeNavigation}>
          <Monogram compact />
          <span className="brand__name">Zheng Chengchao</span>
        </a>

        <button
          className={`menu-toggle ${menuOpen ? 'is-active' : ''}`}
          type="button"
          ref={menuButtonRef}
          aria-controls="primary-navigation"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => {
            setMenuOpen((current) => !current)
            setPortfolioOpen(false)
          }}
        >
          <span />
          <span />
        </button>

        <nav
          className={`primary-nav ${menuOpen ? 'is-open' : ''}`}
          id="primary-navigation"
          aria-label="Primary navigation"
        >
          <a className="primary-nav__link is-current" href="#home" aria-current="page" onClick={closeNavigation}>
            Home
          </a>
          <a className="primary-nav__link" href="#about" onClick={closeNavigation}>
            About
          </a>
          <div className={`portfolio-menu ${portfolioOpen ? 'is-open' : ''}`}>
            <button
              className="primary-nav__link portfolio-menu__trigger"
              type="button"
              aria-haspopup="true"
              aria-expanded={portfolioOpen}
              onClick={() => setPortfolioOpen((current) => !current)}
            >
              Portfolio
              <span className="portfolio-menu__chevron" aria-hidden="true" />
            </button>
            <div className="portfolio-menu__panel">
              <p>Browse by category</p>
              {portfolioCategories.map((category) => (
                <a key={category.id} href={`#${category.id}`} onClick={closeNavigation}>
                  <span>{category.number}</span>
                  {category.label}
                </a>
              ))}
            </div>
          </div>
          <a className="button button--small" href="#contact" onClick={closeNavigation}>
            Contact
            <ArrowIcon />
          </a>
        </nav>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero shell" id="home" aria-labelledby="hero-title">
      <div className="hero__copy">
        <p className="eyebrow"><span>01</span> Hello, I&apos;m</p>
        <h1 id="hero-title">
          Zheng Chengchao
          <span>Aspiring full-stack developer</span>
        </h1>
        <p className="hero__intro">
          A Year 2 Diploma in Information Technology student at Republic Polytechnic,
          majoring in Full Stack Development.
        </p>
        <div className="hero__actions">
          <a className="button" href="#portfolio">
            View featured work
            <ArrowIcon />
          </a>
          <a className="text-link" href="#about">
            More about me
            <span aria-hidden="true">↓</span>
          </a>
        </div>
        <p className="hero__audience">
          Portfolio for internship and entry-level development opportunities in Singapore.
        </p>
      </div>

      <div className="hero-card" aria-label="Portfolio profile summary">
        <div className="hero-card__grid" aria-hidden="true" />
        <p className="hero-card__index" aria-hidden="true">ZC</p>
        <div className="hero-card__logo">
          <Monogram />
        </div>
        <div className="hero-card__details">
          <p>Current direction</p>
          <dl>
            <div>
              <dt>Programme</dt>
              <dd>Diploma in Information Technology</dd>
            </div>
            <div>
              <dt>Major</dt>
              <dd>Full Stack Development</dd>
            </div>
            <div>
              <dt>School</dt>
              <dd>Republic Polytechnic</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}

function SectionHeading({ id, eyebrow, label, title, description }) {
  return (
    <div className="section-heading">
      <p className="eyebrow"><span>{eyebrow}</span> {label}</p>
      <div className="section-heading__row">
        <h2 id={id}>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  )
}

function Portfolio() {
  return (
    <section className="section section--surface" id="portfolio" aria-labelledby="portfolio-title">
      <div className="shell">
        <SectionHeading
          id="portfolio-title"
          eyebrow="02"
          label="Selected overview"
          title="Featured work"
          description="Project details are still being prepared. Each case study will show the problem, process, contribution and result."
        />
        <div className="project-grid">
          {portfolioCategories.map((project) => (
            <article className="project-card" id={project.id} key={project.id}>
              <div className="project-card__media">
                <span>Project image placeholder</span>
                <strong aria-hidden="true">{project.number}</strong>
              </div>
              <div className="project-card__body">
                <p className="project-card__category">{project.label}</p>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <div className="project-card__footer">
                  <span>[Tools to add]</span>
                  <button type="button" disabled>
                    Case study to add
                    <ArrowIcon />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section className="section skills shell" id="skills" aria-labelledby="skills-title">
      <SectionHeading
        id="skills-title"
        eyebrow="03"
        label="Current focus"
        title="Skills & focus"
        description="The structure is ready for verified skills and tools to be added alongside supporting project evidence."
      />
      <div className="focus-list">
        {focusAreas.map((area) => (
          <article className="focus-card" key={area.number}>
            <p className="focus-card__number">{area.number}</p>
            <div>
              <h3>{area.title}</h3>
              <p>{area.detail}</p>
            </div>
            <span className="focus-card__mark" aria-hidden="true">+</span>
          </article>
        ))}
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <div className="shell about__grid">
        <div className="about__aside">
          <p className="eyebrow"><span>04</span> About me</p>
          <p>Student · Developer in progress</p>
        </div>
        <div className="about__content">
          <h2 id="about-title">
            Technical problem-solving,
            <span> shaped by creativity.</span>
          </h2>
          <p>
            I am an Information Technology student developing my skills and experience
            towards becoming a full-stack developer. I enjoy combining technical
            problem-solving with creativity to develop practical and meaningful digital
            solutions.
          </p>
          <ul className="about__facts" aria-label="Education overview">
            <li><span>School</span> Republic Polytechnic</li>
            <li><span>Year</span> Year 2</li>
            <li><span>Major</span> Full Stack Development</li>
          </ul>
          <a className="text-link" href="#skills">
            Explore my focus areas
            <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="shell site-footer__top">
        <div>
          <p className="eyebrow"><span>05</span> Contact</p>
          <h2>Let&apos;s start with a hello.</h2>
        </div>
        <p className="site-footer__intro">
          Contact details have not been provided yet. Add your preferred links before
          publishing this portfolio.
        </p>
      </div>

      <div className="shell contact-list" aria-label="Contact placeholders">
        <div className="contact-item">
          <span>Email</span>
          <strong>[Email address to add]</strong>
        </div>
        <div className="contact-item">
          <span>LinkedIn</span>
          <strong>[LinkedIn URL to add]</strong>
        </div>
        <div className="contact-item">
          <span>GitHub</span>
          <strong>[GitHub URL to add]</strong>
        </div>
      </div>

      <div className="shell site-footer__bottom">
        <a className="brand brand--footer" href="#home">
          <Monogram compact />
          <span className="brand__name">Zheng Chengchao</span>
        </a>
        <nav aria-label="Footer navigation">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#portfolio">Portfolio</a>
        </nav>
        <p>© {new Date().getFullYear()} ZC Portfolio</p>
      </div>
    </footer>
  )
}

function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header />
      <main id="main-content">
        <Hero />
        <Portfolio />
        <Skills />
        <About />
      </main>
      <Footer />
    </>
  )
}

export default App
