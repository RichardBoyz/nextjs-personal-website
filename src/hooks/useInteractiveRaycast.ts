import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";

export default function useInteractiveRaycast(
  targetNames: string[], // 你要指定的物件名稱清單
  maxDistance: number = 5, // 距離限制
) {
  const { camera, scene } = useThree();
  const [hitObject, setHitObject] = useState<string | null>(null);
  const raycaster = useRef(new THREE.Raycaster());

  useFrame(() => {
    raycaster.current.setFromCamera(new THREE.Vector2(0, 0), camera);
    const intersects = raycaster.current.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
      const firstHit = intersects[0].object;

      // 判斷是不是在指定的目標清單
      if (targetNames.includes(firstHit.name)) {
        const distance = camera.position.distanceTo(firstHit.position);
        if (distance <= maxDistance) {
          // 命中 + 在距離內
          setHitObject(firstHit.name);
          return;
        }
      }
    }

    // 沒命中 → 清空
    setHitObject(null);
  });

  return hitObject;
}
