declare type ApiError = {
  status: number
  data: {
    message: string
  }
}

declare interface ApiResponse<T> {
  message: string
  data: T
}

declare interface ApiResult {
  isError: boolean
  message: string
}

declare interface FilePreview extends File {
  preview: string
}

declare interface RemainingTime {
  days: number
  hours: number
  minutes: number
  seconds: number
}
