import React from "react";
import { motion } from "framer-motion";

export default function GridMenuIcon({ isOpen }) {
  // A 3x3 grid of dots.
  // The dots are indexed 0-8.
  // Corners: 0, 2, 6, 8.
  // Edges: 1, 3, 5, 7.
  // Center: 4.
  // When isOpen is true, we want to hide edges and form an 'X' with corners and center,
  // then rotate the container 45 degrees.

  const containerVariants = {
    closed: { rotate: 0 },
    open: { rotate: 45 },
  };

  const dotVariants = {
    closed: { scale: 1, opacity: 1 },
    open: (index) => {
      // Hide edges (1, 3, 5, 7) when forming the cross
      const isEdge = index === 1 || index === 3 || index === 5 || index === 7;
      return {
        scale: isEdge ? 0 : 1,
        opacity: isEdge ? 0 : 1,
      };
    },
  };

  const dots = Array.from({ length: 9 }).map((_, i) => i);

  return (
    <motion.div
      variants={containerVariants}
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "4px",
        width: "24px",
        height: "24px",
      }}
    >
      {dots.map((index) => (
        <motion.div
          key={index}
          custom={index}
          variants={dotVariants}
          style={{
            width: "4px",
            height: "4px",
            backgroundColor: "currentColor",
            borderRadius: "50%",
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
      ))}
    </motion.div>
  );
}
