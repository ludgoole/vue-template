declare module 'lunar-javascript' {
  export interface LunarType {
    fromDate: Function
    [key: string]: object
  }


  export const Lunar: LunarType
}
