export const mineColor = () => {
  let colors = ["#4B0082", "#8A2BE2", "#6A5ACD", "#483D8B", "#191970"]; // Replace with your theme colors
  return colors[Math.floor(Math.random() * colors.length)];
};
