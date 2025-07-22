'use client'

import { useState } from 'react'
import { supabase, ClipData } from '@/lib/supabase'

interface ClipFormProps {
  onSubmit: (clip: ClipData) => void
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

export default function ClipForm({ onSubmit }: ClipFormProps) {
  const [formData, setFormData] = useState({
    username: '',
    video_url: '',
    play_type: '',
    memo: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const { data, error } = await supabase
        .from('clips')
        .insert([formData])
        .select()

      if (error) throw error

      if (data && data[0]) {
        onSubmit(data[0])
        setFormData({
          username: '',
          video_url: '',
          play_type: '',
          memo: ''
        })
        setShowForm(false)
      }
    } catch (error) {
      console.error('Error submitting clip:', error)
      alert('投稿に失敗しました。もう一度お試しください。')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  if (!showForm) {
    return (
      <div className="mb-8 text-center">
        <button
          onClick={() => setShowForm(true)}
          className="bg-primary hover:bg-primary-light text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          + 新しいクリップを投稿
        </button>
      </div>
    )
  }

  return (
    <div className="mb-8 bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">新しいクリップを投稿</h2>
        <button
          onClick={() => setShowForm(false)}
          className="text-gray-500 hover:text-gray-700 text-xl font-bold"
        >
          ×
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            ユーザー名 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="あなたの名前を入力してください"
          />
        </div>

        <div>
          <label htmlFor="video_url" className="block text-sm font-medium text-gray-700 mb-1">
            動画URL <span className="text-red-500">*</span>
          </label>
          <input
            type="url"
            id="video_url"
            name="video_url"
            value={formData.video_url}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="https://youtube.com/watch?v=... または https://x.com/..."
          />
          <p className="text-xs text-gray-500 mt-1">
            YouTube、𝕏(Twitter)などの動画リンクを貼り付けてください
          </p>
        </div>

        <div>
          <label htmlFor="play_type" className="block text-sm font-medium text-gray-700 mb-1">
            おすすめプレイ
          </label>
          <select
            id="play_type"
            name="play_type"
            value={formData.play_type}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">プレイタイプを選択</option>
            {PLAY_TYPES.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="memo" className="block text-sm font-medium text-gray-700 mb-1">
            メモ
          </label>
          <textarea
            id="memo"
            name="memo"
            value={formData.memo}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            placeholder="このプレイについて一言..."
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-primary hover:bg-primary-light disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-md font-semibold transition-colors duration-200"
          >
            {isSubmitting ? '投稿中...' : '投稿する'}
          </button>
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200"
          >
            キャンセル
          </button>
        </div>
      </form>
    </div>
  )
}