// pages/stimulations/index.js
import { useState } from 'react';
import Link from 'next/link';

export default function SimulationSelection() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const simulations = [
    {
      id: 1,
      icon: '🍜',
      title: '라면 조리 시간과 맛의 변화',
      description: '조리 시간에 따라 라면의 맛이 어떻게 변하는지 체험해보세요',
      link: '/stimulations/sim1',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      id: 2,
      icon: '🧂',
      title: '소금의 양과 짠맛 강도',
      description: '소고기 뭇국에 소금을 넣어 간을 맞춰보세요',
      link: '/stimulations/sim2',
      color: 'from-amber-400 to-orange-600'
    },
    {
      id: 3,
      icon: '🧬',
      title: '코돈과 아미노산',
      description: '3개의 염기를 조합하여 아미노산을 만들어보세요',
      link: '/stimulations/sim3',
      color: 'from-indigo-400 to-purple-600'
    },
    {
      id: 4,
      icon: '🦠',
      title: '세포막 물질 이동',
      description: '물질의 이동 방식에 따른 속도 변화를 관찰해보세요',
      link: '/stimulations/sim4',
      color: 'from-cyan-400 to-blue-600'
    },
    {
      id: 5,
      icon: '🐕',
      title: '강아지 성장과 사료량',
      description: '주령에 따른 강아지 사료량 변화를 확인해보세요',
      link: '/stimulations/sim5',
      color: 'from-blue-400 to-purple-600'
    },
    {
      id: 6,
      icon: '🐾',
      title: '강아지 견종별 운동량',
      description: '견종별 하루 권장 운동 시간을 알아보세요',
      link: '/stimulations/sim6',
      color: 'from-purple-400 to-pink-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-800 mb-4">
            일상 속 함수 탐험하기 🔬
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 mb-2">
            주제를 선택해서 함수의 세계를 경험해보세요
          </p>
          <p className="text-sm text-gray-500">
            💡 카드에 마우스를 올려 자세한 내용을 확인하세요
          </p>
        </div>

        {/* 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {simulations.map((sim) => (
            <div
              key={sim.id}
              className="relative h-80 cursor-pointer perspective-1000"
              onMouseEnter={() => setHoveredCard(sim.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Link href={sim.link} className="absolute w-full h-full">
                <div
                  className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${
                    hoveredCard === sim.id ? 'rotate-y-180' : ''
                  }`}
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: hoveredCard === sim.id ? 'rotateY(180deg)' : 'rotateY(0deg)'
                  }}
                >
                  {/* 앞면 - 아이콘 */}
                  <div
                    className="absolute w-full h-full bg-white rounded-3xl shadow-2xl flex items-center justify-center backface-hidden border-4 border-gray-100 hover:border-purple-300 transition-all"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <div className="text-center">
                      <div className="text-9xl mb-4 animate-bounce">{sim.icon}</div>
                      <div className="px-4">
                        <div className={`inline-block bg-gradient-to-r ${sim.color} text-transparent bg-clip-text`}>
                          <p className="text-xl font-bold">Sim {sim.id}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 뒷면 - 제목과 설명 */}
                  <div
                    className={`absolute w-full h-full bg-gradient-to-br ${sim.color} rounded-3xl shadow-2xl p-8 flex flex-col items-center justify-center text-white backface-hidden`}
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)'
                    }}
                  >
                    <div className="text-6xl mb-6">{sim.icon}</div>
                    <h3 className="text-2xl font-bold mb-4 text-center leading-tight">
                      {sim.title}
                    </h3>
                    <p className="text-center text-lg opacity-95 mb-6 leading-relaxed">
                      {sim.description}
                    </p>
                    <div className="mt-auto">
                      <button className="px-8 py-3 bg-white text-gray-800 rounded-full font-bold hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
                        시작하기 →
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* 하단 정보 */}
        <div className="text-center space-y-6">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              🌟 프로젝트 소개
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              일상생활의 다양한 현상을 함수로 표현하고, 직접 조작하며 입력(x)과 출력(y)의 관계를 탐구해보세요.
            </p>
            <p className="text-gray-600 leading-relaxed">
              단순히 수학 공식이 아닌, <span className="font-bold text-purple-600">세상의 규칙을 표현하는 도구</span>로서의 함수를 체험할 수 있어요!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-2 border-blue-200">
              <div className="text-4xl mb-3">📊</div>
              <h3 className="font-bold text-blue-900 mb-2">시각적 학습</h3>
              <p className="text-sm text-blue-700">그래프와 애니메이션으로 함수를 이해해요</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border-2 border-purple-200">
              <div className="text-4xl mb-3">🎮</div>
              <h3 className="font-bold text-purple-900 mb-2">인터랙티브</h3>
              <p className="text-sm text-purple-700">직접 값을 조절하며 실시간으로 변화를 관찰해요</p>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-6 border-2 border-pink-200">
              <div className="text-4xl mb-3">🧪</div>
              <h3 className="font-bold text-pink-900 mb-2">실생활 연결</h3>
              <p className="text-sm text-pink-700">현실의 현상을 수학으로 표현해요</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}
