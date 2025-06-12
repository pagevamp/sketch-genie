export function isJson(str: string | null) {
  if (!str) return false;
  try {
    JSON.parse(str);
  } catch (e) {
    console.log(e);
    return false;
  }
  return true;
}
