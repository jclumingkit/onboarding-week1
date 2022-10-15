export const cardList = {
  hidden: { x: 20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
    },
  },
};

export const cardItem = {
  hidden: { x: 20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 1.5,
      ease: "easeIn",
      type: "spring",
      stiffness: 50,
    },
  },
};
