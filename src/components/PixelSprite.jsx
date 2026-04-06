import { motion } from "framer-motion";

/**
 * Pixel sprite decorative character with looping animations.
 * Entrance: fade + pop-in via whileInView (outer div).
 * Loop: continuous keyframe on the inner img (independent of entrance).
 *
 * anim options: "float" | "bob" | "wiggle" | "idle"
 */

const LOOPS = {
  float: {
    animate: { y: [0, -9, 0] },
    transition: { repeat: Infinity, duration: 2.4, ease: "easeInOut" },
  },
  bob: {
    animate: { y: [0, -5, 0] },
    transition: { repeat: Infinity, duration: 1.7, ease: "easeInOut" },
  },
  wiggle: {
    animate: { rotate: [-9, 9, -9], y: [0, -3, 0] },
    transition: { repeat: Infinity, duration: 1.3, ease: "easeInOut" },
  },
  idle: {
    animate: { y: [0, -3, 0] },
    transition: { repeat: Infinity, duration: 3.2, ease: "easeInOut" },
  },
};

const PixelSprite = ({
  size = 56,
  anim = "float",
  className = "",
  style = {},
  once = true,
}) => {
  const loop = LOOPS[anim] ?? LOOPS.float;

  return (
    <motion.div
      className={`inline-block select-none pointer-events-none ${className}`}
      style={style}
      initial={{ opacity: 0, scale: 0.5, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.img
        src={`${import.meta.env.BASE_URL}pixel_sprite.png`}
        alt=""
        aria-hidden="true"
        draggable={false}
        animate={loop.animate}
        transition={loop.transition}
        style={{ width: size, imageRendering: "pixelated", display: "block" }}
      />
    </motion.div>
  );
};

export default PixelSprite;
