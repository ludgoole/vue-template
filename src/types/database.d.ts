declare namespace DATABASE {
  interface Zhouyi {
    '卦序': number;
    '卦名': string;
    '大象': string;
    '类象': string;
    '卦辞': string;
    '卦象': number[];
    '爻象': string[];
    '爻辞': string[];
    '八宫': string;
    '宫序': number;
    '归游': string;
    '五行': string;
    '纳甲': string[];
    '世应': Zhouyi_Shiying;
    '记忆'?: string;
  }

  interface Zhouyi_Shiying {
    '6'?: string;
    '5'?: string;
    '4'?: string;
    '3'?: string;
    '2'?: string;
    '1'?: string;
  }

  type Zhouyi_Key = keyof Zhouyi
  type Zhouyi_Shiying_Key = keyof Zhouyi_Shiying
}
