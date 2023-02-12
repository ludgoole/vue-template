import { GET, POSt } from './index'

export const getTestData = (params = {}) => GET<MOCK.BUGUA>('/1.1/classes/test', params)
export const getMockData = (params = {}) => POSt<MOCK.STOCk>('/mock/test.json', params)
