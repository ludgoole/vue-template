import { post } from './index'

export const getTestData = (params = {}) => post('mock/test.json', params)
