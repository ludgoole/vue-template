// 增删卜易
import { GET } from './index'

export const getData = (params = {}) => GET<API.BUGUA>('/liuyao', params)
