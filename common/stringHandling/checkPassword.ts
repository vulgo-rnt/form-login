export default function checkPassword(pass: string) {
  if (pass.length > 6) return false;
  return /[A-Z]/.test(pass);
}
