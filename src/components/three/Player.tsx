"use client";

import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useStartStore } from "@/stores/useStartStore";

const SPEED = 0.1;
const BOB_FREQ = 10;
const BOB_AMP = 0.03;
const BASE_HEIGHT = 1.6;
const GRAVITY = 0.01;
const JUMP_VELOCITY = 0.2;

export default function Player() {
  const { camera } = useThree();
  const velocity = useRef(new THREE.Vector3());
  const direction = useRef(new THREE.Vector3());
  const keysPressed = useRef<{ [key: string]: boolean }>({});
  const started = useStartStore((state) => state.started);
  const bobTime = useRef(0);
  const isJumping = useRef(false);
  const verticalVelocity = useRef(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === " ") {
        if (!isJumping.current) {
          isJumping.current = true;
          verticalVelocity.current = JUMP_VELOCITY;
        }
      }
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
  }, []);

  useFrame((_, delta) => {
    if (!started) return;

    direction.current.set(0, 0, 0);
    if (keysPressed.current["w"]) direction.current.z += 1;
    if (keysPressed.current["s"]) direction.current.z -= 1;
    if (keysPressed.current["a"]) direction.current.x -= 1;
    if (keysPressed.current["d"]) direction.current.x += 1;

    const isMoving = direction.current.lengthSq() > 0;

    if (isMoving) {
      bobTime.current += delta;
    } else {
      bobTime.current = 0;
    }

    // 改為根據相機方向向量的水平投影計算方向
    const camDir = new THREE.Vector3();
    camera.getWorldDirection(camDir);
    camDir.y = 0;
    camDir.normalize();

    const camRight = new THREE.Vector3()
      .crossVectors(camDir, camera.up)
      .normalize();

    const moveVec = new THREE.Vector3();
    moveVec
      .addScaledVector(camDir, direction.current.z)
      .addScaledVector(camRight, direction.current.x)
      .normalize();

    velocity.current.copy(moveVec).multiplyScalar(SPEED);
    camera.position.add(velocity.current);

    // 垂直方向處理
    if (isJumping.current) {
      verticalVelocity.current -= GRAVITY;
      camera.position.y += verticalVelocity.current;

      if (camera.position.y <= BASE_HEIGHT) {
        camera.position.y = BASE_HEIGHT;
        isJumping.current = false;
        verticalVelocity.current = 0;
      }
    } else {
      // head bobbing 只有在沒跳躍時使用
      camera.position.y =
        BASE_HEIGHT +
        (isMoving ? Math.sin(bobTime.current * BOB_FREQ) * BOB_AMP : 0);
    }
  });

  return null; // 不需要渲染任何物件，只操作相機位置
}
