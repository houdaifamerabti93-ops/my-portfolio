import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const Hero3DScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState<boolean>(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
        return;
      }
    } catch {
      setWebglSupported(false);
      return;
    }

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 18;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0x0a0c20, 1.8);
    scene.add(ambientLight);

    // Point Light 1 (Cyan)
    const cyanLight = new THREE.PointLight(0x00e5ff, 4.2, 50);
    cyanLight.position.set(-10, 8, 12);
    scene.add(cyanLight);

    // Point Light 2 (Purple/Magenta)
    const purpleLight = new THREE.PointLight(0x8b5cf6, 4.0, 50);
    purpleLight.position.set(10, -8, 10);
    scene.add(purpleLight);

    // Accent directional light
    const dirLight = new THREE.DirectionalLight(0xff2d95, 1.2);
    dirLight.position.set(0, 15, 5);
    scene.add(dirLight);

    // 5. 3D Torus Knot Group
    const knotGroup = new THREE.Group();
    scene.add(knotGroup);

    // Knot Geometry (TorusKnot)
    const knotGeometry = new THREE.TorusKnotGeometry(4.2, 1.1, 160, 36, 2, 3);

    // Inner Metallic Core
    const innerMaterial = new THREE.MeshStandardMaterial({
      color: 0x070919,
      metalness: 0.9,
      roughness: 0.15,
      emissive: 0x050714,
      wireframe: false,
    });
    const innerMesh = new THREE.Mesh(knotGeometry, innerMaterial);
    knotGroup.add(innerMesh);

    // Outer Wireframe Glow Shell
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
    const wireframeMesh = new THREE.Mesh(knotGeometry, wireframeMaterial);
    wireframeMesh.scale.set(1.025, 1.025, 1.025);
    knotGroup.add(wireframeMesh);

    // Secondary Accent Wireframe
    const accentWireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
    });
    const accentWireframeMesh = new THREE.Mesh(knotGeometry, accentWireframeMaterial);
    accentWireframeMesh.scale.set(1.045, 1.045, 1.045);
    knotGroup.add(accentWireframeMesh);

    // 6. Particle Field (1800+ dynamic particles)
    const particleCount = 2000;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const cyanCol = new THREE.Color(0x00e5ff);
    const purpleCol = new THREE.Color(0x8b5cf6);
    const pinkCol = new THREE.Color(0xff2d95);
    const whiteCol = new THREE.Color(0xdde8ff);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      // Spread in wide 3D space
      particlePositions[i3] = (Math.random() - 0.5) * 60;
      particlePositions[i3 + 1] = (Math.random() - 0.5) * 45;
      particlePositions[i3 + 2] = (Math.random() - 0.5) * 40;

      // Random color selection
      const rand = Math.random();
      let color = cyanCol;
      if (rand < 0.4) color = cyanCol;
      else if (rand < 0.7) color = purpleCol;
      else if (rand < 0.88) color = pinkCol;
      else color = whiteCol;

      particleColors[i3] = color.r;
      particleColors[i3 + 1] = color.g;
      particleColors[i3 + 2] = color.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    // Particle texture generator (soft round dot)
    const createCircleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        gradient.addColorStop(0, 'rgba(255,255,255,1)');
        gradient.addColorStop(0.3, 'rgba(0,229,255,0.8)');
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 32, 32);
      }
      return new THREE.CanvasTexture(canvas);
    };

    const particleMat = new THREE.PointsMaterial({
      size: 0.28,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      map: createCircleTexture(),
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 7. Mouse tracking & interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      mouseX = (e.clientX - windowHalfX) * 0.0012;
      mouseY = (e.clientY - windowHalfY) * 0.0012;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 8. Responsive ResizeObserver
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Adjust camera distance for mobile
      if (width < 768) {
        camera.position.z = 24;
      } else {
        camera.position.z = 18;
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);
    handleResize();

    // 9. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Rotate torus knot
      knotGroup.rotation.x = elapsedTime * 0.25 + targetY * 2;
      knotGroup.rotation.y = elapsedTime * 0.35 + targetX * 2;
      knotGroup.position.y = Math.sin(elapsedTime * 0.9) * 0.4;

      // Dynamic light movement
      cyanLight.position.x = Math.sin(elapsedTime * 0.7) * 12;
      cyanLight.position.z = Math.cos(elapsedTime * 0.7) * 12 + 4;

      purpleLight.position.x = -Math.sin(elapsedTime * 0.6) * 12;
      purpleLight.position.z = -Math.cos(elapsedTime * 0.6) * 12 + 4;

      // Particle subtle rotation & oscillation
      particles.rotation.y = -elapsedTime * 0.04 + targetX * 0.8;
      particles.rotation.x = -targetY * 0.8;

      renderer.render(scene, camera);
    };

    animate();

    // 10. Cleanup on unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();

      // Dispose Three objects
      knotGeometry.dispose();
      innerMaterial.dispose();
      wireframeMaterial.dispose();
      accentWireframeMaterial.dispose();
      particleGeo.dispose();
      particleMat.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      id="hero-3d-scene-container"
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {!webglSupported && (
        <div className="w-full h-full flex items-center justify-center bg-radial from-[#00e5ff]/10 via-[#8b5cf6]/5 to-transparent">
          <div className="w-72 h-72 rounded-full border border-[#00e5ff]/20 animate-pulse" />
        </div>
      )}
    </div>
  );
};
