// Highlightable.tsx
import {
  useEffect,
  useRef,
  useContext,
  isValidElement,
  cloneElement,
  useState,
} from "react";
import { HighlightContext } from "@/contexts/HighlightContext";
import * as THREE from "three";
import { Edges } from "@react-three/drei";

export default function Highlightable({
  children,
}: {
  children: React.ReactElement;
}) {
  const meshRef = useRef<THREE.Object3D>(null);
  const { register, unregister, isHighlighted } = useContext(HighlightContext);
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);

  useEffect(() => {
    if (meshRef.current) {
      console.log("registering highlightable", meshRef.current.name);
      register(meshRef.current);
      if (meshRef.current instanceof THREE.Mesh) {
        setGeometry(meshRef.current.geometry);
      }
      return () => {
        if (meshRef.current) {
          unregister(meshRef.current);
        }
      };
    }
  }, []);

  return (
    <group>
      {isValidElement(children) &&
        cloneElement(
          children as React.ReactElement<{ ref?: React.Ref<THREE.Object3D> }>,
          {
            ref: (instance: THREE.Object3D<THREE.Object3DEventMap> | null) => {
              meshRef.current = instance;
            },
          }
        )}
      {meshRef.current && geometry && isHighlighted(meshRef.current) && (
        <group
          position={meshRef.current.position}
          rotation={meshRef.current.rotation}
          scale={meshRef.current.scale}
        >
          <Edges geometry={geometry} scale={1.05} color="lightblue" />
        </group>
      )}
    </group>
  );
}
