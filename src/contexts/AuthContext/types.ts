export interface ContextApi {
  loaded: boolean
  token: string
  addToken: (value: string) => void
}
