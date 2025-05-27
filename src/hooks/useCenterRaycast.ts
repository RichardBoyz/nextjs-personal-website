import { useEffect, useRef, useState } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * 從畫面中心發出 ray，偵測命中的 3D 物件。
 * @param targets - 限定的目標物件列表（可選）。若不提供，則使用 scene 中全部物件。
 * @param maxDistance - 最大偵測距離（可選）
 * @returns 命中的 THREE.Object3D 或 null
 */
export default function useCenterRaycast({
  targets,
  maxDistance = Infinity,
}: {
  targets?: THREE.Object3D[];
  maxDistance?: number;
} = {}) {
  const { camera, scene } = useThree();
  const raycaster = useRef(new THREE.Raycaster());
  const [hitObject, setHitObject] = useState<THREE.Object3D | null>(null);

  const center = useRef(new THREE.Vector2(0, 0)); // 螢幕中心

  useFrame(() => {
    raycaster.current.setFromCamera(center.current, camera);

    const intersectTargets = targets ?? scene.children;
    const intersects = raycaster.current.intersectObjects(
      intersectTargets,
      true
    );

    if (intersects.length > 0 && intersects[0].distance <= maxDistance) {
      setHitObject(intersects[0].object);
    } else {
      setHitObject(null);
    }
  });

  return hitObject;
}
