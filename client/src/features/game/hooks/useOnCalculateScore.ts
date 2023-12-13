import { useNavigate } from 'react-router-dom'

function useOnCalculateScore() {
  const navigate = useNavigate()

  return ({ logId }: { logId: string }) => {
    navigate(
      `?${new URLSearchParams({
        log: logId
      })}`
    )
  }
}

export default useOnCalculateScore
