# BasketClip - バスケットボール動画共有アプリ

社会人バスケチームのためのハイライト動画共有アプリケーション

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. Supabaseの設定

1. [Supabase](https://supabase.com)でアカウントを作成
2. 新しいプロジェクトを作成
3. Settings > API でURL とANON KEYを取得
4. `.env.local` ファイルを編集：

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 3. データベーステーブルの作成

Supabaseの SQL Editor で以下を実行：

```sql
CREATE TABLE clips (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  video_url TEXT NOT NULL,
  play_type VARCHAR(100),
  memo TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Row Level Security (RLS) を有効化
ALTER TABLE clips ENABLE ROW LEVEL SECURITY;

-- 全ユーザーが読み取り可能
CREATE POLICY "Anyone can view clips" ON clips FOR SELECT USING (true);

-- 全ユーザーが投稿可能
CREATE POLICY "Anyone can insert clips" ON clips FOR INSERT WITH CHECK (true);
```

### 4. 開発サーバーの起動

```bash
npm run dev
```

## デプロイ

### Vercelデプロイ

1. GitHubリポジトリにプッシュ
2. [Vercel](https://vercel.com)でプロジェクトをインポート
3. 環境変数を設定：
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 技術スタック

- **フロントエンド**: Next.js 14, React, TypeScript, Tailwind CSS
- **データベース**: Supabase (PostgreSQL)
- **デプロイ**: Vercel
- **スタイリング**: Tailwind CSS (バスケットボールテーマ)
