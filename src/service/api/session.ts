import { ApiResult, parseApiResult } from "."

export async function sessionHeartbeat(base: string) {
  const res = await fetch(`${base}/session-heartbeat`, {
    credentials: 'include'
  })
  const apiResult = await res.json() as ApiResult<boolean>
  return parseApiResult(apiResult)
}
