import { post } from './index'

export const getStockData = (params = {}) => post<MOCK.STOCk>('mock/stock.json', params)
export const getAccountData = (params = {}) => post<MOCK.STOCk>('mock/account.json', params)
