export function Base64ToUint8Array(base64: string) {
  return Uint8Array.from(window.atob(base64), v => v.charCodeAt(0))
}
