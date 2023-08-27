import { GET } from './index'

export const getTestData = (params = {}) => GET<MOCK.List>('/1.1/classes/test', params)
