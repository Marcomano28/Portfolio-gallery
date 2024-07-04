
export const calculateFontWeight = (maxW, minW, maxWg, minWg) => {
  const maxWidth = maxW;
  const minWidth = minW;
  const maxWeight = maxWg;
  const minWeight = minWg;

  const viewportWidth = window.innerWidth;
  const weightRange = maxWeight - minWeight;
  const widthRange = maxWidth - minWidth;
  const weightPerPx = weightRange / widthRange;
  const currentWeight = Math.max(minWeight, Math.min(maxWeight, maxWeight - ((viewportWidth - minWidth) * weightPerPx)));

  return currentWeight;
};