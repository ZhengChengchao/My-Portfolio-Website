
const pendingField = (label, guidance, type = 'text', value = null) => ({
  status: 'pending',
  label,
  guidance,
  type,
  value,
})

const readyField = (label, value, type = 'text') => ({
  status: 'ready',
  label,
  guidance: '',
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
    'Add a short verified summary of the project.',
  ),

  thumbnail: pendingField(
    'Project thumbnail',
    'Add a real project screenshot.',
    'media',
  ),

  detail: {
    overview: pendingField(
      'Project overview',
      'Describe the project and its purpose.',
    ),

    objectives: pendingField(
      'Objectives',
      'Add the project objectives.',
      'list',
    ),

    roleAndContributions: pendingField(
      'My role and contributions',
      'Describe your verified contributions.',
      'list',
    ),

    technologies: pendingField(
      'Technologies used',
      'List the technologies actually used.',
      'tags',
    ),

    developmentProcess: pendingField(
      'Development process',
      'Describe the development stages.',
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
      'Describe challenges and how they were solved.',
      'pairs',
    ),

    screenshotsAndOutcome: pendingField(
      'Screenshots and final outcome',
      'Add real screenshots and captions.',
      'gallery',
      [
        { src: null, alt: null, caption: null },
        { src: null, alt: null, caption: null },
        { src: null, alt: null, caption: null },
      ],
    ),

    demoVideo: pendingField(
      'Demo video',
      'Add a working demonstration video link.',
      'link',
    ),

    repository: pendingField(
      'GitHub repository',
      'Add the correct repository URL.',
      'link',
    ),

    aiAssistanceAndReferences: pendingField(
      'AI assistance and references',
      'Add AI usage and project references.',
      'list',
    ),
  },
})


// ============================================================
// PROJECT 01: CAMPUSCYCLE
// C237 Software Application Development
// Academic Team Project
// ============================================================

const campusCycleProject = {
  id: 'campuscycle',
  number: '01',
  category: 'Development',
  status: 'draft',

  title: readyField(
    'Project title',
    'CampusCycle',
  ),

  summary: readyField(
    'Project summary',
    'A second-hand marketplace for Republic Polytechnic students to buy, sell and exchange course-related items.',
  ),

  thumbnail: pendingField(
    'Project thumbnail',
    'Add an actual screenshot of CampusCycle.',
    'media',
  ),

  detail: {

    // 01. PROJECT OVERVIEW

    overview: readyField(
      'Project overview',
      'CampusCycle is a team-developed second-hand marketplace for Republic Polytechnic students. It helps students list, find and exchange items such as textbooks, tools and course materials. The platform supports reuse and aims to reduce unnecessary spending and waste.',
    ),

    objectives: readyField(
      'Objectives',
      [
        'Allow RP students to browse and exchange pre-owned course-related items.',
        'Provide a structured reservation and meetup process for buyers and sellers.',
        'Maintain accurate product availability and transaction records throughout the exchange.',
      ],
      'list',
    ),

    // 02. MY ROLE AND TECHNOLOGIES

    roleAndContributions: readyField(
      'My role and contributions',
      [
        'Developed the reservation workflow, including reservations created from product details and the shopping cart.',
        'Implemented seller meetup proposals, buyer confirmation and seller completion actions.',
        'Handled reservation cancellations and rejections with stock restoration safeguards.',
        'Developed reservation details and completed purchase/sales history.',
        'Integrated reservation history with a teammate’s rating functionality.',
        'Contributed to shared navigation, filters and footer consistency during final integration.',
      ],
      'list',
    ),

    technologies: readyField(
      'Technologies used',
      [
        'JavaScript',
        'Node.js',
        'Express.js',
        'EJS',
        'MySQL',
        'Bootstrap',
        'HTML',
        'CSS',
        'Git / GitHub',
      ],
      'tags',
    ),

    // 03. DEVELOPMENT PROCESS

    developmentProcess: readyField(
      'Development process',
      [
        {
          title: 'Plan the Reservation Workflow',
          description:
            'Defined the reservation statuses and the actions available to buyers and sellers. The process covers reservation requests, meetup proposals, confirmation, completion, cancellation and rejection.',
        },
        {
          title: 'Implement Reservation Creation',
          description:
            'Developed reservation handling for product details and cart entry points. Added validation for product availability, quantity and user ownership.',
        },
        {
          title: 'Develop Meetup and Status Actions',
          description:
            'Implemented seller meetup proposals, buyer confirmation, reservation cancellation, seller rejection and transaction completion, with role and status restrictions.',
        },
        {
          title: 'Integrate and Refine',
          description:
            'Connected completed reservations with transaction history and the rating feature. Helped improve shared navigation and interface consistency during team integration.',
        },
      ],
      'process',
    ),

    // 04. CHALLENGES AND SOLUTIONS

    challengesAndSolutions: readyField(
      'Challenges and solutions',
      [
        {
          challenge:
            'Preventing Overselling When Stock Was Limited',
          solution:
            'Used a conditional MySQL stock UPDATE and checked affectedRows before inserting a reservation. This ensured that a reservation could proceed only when sufficient stock was available.',
        },
        {
          challenge:
            'Avoiding Duplicate Stock Restoration',
          solution:
            'Used shared cancellation and rejection logic with a stock_restored database guard. This prevented repeated requests from restoring the same reserved quantity more than once.',
        },
        {
          challenge:
            'Protecting Reservations from Unauthorised Actions',
          solution:
            'Used session-based user IDs and role/status checks in database queries to ensure that buyers and sellers could only perform permitted actions on their reservations.',
        },
      ],
      'pairs',
    ),

    // 05. SCREENSHOTS AND FINAL OUTCOME

    screenshotsAndOutcome: pendingField(
      'Screenshots and final outcome',
      'Add real CampusCycle screenshots showing reservation features and the final application.',
      'gallery',
      [
        {
          src: null,
          alt: null,
          caption: 'Reservation list screenshot to add',
        },
        {
          src: null,
          alt: null,
          caption: 'Meetup proposal screenshot to add',
        },
        {
          src: null,
          alt: null,
          caption: 'Completed transaction screenshot to add',
        },
      ],
    ),

    // 06. PROJECT LINKS

    demoVideo: pendingField(
      'Demo video',
      'Record a demonstration of CampusCycle and add its video URL.',
      'link',
    ),

    repository: readyField(
      'GitHub repository',
      'https://github.com/ZhengChengchao/C237_SoftwareDevelopment_CA2',
      'link',
    ),

    // 07. AI ASSISTANCE AND REFERENCES

    aiAssistanceAndReferences: readyField(
      'AI assistance and references',
      [
        'AI coding tools assisted with the initial implementation and review of reservation routes. The suggestions were adapted to use session-based ownership checks, conditional stock updates and the existing application structure.',
        'Project evidence: C237 CA2 Team Development Journal and Team 1 CampusCycle presentation.',
        'CampusCycle was developed as a team project. Other members were primarily responsible for product listings, authentication, cart, reporting and rating features.',
      ],
      'list',
    ),
  },
}


// ============================================================
// EXPORT PROJECTS
// ============================================================

export const projects = [
  campusCycleProject,

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


// Portfolio category navigation
export const projectCategories = projects.map(
  ({ id, number, category }) => ({
    id,
    number,
    label: category,
  }),
)


// Check whether a field is ready to display
export const isFieldReady = (field) =>
  field.status === 'ready' && field.value !== null
