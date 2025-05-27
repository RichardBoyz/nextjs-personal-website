// src/components/three/MobileControlLogic.tsx
"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { RefObject, useRef } from "react";
import * as THREE from "three";

const SPEED = 0.1;

export default function MobileControlLogic({
  moveDirRef,
}: {
  moveDirRef: RefObject<{ x: number; z: number }>;
}) {
  const { camera } = useThree();
  const direction = useRef(new THREE.Vector3());

  useFrame(() => {
    direction.current.set(
      moveDirRef.current?.x || 0,
      0,
      moveDirRef.current?.z || 0
    );
    direction.current.normalize();
    direction.current.applyEuler(camera.rotation);
    direction.current.multiplyScalar(SPEED);
    camera.position.add(direction.current);
  });

  return null;
}
