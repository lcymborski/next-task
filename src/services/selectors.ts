import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@next-task/store';
import { rickmortyApi, charactersAdapter } from '@next-task/services/rickmorty'

export const selectCharactersResult = rickmortyApi.endpoints.getCharacters.select(0)

const selectCharactersData = createSelector(
  selectCharactersResult,
  result => result.data
)

export const selectCurrentPage = createSelector(
  selectCharactersData,
  data => data?.page ?? null
)

export const selectHasMorePages = createSelector(
  selectCharactersData,
  data => data?.hasMorePages ?? true
)

const initialState = charactersAdapter.getInitialState({
  page: null,
  hasMorePages: true,
})

export const {
  selectAll: selectAllCharacters,
  selectById: selectCharacterById,
} = charactersAdapter.getSelectors<RootState>(state => selectCharactersData(state) ?? initialState)
