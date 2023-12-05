declare type ApiError = {
  status: number
  data: {
    message: string
    data: string
  }
}

declare interface ApiResponse<T> {
  message: string
  data: T
}

declare interface ApiResponsePaginated<T> {
  message: string
  data: T
  currentPage: number
  totalPages: number
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

declare interface ErrorMessages {
  [key: string]: { name: string; errors: string[] }
}
