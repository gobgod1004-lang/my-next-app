import { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot } from 'recharts';

export default function Sim4() {
  const [mode, setMode] = useState('oxygen'); // oxygen, sodium, glucose
  const [outsideConc, setOutsideConc] = useState(10); // 세포 밖 농도 (mM)
  const [insideConc] = useState(5); // 세포 안 농도 (mM) - 고정
  const [particles, setParticles] = useState([]);
  const [showGuide, setShowGuide] = useState(false);

  // 이동 속도 계산
  const velocity = useMemo(() => {
    const x = outsideConc;
    if (mode === 'oxygen') {
      return 0.2 * (x - insideConc);
    } else if (mode === 'sodium') {
      return 0.8 * (x - insideConc);
    } else { // glucose
      return (10 * x) / (3 + x);
    }
  }, [mode, outsideConc, insideConc]);

  // 그래프 데이터 생성
  const graphData = useMemo(() => {
    const data = [];
    for (let x = 0; x <= 20; x += 0.5) {
      let y;
      if (mode === 'oxygen') {
        y = 0.2 * (x - insideConc);
      } else if (mode === 'sodium') {
        y = 0.8 * (x - insideConc);
      } else {
        y = (10 * x) / (3 + x);
      }
      data.push({ x, y: Math.max(0, y) });
    }
    return data;
  }, [mode, insideConc]);

  // 모드별 정보
  const modeInfo = {
    oxygen: {
      name: '산소 (O₂)',
      color: 'orange',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-300',
      textColor: 'text-orange-700',
      icon: '🟠',
      type: '단순확산',
      equation: 'y = 0.2(x - 5)',
      desc: '인지질 이중층을 직접 통과해요. 농도 차이에 비례하여 이동해요.',
      protein: false,
      molecule: '⚪'
    },
    sodium: {
      name: '나트륨 (Na⁺)',
      color: 'blue',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-300',
      textColor: 'text-blue-700',
      icon: '🟦',
      type: '채널 촉진확산',
      equation: 'y = 0.8(x - 5)',
      desc: '통로 단백질(채널)을 통해 빠르게 이동해요. 농도 차이에 비례해요.',
      protein: 'channel',
      molecule: '🔵'
    },
    glucose: {
      name: '포도당 (C₆H₁₂O₆)',
      color: 'green',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-300',
      textColor: 'text-green-700',
      icon: '🟢',
      type: '운반체 촉진확산',
      equation: 'y = 10x/(3 + x)',
      desc: '운반체 단백질(GLUT1)이 형태를 바꿔가며 이동시켜요. 포화 현상이 나타나요.',
      protein: 'carrier',
      molecule: '🟩'
    }
  };

  const currentMode = modeInfo[mode];

  // 농도 증가
  const increaseConc = () => {
    if (outsideConc < 20) {
      setOutsideConc(prev => Math.min(20, prev + 1));
      addParticle();
    }
  };

  // 입자 추가 (애니메이션용)
  const addParticle = () => {
    const newParticle = {
      id: Date.now(),
      x: Math.random() * 80 + 10
    };
    setParticles(prev => [...prev, newParticle]);
    
    setTimeout(() => {
      setParticles(prev => prev.filter(p => p.id !== newParticle.id));
    }, 2000);
  };

  // 리셋
  const handleReset = () => {
    setOutsideConc(10);
    setParticles([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
            🧬 세포막 물질 이동 시뮬레이터
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            물질의 이동 방식에 따라 속도가 어떻게 달라지는지 확인해보세요
          </p>
        </div>

        {/* 모드 선택 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
            이동 방식 선택
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {Object.entries(modeInfo).map(([key, info]) => (
              <button
                key={key}
                onClick={() => setMode(key)}
                className={`p-4 rounded-xl border-4 transition-all ${
                  mode === key
                    ? `${info.bgColor} ${info.borderColor} scale-105`
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <div className="text-4xl mb-2">{info.icon}</div>
                <p className="font-bold text-lg">{info.name}</p>
                <p className="text-sm text-gray-600">{info.type}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 왼쪽: 세포막 시각화 */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
                세포막 시각화
              </h2>

              {/* 세포막 - 가로 방향 시각화 */}
              <div className="relative h-80 bg-gradient-to-b from-cyan-50 via-blue-50 to-cyan-50 rounded-xl overflow-hidden border-4 border-gray-300">
                {/* 세포 밖 영역 (위쪽 40%) */}
                <div 
                  onClick={increaseConc}
                  className="absolute left-0 top-0 w-full h-2/5 bg-gradient-to-b from-blue-100 to-blue-50 cursor-pointer hover:bg-blue-200 transition-all flex items-center justify-center"
                >
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-90 rounded-lg px-4 py-2 shadow">
                    <p className="text-sm font-bold text-blue-800">세포 밖 (x = {outsideConc} mM)</p>
                    <p className="text-xs text-gray-600">클릭하여 농도 증가 +</p>
                  </div>
                </div>

                {/* 인지질 이중층 (중앙 20%) */}
                <div className="absolute left-0 top-2/5 w-full h-1/5 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 border-y-4 border-orange-500 flex items-center justify-center">
                  {/* 인지질 헤드 표시 (위쪽) */}
                  <div className="absolute top-0 w-full h-1 bg-orange-600"></div>
                  <div className="absolute top-1 left-0 w-full flex justify-around">
                    {[...Array(20)].map((_, i) => (
                      <div key={`top-${i}`} className="w-2 h-2 bg-orange-700 rounded-full"></div>
                    ))}
                  </div>
                  
                  {/* 인지질 헤드 표시 (아래쪽) */}
                  <div className="absolute bottom-0 w-full h-1 bg-orange-600"></div>
                  <div className="absolute bottom-1 left-0 w-full flex justify-around">
                    {[...Array(20)].map((_, i) => (
                      <div key={`bottom-${i}`} className="w-2 h-2 bg-orange-700 rounded-full"></div>
                    ))}
                  </div>

                  {/* 막 라벨 */}
                  <div className="absolute left-2 bg-white bg-opacity-90 rounded px-2 py-1">
                    <p className="text-xs font-bold text-orange-800">인지질 이중층</p>
                  </div>

                  {/* 단백질 표시 */}
                  {currentMode.protein === 'channel' && (
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-full bg-blue-500 opacity-80 flex items-center justify-center">
                      <span className="text-white text-xs font-bold writing-mode-vertical">채널</span>
                    </div>
                  )}
                  {currentMode.protein === 'carrier' && (
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-16 h-full bg-green-500 opacity-80 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-bold">운반체</span>
                    </div>
                  )}
                </div>

                {/* 세포 안 영역 (아래쪽 40%) */}
                <div className="absolute left-0 bottom-0 w-full h-2/5 bg-gradient-to-b from-pink-50 to-pink-100 flex items-center justify-center">
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-90 rounded-lg px-4 py-2 shadow">
                    <p className="text-sm font-bold text-pink-800">세포 안 ({insideConc} mM)</p>
                  </div>
                </div>

                {/* 그래프 오버레이 */}
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 pointer-events-none">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    {/* 배경 */}
                    <rect x="10" y="10" width="80" height="80" fill="white" opacity="0.9" rx="5"/>
                    
                    {/* 축 */}
                    <line x1="15" y1="85" x2="85" y2="85" stroke="#666" strokeWidth="1"/>
                    <line x1="15" y1="85" x2="15" y2="15" stroke="#666" strokeWidth="1"/>
                    
                    {/* 그래프 곡선 */}
                    <path
                      d={(() => {
                        let path = 'M 15 85';
                        for (let i = 0; i <= 20; i += 0.5) {
                          let y;
                          if (mode === 'oxygen') {
                            y = 0.2 * (i - insideConc);
                          } else if (mode === 'sodium') {
                            y = 0.8 * (i - insideConc);
                          } else {
                            y = (10 * i) / (3 + i);
                          }
                          const x = 15 + (i / 20) * 70;
                          const yPos = 85 - (Math.max(0, y) / 12) * 70;
                          path += ` L ${x} ${yPos}`;
                        }
                        return path;
                      })()}
                      fill="none"
                      stroke={currentMode.color === 'orange' ? '#f97316' : currentMode.color === 'blue' ? '#3b82f6' : '#22c55e'}
                      strokeWidth="2"
                    />
                    
                    {/* 현재 위치 표시 */}
                    <circle
                      cx={15 + (outsideConc / 20) * 70}
                      cy={85 - (Math.max(0, velocity) / 12) * 70}
                      r="3"
                      fill="#dc2626"
                      stroke="white"
                      strokeWidth="1"
                    />
                    
                    {/* 라벨 */}
                    <text x="50" y="95" fontSize="4" textAnchor="middle" fill="#666">x (농도)</text>
                    <text x="8" y="50" fontSize="4" textAnchor="middle" fill="#666" transform="rotate(-90, 8, 50)">y (속도)</text>
                  </svg>
                </div>

                {/* 이동하는 분자들 */}
                {particles.map(particle => (
                  <div
                    key={particle.id}
                    className="absolute text-2xl animate-slide-down"
                    style={{
                      left: `${particle.x}%`,
                      top: '10%',
                      animationDuration: `${2 / Math.max(0.1, velocity)}s`
                    }}
                  >
                    {currentMode.molecule}
                  </div>
                ))}

                <style jsx>{`
                  @keyframes slide-down {
                    from {
                      transform: translateY(0);
                      opacity: 1;
                    }
                    to {
                      transform: translateY(200px);
                      opacity: 0;
                    }
                  }
                  .animate-slide-down {
                    animation: slide-down forwards;
                  }
                `}</style>
              </div>

              <div className="mt-4 bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4">
                <p className="font-bold text-yellow-900 mb-2">📍 현재 그래프 위치</p>
                <p className="text-sm text-gray-700">
                  <span className="font-bold text-red-600">빨간 점</span>: x = {outsideConc} mM, y = {velocity.toFixed(2)} μmol/min
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  💡 세포 밖(위)을 클릭하면 x가 증가해요
                </p>
              </div>
            </div>

            {/* 현재 상태 */}
            <div className={`${currentMode.bgColor} rounded-2xl shadow-lg p-6`}>
              <h3 className={`text-xl font-bold ${currentMode.textColor} mb-4 text-center`}>
                {currentMode.icon} {currentMode.name}
              </h3>

              <div className="space-y-4">
                <div className="bg-white bg-opacity-70 rounded-lg p-4">
                  <p className="font-bold text-gray-700 mb-2">이동 방식</p>
                  <p className="text-gray-600">{currentMode.type}</p>
                </div>

                <div className="bg-white bg-opacity-70 rounded-lg p-4">
                  <p className="font-bold text-gray-700 mb-2">함수식</p>
                  <p className="font-mono text-sm">{currentMode.equation}</p>
                </div>

                <div className="bg-white bg-opacity-70 rounded-lg p-4">
                  <p className="font-bold text-gray-700 mb-2">현재 이동 속도</p>
                  <p className="text-3xl font-bold text-purple-600">
                    {velocity.toFixed(2)} <span className="text-base">μmol/min</span>
                  </p>
                </div>

                <div className="bg-white bg-opacity-70 rounded-lg p-4">
                  <p className="text-sm text-gray-700">{currentMode.desc}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleReset}
                className="flex-1 py-3 bg-gray-500 text-white rounded-xl font-bold hover:bg-gray-600 transition-all"
              >
                초기화
              </button>
              <button
                onClick={() => setShowGuide(!showGuide)}
                className="flex-1 py-3 bg-indigo-500 text-white rounded-xl font-bold hover:bg-indigo-600 transition-all"
              >
                📖 {showGuide ? '설명 숨기기' : '설명 보기'}
              </button>
            </div>
          </div>

          {/* 오른쪽: 그래프 */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                농도-속도 그래프
              </h2>

              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={graphData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="x"
                    label={{ value: '세포 밖 농도 (mM)', position: 'insideBottom', offset: -5 }}
                    domain={[0, 20]}
                  />
                  <YAxis
                    label={{ value: '이동 속도 (μmol/min)', angle: -90, position: 'insideLeft' }}
                    domain={[0, 12]}
                  />
                  <Tooltip
                    formatter={(value) => `${value.toFixed(2)} μmol/min`}
                    labelFormatter={(label) => `농도: ${label} mM`}
                  />
                  <Line
                    type="monotone"
                    dataKey="y"
                    stroke={
                      mode === 'oxygen' ? '#f97316' :
                      mode === 'sodium' ? '#3b82f6' :
                      '#22c55e'
                    }
                    strokeWidth={3}
                    dot={false}
                  />
                  <ReferenceDot
                    x={outsideConc}
                    y={Math.max(0, velocity)}
                    r={8}
                    fill="#dc2626"
                    stroke="#fff"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>

              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-bold">현재 위치:</span> ({outsideConc.toFixed(1)} mM, {velocity.toFixed(2)} μmol/min)
                </p>
                <p className="text-xs text-gray-500">
                  {mode === 'glucose' && '포도당은 Vmax=10에 점점 가까워져요 (포화 현상)'}
                  {mode === 'sodium' && '나트륨은 농도 차이에 비례하여 빠르게 증가해요'}
                  {mode === 'oxygen' && '산소는 농도 차이에 비례하여 완만하게 증가해요'}
                </p>
              </div>
            </div>

            {/* x-y 변수 의미 설명 */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-lg p-6 border-2 border-indigo-200">
              <h3 className="text-xl font-bold text-indigo-900 mb-4 text-center">
                🎯 함수의 x와 y가 의미하는 것
              </h3>

              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border-2 border-blue-300">
                  <p className="font-bold text-blue-800 mb-2 flex items-center gap-2">
                    📥 x (입력값) = 세포 밖 농도
                  </p>
                  <p className="text-sm text-gray-700 mb-1">
                    단위: mM (밀리몰)
                  </p>
                  <p className="text-sm text-gray-600">
                    세포 밖에 있는 물질의 농도예요. 이 값이 클수록 세포 안으로 들어오려는 힘이 커져요!
                  </p>
                  <div className="mt-2 bg-blue-50 rounded px-3 py-2">
                    <p className="text-xs font-bold text-blue-900">현재 x = {outsideConc} mM</p>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border-2 border-green-300">
                  <p className="font-bold text-green-800 mb-2 flex items-center gap-2">
                    📤 y (출력값) = 이동 속도
                  </p>
                  <p className="text-sm text-gray-700 mb-1">
                    단위: μmol/min (마이크로몰/분)
                  </p>
                  <p className="text-sm text-gray-600">
                    단위 시간당 세포막을 통과하는 물질의 양이에요. 이 값이 클수록 빠르게 이동해요!
                  </p>
                  <div className="mt-2 bg-green-50 rounded px-3 py-2">
                    <p className="text-xs font-bold text-green-900">현재 y = {velocity.toFixed(2)} μmol/min</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg p-4 border-2 border-orange-300">
                  <p className="font-bold text-orange-900 mb-2">🔗 함수 관계식</p>
                  <div className="bg-white rounded px-3 py-2 mb-2">
                    <p className="font-mono text-sm">{currentMode.equation}</p>
                  </div>
                  <p className="text-sm text-gray-700">
                    x 값을 넣으면 y 값이 나와요. 즉, <span className="font-bold">세포 밖 농도를 알면 이동 속도를 계산</span>할 수 있어요!
                  </p>
                </div>
              </div>
            </div>

            {/* 정의역/치역 */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                📊 정의역과 치역
              </h3>

              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="font-bold text-blue-800 mb-2">정의역 (Domain)</p>
                  <p className="text-sm text-gray-700">
                    x가 가질 수 있는 값: <span className="font-bold">0 ≤ x ≤ 20 mM</span>
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    세포 밖 농도는 0에서 20 mM 사이예요
                  </p>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <p className="font-bold text-green-800 mb-2">치역 (Range)</p>
                  <p className="text-sm text-gray-700">
                    y가 실제로 나오는 값: <span className="font-bold">
                      {mode === 'glucose' ? '0 ≤ y ≤ 10 μmol/min' : `${(-0.2 * insideConc * (mode === 'oxygen' ? 1 : 4)).toFixed(1)} ≤ y ≤ ${(mode === 'oxygen' ? 3 : 12).toFixed(1)} μmol/min`}
                    </span>
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    {mode === 'glucose' && '포도당은 최대 10까지만 증가 (포화)'}
                    {mode === 'sodium' && '나트륨은 농도 차이에 따라 빠르게 증가'}
                    {mode === 'oxygen' && '산소는 농도 차이에 따라 완만하게 증가'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 설명 패널 */}
        {showGuide && (
          <div className="mt-8 bg-white rounded-2xl shadow-2xl p-6 sm:p-8 max-h-96 overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              📚 세포막 물질 이동 설명
            </h2>

            <div className="space-y-6">
              <div className="bg-orange-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-orange-800 mb-3 flex items-center gap-2">
                  🟠 단순확산 (Simple Diffusion)
                </h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  막단백질 없이 인지질 이중층을 직접 통과해요. 작고 비극성인 분자(O₂, CO₂, 지질)가 주로 이용하는 방식이에요.
                </p>
                <div className="bg-white rounded-lg p-3">
                  <p className="font-mono text-sm mb-1">y = 0.2(x - 5)</p>
                  <p className="text-xs text-gray-600">농도 차이에 비례하는 1차 함수 (직선)</p>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-blue-800 mb-3 flex items-center gap-2">
                  🟦 채널 촉진확산 (Channel-mediated Facilitated Diffusion)
                </h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  통로 단백질(채널)을 통해 이온(Na⁺, K⁺, Ca²⁺)이 빠르게 이동해요. 통로가 열리면 농도 기울기를 따라 빠르게 확산돼요.
                </p>
                <div className="bg-white rounded-lg p-3">
                  <p className="font-mono text-sm mb-1">y = 0.8(x - 5)</p>
                  <p className="text-xs text-gray-600">단순확산보다 4배 빠른 직선 (기울기 0.8)</p>
                </div>
              </div>

              <div className="bg-green-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-green-800 mb-3 flex items-center gap-2">
                  🟢 운반체 촉진확산 (Carrier-mediated Facilitated Diffusion)
                </h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  운반체 단백질(GLUT1 등)이 형태를 바꿔가며 포도당 같은 큰 분자를 이동시켜요. 운반체 수가 한정되어 있어 포화 현상이 나타나요.
                </p>
                <div className="bg-white rounded-lg p-3">
                  <p className="font-mono text-sm mb-1">y = 10x / (3 + x)</p>
                  <p className="text-xs text-gray-600">
                    유리함수 형태 (Vmax=10, Km=3)
                  </p>
                  <ul className="text-xs text-gray-600 mt-2 space-y-1">
                    <li>• Vmax: 최대 속도 (10 μmol/min)</li>
                    <li>• Km: 반포화 상수 (3 mM)</li>
                    <li>• 초반엔 빠르게 증가하다가 점점 완만해져요</li>
                  </ul>
                </div>
              </div>

              <div className="bg-purple-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-purple-800 mb-3">
                  🧪 핵심 개념
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="font-bold">•</span>
                    <span><span className="font-bold">농도 기울기:</span> 세포 밖과 안의 농도 차이가 클수록 이동 속도가 빨라져요</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">•</span>
                    <span><span className="font-bold">포화 현상:</span> 운반체 단백질은 개수가 한정되어 있어 일정 농도 이상에서는 속도가 더 이상 증가하지 않아요</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">•</span>
                    <span><span className="font-bold">촉진확산:</span> 막단백질의 도움을 받지만 ATP 에너지는 사용하지 않아요 (수동수송)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

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