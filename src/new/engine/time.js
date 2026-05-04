export const toMin = (t) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

export const toTime = (m) => {
  const h = String(Math.floor(m / 60)).padStart(2, "0");
  const min = String(m % 60).padStart(2, "0");
  return `${h}:${min}`;
};