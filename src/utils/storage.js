export const storage = {
  setItem: (name, item) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(name, JSON.stringify(item));
    }
  },

  getItem: (name) => {
    if (typeof window !== "undefined") {
      const item = localStorage.getItem(name);

      if (item) {
        return JSON.parse(item);
      }
    }
  },

  removeItem: (name) => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(name);
    }
  },
};
