import { ClipData } from '@/lib/supabase'

interface ClipCardProps {
  clip: ClipData
}

export default function ClipCard({ clip }: ClipCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getVideoThumbnail = (url: string) => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = url.includes('youtu.be') 
        ? url.split('youtu.be/')[1]?.split('?')[0]
        : url.split('v=')[1]?.split('&')[0]
      
      if (videoId) {
        return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
      }
    }
    return '/placeholder-video.svg'
  }

  const isYouTube = (url: string) => {
    return url.includes('youtube.com') || url.includes('youtu.be')
  }

  const isTwitter = (url: string) => {
    return url.includes('twitter.com') || url.includes('x.com')
  }

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200">
      <div className="aspect-video bg-gray-100 relative">
        {isYouTube(clip.video_url) ? (
          <img 
            src={getVideoThumbnail(clip.video_url)}
            alt="Video thumbnail"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-lighter to-primary-light">
            <div className="text-white text-lg font-semibold">
              {isTwitter(clip.video_url) ? '𝕏 / Twitter' : 'Video'}
            </div>
          </div>
        )}
        <div className="absolute top-2 right-2">
          <span className="bg-primary text-white px-2 py-1 rounded-full text-xs font-medium">
            {isYouTube(clip.video_url) ? 'YouTube' : isTwitter(clip.video_url) ? '𝕏' : 'Video'}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-800 truncate flex-1">
            {clip.play_type || '未分類'}
          </h3>
          <span className="text-sm text-gray-500 ml-2">
            by {clip.username}
          </span>
        </div>
        
        {clip.memo && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {clip.memo}
          </p>
        )}
        
        <div className="flex justify-between items-center">
          <a 
            href={clip.video_url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary hover:bg-primary-light text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            視聴する
          </a>
          
          {clip.created_at && (
            <span className="text-xs text-gray-400">
              {formatDate(clip.created_at)}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}