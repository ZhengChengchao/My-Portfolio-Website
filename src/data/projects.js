const pendingField = (label, guidance, type = 'text', value = null) => ({
  status: 'pending',
  label,
  guidance,
  type,
  value,
})

const createDraftProject = ({ id, number, category }) => ({
  id,
  number,
  category,
  status: 'draft',
  title: pendingField(
    'Project title',
    'Add the verified project title before publishing this case study.',
  ),
  summary: pendingField(
    'Project summary',
    'Add a short verified summary covering the problem, scope and outcome.',
  ),
  thumbnail: pendingField(
    'Project thumbnail',
    'Add a verified project image or interface screenshot.',
    'media',
  ),
  detail: {
    overview: pendingField(
      'Project overview',
      'Describe the project context, intended users and confirmed scope.',
    ),
    objectives: pendingField(
      'Objectives',
      'Add the confirmed project objectives as a short list.',
      'list',
    ),
    roleAndContributions: pendingField(
      'My role and contributions',
      'Add only the responsibilities and contributions you can verify.',
      'list',
    ),
    technologies: pendingField(
      'Technologies used',
      'List only the languages, frameworks and tools actually used.',
      'tags',
    ),
    developmentProcess: pendingField(
      'Development process',
      'Add the verified stages in the order they happened.',
      'process',
      [
        { title: null, description: null },
        { title: null, description: null },
        { title: null, description: null },
        { title: null, description: null },
      ],
    ),
    challengesAndSolutions: pendingField(
      'Challenges and solutions',
      'Add confirmed challenges and explain the solution used for each one.',
      'pairs',
    ),
    screenshotsAndOutcome: pendingField(
      'Screenshots and final outcome',
      'Add verified screenshots, captions and the confirmed final outcome.',
      'gallery',
      [
        { src: null, alt: null, caption: null },
        { src: null, alt: null, caption: null },
        { src: null, alt: null, caption: null },
      ],
    ),
    demoVideo: pendingField(
      'Demo video',
      'Add a verified demo-video URL only when it is available.',
      'link',
    ),
    repository: pendingField(
      'GitHub repository',
      'Add the correct repository URL and confirm that viewers can access it.',
      'link',
    ),
    aiAssistanceAndReferences: pendingField(
      'AI assistance and references',
      'Record any AI assistance, prompts, external references and attribution required for this project.',
      'list',
    ),
  },
})

export const projects = [
  createDraftProject({
    id: 'development',
    number: '01',
    category: 'Development',
  }),
  createDraftProject({
    id: 'design-ux',
    number: '02',
    category: 'Design & UX',
  }),
  createDraftProject({
    id: 'ai-data-automation',
    number: '03',
    category: 'AI, Data & Automation',
  }),
]

export const projectCategories = projects.map(({ id, number, category }) => ({
  id,
  number,
  label: category,
}))

export const isFieldReady = (field) =>
  field.status === 'ready' && field.value !== null

