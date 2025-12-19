const timeDate = () => {
  const now = new Date();

  // IST offset in minutes (+5:30)
  const istOffset = 330;
  const istTime = new Date(now.getTime() + istOffset * 60 * 1000);

  // Format HH:MM:SS
  const hh = String(istTime.getUTCHours()).padStart(2, "0");
  const mm = String(istTime.getUTCMinutes()).padStart(2, "0");
  const ss = String(istTime.getUTCSeconds()).padStart(2, "0");

  // Format DD:MT:YY
  const dd = now.getDate();
  const mt = now.getMonth() + 1;
  const yy = now.getFullYear();

  return `${dd}-${mt}-${yy}/${hh}:${mm}:${ss}`;
};

module.exports = timeDate;
