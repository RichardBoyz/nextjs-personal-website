"use client";

import { useStartStore } from "@/stores/useStartStore";
import { useFrame, useThree } from "@react-three/fiber";
import { RefObject, useEffect, useRef } from "react";
import * as THREE from "three";

const SPEED = 5; // 注意：這裡是物理速度，不再是 0.1
const BOB_FREQ = 8;
const BOB_AMP = 0.02;
const BASE_HEIGHT = 1.6;
const JUMP_VELOCITY = 5;
const SAFE_DISTANCE = 0.5;

interface PlayerProps {
  moveDirRef?: RefObject<{ x: number; z: number }>;
  isMobile?: boolean;
}

export default function Player({ moveDirRef, isMobile }: PlayerProps) {
  const { camera, scene } = useThree();
  const started = useStartStore((state) => state.started);

  const keysPressed = useRef<{ [key: string]: boolean }>({});
  const bobTime = useRef(0);
  const onGround = useRef(true); // 簡單判斷用
  const velocityY = useRef(0);
  const raycaster = useRef(new THREE.Raycaster());

  // 鍵盤事件
  useEffect(() => {
    if (isMobile) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = false;
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isMobile]);

  useFrame((_, delta) => {
    if (!started) return;

    const direction = new THREE.Vector3();

    if (isMobile && moveDirRef && moveDirRef.current) {
      direction.x = moveDirRef.current.x;
      direction.z = moveDirRef.current.z;
    } else {
      if (keysPressed.current["w"]) direction.z += 1;
      if (keysPressed.current["s"]) direction.z -= 1;
      if (keysPressed.current["a"]) direction.x -= 1;
      if (keysPressed.current["d"]) direction.x += 1;
    }

    const isMoving = direction.lengthSq() > 0;
    if (isMoving) {
      bobTime.current += delta;
    } else {
      bobTime.current = 0;
    }

    // 根據相機朝向來決定移動方向
    const camDir = new THREE.Vector3();
    camera.getWorldDirection(camDir);
    camDir.y = 0;
    camDir.normalize();

    const camRight = new THREE.Vector3()
      .crossVectors(camDir, camera.up)
      .normalize();
    const moveVec = new THREE.Vector3()
      .addScaledVector(camDir, direction.z)
      .addScaledVector(camRight, direction.x);

    if (moveVec.lengthSq() > 0) {
      moveVec.normalize();
      raycaster.current.set(camera.position, moveVec);
      const intersects = raycaster.current.intersectObjects(
        scene.children,
        true
      );
      if (intersects.length === 0 || intersects[0].distance > SAFE_DISTANCE) {
        camera.position.add(moveVec.multiplyScalar(SPEED * delta));
      }
    }

    // 跳躍模擬 (僅桌面版且空白鍵)
    if (!isMobile && keysPressed.current[" "] && onGround.current) {
      velocityY.current = JUMP_VELOCITY;
      onGround.current = false;
    }

    // 重力與位置更新
    velocityY.current -= 9.8 * delta;
    camera.position.y += velocityY.current * delta;

    if (camera.position.y <= BASE_HEIGHT) {
      camera.position.y = BASE_HEIGHT;
      onGround.current = true;
      velocityY.current = 0;
    }

    // head bobbing (只有走路時)
    if (onGround.current && isMoving) {
      camera.position.y += Math.sin(bobTime.current * BOB_FREQ) * BOB_AMP;
    }
  });

  return null;
}
