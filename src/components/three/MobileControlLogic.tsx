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

  const SAFE_DISTANCE = 0.5;
  const raycaster = useRef(new THREE.Raycaster());

  useFrame(({ scene }) => {
    direction.current.set(
      moveDirRef.current?.x || 0,
      0,
      moveDirRef.current?.z || 0
    );
    direction.current.normalize();
    direction.current.applyEuler(camera.rotation);

    if (direction.current.lengthSq() > 0) {
      raycaster.current.set(camera.position, direction.current);
      const intersects = raycaster.current
        .intersectObjects(scene.children, true)
        .filter((i) => i.object !== camera);

      console.log(
        intersects.map((i) => ({ name: i.object.name, distance: i.distance }))
      );

      if (intersects.length === 0 || intersects[0].distance > SAFE_DISTANCE) {
        camera.position.add(direction.current.multiplyScalar(SPEED));
      }
    }
  });

  return null;
}
