'use client'

import { useState, useEffect } from 'react'
import { supabase, ClipData } from '@/lib/supabase'
import Header from '@/components/Header'
import ClipForm from '@/components/ClipForm'
import ClipCard from '@/components/ClipCard'
import FilterBar from '@/components/FilterBar'
// import TestConnection from '@/components/TestConnection'

export default function Home() {
  const [clips, setClips] = useState<ClipData[]>([])
  const [filteredClips, setFilteredClips] = useState<ClipData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchClips()
  }, [])

  const fetchClips = async () => {
    try {
      const { data, error } = await supabase
        .from('clips')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      
      setClips(data || [])
      setFilteredClips(data || [])
    } catch (error) {
      console.error('Error fetching clips:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleNewClip = (newClip: ClipData) => {
    setClips(prev => [newClip, ...prev])
    setFilteredClips(prev => [newClip, ...prev])
  }

  const handleFilter = ({ search, playType }: { search: string; playType: string }) => {
    let filtered = clips

    if (search) {
      filtered = filtered.filter(clip => 
        clip.username.toLowerCase().includes(search.toLowerCase()) ||
        clip.memo?.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (playType) {
      filtered = filtered.filter(clip => clip.play_type === playType)
    }

    setFilteredClips(filtered)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-lighter">
        <Header />
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="mt-4 text-gray-600">読み込み中...</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-lighter">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* <TestConnection /> */}
        <ClipForm onSubmit={handleNewClip} />
        
        {clips.length > 0 && (
          <FilterBar onFilter={handleFilter} />
        )}
        
        {clips.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏀</div>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">まだクリップがありません</h2>
            <p className="text-gray-600">最初のバスケットハイライトを投稿してみましょう！</p>
          </div>
        ) : filteredClips.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🔍</div>
            <h2 className="text-xl font-bold text-gray-700 mb-2">該当するクリップが見つかりません</h2>
            <p className="text-gray-600">検索条件を変更してみてください</p>
          </div>
        ) : (
          <>
            <div className="mb-4 text-sm text-gray-600">
              {filteredClips.length}件のクリップ
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredClips.map((clip) => (
                <ClipCard key={clip.id} clip={clip} />
              ))}
            </div>
          </>
        )}
      </main>
      
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-600">
            <p>&copy; 2025 BasketClip - バスケットボール動画共有アプリ</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
