import { GET, POSt } from './index'

export const getTestData = (params = {}) => GET<MOCK.ZHI_NANG>('/1.1/classes/test', params)
export const getMockData = (params = {}) => POSt<MOCK.ZHI_NANG>('/mock/test.json', params)
export const getList = (params = {}) => GET<MOCK.ZHI_NANG>('/api/list.php', params)
