"use client";

import Highlightable from "@/components/three/Highlightable";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function PersonalScene() {
  const cubeRef = useRef<THREE.Mesh>(null);
  const borderRef = useRef<THREE.LineSegments>(null);

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

  return (
    <>
      {/* 地板 */}
      <mesh name="floor" rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#cccccc" />
      </mesh>

      {/* 可展示技能或作品的旋轉立方體 */}
      <Highlightable>
        <mesh name="cube" position={[0, 1, 0]} ref={cubeRef} castShadow>
          {/* 外框（高亮用） */}
          {/* <lineSegments ref={borderRef}>
          <edgesGeometry
            attach="geometry"
            args={[new THREE.BoxGeometry(1.05, 1.05, 1.05)]}
          />
          <lineBasicMaterial attach="material" color="yellow" />
        </lineSegments> */}
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#4f46e5" />
        </mesh>
      </Highlightable>
    </>
  );
}
