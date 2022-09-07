import { post } from './index'

export const getTestData = (params = {}) => post<MOCK.STOCk>('mock/test.json', params)
