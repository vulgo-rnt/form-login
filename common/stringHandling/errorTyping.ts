export default function errorTyping(err: string | undefined) {
  if (!err) return { type: "", message: "" };
  const [type, message] = err.split(":");
  return { type, message };
}
