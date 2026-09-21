import { Project } from '../../types';

/**
 * Featured portfolio projects data
 * Honest, realistic demo and concept projects showcasing web technologies.
 */
export const projectsData: Project[] = [
  {
    id: 'project-1',
    title: '3D Web Experience',
    category: '3D',
    status: 'Concept',
    year: '2025',
    tagline: 'Interactive 3D spatial computing environment & WebGL showcase',
    description: 'An interactive 3D web experiment featuring particle physics, custom GLSL shaders, and audio-reactive elements built with Three.js and React.',
    metric: 'WebGL & Shaders',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop',
    tags: ['Three.js', 'React', 'TypeScript', 'GLSL', 'WebAudio'],
    liveUrl: 'https://github.com/houdaifa',
    githubUrl: 'https://github.com/houdaifa',
    featured: true,
    caseStudy: {
      challenge: 'Rendering instanced particles and spatial audio in the browser while maintaining a consistent 60 FPS across both desktop and mobile viewports.',
      solution: 'Constructed custom WebGL vertex and fragment shaders using off-screen render targets and instanced buffer geometries with LOD fallbacks.',
      result: 'Achieved smooth, fluid animations and responsive touch interactions without overheating or memory degradation.',
      metrics: [
        { label: 'Target Frame Rate', value: '60 FPS' },
        { label: 'Rendering Pipeline', value: 'Custom GLSL' },
        { label: 'Audio Engine', value: 'WebAudio API' }
      ],
      technologies: ['Three.js', 'React', 'Next.js', 'WebAudio API', 'Tailwind CSS', 'Vite']
    }
  },
  {
    id: 'project-2',
    title: 'E-commerce Platform',
    category: 'E-commerce',
    status: 'Concept',
    year: '2024',
    tagline: 'Headless storefront demo with 3D product previews & checkout',
    description: 'A headless e-commerce demo built with Next.js, Shopify Storefront API, and Stripe, featuring interactive 3D product configurators.',
    metric: 'Headless Architecture',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    tags: ['Next.js', 'Shopify Storefront', 'Stripe', 'Tailwind CSS', 'Three.js'],
    liveUrl: 'https://github.com/houdaifa',
    githubUrl: 'https://github.com/houdaifa',
    featured: true,
    caseStudy: {
      challenge: 'Creating a modern headless shopping experience with fluid transitions between product discovery, 3D model inspection, and instant checkout.',
      solution: 'Integrated the Shopify Storefront GraphQL API with Next.js Server Components, client-side optimistic cart state, and a Three.js canvas viewer.',
      result: 'Delivered an intuitive, responsive storefront prototype with sub-second page transitions and modular cart logic.',
      metrics: [
        { label: 'Architecture', value: 'Headless ISR' },
        { label: 'Checkout', value: 'Stripe API' },
        { label: '3D Preview', value: 'Three.js / GLTF' }
      ],
      technologies: ['Next.js', 'TypeScript', 'Stripe', 'Shopify Storefront API', 'Tailwind CSS']
    }
  },
  {
    id: 'project-3',
    title: 'AI Collaboration Dashboard',
    category: 'App',
    status: 'In Development',
    year: '2024',
    tagline: 'Collaborative workflow canvas with node-based editor',
    description: 'A full-stack collaborative canvas interface enabling real-time workflow design using WebSockets, node graphing, and responsive state management.',
    metric: 'Real-time WebSockets',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    tags: ['React', 'Node.js', 'WebSockets', 'Tailwind CSS', 'TypeScript'],
    liveUrl: 'https://github.com/houdaifa',
    githubUrl: 'https://github.com/houdaifa',
    caseStudy: {
      challenge: 'Synchronizing multi-user node graph changes and drag interactions across clients without conflicts or noticeable latency.',
      solution: 'Implemented CRDT state synchronization paired with WebSocket broadcasting, modular node layout components, and virtualized canvas bounds.',
      result: 'Built an interactive prototyping environment that smoothly updates connected client cursors and connections in real time.',
      metrics: [
        { label: 'Protocol', value: 'WebSockets' },
        { label: 'State Resolution', value: 'CRDT / Yjs' },
        { label: 'Canvas Rendering', value: 'SVG & HTML5' }
      ],
      technologies: ['React', 'TypeScript', 'Node.js', 'WebSockets', 'Tailwind CSS']
    }
  },
  {
    id: 'project-4',
    title: 'Financial Analytics Dashboard',
    category: 'Web',
    status: 'Concept',
    year: '2024',
    tagline: 'High-frequency market analytics dashboard with canvas charts',
    description: 'A dark-mode financial telemetry dashboard featuring real-time simulated order books, responsive Canvas charts, and custom data filters.',
    metric: 'Canvas Telemetry',
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1200&auto=format&fit=crop',
    tags: ['TypeScript', 'Canvas API', 'Web Workers', 'Tailwind CSS', 'D3.js'],
    liveUrl: 'https://github.com/houdaifa',
    githubUrl: 'https://github.com/houdaifa',
    caseStudy: {
      challenge: 'Handling continuous data stream updates without blocking main thread interactions or dropping UI frame rates during rapid filter switching.',
      solution: 'Used Web Workers for data transformation and batching, delegating rendering to an HTML5 Canvas layer instead of heavy DOM tree updates.',
      result: 'Maintained smooth 60 FPS scrolling and snappy interactive charting throughout high-volume simulated data streams.',
      metrics: [
        { label: 'Chart Engine', value: 'HTML5 Canvas' },
        { label: 'Worker Threading', value: 'Web Workers' },
        { label: 'State Updates', value: 'Batched 60Hz' }
      ],
      technologies: ['TypeScript', 'Canvas API', 'Web Workers', 'D3.js', 'Tailwind CSS']
    }
  },
  {
    id: 'project-5',
    title: '3D Rendering Engine',
    category: '3D',
    status: 'In Development',
    year: '2023',
    tagline: 'Browser-based procedural 3D terrain and geometry generator',
    description: 'A procedural 3D world generator running in the browser using Three.js, chunk streaming algorithms, and Web Worker thread offloading.',
    metric: 'Procedural Generation',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    tags: ['Three.js', 'TypeScript', 'Web Workers', 'WebGL', 'GLSL'],
    liveUrl: 'https://github.com/houdaifa',
    githubUrl: 'https://github.com/houdaifa',
    caseStudy: {
      challenge: 'Managing procedural voxel terrain generation in real time without causing browser stutter on standard consumer hardware.',
      solution: 'Wrote a greedy meshing worker pipeline with frustum-based chunk culling to minimize draw calls and conserve memory.',
      result: 'Enabled smooth exploration of dynamically generated 3D environments directly within any modern web browser.',
      metrics: [
        { label: 'Meshing Algorithm', value: 'Greedy Meshing' },
        { label: 'Culling Strategy', value: 'Frustum Culling' },
        { label: 'Thread Model', value: 'Dedicated Workers' }
      ],
      technologies: ['Three.js', 'Web Workers', 'TypeScript', 'GLSL', 'WebGL']
    }
  },
  {
    id: 'project-6',
    title: 'Real Estate Website',
    category: 'Web',
    status: 'Concept',
    year: '2023',
    tagline: 'Modern architectural property showcase with interactive tours',
    description: 'A luxury architectural portfolio website featuring smooth page transitions, interactive floor plan previews, and custom inquiry flows.',
    metric: 'Interactive Showcase',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    tags: ['Next.js', 'Framer Motion', 'Tailwind CSS', 'TypeScript', 'Zod'],
    liveUrl: 'https://github.com/houdaifa',
    githubUrl: 'https://github.com/houdaifa',
    caseStudy: {
      challenge: 'Designing an editorial, high-end browsing experience that emphasizes architectural photography and interactive floor plan models.',
      solution: 'Combined smooth Framer Motion layout transitions with responsive image optimization and accessible form validation.',
      result: 'Produced an elegant, publication-quality real estate showcase concept optimized for all screen dimensions.',
      metrics: [
        { label: 'Animations', value: 'Framer Motion' },
        { label: 'Form Validation', value: 'Zod & React Hook Form' },
        { label: 'Performance', value: 'Mobile-Optimized' }
      ],
      technologies: ['React', 'Next.js', 'Framer Motion', 'Tailwind CSS', 'TypeScript']
    }
  }
];
