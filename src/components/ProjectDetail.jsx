
import { useRef, useState } from 'react'
import { isFieldReady } from '../data/projects.js'
import Lightbox from './Lightbox.jsx'

function PendingContent({ field, compact = false }) {
  return (
    <div
      className={`pending-content ${compact ? 'pending-content--compact' : ''}`}
      role="note"
    >
      <span>Pending content</span>
      <strong>{field.label}</strong>
      <p>{field.guidance}</p>
    </div>
  )
}

function DetailSection({ number, title, className = '', children }) {
  return (
    <section className={`detail-section ${className}`}>
      <div className="detail-section__heading">
        <span>{number}</span>
        <h2>{title}</h2>
        <i aria-hidden="true" />
      </div>
      {children}
    </section>
  )
}

function TextField({ field }) {
  if (!isFieldReady(field)) {
    return <PendingContent field={field} />
  }

  const paragraphs = Array.isArray(field.value)
    ? field.value
    : [field.value]

  return paragraphs.map((paragraph) => (
    <p key={paragraph}>{paragraph}</p>
  ))
}

function ListField({ field }) {
  if (!isFieldReady(field)) {
    return <PendingContent field={field} />
  }

  return (
    <ul className="detail-list">
      {field.value.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

function TechnologiesField({ field }) {
  if (!isFieldReady(field)) {
    return <PendingContent field={field} />
  }

  return (
    <ul className="technology-list" aria-label="Technologies used">
      {field.value.map((technology) => (
        <li key={technology}>{technology}</li>
      ))}
    </ul>
  )
}

function ProcessField({ field }) {
  const steps = field.value ?? []

  return (
    <>
      {!isFieldReady(field) && (
        <PendingContent field={field} compact />
      )}

      <ol className="process-grid">
        {steps.map((step, index) => (
          <li
            className="process-card"
            key={`${field.label}-${index + 1}`}
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h3>{step.title ?? `Step ${index + 1} pending`}</h3>
            <p>{step.description ?? 'Add a verified process step.'}</p>
          </li>
        ))}
      </ol>
    </>
  )
}

function ChallengesField({ field }) {
  if (!isFieldReady(field)) {
    return <PendingContent field={field} />
  }

  return (
    <div className="challenge-list">
      {field.value.map((item, index) => (
        <article key={`${item.challenge}-${index}`}>
          <p>
            Challenge {String(index + 1).padStart(2, '0')}
          </p>
          <h3>{item.challenge}</h3>
          <strong>Solution</strong>
          <p>{item.solution}</p>
        </article>
      ))}
    </div>
  )
}

function OutcomeField({ field }) {
  const items = field.value ?? []
  const images = items.filter((item) => typeof item?.src === 'string' && item.src.trim())
  const [selectedIndex, setSelectedIndex] = useState(null)
  const openerRef = useRef(null)

  const openLightbox = (event, item) => {
    // Preserve normal link behaviour for Ctrl/Cmd-click and opening a new tab.
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    openerRef.current = event.currentTarget
    openerRef.current.focus()
    setSelectedIndex(images.indexOf(item))
  }

  const closeLightbox = () => {
    setSelectedIndex(null)
    openerRef.current?.focus()
  }

  return (
    <>
      {!isFieldReady(field) && (
        <PendingContent field={field} compact />
      )}

      <div className="outcome-grid">
        {items.map((item, index) => (
          <figure
            className="outcome-card"
            key={`${field.label}-${index + 1}`}
          >
            {images.includes(item) ? (
              <a
                className="outcome-card__image-link"
                href={item.src}
                aria-label={`Enlarge screenshot ${index + 1}: ${item.alt ?? item.caption ?? 'Project screenshot'}`}
                aria-haspopup="dialog"
                onClick={(event) => openLightbox(event, item)}
              >
                <img
                  src={item.src}
                  alt={item.alt ?? ''}
                  loading="lazy"
                />
              </a>
            ) : (
              <div className="outcome-card__placeholder">
                <span>Screenshot {index + 1}</span>
                <strong>Pending</strong>
              </div>
            )}

            <figcaption>
              {item.caption ?? '[Verified caption to add]'}
            </figcaption>
          </figure>
        ))}
      </div>
      {selectedIndex !== null && images.length > 0 && (
        <Lightbox
          images={images}
          initialIndex={selectedIndex}
          onClose={closeLightbox}
        />
      )}
    </>
  )
}

function ResourceCard({ field }) {
  const ready = isFieldReady(field)

  return (
    <article className="resource-card">
      <p>External resource</p>
      <h3>{field.label}</h3>
      <p>
        {ready
          ? 'Verified link available.'
          : field.guidance}
      </p>

      {ready ? (
        <a
          href={field.value}
          target="_blank"
          rel="noreferrer"
        >
          Open verified link
          <span aria-hidden="true">↗</span>
        </a>
      ) : (
        <span className="resource-card__status">
          Link pending
        </span>
      )}
    </article>
  )
}

function ProjectDetail({ project, onBack }) {
  const title = isFieldReady(project.title)
    ? project.title.value
    : `[${project.category} project title pending]`

  // Check whether a real thumbnail is available.
  const hasThumbnail = isFieldReady(project.thumbnail)

  return (
    <article className="project-detail">
      <div className="shell">
        <button
          className="project-detail__back"
          type="button"
          onClick={onBack}
        >
          <span aria-hidden="true">←</span>
          Back to Portfolio
        </button>

        <header className="project-detail__hero">
          <div className="project-detail__title-row">
            <div>
              <p className="eyebrow">
                <span>{project.number}</span>
                {' '}
                {project.category}
              </p>

              <h1>{title}</h1>
            </div>

            <span className="project-detail__status">
              Draft case study
            </span>
          </div>

          {/* Project Hero Image */}
          <div
            className={`project-detail__hero-media ${
              hasThumbnail ? 'has-image' : ''
            }`}
          >
            {hasThumbnail ? (
              <img
                src={project.thumbnail.value}
                alt={`${title} application overview`}
                className="project-detail__hero-image"
              />
            ) : (
              <>
                <span>{project.thumbnail.label} pending</span>
                <strong aria-hidden="true">
                  {project.number}
                </strong>
              </>
            )}
          </div>
        </header>

        <DetailSection
          number="01"
          title="Project Overview"
        >
          <div className="detail-grid detail-grid--two">
            <div className="detail-content">
              <h3>Overview</h3>
              <TextField field={project.detail.overview} />
            </div>

            <div className="detail-content">
              <h3>Objectives</h3>
              <ListField field={project.detail.objectives} />
            </div>
          </div>
        </DetailSection>

        <DetailSection
          number="02"
          title="Role and Technology"
        >
          <div className="detail-grid detail-grid--two">
            <div className="detail-content">
              <h3>My Role and Contributions</h3>
              <ListField
                field={project.detail.roleAndContributions}
              />
            </div>

            <div className="detail-content">
              <h3>Technologies Used</h3>
              <TechnologiesField
                field={project.detail.technologies}
              />
            </div>
          </div>
        </DetailSection>

        <DetailSection
          number="03"
          title="Development Process"
        >
          <ProcessField
            field={project.detail.developmentProcess}
          />
        </DetailSection>

        <DetailSection
          number="04"
          title="Challenges and Solutions"
        >
          <ChallengesField
            field={project.detail.challengesAndSolutions}
          />
        </DetailSection>

        <DetailSection
          number="05"
          title="Screenshots and Final Outcome"
        >
          <OutcomeField
            field={project.detail.screenshotsAndOutcome}
          />
        </DetailSection>

        <DetailSection
          number="06"
          title="Project Links"
        >
          <div className="resource-grid">
            <ResourceCard
              field={project.detail.demoVideo}
            />
            <ResourceCard
              field={project.detail.repository}
            />
          </div>
        </DetailSection>

        <DetailSection
          number="07"
          title="AI Assistance and References"
        >
          <div className="detail-content detail-content--wide">
            <ListField
              field={project.detail.aiAssistanceAndReferences}
            />
          </div>
        </DetailSection>
      </div>
    </article>
  )
}

export default ProjectDetail
