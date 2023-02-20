import { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { skipToken } from '@reduxjs/toolkit/query/react'
import { useGetCharactersQuery, rickmortyApi } from '@next-task/services/rickmorty'
import {
  selectAllCharacters,
  selectCurrentPage,
  selectHasMorePages,
} from '@next-task/services/selectors'
import Spinner from '@next-task/components/Spinner'
import Sentinel from '@next-task/components/Sentinel'
import RefreshIndicator from '@next-task/components/RefreshIndicator'
import EmptyState from '@next-task/components/EmptyState'
import { useAppDispatch } from '@next-task/store'
import CharactersList from '@next-task/components/CharactersList'
import ErrorInfo from '@next-task/components/ErrorInfo'

export default function Home() {
  const [page, setPage] = useState<number | null>(null)
  const currentPage = useSelector(selectCurrentPage)
  const hasMorePages = useSelector(selectHasMorePages)
  const { isFetching, isError } = useGetCharactersQuery(page ?? skipToken)
  const characters = useSelector(selectAllCharacters)
  const dispatch = useAppDispatch()

  const handlePull = useCallback(() => setPage((prev) => (prev === 0 ? -1 : 0)), [setPage])

  const handleNextPage = useCallback(() => {
    if (currentPage !== null && currentPage > 0) {
      setPage(currentPage + 1)
    }
  }, [setPage, currentPage])

  const handleReset = useCallback(() => {
    dispatch(rickmortyApi.util.resetApiState())
    setPage(null)
  }, [dispatch])

  return (
    <>
      {characters.length === 0 && !isFetching && (
        <EmptyState>
          <RefreshIndicator onRefresh={handlePull} showIdle />
        </EmptyState>
      )}
      {!(characters.length === 0 && !isFetching) && (
        <div className="relative h-16">
          <div className="absolute inset-0 flex justify-center items-center">
            {characters.length > 0 && !isFetching && <RefreshIndicator onRefresh={handlePull} />}
            {characters.length === 0 && isFetching && <Spinner />}
          </div>
        </div>
      )}
      <CharactersList onReset={handleReset} />
      {(currentPage ?? 0) > 0 && hasMorePages && !isFetching && (
        <Sentinel key="sentinel" onShow={handleNextPage} />
      )}
      {(currentPage ?? 0) > 0 && isFetching && (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      )}
      <ErrorInfo isError={isError} />
    </>
  )
}
