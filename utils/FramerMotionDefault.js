// Default animations for router transitions

const duration = 0.3;
const defaultVariants = {
  initial: {
    opacity: 0,
    x: +80,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration,
      when: 'beforeChildren',
    },
  },
  exit: {
    opacity: 0,
    x: -80,
    transition: {
      duration,
    },
  },
};

export default defaultVariants;
