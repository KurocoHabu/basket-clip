export default function Header() {
  return (
    <header className="bg-white shadow-md border-b-2 border-primary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center">
              <div className="text-white font-bold text-lg">🏀</div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">BasketClip</h1>
              <p className="text-sm text-gray-600">バスケットボール動画共有</p>
            </div>
          </div>
          
          <div className="hidden sm:block">
            <div className="text-right">
              <p className="text-sm text-gray-600">チームのハイライト</p>
              <p className="text-xs text-gray-500">みんなで共有しよう</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}