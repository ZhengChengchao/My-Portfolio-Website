import { isFieldReady } from '../data/projects.js'

function ProjectCard({ project, onOpen }) {
  const title = isFieldReady(project.title)
    ? project.title.value
    : `[${project.category} project title pending]`

  const summary = isFieldReady(project.summary)
    ? project.summary.value
    : `[${project.summary.label} pending — update src/data/projects.js]`

  const hasThumbnail = isFieldReady(project.thumbnail)

  const technologies = isFieldReady(project.detail.technologies)
    ? project.detail.technologies.value.join(', ')
    : '[Technologies pending]'

  return (
    <article className="project-card" id={project.id}>
      <div className={`project-card__media ${hasThumbnail ? 'has-image' : ''}`}>
        {hasThumbnail ? (
          <img
            className="project-card__thumbnail"
            src={project.thumbnail.value}
            alt={`${title} project preview`}
            loading="lazy"
          />
        ) : (
          <>
            <span>{project.thumbnail.label} pending</span>
            <strong aria-hidden="true">{project.number}</strong>
          </>
        )}
      </div>
      <div className="project-card__body">
        <div className="project-card__meta">
          <p className="project-card__category">{project.category}</p>
          <span>Draft</span>
        </div>
        <h3>{title}</h3>
        <p>{summary}</p>
        <div className="project-card__footer">
          <span>{technologies}</span>
          <button type="button" onClick={() => onOpen(project.id)}>
            Open project
            <span aria-hidden="true">↗</span>
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProjectCard
