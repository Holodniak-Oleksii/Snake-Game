export const checkCollision = (segment, apple) => {
  return segment.x === apple.position.x && segment.y === apple.position.y;
};
