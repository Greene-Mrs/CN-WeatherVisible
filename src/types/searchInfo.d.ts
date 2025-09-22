import type { Res } from '@/types/http'

// 热门城市
type SearchHotCitysData = [string, string, string]

interface SearchSuggestData {
  adcode: string
  address: string
  city: []
  district: string
  id: string
  location: string
  name: string
  typecode: string
}

export type SearchHotCitysRes = Res<SearchHotCitysData[]>
export type SearchSuggestRes = Res<SearchSuggestData[]>
