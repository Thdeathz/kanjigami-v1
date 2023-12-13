import { useNavigate } from 'react-router-dom'

function useOnContentNotFound(stackId: string, gameId: string) {
  const navigate = useNavigate()

  return () => {
    if (stackId) navigate(`/play/${stackId}/${gameId}`)
  }
}

export default useOnContentNotFound
