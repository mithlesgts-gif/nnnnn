import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { 
  RotateCw, 
  ZoomIn, 
  Layers, 
  Eye, 
  EyeOff, 
  Maximize2, 
  HelpCircle, 
  Building2, 
  Activity, 
  Compass,
  Box,
  SplitSquareVertical
} from 'lucide-react';

interface Bim3dViewerProps {
  className?: string;
  initialMode?: 'combined' | 'arch' | 'struct' | 'mep';
}

export const Bim3dViewer: React.FC<Bim3dViewerProps> = ({ className = '', initialMode = 'combined' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  
  // Controls state
  const [showArch, setShowArch] = useState(true);
  const [showStruct, setShowStruct] = useState(true);
  const [showMep, setShowMep] = useState(true);
  const [isExploded, setIsExploded] = useState(false);
  const [isWireframe, setIsWireframe] = useState(false);
  const [showAnnotations, setShowAnnotations] = useState(true);
  const [activeFloor, setActiveFloor] = useState<number | 'all'>('all');
  const [selectedElement, setSelectedElement] = useState<{
    name: string;
    discipline: string;
    lod: string;
    material: string;
    system: string;
  } | null>(null);

  // Three.js internal references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const groupsRef = useRef<{
    archGroup: THREE.Group;
    structGroup: THREE.Group;
    mepGroup: THREE.Group;
    annotationsGroup: THREE.Group;
    floorGroups: THREE.Group[];
  } | null>(null);

  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const cameraTargetRef = useRef(new THREE.Vector3(0, 10, 0));
  const sphericalRef = useRef({ radius: 46, theta: Math.PI / 4, phi: Math.PI / 3 });
  const animFrameIdRef = useRef<number | null>(null);

  // Initialize Three.js scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0e1318);
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    cameraRef.current = camera;
    updateCameraPosition();

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x39a9ff, 1.2);
    dirLight1.position.set(30, 50, 40);
    dirLight1.castShadow = true;
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight2.position.set(-30, 25, -20);
    scene.add(dirLight2);

    // Grid Floor
    const gridHelper = new THREE.GridHelper(60, 30, 0x39a9ff, 0x1f2937);
    gridHelper.position.y = -0.05;
    scene.add(gridHelper);

    // Groups
    const archGroup = new THREE.Group();
    const structGroup = new THREE.Group();
    const mepGroup = new THREE.Group();
    const annotationsGroup = new THREE.Group();
    const floorGroups: THREE.Group[] = [];

    // Materials
    // Architecture (Glass & mullions)
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x39a9ff,
      transparent: true,
      opacity: 0.28,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.7,
      ior: 1.5,
      depthWrite: false
    });

    const mullionMat = new THREE.MeshStandardMaterial({
      color: 0x1f2937,
      metalness: 0.8,
      roughness: 0.3
    });

    // Structure (Concrete & steel)
    const concreteMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      roughness: 0.7,
      metalness: 0.1
    });

    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x475569,
      roughness: 0.8,
      metalness: 0.2
    });

    const steelMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.4,
      metalness: 0.7
    });

    // MEP Materials
    const hvacDuctMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8, // Cyan ductwork
      roughness: 0.3,
      metalness: 0.8
    });

    const chilledWaterMat = new THREE.MeshStandardMaterial({
      color: 0x2563eb, // Blue chilled water pipe
      roughness: 0.4,
      metalness: 0.5
    });

    const fireSprinklerMat = new THREE.MeshStandardMaterial({
      color: 0xd9363e, // Red fire protection line
      roughness: 0.4,
      metalness: 0.5
    });

    const cableTrayMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b, // Amber electrical containment
      roughness: 0.5,
      metalness: 0.4
    });

    // Central Structural Core (Full height)
    const coreGeo = new THREE.BoxGeometry(6, 28, 6);
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.position.set(0, 14, 0);
    structGroup.add(coreMesh);

    // Build 5 typical floor levels (Ground to Level 4)
    const numFloors = 5;
    const floorHeight = 5.2;

    for (let f = 0; f < numFloors; f++) {
      const floorGroup = new THREE.Group();
      floorGroup.position.y = f * floorHeight;

      // 1. Structure: Floor Slab
      const slabGeo = new THREE.BoxGeometry(22, 0.5, 18);
      const slabMesh = new THREE.Mesh(slabGeo, concreteMat);
      slabMesh.position.y = 0;
      floorGroup.add(slabMesh);

      // Structure: Perimeter Columns (8 columns per floor)
      const colGeo = new THREE.BoxGeometry(0.8, floorHeight, 0.8);
      const colPositions = [
        [-9.5, -7.5], [0, -7.5], [9.5, -7.5],
        [-9.5, 7.5], [0, 7.5], [9.5, 7.5],
        [-9.5, 0], [9.5, 0]
      ];
      colPositions.forEach(([x, z]) => {
        const col = new THREE.Mesh(colGeo, steelMat);
        col.position.set(x, floorHeight / 2, z);
        floorGroup.add(col);
      });

      // 2. MEP Systems on this floor
      const mepFloor = new THREE.Group();

      // Main Supply HVAC Duct (horizontal loop)
      const duct1Geo = new THREE.BoxGeometry(16, 0.7, 1.2);
      const duct1 = new THREE.Mesh(duct1Geo, hvacDuctMat);
      duct1.position.set(0, floorHeight - 0.9, -4);
      mepFloor.add(duct1);

      const duct2Geo = new THREE.BoxGeometry(1.2, 0.7, 12);
      const duct2 = new THREE.Mesh(duct2Geo, hvacDuctMat);
      duct2.position.set(6, floorHeight - 0.9, 0);
      mepFloor.add(duct2);

      // Chilled Water Piping Loop
      const pipeGeo = new THREE.CylinderGeometry(0.2, 0.2, 16, 12);
      const pipe1 = new THREE.Mesh(pipeGeo, chilledWaterMat);
      pipe1.rotation.z = Math.PI / 2;
      pipe1.position.set(0, floorHeight - 1.4, 4);
      mepFloor.add(pipe1);

      // Fire Sprinkler Branch line (Red)
      const firePipeGeo = new THREE.CylinderGeometry(0.12, 0.12, 14, 8);
      const firePipe = new THREE.Mesh(firePipeGeo, fireSprinklerMat);
      firePipe.rotation.x = Math.PI / 2;
      firePipe.position.set(-5, floorHeight - 1.2, 0);
      mepFloor.add(firePipe);

      // Electrical Cable Tray (Amber)
      const trayGeo = new THREE.BoxGeometry(18, 0.15, 0.6);
      const tray = new THREE.Mesh(trayGeo, cableTrayMat);
      tray.position.set(0, floorHeight - 1.6, -1);
      mepFloor.add(tray);

      floorGroup.add(mepFloor);

      // 3. Architecture: Exterior Facade Glass & Spandrel Panels
      const archFloor = new THREE.Group();
      const glassWallFront = new THREE.Mesh(new THREE.BoxGeometry(22.2, floorHeight - 0.1, 0.1), glassMat);
      glassWallFront.position.set(0, floorHeight / 2, 9);
      archFloor.add(glassWallFront);

      const glassWallBack = new THREE.Mesh(new THREE.BoxGeometry(22.2, floorHeight - 0.1, 0.1), glassMat);
      glassWallBack.position.set(0, floorHeight / 2, -9);
      archFloor.add(glassWallBack);

      const glassWallLeft = new THREE.Mesh(new THREE.BoxGeometry(0.1, floorHeight - 0.1, 18), glassMat);
      glassWallLeft.position.set(-11, floorHeight / 2, 0);
      archFloor.add(glassWallLeft);

      const glassWallRight = new THREE.Mesh(new THREE.BoxGeometry(0.1, floorHeight - 0.1, 18), glassMat);
      glassWallRight.position.set(11, floorHeight / 2, 0);
      archFloor.add(glassWallRight);

      // Spandrel band
      const spandrelFront = new THREE.Mesh(new THREE.BoxGeometry(22.3, 0.9, 0.15), mullionMat);
      spandrelFront.position.set(0, 0.45, 9.05);
      archFloor.add(spandrelFront);

      floorGroup.add(archFloor);

      floorGroups.push(floorGroup);
      scene.add(floorGroup);
    }

    // Roof Crown / Mechanical Penthouse
    const roofGroup = new THREE.Group();
    roofGroup.position.y = numFloors * floorHeight;
    const roofSlab = new THREE.Mesh(new THREE.BoxGeometry(22, 0.6, 18), concreteMat);
    roofGroup.add(roofSlab);

    // Chiller Plant Room Enclosure (Open steel frame)
    const chillerGeo = new THREE.BoxGeometry(4, 2.5, 3);
    const chiller1 = new THREE.Mesh(chillerGeo, steelMat);
    chiller1.position.set(-5, 1.5, 0);
    roofGroup.add(chiller1);

    const chiller2 = new THREE.Mesh(chillerGeo, steelMat);
    chiller2.position.set(5, 1.5, 0);
    roofGroup.add(chiller2);

    // Cooling Towers (Cylinders)
    const towerGeo = new THREE.CylinderGeometry(1.6, 1.6, 2.8, 16);
    const tower1 = new THREE.Mesh(towerGeo, hvacDuctMat);
    tower1.position.set(0, 1.7, -4);
    roofGroup.add(tower1);

    floorGroups.push(roofGroup);
    scene.add(roofGroup);

    groupsRef.current = {
      archGroup,
      structGroup,
      mepGroup,
      annotationsGroup,
      floorGroups
    };

    // Render loop
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    animate();

    // Resize handler
    const handleResize = () => {
      if (!container || !cameraRef.current || !rendererRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      if (rendererRef.current && rendererRef.current.domElement) {
        rendererRef.current.dispose();
      }
    };
  }, []);

  // Update camera spherical position
  const updateCameraPosition = () => {
    if (!cameraRef.current) return;
    const { radius, theta, phi } = sphericalRef.current;
    const target = cameraTargetRef.current;

    cameraRef.current.position.x = target.x + radius * Math.sin(phi) * Math.sin(theta);
    cameraRef.current.position.y = target.y + radius * Math.cos(phi);
    cameraRef.current.position.z = target.z + radius * Math.sin(phi) * Math.cos(theta);
    cameraRef.current.lookAt(target);
  };

  // Mouse / Touch Interaction for Orbit Rotation & Zoom
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - previousMousePositionRef.current.x;
    const deltaY = e.clientY - previousMousePositionRef.current.y;
    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };

    sphericalRef.current.theta -= deltaX * 0.007;
    sphericalRef.current.phi = Math.max(0.1, Math.min(Math.PI / 2 - 0.05, sphericalRef.current.phi - deltaY * 0.007));
    updateCameraPosition();
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    sphericalRef.current.radius = Math.max(18, Math.min(95, sphericalRef.current.radius + e.deltaY * 0.04));
    updateCameraPosition();
  };

  // Handle Layer Visibility Toggles
  useEffect(() => {
    if (!groupsRef.current) return;
    const { floorGroups } = groupsRef.current;

    floorGroups.forEach((floorGroup) => {
      // child 0: slab (Structure)
      // children 1..8: columns (Structure)
      // child 9: mepFloor (MEP)
      // child 10: archFloor (Architecture)
      floorGroup.children.forEach((child, idx) => {
        if (idx <= 8) {
          child.visible = showStruct;
        } else if (idx === 9) {
          child.visible = showMep;
        } else if (idx === 10) {
          child.visible = showArch;
        }
      });
    });
  }, [showArch, showStruct, showMep]);

  // Handle Explode / Stack animation
  useEffect(() => {
    if (!groupsRef.current) return;
    const { floorGroups } = groupsRef.current;
    const spacingMultiplier = isExploded ? 2.4 : 1.0;

    floorGroups.forEach((floorGroup, index) => {
      const baseHeight = index * 5.2;
      floorGroup.position.y = baseHeight * spacingMultiplier;
    });

    if (isExploded) {
      cameraTargetRef.current.set(0, 24, 0);
      sphericalRef.current.radius = 70;
    } else {
      cameraTargetRef.current.set(0, 12, 0);
      sphericalRef.current.radius = 46;
    }
    updateCameraPosition();
  }, [isExploded]);

  // Reset Camera View
  const handleResetCamera = (view: 'iso' | 'top' | 'front' = 'iso') => {
    if (view === 'iso') {
      sphericalRef.current = { radius: 46, theta: Math.PI / 4, phi: Math.PI / 3 };
      cameraTargetRef.current.set(0, 12, 0);
    } else if (view === 'top') {
      sphericalRef.current = { radius: 52, theta: 0, phi: 0.1 };
      cameraTargetRef.current.set(0, 12, 0);
    } else if (view === 'front') {
      sphericalRef.current = { radius: 46, theta: 0, phi: Math.PI / 2.1 };
      cameraTargetRef.current.set(0, 12, 0);
    }
    updateCameraPosition();
  };

  return (
    <div className={`relative bg-slate-900 rounded-2xl border border-slate-300 overflow-hidden shadow-xl flex flex-col ${className}`}>
      {/* Top Engineering Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 z-10">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              3D BIM Model Explorer
            </span>
          </div>
          <span className="hidden sm:inline-block text-xs text-slate-400 font-mono">
            Commercial Building · LOD 400
          </span>
        </div>

        {/* Layer Visibility Buttons */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setShowArch(!showArch)}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              showArch 
                ? 'bg-blue-600 text-white' 
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
            title="Toggle Architectural Glazing & Envelopes"
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Architecture</span>
          </button>

          <button
            onClick={() => setShowStruct(!showStruct)}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              showStruct 
                ? 'bg-slate-700 text-white' 
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
            title="Toggle Structural Columns, Core & Slabs"
          >
            <Box className="w-3.5 h-3.5" />
            <span>Structure</span>
          </button>

          <button
            onClick={() => setShowMep(!showMep)}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              showMep 
                ? 'bg-cyan-600 text-white' 
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
            title="Toggle MEP Ductwork, Piping & Containment"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>MEP</span>
          </button>

          <button
            onClick={() => setIsExploded(!isExploded)}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              isExploded 
                ? 'bg-red-600 text-white' 
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
            title="Explode floor levels vertically"
          >
            <SplitSquareVertical className="w-3.5 h-3.5" />
            <span>{isExploded ? 'Collapse' : 'Explode'}</span>
          </button>
        </div>

        {/* Camera Preset Tools */}
        <div className="flex items-center gap-1 text-xs">
          <button 
            onClick={() => handleResetCamera('iso')}
            className="p-1.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
            title="Isometric 3D View"
          >
            <Compass className="w-4 h-4" />
          </button>
          <button 
            onClick={() => handleResetCamera('top')}
            className="px-2 py-1 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
            title="Plan View"
          >
            Plan
          </button>
          <button 
            onClick={() => handleResetCamera('front')}
            className="px-2 py-1 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
            title="Elevation View"
          >
            Elev
          </button>
          <button 
            onClick={() => handleResetCamera('iso')}
            className="p-1.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
            title="Reset Camera"
          >
            <RotateCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main 3D Canvas Area */}
      <div 
        ref={mountRef} 
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        className="w-full h-[460px] sm:h-[540px] cursor-grab active:cursor-grabbing relative overflow-hidden select-none"
      />

      {/* Interactive HUD Overlays */}
      <div className="absolute bottom-4 left-4 z-10 pointer-events-none">
        <div className="bg-slate-950/85 backdrop-blur-md p-3.5 rounded-xl border border-slate-700 text-xs text-slate-300 max-w-xs space-y-1.5 shadow-xl">
          <div className="font-semibold text-white flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            Active Federated Model
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[11px] font-mono">
            <span className="text-slate-400">Levels: <strong className="text-white">5 + Penthouse</strong></span>
            <span className="text-slate-400">Tolerance: <strong className="text-white">±1 mm</strong></span>
            <span className="text-slate-400">Datum: <strong className="text-white">Project North</strong></span>
            <span className="text-slate-400">Format: <strong className="text-white">Revit 2026</strong></span>
          </div>
          <p className="text-[10px] text-slate-400 pt-1 border-t border-slate-800">
            * Drag to orbit · Scroll to zoom · Procedural 3D model geometry.
          </p>
        </div>
      </div>

      {/* Disciplinary Color Legend */}
      <div className="absolute bottom-4 right-4 z-10 pointer-events-none hidden md:block">
        <div className="bg-[#181F27]/90 backdrop-blur-md p-3 rounded-lg border border-[#39A9FF]/20 text-[11px] font-mono space-y-1 text-slate-300">
          <div className="font-semibold text-white pb-1 border-b border-slate-700">Discipline Legend</div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#39A9FF]" />
            <span>Architecture &amp; Facade</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#94a3b8]" />
            <span>Structure (RC / Steel)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#38bdf8]" />
            <span>HVAC Supply / Return</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#2563eb]" />
            <span>Chilled Water Piping</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#D9363E]" />
            <span>Fire Protection Network</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#f59e0b]" />
            <span>Electrical Containment</span>
          </div>
        </div>
      </div>
    </div>
  );
};
