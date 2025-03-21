export default function translateRating(value) {
  if (value < 1 || value > 100) {
    return ""; // "Invalid rating" in Latvian
  }

  if (value <= 10) {
    return "ļoti slikti"; // Completely unsatisfied
  } else if (value <= 20) {
    return "slikti"; // Very unsatisfied
  } else if (value <= 30) {
    return "vāji"; // Significantly unsatisfied
  } else if (value <= 40) {
    return "nepietiekami"; // Partially unsatisfied
  } else if (value <= 50) {
    return "viduvēji"; // Neutral
  } else if (value <= 60) {
    return "gandrīz labi"; // Partially satisfied
  } else if (value <= 70) {
    return "labi"; // Significantly satisfied
  } else if (value <= 80) {
    return "ļoti labi"; // Greatly satisfied
  } else if (value <= 95) {
    return "teicami"; // Very satisfied
  } else {
    // 91-100
    return "izcili"; // Completely satisfied
  }
}
