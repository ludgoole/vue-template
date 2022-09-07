import { post } from './index'

export const getTestData = (params = {}) => post<MOCK.ZHI_NANG>('mock/test.json', params)
