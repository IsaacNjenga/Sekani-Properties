import { motion } from "framer-motion";

function Motion({ children }) {
  return (
    <motion.div
      initial={{ opacity: 50, x: 50 }}
      animate={{ opacity: 2, x: 0 }}
      exit={{ opacity: -50, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.div>
  );
}

export default Motion;
