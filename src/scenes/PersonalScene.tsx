"use client";

import { usePlane, useTrimesh } from "@react-three/cannon";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

function RoomCollider({ geometry }: { geometry: THREE.BufferGeometry }) {
  const vertices = geometry.attributes.position.array as Float32Array;
  const indices = geometry.index?.array as Uint16Array;

  useTrimesh(() => ({
    args: [vertices, indices],
    type: "Static",
  }));

  return null;
}

export default function PersonalScene() {
  const cubeRef = useRef<THREE.Mesh>(null);
  const borderRef = useRef<THREE.LineSegments>(null);
  const { scene } = useGLTF("/models/scene.gltf");

  const [meshGeometries, setMeshGeometries] = useState<THREE.BufferGeometry[]>(
    [],
  );

  // 地板剛體
  usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 0],
    type: "Static",
  }));

  useFrame(() => {
    if (cubeRef.current) {
      cubeRef.current.rotation.y += 0.01;
    }
  });

  useEffect(() => {
    if (borderRef.current) {
      borderRef.current.raycast = () => {};
    }
  }, []);

  useEffect(() => {
    if (scene) {
      const geometries: THREE.BufferGeometry[] = [];
      scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          (child as THREE.Mesh).userData.isWall = true;
          geometries.push(
            (child as THREE.Mesh).geometry as THREE.BufferGeometry,
          );
        }
      });
      setMeshGeometries(geometries);
    }
  }, [scene]);

  return (
    <>
      {/* 地板外觀 */}
      <mesh name="floor" rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#cccccc" />
      </mesh>

      {/* <Highlightable>
        <mesh name="cube" position={[0, 1, 0]} ref={cubeRef} castShadow>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#4f46e5" />
        </mesh>
      </Highlightable> */}

      {/* 房間模型 */}
      <primitive object={scene} position={[2, 0, 2]} />

      {/* 房間碰撞器 */}
      {meshGeometries.map((geometry, i) => (
        <RoomCollider key={i} geometry={geometry} />
      ))}
    </>
  );
}
