'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function TestConnection() {
  const [testResult, setTestResult] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const testConnection = async () => {
    setIsLoading(true)
    setTestResult('')
    
    try {
      // 0. 環境変数チェック
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      
      console.log('Environment check:')
      console.log('SUPABASE_URL:', url)
      console.log('SUPABASE_KEY exists:', !!key)
      console.log('SUPABASE_KEY length:', key?.length)
      
      if (!url || !key) {
        setTestResult('❌ 環境変数が設定されていません')
        return
      }
      
      if (!url.includes('supabase.co')) {
        setTestResult('❌ Supabase URLの形式が正しくありません')
        return
      }
      
      // 1. 基本接続テスト
      console.log('Testing connection...')
      const { data, error } = await supabase.from('clips').select('count', { count: 'exact' })
      
      if (error) {
        console.error('Connection error:', error)
        setTestResult(`接続エラー: ${error.message}`)
        return
      }
      
      console.log('Connection successful:', data)
      setTestResult(`✅ 接続成功！現在のレコード数: ${data?.length || 0}件`)
      
      // 2. テストデータ挿入
      const testData = {
        username: 'テストユーザー',
        video_url: 'https://youtube.com/watch?v=test',
        play_type: 'テスト',
        memo: 'テスト投稿'
      }
      
      console.log('Inserting test data:', testData)
      const { data: insertData, error: insertError } = await supabase
        .from('clips')
        .insert([testData])
        .select()
      
      if (insertError) {
        console.error('Insert error:', insertError)
        setTestResult(prev => prev + `\n❌ 挿入エラー: ${insertError.message}`)
      } else {
        console.log('Insert successful:', insertData)
        setTestResult(prev => prev + '\n✅ テストデータ挿入成功！')
      }
      
    } catch (err) {
      console.error('Unexpected error:', err)
      setTestResult(`予期しないエラー: ${err}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">🔧 データベース接続テスト</h3>
      <button
        onClick={testConnection}
        disabled={isLoading}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {isLoading ? '接続テスト中...' : '接続テスト実行'}
      </button>
      
      {testResult && (
        <div className="mt-4 p-3 bg-white border rounded">
          <pre className="text-sm whitespace-pre-wrap">{testResult}</pre>
        </div>
      )}
    </div>
  )
}