import { Project } from '../../types';

/**
 * Featured portfolio projects data
 * Replace any placeholder title, description, metrics, links, or images with your custom client work.
 */
export const projectsData: Project[] = [
  {
    id: 'project-1',
    title: 'Nexus Spatial WebOS',
    category: '3D',
    year: '2025',
    tagline: 'Interactive 3D Spatial Computing Environment & WebOS',
    description: 'Real-time spatial desktop operating system featuring interactive 3D physics, custom GLSL shader pipelines, and audio-reactive telemetry.',
    metric: '+60 FPS locked',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop',
    tags: ['Three.js', 'Next.js', 'TypeScript', 'GLSL', 'WebAudio'],
    liveUrl: 'https://nexus-webos.demo',
    githubUrl: 'https://github.com/houdaifa/nexus-spatial-webos',
    featured: true,
    caseStudy: {
      challenge: 'Rendering over 40,000 instanced particles, complex geometric lighting, and spatial audio with 60+ FPS performance across both mobile and desktop browsers without thermal throttling.',
      solution: 'Engineered custom WebGL vertex and fragment shaders using off-screen render targets, instanced buffer geometries, and compute-light Level of Detail (LOD) fallbacks.',
      result: 'Maintained locked 60 FPS across 98% of tested devices with zero dropped frames during multi-window spatial zoom transitions.',
      metrics: [
        { label: 'Frame Rate', value: '60 FPS stable' },
        { label: 'Bundle Size', value: '185 KB gzipped' },
        { label: 'User Retention', value: '+320%' }
      ],
      technologies: ['Three.js', 'React', 'Next.js', 'WebAudio API', 'Tailwind CSS', 'Vite']
    }
  },
  {
    id: 'project-2',
    title: 'Kinetix Headless Commerce',
    category: 'E-commerce',
    year: '2024',
    tagline: 'High-Conversion Headless Fashion & 3D Configurator',
    description: 'Ultra-fast headless commerce platform engineered with interactive 3D product previews, sub-second checkout, and automated inventory synchronization.',
    metric: '+42% conversions',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    tags: ['Next.js', 'Shopify Storefront', 'Stripe', 'Tailwind', 'Three.js'],
    liveUrl: 'https://kinetix-store.demo',
    githubUrl: 'https://github.com/houdaifa/kinetix-commerce',
    featured: true,
    caseStudy: {
      challenge: 'The client experienced a 4.2-second page load on their legacy monolithic platform, resulting in an alarming 68% mobile cart abandonment rate during peak drops.',
      solution: 'Re-architected the stack to a headless Next.js setup with incremental static revalidation (ISR), edge API caching, and lightweight Three.js cloth preview modals.',
      result: 'Cut load times from 4.2s down to 0.48s (an 88% reduction) and drove a 42% lift in completed checkout conversions in the first quarter post-launch.',
      metrics: [
        { label: 'Conversion Lift', value: '+42.6%' },
        { label: 'Load Time', value: '0.48s' },
        { label: 'Revenue Growth', value: '$1.4M ARR' }
      ],
      technologies: ['Next.js 14', 'TypeScript', 'Stripe Connect', 'Shopify Storefront API', 'Tailwind CSS', 'Redis']
    }
  },
  {
    id: 'project-3',
    title: 'Aura AI Canvas Studio',
    category: 'App',
    year: '2024',
    tagline: 'Multiplayer Collaborative AI Node Orchestration Canvas',
    description: 'A full-stack collaborative node canvas empowering engineering teams to orchestrate multi-agent LLM workflows with real-time multiplayer WebSockets.',
    metric: '3x faster workflows',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    tags: ['React', 'Node.js', 'WebSockets', 'Tailwind CSS', 'PostgreSQL'],
    liveUrl: 'https://aura-canvas.demo',
    githubUrl: 'https://github.com/houdaifa/aura-ai-studio',
    caseStudy: {
      challenge: 'Orchestrating concurrent multiplayer updates across nested workflow graphs while handling streaming responses from multiple LLMs simultaneously without UI lag.',
      solution: 'Implemented CRDT conflict-free state resolution using Yjs with binary WebSocket protocols, offloading canvas rendering onto virtualized screen bounds.',
      result: 'Supported up to 50 concurrent editors per collaborative room without latency spikes or cursor stuttering, speeding up team prompt automation by 3x.',
      metrics: [
        { label: 'Concurrent Users', value: '50+ per room' },
        { label: 'Socket Latency', value: '< 18ms' },
        { label: 'Automation Speed', value: '3x faster' }
      ],
      technologies: ['React', 'TypeScript', 'Node.js', 'Yjs', 'PostgreSQL', 'Tailwind CSS', 'Docker']
    }
  },
  {
    id: 'project-4',
    title: 'Hyperion Financial Terminal',
    category: 'Web',
    year: '2024',
    tagline: 'Real-Time Financial Telemetry & Dark Pool Visualizer',
    description: 'High-frequency telemetry dashboard processing 100,000+ market events per second with high-contrast dark UI, canvas charts, and algorithmic alarms.',
    metric: '120k events/sec',
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1200&auto=format&fit=crop',
    tags: ['TypeScript', 'WebGL', 'Web Workers', 'Tailwind CSS', 'Docker'],
    liveUrl: 'https://hyperion-telemetry.demo',
    githubUrl: 'https://github.com/houdaifa/hyperion-analytics',
    caseStudy: {
      challenge: 'Traditional SVG charting libraries crashed the browser under 100k events/sec with memory leaks and dropped frames during market volatility periods.',
      solution: 'Designed a hardware-accelerated WebGL line rendering engine coupled with dedicated Web Workers to offload order-book parsing from the main UI thread.',
      result: 'Zero memory leaks across 24-hour continuous stress testing with CPU consumption held strictly below 12%.',
      metrics: [
        { label: 'Throughput', value: '120k events/s' },
        { label: 'CPU Usage', value: '< 12%' },
        { label: 'Lighthouse Score', value: '99/100' }
      ],
      technologies: ['TypeScript', 'WebGL', 'Web Workers', 'D3.js', 'Tailwind CSS']
    }
  },
  {
    id: 'project-5',
    title: 'Voxelverse 3D Engine',
    category: '3D',
    year: '2023',
    tagline: 'Browser-Based Procedural Voxel World & Physics Engine',
    description: 'Fully interactive multiplayer 3D world generator running entirely inside modern web browsers with dynamic chunk streaming and spatial audio.',
    metric: '-65% VRAM usage',
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=1200&auto=format&fit=crop',
    tags: ['Three.js', 'TypeScript', 'Web Workers', 'WebRTC', 'GLSL'],
    liveUrl: 'https://voxelverse.demo',
    githubUrl: 'https://github.com/houdaifa/voxelverse-web',
    caseStudy: {
      challenge: 'Managing infinite procedural terrain generation without blocking user interaction or exceeding browser memory ceilings on mid-range laptops.',
      solution: 'Built a greedy meshing worker algorithm and octree spatial index to generate and cull terrain chunks dynamically based on camera frustum.',
      result: 'Explorable terrain size increased by 400% while reducing overall VRAM memory footprints by 65%.',
      metrics: [
        { label: 'Render Distance', value: '32 chunks' },
        { label: 'VRAM Usage', value: '-65%' },
        { label: 'Active Gamers', value: '18,000+' }
      ],
      technologies: ['Three.js', 'Web Workers', 'WebRTC', 'TypeScript', 'GLSL']
    }
  },
  {
    id: 'project-6',
    title: 'Pulse Luxury Estates',
    category: 'Web',
    year: '2023',
    tagline: 'Interactive Architectural Property Showcase & 3D Tours',
    description: 'Immersive digital experience for ultra-high-net-worth real estate developments featuring 3D floor plans, daylight simulators, and VIP inquiry vaults.',
    metric: '$48M pipeline',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    tags: ['Next.js', 'Three.js', 'Framer Motion', 'Tailwind CSS', 'Zod'],
    liveUrl: 'https://pulse-luxury.demo',
    githubUrl: 'https://github.com/houdaifa/pulse-luxury-estates',
    caseStudy: {
      challenge: 'High net-worth clientele demanded a private, fluid browsing experience that matched the luxury tactile feel of visiting multi-million dollar penthouses.',
      solution: 'Crafted cinematic WebGL camera transitions, realistic ambient occlusion materials, and bespoke micro-interactions paired with encrypted lead vaults.',
      result: 'Facilitated over $48M in private off-market property inquiries within the first 60 days of deployment.',
      metrics: [
        { label: 'Avg Time on Page', value: '5m 14s' },
        { label: 'Lead Quality', value: '+85%' },
        { label: 'Inquiry Volume', value: '$48M pipeline' }
      ],
      technologies: ['React', 'Next.js', 'Three.js', 'Framer Motion', 'Tailwind CSS']
    }
  }
];
