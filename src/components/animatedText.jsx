import { AnimatePresence, motion, useInView } from "framer-motion";
import * as React from "react";

export const AnimatedText = ({ text = "Gradual Spacing", className }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <div
      style={{ display: "flex", letterSpacing: 1, justifyContent: "center" }}
    >
      <AnimatePresence>
        {text.split("").map((char, i) => (
          <motion.p
            ref={ref}
            key={i}
            initial={{ opacity: 0, x: -18 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            exit="hidden"
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={className}
          >
            {char === " " ? <span>&nbsp;</span> : char}
          </motion.p>
        ))}
      </AnimatePresence>
    </div>
  );
};
