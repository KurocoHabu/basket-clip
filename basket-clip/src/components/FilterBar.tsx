'use client'

import { useState } from 'react'

interface FilterBarProps {
  onFilter: (filters: { search: string; playType: string }) => void
}

const PLAY_TYPES = [
  'ドライブ',
  'シュート', 
  'パス',
  'ディフェンス',
  'リバウンド',
  'ブロック',
  'スティール',
  'ハンドリング',
  'その他'
]

export default function FilterBar({ onFilter }: FilterBarProps) {
  const [search, setSearch] = useState('')
  const [playType, setPlayType] = useState('')

  const handleSearchChange = (value: string) => {
    setSearch(value)
    onFilter({ search: value, playType })
  }

  const handlePlayTypeChange = (value: string) => {
    setPlayType(value)
    onFilter({ search, playType: value })
  }

  const clearFilters = () => {
    setSearch('')
    setPlayType('')
    onFilter({ search: '', playType: '' })
  }

  return (
    <div className="mb-6 bg-white rounded-lg shadow-sm p-4 border border-gray-200">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            検索
          </label>
          <input
            type="text"
            id="search"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="ユーザー名やメモで検索..."
          />
        </div>
        
        <div className="sm:w-48">
          <label htmlFor="playType" className="block text-sm font-medium text-gray-700 mb-1">
            プレイタイプ
          </label>
          <select
            id="playType"
            value={playType}
            onChange={(e) => handlePlayTypeChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">全てのプレイ</option>
            {PLAY_TYPES.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        
        {(search || playType) && (
          <div className="sm:w-auto flex items-end">
            <button
              onClick={clearFilters}
              className="w-full sm:w-auto px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
            >
              クリア
            </button>
          </div>
        )}
      </div>
    </div>
  )
}