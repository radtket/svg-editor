export default function (commands, index, key) {
  for (let i = index - 1; i > -1; i--) {
    if (commands[i] && typeof commands[i].params[key] !== "undefined") {
      return parseFloat(commands[i].params[key]);
    }
  }
  return 0;
}
