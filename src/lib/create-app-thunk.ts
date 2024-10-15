import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppDispatch, Dependencies, RootState } from './create-store'

type AppThunk = ReturnType<typeof createAsyncThunk.withTypes<{
    state: RootState;
    dispatch: AppDispatch;
    extra: Dependencies;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>>;

export const createAppAsyncThunk: AppThunk = createAsyncThunk.withTypes<{
  state: RootState
  dispatch: AppDispatch
  extra: Dependencies
}>()

