import React, { FC, useEffect, useRef } from "react";
import * as THREE from "three";

interface Scene3DProps {
  slideIndex: number;
}

export const Scene3D: FC<Scene3DProps> = ({ slideIndex }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const slideIndexRef = useRef(slideIndex);

  // Keep references to slideIndex up-to-date without rebuilding the loop
  useEffect(() => {
    slideIndexRef.current = slideIndex;
  }, [slideIndex]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene, Camera & Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xf8fafc, 0.012); // subtle slate-white fog for depth

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    // Initial camera position
    camera.position.set(0, 0, 15);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // 2. Lights
    // Ambient bright white backlight
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.55);
    scene.add(ambientLight);

    // Main golden spotlight
    const pointLight1 = new THREE.PointLight(0xd4a84b, 1.9, 150);
    pointLight1.position.set(15, 20, 10);
    scene.add(pointLight1);

    // Fill soft blueish-white pointlight
    const pointLight2 = new THREE.PointLight(0xbadcfc, 1.1, 150);
    pointLight2.position.set(-15, -20, 5);
    scene.add(pointLight2);

    // Ambient top pure white spot
    const pointLight3 = new THREE.PointLight(0xffffff, 0.85, 80);
    pointLight3.position.set(0, 10, -5);
    scene.add(pointLight3);

    // 3. Materials
    // Glassy golden metallic body
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xd4a84b,
      metalness: 0.8,
      roughness: 0.15,
      transmission: 0.6,
      thickness: 1.2,
      ior: 1.5,
      transparent: true,
      opacity: 0.16,
      depthWrite: false,
    });

    // Elegant gold wireframe overlay
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0xd4a84b,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });

    // Geometries list to pick from
    const geometries = [
      new THREE.IcosahedronGeometry(1.4, 0),
      new THREE.OctahedronGeometry(1.4, 0),
      new THREE.TetrahedronGeometry(1.4, 0),
      new THREE.DodecahedronGeometry(1.3, 0),
      new THREE.TorusGeometry(1.0, 0.3, 8, 24),
      new THREE.BoxGeometry(1.3, 1.3, 1.3),
    ];

    // 4. Create 20 random meshes in groups (solid + wireframe)
    const meshGroup = new THREE.Group();
    scene.add(meshGroup);

    interface MeshData {
      group: THREE.Group;
      initialY: number;
      floatSpeed: number;
      floatFrequency: number;
      floatOffset: number;
      rotSpeedX: number;
      rotSpeedY: number;
      rotSpeedZ: number;
    }

    const meshesData: MeshData[] = [];

    for (let i = 0; i < 20; i++) {
      const geo = geometries[Math.floor(Math.random() * geometries.length)];
      
      const chunkGroup = new THREE.Group();
      
      const solidMesh = new THREE.Mesh(geo, glassMaterial);
      const wireMesh = new THREE.Mesh(geo, wireframeMaterial);
      
      chunkGroup.add(solidMesh);
      chunkGroup.add(wireMesh);

      // Random arrangement in space
      const posX = (Math.random() - 0.5) * 36;
      const posY = (Math.random() - 0.5) * 22;
      const posZ = -Math.random() * 25 - 2; // behind the slides which reside around Z=0

      chunkGroup.position.set(posX, posY, posZ);

      // Random scale
      const scale = 0.5 + Math.random() * 1.2;
      chunkGroup.scale.set(scale, scale, scale);

      meshGroup.add(chunkGroup);

      meshesData.push({
        group: chunkGroup,
        initialY: posY,
        floatSpeed: 0.3 + Math.random() * 0.5,
        floatFrequency: 0.5 + Math.random() * 0.8,
        floatOffset: Math.random() * Math.PI * 2,
        rotSpeedX: (Math.random() - 0.5) * 0.008,
        rotSpeedY: (Math.random() - 0.5) * 0.008,
        rotSpeedZ: (Math.random() - 0.5) * 0.005,
      });
    }

    // 5. 150 Particles (Stardust)
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 150;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      // Box positioning for stardust
      positions[i] = (Math.random() - 0.5) * 45; // X
      positions[i + 1] = (Math.random() - 0.5) * 30; // Y
      positions[i + 2] = (Math.random() - 0.5) * 40 - 10; // Z
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xd4a84b,
      size: 0.07,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
    });

    const starParticles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(starParticles);

    // 6. Camera target variables for glide animation and dynamic cursor sway
    let cameraTargetX = 0;
    let cameraTargetY = 0;
    let cameraTargetZ = 15;

    let mouseX = 0;
    let mouseY = 0;

    const onWindowMouseMove = (e: MouseEvent) => {
      // Normalize values to range between -1 and 1
      mouseX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      mouseY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
    };

    window.addEventListener("mousemove", onWindowMouseMove);

    // 7. Animation Loop
    let animationFrameId: number;
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = (performance.now() - startTime) / 1000;

      // Slow rotate star particles
      starParticles.rotation.y = elapsedTime * 0.015;
      starParticles.rotation.x = elapsedTime * 0.008;

      // Rotate and float meshes
      meshesData.forEach((data) => {
        data.group.rotation.x += data.rotSpeedX;
        data.group.rotation.y += data.rotSpeedY;
        data.group.rotation.z += data.rotSpeedZ;

        // Custom fluid sine floating
        data.group.position.y =
          data.initialY +
          Math.sin(elapsedTime * data.floatFrequency + data.floatOffset) * data.floatSpeed;
      });

      // Camera motion logic based on current slideIndex + cursor sway overlay!
      const idx = slideIndexRef.current;
      // Define a custom grid of anchor points so the camera moves beautifully
      cameraTargetX = (idx - 3.5) * 4.2 + (mouseX * 3.5); // linear drift on X + interactive pointer pan
      cameraTargetY = Math.sin(idx * 1.6) * 2.2 - (mouseY * 2.5); // sine bobbing on Y + interactive pointer tilt
      cameraTargetZ = 13 + Math.cos(idx * 1.1) * 3.5; // push in/out on Z

      // Ease current camera position towards target position (cubic easing interpolation)
      camera.position.x += (cameraTargetX - camera.position.x) * 0.045;
      camera.position.y += (cameraTargetY - camera.position.y) * 0.045;
      camera.position.z += (cameraTargetZ - camera.position.z) * 0.045;

      // Subtle lookAt drift so it's not super static
      camera.lookAt(new THREE.Vector3(camera.position.x * 0.7, camera.position.y * 0.7, -10));

      renderer.render(scene, camera);
    };

    animate();

    // 8. Resizing Handler
    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup logic
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onWindowMouseMove);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometries.forEach((g) => g.dispose());
      glassMaterial.dispose();
      wireframeMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []); // Empty array ensures this runs exactly once on mount, slideIndex is read from slideIndexRef

  return <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden" />;
};

export default Scene3D;
