import { GET, POSt } from './index'

export const getTestData = (params = {}) => POSt<MOCK.ZHI_NANG>('/1.1/classes/test', params)
export const getMockData = (params = {}) => GET<MOCK.ZHI_NANG>('/api/test', params)
