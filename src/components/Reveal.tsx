"use client";

import { motion, Variants, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

const DISTANCE = 32;

function getVariants(direction: Direction): Variants {
  const offset =
    direction === "up" ? { y: DISTANCE } :
    direction === "down" ? { y: -DISTANCE } :
    direction === "left" ? { x: DISTANCE } :
    direction === "right" ? { x: -DISTANCE } :
    {};

  return {
    hidden: { opacity: 0, ...offset },
    visible: { opacity: 1, x: 0, y: 0 },
  };
}

export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  amount = 0.2,
  once = true,
  className,
}: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  amount?: number;
  once?: boolean;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={getVariants(direction)}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}