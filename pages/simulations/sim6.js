import { useState } from 'react';

export default function Sim6() {
  const [selectedBreed, setSelectedBreed] = useState('a');
  const [showGuide, setShowGuide] = useState(false);

  // 견종 데이터 매핑
  const breedData = {
    a: { name: '비숑 프리제', emoji: '☁️', color: 'bg-blue-50', borderColor: 'border-blue-300', textColor: 'text-blue-700' },
    b: { name: '토이 푸들', emoji: '🐩', color: 'bg-pink-50', borderColor: 'border-pink-300', textColor: 'text-pink-700' },
    c: { name: '포메라니안', emoji: '🦊', color: 'bg-orange-50', borderColor: 'border-orange-300', textColor: 'text-orange-700' },
    d: { name: '말티즈', emoji: '🎀', color: 'bg-purple-50', borderColor: 'border-purple-300', textColor: 'text-purple-700' },
    e: { name: '리트리버', emoji: '🦮', color: 'bg-amber-50', borderColor: 'border-amber-300', textColor: 'text-amber-700' },
    f: { name: '사모예드', emoji: '🐻‍❄️', color: 'bg-cyan-50', borderColor: 'border-cyan-300', textColor: 'text-cyan-700' },
  };

  const currentBreed = breedData[selectedBreed];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">🐕 강아지 견종별 운동량</h1>
          <p className="text-sm sm:text-base text-gray-600">견종을 선택하여 하루 권장 운동 시간을 확인해보세요</p>
        </div>

        {/* 견종 선택 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">견종 선택</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {Object.entries(breedData).map(([key, breed]) => (
              <button
                key={key}
                onClick={() => setSelectedBreed(key)}
                className={`p-3 sm:p-4 rounded-xl border-4 transition-all ${
                  selectedBreed === key
                    ? `${breed.color} ${breed.borderColor} scale-105 shadow-lg`
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <div className="text-3xl sm:text-4xl mb-2">{breed.emoji}</div>
                <p className="font-bold text-xs sm:text-sm">{breed.name}</p>
                <p className="text-xs text-gray-600 mt-1">({key.toUpperCase()})</p>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 왼쪽: 선택된 견종 정보 */}
          <div className="space-y-6">
            <div className={`${currentBreed.color} rounded-2xl shadow-lg p-6 sm:p-8 text-center`}>
              <div className="text-7xl sm:text-8xl mb-4">{currentBreed.emoji}</div>
              <h3 className={`text-2xl sm:text-3xl font-bold ${currentBreed.textColor} mb-2`}>
                {currentBreed.name}
              </h3>
            </div>

            {/* 가이드 토글 */}
            <div className="text-center">
              <button
                onClick={() => setShowGuide(!showGuide)}
                className="px-6 py-3 bg-indigo-500 text-white rounded-full font-bold hover:bg-indigo-600 transition-all shadow-lg"
              >
                📖 {showGuide ? '설명 숨기기' : '설명 보기'}
              </button>
            </div>
          </div>

          {/* 오른쪽: 함수 매핑 다이어그램 */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center">
                함수 매핑 다이어그램
              </h2>

              <div className="relative grid grid-cols-2 gap-8">
                {/* 정의역 */}
                <div>
                  <div className="bg-blue-100 rounded-xl p-4 mb-4 text-center">
                    <h3 className="font-bold text-blue-900 text-lg">정의역 (Domain)</h3>
                    <p className="text-sm text-blue-700">입력값 X</p>
                  </div>
                  <div className="space-y-3">
                    {Object.keys(breedData).map((key, idx) => (
                      <div
                        key={key}
                        className={`p-3 rounded-lg border-2 text-center transition-all ${
                          selectedBreed === key
                            ? 'bg-blue-500 border-blue-600 text-white scale-105 shadow-lg'
                            : 'bg-blue-50 border-blue-200'
                        }`}
                      >
                        <p className="font-bold text-3xl">{key.toUpperCase()}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 공역 */}
                <div>
                  <div className="bg-green-100 rounded-xl p-4 mb-4 text-center">
                    <h3 className="font-bold text-green-900 text-lg">공역/치역</h3>
                    <p className="text-sm text-green-700">출력값 Y</p>
                  </div>
                  <div className="space-y-3">
                    {Object.entries(breedData).map(([key, breed]) => (
                      <div
                        key={key}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          selectedBreed === key
                            ? 'bg-green-500 border-green-600 text-white scale-105 shadow-lg'
                            : 'bg-green-50 border-green-200'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{breed.emoji}</span>
                          <p className="font-bold text-sm">{breed.name}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 화살표 SVG */}
                <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                      <polygon points="0 0, 10 3, 0 6" fill="#dc2626" />
                    </marker>
                  </defs>
                  {selectedBreed === 'a' && <line x1="0" y1="30" x2="150" y2="30" stroke="#dc2626" strokeWidth="3" markerEnd="url(#arrowhead)" />}
                  {selectedBreed === 'b' && <line x1="0" y1="90" x2="150" y2="90" stroke="#dc2626" strokeWidth="3" markerEnd="url(#arrowhead)" />}
                  {selectedBreed === 'c' && <line x1="0" y1="150" x2="150" y2="150" stroke="#dc2626" strokeWidth="3" markerEnd="url(#arrowhead)" />}
                  {selectedBreed === 'd' && <line x1="0" y1="210" x2="150" y2="210" stroke="#dc2626" strokeWidth="3" markerEnd="url(#arrowhead)" />}
                  {selectedBreed === 'e' && <line x1="0" y1="270" x2="150" y2="270" stroke="#dc2626" strokeWidth="3" markerEnd="url(#arrowhead)" />}
                  {selectedBreed === 'f' && <line x1="0" y1="330" x2="150" y2="330" stroke="#dc2626" strokeWidth="3" markerEnd="url(#arrowhead)" />}
                </svg>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 rounded-lg border-2 border-yellow-300 text-center">
                <p className="text-sm text-gray-700">
                  <span className="font-bold text-red-600">빨간 화살표</span>가 현재 선택된 매핑을 나타내요
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  {selectedBreed.toUpperCase()} → {currentBreed.name}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 설명 패널 */}
        {showGuide && (
          <div className="mt-8 bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">📚 강아지 운동량의 중요성</h2>
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-blue-800 mb-3 flex items-center gap-2">🏃‍♂️ 왜 운동이 중요할까요?</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• 체중 관리, 스트레스 해소, 사회성 발달, 근육 유지 등</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* 돌아가기 버튼 */}
        <div className="mt-8 text-center">
          <button 
            onClick={() => window.history.back()}
            className="px-8 py-3 bg-white text-gray-700 rounded-full shadow-lg hover:shadow-xl transition-all font-semibold"
          >
            ← 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}
