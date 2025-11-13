import { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot } from 'recharts';

export default function Sim5() {
  const [breed, setBreed] = useState('pomeranian'); // pomeranian, toypoodle, retriever
  const [weekAge, setWeekAge] = useState(15);
  const [showGuide, setShowGuide] = useState(false);

  // 견종별 정보
  const breedInfo = {
    pomeranian: {
      name: '포메라니안',
      emoji: '🐕',
      color: 'orange',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-300',
      textColor: 'text-orange-700',
      size: '소형견 (성견 2~3kg)',
      characteristic: '작고 귀여운 털뭉치! 활발하고 사교적이에요.',
      image: '🦊'
    },
    toypoodle: {
      name: '토이푸들',
      emoji: '🐩',
      color: 'pink',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-300',
      textColor: 'text-pink-700',
      size: '소형견 (성견 3~4kg)',
      characteristic: '똑똑하고 사랑스러운 곱슬이! 저자극성 털이 특징이에요.',
      image: '🎀'
    },
    retriever: {
      name: '리트리버',
      emoji: '🦮',
      color: 'amber',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-300',
      textColor: 'text-amber-700',
      size: '대형견 (성견 25~35kg)',
      characteristic: '온순하고 충성스러운 대형견! 가족과 함께하길 좋아해요.',
      image: '🌟'
    }
  };

  const currentBreed = breedInfo[breed];

  // 사료량 계산 함수 (권장량 기준 2차 함수)
  const calculateFood = (x, breedType) => {
    if (breedType === 'pomeranian') {
      if (x >= 6 && x < 10) return 0.02 * Math.pow(x - 6, 2) + 1;
      if (x >= 10 && x < 18) return 0.02 * Math.pow(x - 10, 2) + 2;
      if (x >= 18 && x < 26) return 0.02 * Math.pow(x - 18, 2) + 3;
      if (x >= 26) return 0.02 * Math.pow(x - 26, 2) + 4;
    } else if (breedType === 'toypoodle') {
      if (x >= 6 && x < 10) return 0.015 * Math.pow(x - 6, 2) + 0.9;
      if (x >= 10 && x < 18) return 0.015 * Math.pow(x - 10, 2) + 1;
      if (x >= 18 && x < 26) return 0.015 * Math.pow(x - 18, 2) + 2;
      if (x >= 26) return 0.015 * Math.pow(x - 26, 2) + 3.5;
    } else if (breedType === 'retriever') {
      if (x >= 6 && x < 10) return 0.05 * Math.pow(x - 6, 2) + 7;
      if (x >= 10 && x < 18) return 0.05 * Math.pow(x - 10, 2) + 11;
      if (x >= 18 && x < 26) return 0.05 * Math.pow(x - 18, 2) + 15;
      if (x >= 26) return 0.05 * Math.pow(x - 26, 2) + 30;
    }
    return 0;
  };

  const foodAmount = useMemo(() => calculateFood(weekAge, breed), [weekAge, breed]);

  // 그래프 데이터 생성 (1의 자리로 반올림, 0.5주 단위)
  const graphData = useMemo(() => {
    const data = [];
    for (let x = 6; x <= 52; x += 0.5) {
      data.push({
        x: Math.round(x),
        y: Math.round(calculateFood(x, breed))
      });
    }
    return data;
  }, [breed]);

  // 성장 단계
  const getGrowthStage = (weeks) => {
    if (weeks < 10) {
      return { stage: '급성장기', desc: '빠르게 자라는 시기예요. 영양 공급이 매우 중요해요!', color: 'text-red-600', bg: 'bg-red-50', emoji: '🌱' };
    } else if (weeks < 18) {
      return { stage: '성장기', desc: '꾸준히 자라는 시기예요. 균형잡힌 식사가 필요해요.', color: 'text-yellow-600', bg: 'bg-yellow-50', emoji: '🌿' };
    } else if (weeks < 26) {
      return { stage: '후기 성장기', desc: '성견에 가까워지고 있어요. 체중 관리를 시작해야 해요.', color: 'text-green-600', bg: 'bg-green-50', emoji: '🌳' };
    } else {
      return { stage: '성견', desc: '다 자란 성견이에요. 건강 유지에 집중하세요!', color: 'text-blue-600', bg: 'bg-blue-50', emoji: '🎯' };
    }
  };

  const growthStage = getGrowthStage(weekAge);

  // 월령 변환
  const getMonthAge = (weeks) => {
    const months = Math.floor(weeks / 4);
    const remainWeeks = weeks % 4;
    return remainWeeks === 0 ? `${months}개월` : `${months}개월 ${remainWeeks}주`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* 헤더, 견종 선택, 나머지 UI 그대로 */}
        {/* 그래프 */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">
            📈 주령별 사료량 변화 그래프
          </h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={graphData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="x" 
                label={{ value: '주령 (주)', position: 'insideBottom', offset: -5 }}
                domain={[6, 52]}
                ticks={[6, 10, 18, 26, 34, 42, 52]}
                tickFormatter={(tick) => Math.round(tick)}
              />
              <YAxis 
                label={{ value: '사료량 (kg)', angle: -90, position: 'insideLeft' }}
                domain={[0, breed === 'retriever' ? 35 : 8]}
                tickFormatter={(tick) => Math.round(tick)}
              />
              <Tooltip 
                formatter={(value) => `${Math.round(value)}kg`}
                labelFormatter={(label) => `${label}주 (${getMonthAge(label)})`}
              />
              <Line 
                type="monotone" 
                dataKey="y" 
                stroke={
                  breed === 'pomeranian' ? '#f97316' :
                  breed === 'toypoodle' ? '#ec4899' :
                  '#f59e0b'
                }
                strokeWidth={3}
                dot={false}
              />
              <ReferenceDot 
                x={weekAge} 
                y={foodAmount} 
                r={8} 
                fill="#dc2626" 
                stroke="#fff"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
