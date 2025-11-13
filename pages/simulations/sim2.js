import { useState, useRef } from 'react';

export default function Sim2() {
  const [saltAmount, setSaltAmount] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [saltAnimation, setSaltAnimation] = useState(false);
  const [showMapping, setShowMapping] = useState(false);
  const resultRef = useRef(null);

  // 매핑 함수
  const saltToSaltiness = {
    0: 1, 1: 1,
    2: 2, 3: 2,
    4: 3, 5: 3,
    6: 4,
    7: 5, // ✅ 적당
    8: 6, 9: 6,
    10: 7, 11: 7,
    12: 8, 13: 8,
    14: 9, 15: 9, 16: 10,
    17: 10, 18: 10, 19: 10, 20: 10,
    21: 10, 22: 10, 23: 10, 24: 10, 25: 10
  };

  const saltinessLevel = saltToSaltiness[saltAmount];

  // 짠맛 단계별 상태
  const getSaltinessStatus = (level, salt) => {
    const statuses = {
      1: {
        emoji: '😰',
        text: '너무 싱거워요',
        color: 'text-blue-600',
        bg: 'bg-blue-50',
        comment: '국물에 간이 거의 없어요. 소금을 더 넣어주세요.'
      },
      2: {
        emoji: '😕',
        text: '많이 싱거워요',
        color: 'text-blue-500',
        bg: 'bg-blue-50',
        comment: '맛이 심심해요. 간이 많이 부족해요.'
      },
      3: {
        emoji: '🙁',
        text: '조금 싱거워요',
        color: 'text-cyan-600',
        bg: 'bg-cyan-50',
        comment: '거의 다 왔지만 아직 조금 더 필요해요.'
      },
      4: {
        emoji: '🙂',
        text: '거의 적당해요',
        color: 'text-yellow-600',
        bg: 'bg-yellow-50',
        comment: '거의 완벽해요! 조금만 더 넣으면 딱 맞을 것 같아요.'
      },
      5: {
        emoji: '🍜',
        text: '완벽해요!',
        color: 'text-green-600',
        bg: 'bg-green-50',
        comment: '천일염의 구수한 맛이 국물과 완벽하게 어우러졌어요! 최고예요!'
      },
      6: {
        emoji: '😐',
        text: '약간 짜기 시작해요',
        color: 'text-orange-500',
        bg: 'bg-orange-50',
        comment: '먹을 만하지만 살짝 짜네요. 소금을 조금 덜 넣었으면 좋았을 것 같아요.'
      },
      7: {
        emoji: '😬',
        text: '조금 짜요',
        color: 'text-orange-600',
        bg: 'bg-orange-50',
        comment: '확실히 짜요. 물을 좀 마셔야겠어요.'
      },
      8: {
        emoji: '😣',
        text: '짜요',
        color: 'text-red-500',
        bg: 'bg-red-50',
        comment: '많이 짜네요. 먹기가 힘들어요.'
      },
      9: {
        emoji: '😵',
        text: '많이 짜요',
        color: 'text-red-600',
        bg: 'bg-red-50',
        comment: '너무 짜서 거의 먹을 수가 없어요!'
      },
      10: {
        emoji: '💀',
        text: '너무 짜서 먹기 힘들어요',
        color: 'text-red-700',
        bg: 'bg-red-100',
        comment: '염분 과다예요! 이건 먹을 수 없어요.'
      }
    };
    return statuses[level] || statuses[1];
  };

  const status = getSaltinessStatus(saltinessLevel, saltAmount);

  // 국에 소금 추가
  const addSalt = () => {
    if (saltAmount < 25 && !submitted) {
      setSaltAmount(prev => prev + 1);
      setSaltAnimation(true);
      setTimeout(() => setSaltAnimation(false), 300);
    }
  };

  // 제출
  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // 리셋
  const handleReset = () => {
    setSaltAmount(0);
    setSubmitted(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* 상단 섹션 - 소금 넣기 */}
      <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              🧂 소금의 양과 짠맛 강도
            </h1>
            <p className="text-gray-600">
              소고기 무국에 소금을 넣어 간을 맞춰보세요
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-8">
            {/* 소고기 무국 */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                소고기 뭇국
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                클릭해서 천일염을 한 꼬집(1g)씩 넣어주세요
              </p>
            </div>

            {/* 국 그릇 (클릭 가능) */}
            <div 
              onClick={addSalt}
              className="relative mx-auto mb-8 cursor-pointer transform transition-all hover:scale-105"
              style={{ width: '100%', maxWidth: '300px', height: '300px' }}
            >
              {/* 그릇 */}
              <div className="absolute inset-0 flex items-end justify-center">
                <div className="w-72 h-48 bg-gradient-to-b from-orange-100 to-orange-200 rounded-full border-8 border-orange-300 shadow-xl relative overflow-hidden">
                  {/* 국물 */}
                  <div className="absolute inset-0 bg-gradient-to-b from-amber-200 to-amber-300">
                    {/* 무 조각들 */}
                    <div className="absolute top-8 left-12 w-8 h-8 bg-white rounded opacity-70"></div>
                    <div className="absolute top-16 right-16 w-6 h-6 bg-white rounded opacity-60"></div>
                    <div className="absolute bottom-12 left-20 w-10 h-10 bg-white rounded opacity-80"></div>
                    {/* 고기 */}
                    <div className="absolute top-20 right-24 w-6 h-4 bg-red-900 rounded opacity-70"></div>
                    <div className="absolute top-24 left-28 w-8 h-5 bg-red-900 rounded opacity-60"></div>
                  </div>
                  
                  {/* 김 (증기) */}
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                    <div className="text-4xl animate-pulse opacity-60">💨</div>
                  </div>
                </div>
              </div>

              {/* 소금 애니메이션 */}
              {saltAnimation && (
                <>
                  {/* 소금통 */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
                    <span className="text-7xl sm:text-8xl inline-block" style={{ transform: 'rotate(-45deg)' }}>🧂</span>
                  </div>
                  
                  {/* 떨어지는 소금 한 줄 */}
                  <div
                    className="absolute"
                    style={{
                      top: '70px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      animation: `fall 0.6s ease-in forwards`
                    }}
                  >
                    <span className="text-2xl opacity-90">⚪</span>
                  </div>
                  
                  <style jsx>{`
                    @keyframes fall {
                      0% {
                        transform: translateX(-50%) translateY(0) scale(1);
                        opacity: 0.9;
                      }
                      100% {
                        transform: translateX(-50%) translateY(200px) scale(0.5);
                        opacity: 0;
                      }
                    }
                  `}</style>
                </>
              )}
            </div>

            {/* 현재 소금 양 */}
            <div className="text-center mb-6">
              <div className="inline-block bg-gradient-to-r from-amber-100 to-orange-100 rounded-full px-8 py-4">
                <p className="text-sm text-gray-600 mb-1">넣은 소금</p>
                <p className="text-4xl font-bold text-orange-600">
                  {saltAmount}g
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  (한 꼬집 = 1g)
                </p>
              </div>
            </div>

            {/* 버튼들 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleSubmit}
                disabled={submitted}
                className={`px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg shadow-lg transition-all ${
                  submitted
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-green-500 text-white hover:bg-green-600 hover:shadow-xl'
                }`}
              >
                {submitted ? '제출 완료' : '손님에게 제출하기'}
              </button>
              
              <button
                onClick={handleReset}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-blue-500 text-white rounded-full font-bold text-base sm:text-lg shadow-lg hover:bg-blue-600 hover:shadow-xl transition-all"
              >
                다시 시작
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 섹션 - 결과 */}
      {submitted && (
        <div ref={resultRef} className="min-h-screen flex flex-col items-center justify-center py-12 px-4 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="max-w-4xl w-full">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-800 mb-2">
                손님의 반응
              </h2>
            </div>

            {/* 손님 반응 */}
            <div className={`${status.bg} rounded-2xl shadow-2xl p-8 mb-8`}>
              <div className="text-center">
                <div className="text-9xl mb-6">{status.emoji}</div>
                <h3 className={`text-4xl font-bold ${status.color} mb-4`}>
                  "{status.text}"
                </h3>
                <p className="text-xl text-gray-700 mb-4">
                  {status.comment}
                </p>
                
                {saltAmount === 7 && (
                  <div className="mt-6 text-green-700 font-bold text-2xl animate-pulse">
                    ⭐ 완벽한 간입니다! ⭐
                  </div>
                )}
              </div>
            </div>

            {/* 정의역 → 치역 매핑 */}
            <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                  📊 정의역 → 치역 매핑
                </h3>
                <button
                  onClick={() => setShowMapping(!showMapping)}
                  className="px-4 py-2 bg-purple-500 text-white rounded-full font-bold text-sm hover:bg-purple-600 transition-all"
                >
                  {showMapping ? '숨기기' : '보기'}
                </button>
              </div>
              
              {showMapping && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 mb-6">
                    {/* 정의역 */}
                    <div className="bg-blue-50 rounded-xl p-4 sm:p-6">
                      <h4 className="font-bold text-base sm:text-lg text-blue-800 mb-4 text-center">
                        정의역 (입력)
                      </h4>
                      <p className="text-center text-sm sm:text-base text-gray-700">
                        소금의 양 (g)
                      </p>
                      <div className="text-center mt-4">
                        <span className="inline-block bg-blue-200 px-3 sm:px-4 py-2 rounded-lg font-bold text-sm sm:text-base text-blue-900">
                          0g ~ 25g
                        </span>
                      </div>
                    </div>

                    {/* 치역 */}
                    <div className="bg-orange-50 rounded-xl p-4 sm:p-6">
                      <h4 className="font-bold text-base sm:text-lg text-orange-800 mb-4 text-center">
                        치역 (출력)
                      </h4>
                      <p className="text-center text-sm sm:text-base text-gray-700">
                        짠맛 단계
                      </p>
                      <div className="text-center mt-4">
                        <span className="inline-block bg-orange-200 px-3 sm:px-4 py-2 rounded-lg font-bold text-sm sm:text-base text-orange-900">
                          1 ~ 10단계
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 매핑 표 */}
                  <div className="bg-gray-50 rounded-xl p-4 sm:p-6 max-h-96 overflow-y-auto">
                    <div className="space-y-3 sm:space-y-4">
                      {/* 1단계 그룹 */}
                      <div className="bg-blue-100 rounded-lg p-2 sm:p-3">
                        <div className="font-bold text-sm sm:text-base text-blue-800 mb-2 flex items-center gap-2">
                          <span>😰</span>
                          <span>1단계 - 너무 싱거워요</span>
                        </div>
                        <div className="text-xs sm:text-sm text-gray-700 pl-6 sm:pl-8">
                          0g, 1g → 1단계
                        </div>
                      </div>

                      {/* 2단계 그룹 */}
                      <div className="bg-blue-50 rounded-lg p-2 sm:p-3">
                        <div className="font-bold text-sm sm:text-base text-blue-700 mb-2 flex items-center gap-2">
                          <span>😕</span>
                          <span>2단계 - 많이 싱거워요</span>
                        </div>
                        <div className="text-xs sm:text-sm text-gray-700 pl-6 sm:pl-8">
                          2g, 3g → 2단계
                        </div>
                      </div>

                      {/* 3단계 그룹 */}
                      <div className="bg-cyan-50 rounded-lg p-2 sm:p-3">
                        <div className="font-bold text-sm sm:text-base text-cyan-700 mb-2 flex items-center gap-2">
                          <span>🙁</span>
                          <span>3단계 - 조금 싱거워요</span>
                        </div>
                        <div className="text-xs sm:text-sm text-gray-700 pl-6 sm:pl-8">
                          4g, 5g → 3단계
                        </div>
                      </div>

                      {/* 4단계 그룹 */}
                      <div className="bg-yellow-50 rounded-lg p-2 sm:p-3">
                        <div className="font-bold text-sm sm:text-base text-yellow-700 mb-2 flex items-center gap-2">
                          <span>🙂</span>
                          <span>4단계 - 거의 적당해요</span>
                        </div>
                        <div className="text-xs sm:text-sm text-gray-700 pl-6 sm:pl-8">
                          6g → 4단계
                        </div>
                      </div>

                      {/* 5단계 그룹 (최적) */}
                      <div className="bg-green-100 rounded-lg p-2 sm:p-3 border-2 border-green-400">
                        <div className="font-bold text-sm sm:text-base text-green-700 mb-2 flex items-center gap-2">
                          <span>🍜</span>
                          <span>5단계 - 완벽해요! ⭐</span>
                        </div>
                        <div className="text-xs sm:text-sm text-gray-700 pl-6 sm:pl-8">
                          7g → 5단계 <span className="font-bold text-green-600">(최적)</span>
                        </div>
                      </div>

                      {/* 6단계 그룹 */}
                      <div className="bg-orange-50 rounded-lg p-2 sm:p-3">
                        <div className="font-bold text-sm sm:text-base text-orange-600 mb-2 flex items-center gap-2">
                          <span>😐</span>
                          <span>6단계 - 약간 짜기 시작해요</span>
                        </div>
                        <div className="text-xs sm:text-sm text-gray-700 pl-6 sm:pl-8">
                          8g, 9g → 6단계
                        </div>
                      </div>

                      {/* 7단계 그룹 */}
                      <div className="bg-orange-100 rounded-lg p-2 sm:p-3">
                        <div className="font-bold text-sm sm:text-base text-orange-700 mb-2 flex items-center gap-2">
                          <span>😬</span>
                          <span>7단계 - 조금 짜요</span>
                        </div>
                        <div className="text-xs sm:text-sm text-gray-700 pl-6 sm:pl-8">
                          10g, 11g → 7단계
                        </div>
                      </div>

                      {/* 8단계 그룹 */}
                      <div className="bg-red-50 rounded-lg p-2 sm:p-3">
                        <div className="font-bold text-sm sm:text-base text-red-600 mb-2 flex items-center gap-2">
                          <span>😣</span>
                          <span>8단계 - 짜요</span>
                        </div>
                        <div className="text-xs sm:text-sm text-gray-700 pl-6 sm:pl-8">
                          12g, 13g → 8단계
                        </div>
                      </div>

                      {/* 9단계 그룹 */}
                      <div className="bg-red-100 rounded-lg p-2 sm:p-3">
                        <div className="font-bold text-sm sm:text-base text-red-700 mb-2 flex items-center gap-2">
                          <span>😵</span>
                          <span>9단계 - 많이 짜요</span>
                        </div>
                        <div className="text-xs sm:text-sm text-gray-700 pl-6 sm:pl-8">
                          14g, 15g, 16g → 9단계
                        </div>
                      </div>

                      {/* 10단계 그룹 */}
                      <div className="bg-red-200 rounded-lg p-2 sm:p-3">
                        <div className="font-bold text-sm sm:text-base text-red-800 mb-2 flex items-center gap-2">
                          <span>💀</span>
                          <span>10단계 - 너무 짜서 먹기 힘들어요</span>
                        </div>
                        <div className="text-xs sm:text-sm text-gray-700 pl-6 sm:pl-8">
                          17g ~ 25g → 10단계
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-center text-xs sm:text-sm text-gray-500 mt-4">
                    💡 현재 선택: <span className="font-bold text-green-600">{saltAmount}g → {saltinessLevel}단계</span>
                    {saltAmount === 7 && ' ⭐ (최적)'}
                  </p>
                </>
              )}
            </div>

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
      )}
    </div>
  );
}