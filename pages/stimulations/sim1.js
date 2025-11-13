import { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot, Area, AreaChart } from 'recharts';

export default function Sim1() {
  const [cookingTime, setCookingTime] = useState(0);

  // 분할 함수 계산
  const getRamenState = (x) => {
    if (x < 2) return 1.25 * x * x;
    if (x < 4) return 1.25 * Math.pow(x - 2, 2) + 5;
    if (x < 6) return 10;
    if (x < 8) return 34 - 4 * x;
    return 18 - 2 * x;
  };

  const ramenScore = useMemo(() => getRamenState(cookingTime), [cookingTime]);

  // 그래프 데이터 생성
  const graphData = useMemo(() => {
    const data = [];
    for (let x = 0; x <= 10; x += 0.05) {
      data.push({
        x: x,
        y: getRamenState(x),
        isOptimal: x >= 4 && x < 6
      });
    }
    return data;
  }, []);

  // 라면 상태 판단
  const getRamenStatus = (score, time) => {
    if (time < 2) {
      return { 
        emoji: '🥶', 
        noodle: '딱딱해요', 
        soup: '거의 섞이지 않아요',
        state: '라면이 거의 익지 않은 초기 단계예요. 맛이 서서히 올라가기 시작해요.',
        text: '아직 익지 않았어요', 
        color: 'text-blue-600', 
        bg: 'bg-blue-50' 
      };
    }
    if (time < 4) {
      return { 
        emoji: '♨️', 
        noodle: '점점 익고 있어요', 
        soup: '잘 섞이면서 맛이 본격적으로 증가해요',
        state: '면이 부드러워지고 국물이 배어 점점 맛있어지는 단계예요.',
        text: '점점 맛있어지고 있어요', 
        color: 'text-yellow-600', 
        bg: 'bg-yellow-50' 
      };
    }
    if (time < 6) {
      return { 
        emoji: '🍜', 
        noodle: '적당히 익었어요', 
        soup: '최적의 조화예요',
        state: '라면 먹기 최적 상태예요. 맛이 최고점이에요!',
        text: '완벽한 라면이에요!', 
        color: 'text-green-600', 
        bg: 'bg-green-50' 
      };
    }
    if (time < 8) {
      return { 
        emoji: '😐', 
        noodle: '퍼지기 시작해요', 
        soup: '약간 흐려져요',
        state: '면이 퍼지면서 맛이 점차 감소하고 있어요.',
        text: '조금 퍼지고 있어요', 
        color: 'text-orange-600', 
        bg: 'bg-orange-50' 
      };
    }
    return { 
      emoji: '😭', 
      noodle: '너무 퍼졌어요', 
      soup: '맛이 약해졌어요',
      state: '라면이 과도하게 익어 먹기 힘든 상태예요. 맛이 급감했어요.',
      text: '면이 너무 퍼졌어요', 
      color: 'text-red-600', 
      bg: 'bg-red-50' 
    };
  };

  const ramenStatus = getRamenStatus(ramenScore, cookingTime);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🍜 라면 조리 시간과 맛의 변화
          </h1>
          <p className="text-gray-600">
            조리 시간을 조절하며 라면의 상태 변화를 관찰해보세요
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 왼쪽: 컨트롤 & 결과 */}
          <div className="space-y-6">
            {/* 슬라이더 컨트롤 */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">조리 시간 조절</h2>
              
              <div className="mb-8">
                <label className="block text-gray-700 mb-4 text-lg font-semibold">
                  조리 시간: <span className="text-orange-600">{cookingTime.toFixed(1)}분</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.1"
                  value={cookingTime}
                  onChange={(e) => setCookingTime(parseFloat(e.target.value))}
                  className="w-full h-3 bg-orange-200 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #fb923c 0%, #fb923c ${(cookingTime / 10) * 100}%, #fed7aa ${(cookingTime / 10) * 100}%, #fed7aa 100%)`
                  }}
                />
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>0분</span>
                  <span className="text-green-600 font-bold">3~4분 (최적)</span>
                  <span>10분</span>
                </div>
              </div>

              {/* 현재 점수 표시 */}
              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl p-6 text-center">
                <p className="text-gray-600 mb-2">라면 맛 점수</p>
                <p className="text-5xl font-bold text-orange-600">
                  {ramenScore.toFixed(1)} / 10
                </p>
              </div>
            </div>

            {/* 라면 상태 */}
            <div className={`${ramenStatus.bg} rounded-2xl shadow-lg p-8 text-center transition-all duration-500`}>
              <div className="text-8xl mb-4">{ramenStatus.emoji}</div>
              <h3 className={`text-3xl font-bold ${ramenStatus.color} mb-4`}>
                {ramenStatus.text}
              </h3>
              
              <div className="space-y-3 text-left bg-white bg-opacity-50 rounded-xl p-4">
                <div>
                  <span className="font-bold text-gray-700">면발:</span>
                  <span className="ml-2 text-gray-600">{ramenStatus.noodle}</span>
                </div>
                <div>
                  <span className="font-bold text-gray-700">국물/스프:</span>
                  <span className="ml-2 text-gray-600">{ramenStatus.soup}</span>
                </div>
                <div>
                  <span className="font-bold text-gray-700">상태:</span>
                  <span className="ml-2 text-gray-600">{ramenStatus.state}</span>
                </div>
              </div>

              {cookingTime >= 4 && cookingTime < 6 && (
                <div className="mt-4 text-green-700 font-bold animate-pulse">
                  ⭐ 지금이 먹기 딱 좋은 타이밍입니다! ⭐
                </div>
              )}
            </div>
          </div>

          {/* 오른쪽: 그래프 */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">라면 상태 변화 그래프</h2>
            
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={graphData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#fb923c" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#fb923c" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="x" 
                  label={{ value: '조리 시간 (분)', position: 'insideBottom', offset: -5 }}
                  domain={[0, 10]}
                  ticks={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                />
                <YAxis 
                  label={{ value: '맛 점수', angle: -90, position: 'insideLeft' }}
                  domain={[0, 11]}
                  ticks={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                />
                <Tooltip 
                  formatter={(value) => `${value.toFixed(1)}점`}
                  labelFormatter={(label) => `${label.toFixed(1)}분`}
                />
                {/* 최적 구간 표시 */}
                <Area
                  type="monotone"
                  dataKey={(data) => data.isOptimal ? data.y : null}
                  fill="#22c55e"
                  fillOpacity={0.3}
                  stroke="none"
                />
                <Area 
                  type="monotone" 
                  dataKey="y" 
                  stroke="#fb923c" 
                  strokeWidth={3}
                  fill="url(#colorScore)"
                />
                <ReferenceDot 
                  x={cookingTime} 
                  y={ramenScore} 
                  r={8} 
                  fill="#dc2626" 
                  stroke="#fff"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>

            {/* 함수 정보 */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg space-y-2 text-sm">
              <h3 className="font-bold text-gray-800 mb-2">📐 분할 함수식</h3>
              <div className="font-mono text-xs text-gray-700 space-y-1">
                <p>• 0≤x&lt;2: y = 1.25x² (서서히 익음)</p>
                <p>• 2≤x&lt;4: y = 1.25(x-2)² + 5 (빠르게 맛있어짐)</p>
                <p className="text-green-600 font-bold">• 4≤x&lt;6: y = 10 (최적 상태! ⭐)</p>
                <p>• 6≤x&lt;8: y = 34 - 4x (퍼지기 시작)</p>
                <p>• 8≤x≤10: y = 18 - 2x (많이 퍼짐)</p>
              </div>
            </div>
          </div>
        </div>

        {/* 하단 네비게이션 */}
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