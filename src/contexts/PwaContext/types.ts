export interface ContextApi {
  pwaStatus: string
  onInstall: () => void
  onReject: () => void
}
