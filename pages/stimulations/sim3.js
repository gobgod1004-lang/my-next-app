import { useState } from 'react';

export default function Sim3() {
  const [slots, setSlots] = useState(['', '', '']);
  const [draggedBase, setDraggedBase] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  const codonTable = {
    'UUU': { name: '페닐알라닌', abbr: 'Phe', desc: '신경전달물질 전구체로 뇌 기능과 기분 조절에 도움을 줘요.' },
    'UUC': { name: '페닐알라닌', abbr: 'Phe', desc: '신경전달물질 전구체로 뇌 기능과 기분 조절에 도움을 줘요.' },
    'UUA': { name: '류신', abbr: 'Leu', desc: '분지사슬 아미노산(BCAA)으로 근육 성장과 회복에 중요한 역할을 해요.' },
    'UUG': { name: '류신', abbr: 'Leu', desc: '분지사슬 아미노산(BCAA)으로 근육 성장과 회복에 중요한 역할을 해요.' },
    'UCU': { name: '세린', abbr: 'Ser', desc: '인지질과 글리세린산 생성에 관여하며 세포막과 신경계 기능을 지원해요.' },
    'UCC': { name: '세린', abbr: 'Ser', desc: '인지질과 글리세린산 생성에 관여하며 세포막과 신경계 기능을 지원해요.' },
    'UCA': { name: '세린', abbr: 'Ser', desc: '인지질과 글리세린산 생성에 관여하며 세포막과 신경계 기능을 지원해요.' },
    'UCG': { name: '세린', abbr: 'Ser', desc: '인지질과 글리세린산 생성에 관여하며 세포막과 신경계 기능을 지원해요.' },
    'UAU': { name: '티로신', abbr: 'Tyr', desc: '도파민, 노르에피네프린 등 신경전달물질과 멜라닌의 전구체예요.' },
    'UAC': { name: '티로신', abbr: 'Tyr', desc: '도파민, 노르에피네프린 등 신경전달물질과 멜라닌의 전구체예요.' },
    'UAA': { name: '종결 코돈', abbr: 'STOP', desc: '단백질 합성을 멈추라는 신호예요. 더 이상 아미노산이 연결되지 않아요.' },
    'UAG': { name: '종결 코돈', abbr: 'STOP', desc: '단백질 합성을 멈추라는 신호예요. 더 이상 아미노산이 연결되지 않아요.' },
    'UGU': { name: '시스테인', abbr: 'Cys', desc: '항산화제 글루타치온을 구성하며 멜라닌 생성 조절과 피부 보호 역할을 해요.' },
    'UGC': { name: '시스테인', abbr: 'Cys', desc: '항산화제 글루타치온을 구성하며 멜라닌 생성 조절과 피부 보호 역할을 해요.' },
    'UGA': { name: '종결 코돈', abbr: 'STOP', desc: '단백질 합성을 멈추라는 신호예요. 더 이상 아미노산이 연결되지 않아요.' },
    'UGG': { name: '트립토판', abbr: 'Trp', desc: '세로토닌과 멜라토닌 생성에 관여하여 수면과 기분 안정에 도움을 줘요.' },
    'CUU': { name: '류신', abbr: 'Leu', desc: '분지사슬 아미노산(BCAA)으로 근육 성장과 회복에 중요한 역할을 해요.' },
    'CUC': { name: '류신', abbr: 'Leu', desc: '분지사슬 아미노산(BCAA)으로 근육 성장과 회복에 중요한 역할을 해요.' },
    'CUA': { name: '류신', abbr: 'Leu', desc: '분지사슬 아미노산(BCAA)으로 근육 성장과 회복에 중요한 역할을 해요.' },
    'CUG': { name: '류신', abbr: 'Leu', desc: '분지사슬 아미노산(BCAA)으로 근육 성장과 회복에 중요한 역할을 해요.' },
    'CCU': { name: '프롤린', abbr: 'Pro', desc: '콜라겐의 구성 성분으로 피부 보습과 조직 재생에 핵심 역할을 해요.' },
    'CCC': { name: '프롤린', abbr: 'Pro', desc: '콜라겐의 구성 성분으로 피부 보습과 조직 재생에 핵심 역할을 해요.' },
    'CCA': { name: '프롤린', abbr: 'Pro', desc: '콜라겐의 구성 성분으로 피부 보습과 조직 재생에 핵심 역할을 해요.' },
    'CCG': { name: '프롤린', abbr: 'Pro', desc: '콜라겐의 구성 성분으로 피부 보습과 조직 재생에 핵심 역할을 해요.' },
    'CAU': { name: '히스티딘', abbr: 'His', desc: '히스타민 생성에 필요하며 성장기에 중요하고 상처 치유를 촉진해요.' },
    'CAC': { name: '히스티딘', abbr: 'His', desc: '히스타민 생성에 필요하며 성장기에 중요하고 상처 치유를 촉진해요.' },
    'CAA': { name: '글루타민', abbr: 'Gln', desc: '장 점막을 보호하고 면역력을 증진하며 단백질 합성을 촉진해요.' },
    'CAG': { name: '글루타민', abbr: 'Gln', desc: '장 점막을 보호하고 면역력을 증진하며 단백질 합성을 촉진해요.' },
    'CGU': { name: '아르기닌', abbr: 'Arg', desc: '산화질소 생성으로 혈관을 확장시키고 면역력과 상처 치유를 지원해요.' },
    'CGC': { name: '아르기닌', abbr: 'Arg', desc: '산화질소 생성으로 혈관을 확장시키고 면역력과 상처 치유를 지원해요.' },
    'CGA': { name: '아르기닌', abbr: 'Arg', desc: '산화질소 생성으로 혈관을 확장시키고 면역력과 상처 치유를 지원해요.' },
    'CGG': { name: '아르기닌', abbr: 'Arg', desc: '산화질소 생성으로 혈관을 확장시키고 면역력과 상처 치유를 지원해요.' },
    'AUU': { name: '이소류신', abbr: 'Ile', desc: 'BCAA로 에너지 생산과 근육 대사에 관여하며 혈당 조절에도 도움을 줘요.' },
    'AUC': { name: '이소류신', abbr: 'Ile', desc: 'BCAA로 에너지 생산과 근육 대사에 관여하며 혈당 조절에도 도움을 줘요.' },
    'AUA': { name: '이소류신', abbr: 'Ile', desc: 'BCAA로 에너지 생산과 근육 대사에 관여하며 혈당 조절에도 도움을 줘요.' },
    'AUG': { name: '메티오닌', abbr: 'Met', desc: '항산화제 글루타치온 생성에 관여하고 체내 독소 배출과 지방 대사에 필수적이에요. 시작 코돈' },
    'ACU': { name: '트레오닌', abbr: 'Thr', desc: '피부와 치아, 콜라겐 생성에 중요하며 소화기 건강 유지에 도움을 줘요.' },
    'ACC': { name: '트레오닌', abbr: 'Thr', desc: '피부와 치아, 콜라겐 생성에 중요하며 소화기 건강 유지에 도움을 줘요.' },
    'ACA': { name: '트레오닌', abbr: 'Thr', desc: '피부와 치아, 콜라겐 생성에 중요하며 소화기 건강 유지에 도움을 줘요.' },
    'ACG': { name: '트레오닌', abbr: 'Thr', desc: '피부와 치아, 콜라겐 생성에 중요하며 소화기 건강 유지에 도움을 줘요.' },
    'AAU': { name: '아스파라긴', abbr: 'Asn', desc: '에너지 대사와 뇌 기능을 지원하며 신경 전달과 질소 운반에 관여해요.' },
    'AAC': { name: '아스파라긴', abbr: 'Asn', desc: '에너지 대사와 뇌 기능을 지원하며 신경 전달과 질소 운반에 관여해요.' },
    'AAA': { name: '라이신', abbr: 'Lys', desc: '성장과 조직 복구에 필요하고 칼슘 흡수를 촉진하며 면역력을 강화해요.' },
    'AAG': { name: '라이신', abbr: 'Lys', desc: '성장과 조직 복구에 필요하고 칼슘 흡수를 촉진하며 면역력을 강화해요.' },
    'AGU': { name: '세린', abbr: 'Ser', desc: '인지질과 글리세린산 생성에 관여하며 세포막과 신경계 기능을 지원해요.' },
    'AGC': { name: '세린', abbr: 'Ser', desc: '인지질과 글리세린산 생성에 관여하며 세포막과 신경계 기능을 지원해요.' },
    'AGA': { name: '아르기닌', abbr: 'Arg', desc: '산화질소 생성으로 혈관을 확장시키고 면역력과 상처 치유를 지원해요.' },
    'AGG': { name: '아르기닌', abbr: 'Arg', desc: '산화질소 생성으로 혈관을 확장시키고 면역력과 상처 치유를 지원해요.' },
    'GUU': { name: '발린', abbr: 'Val', desc: 'BCAA로 근육 대사와 에너지 생성에 참여하고 운동 수행능력 향상에 도움을 줘요.' },
    'GUC': { name: '발린', abbr: 'Val', desc: 'BCAA로 근육 대사와 에너지 생성에 참여하고 운동 수행능력 향상에 도움을 줘요.' },
    'GUA': { name: '발린', abbr: 'Val', desc: 'BCAA로 근육 대사와 에너지 생성에 참여하고 운동 수행능력 향상에 도움을 줘요.' },
    'GUG': { name: '발린', abbr: 'Val', desc: 'BCAA로 근육 대사와 에너지 생성에 참여하고 운동 수행능력 향상에 도움을 줘요.' },
    'GCU': { name: '알라닌', abbr: 'Ala', desc: '간에서 포도당 생성을 보조하고 에너지 공급과 면역 세포를 지원해요.' },
    'GCC': { name: '알라닌', abbr: 'Ala', desc: '간에서 포도당 생성을 보조하고 에너지 공급과 면역 세포를 지원해요.' },
    'GCA': { name: '알라닌', abbr: 'Ala', desc: '간에서 포도당 생성을 보조하고 에너지 공급과 면역 세포를 지원해요.' },
    'GCG': { name: '알라닌', abbr: 'Ala', desc: '간에서 포도당 생성을 보조하고 에너지 공급과 면역 세포를 지원해요.' },
    'GAU': { name: '아스파르트산', abbr: 'Asp', desc: '에너지 생산 TCA회로에 관여하며 신경 전달과 해독 작용을 지원해요.' },
    'GAC': { name: '아스파르트산', abbr: 'Asp', desc: '에너지 생산 TCA회로에 관여하며 신경 전달과 해독 작용을 지원해요.' },
    'GAA': { name: '글루타메이트', abbr: 'Glu', desc: '주요 신경전달물질이며 장 내 연료 공급에 중요한 역할을 해요.' },
    'GAG': { name: '글루타메이트', abbr: 'Glu', desc: '주요 신경전달물질이며 장 내 연료 공급에 중요한 역할을 해요.' },
    'GGU': { name: '글리신', abbr: 'Gly', desc: '중추신경계 신경전달물질이며 콜라겐의 약 1/3을 구성하고 해독과 염증 억제 작용을 해요.' },
    'GGC': { name: '글리신', abbr: 'Gly', desc: '중추신경계 신경전달물질이며 콜라겐의 약 1/3을 구성하고 해독과 염증 억제 작용을 해요.' },
    'GGA': { name: '글리신', abbr: 'Gly', desc: '중추신경계 신경전달물질이며 콜라겐의 약 1/3을 구성하고 해독과 염증 억제 작용을 해요.' },
    'GGG': { name: '글리신', abbr: 'Gly', desc: '중추신경계 신경전달물질이며 콜라겐의 약 1/3을 구성하고 해독과 염증 억제 작용을 해요.' }
  };

  const bases = [
    { letter: 'U', color: 'bg-blue-400', name: 'Uracil' },
    { letter: 'C', color: 'bg-green-400', name: 'Cytosine' },
    { letter: 'A', color: 'bg-yellow-400', name: 'Adenine' },
    { letter: 'G', color: 'bg-red-400', name: 'Guanine' }
  ];

  const handleDragStart = (base) => setDraggedBase(base);
  const handleDrop = (index) => {
    if (draggedBase && !submitted) {
      const newSlots = [...slots];
      newSlots[index] = draggedBase;
      setSlots(newSlots);
      setDraggedBase(null);
    }
  };
  const handleClear = () => { setSlots(['', '', '']); setSubmitted(false); };
  const handleSubmit = () => { if (slots.every(s => s !== '')) setSubmitted(true); };

  const codon = slots.join('');
  const result = codonTable[codon];

  const getResultColor = () => !result ? 'bg-gray-50' : result.abbr === 'STOP' ? 'bg-red-50' : codon === 'AUG' ? 'bg-purple-50' : 'bg-green-50';
  const getResultTextColor = () => !result ? 'text-gray-600' : result.abbr === 'STOP' ? 'text-red-700' : codon === 'AUG' ? 'text-purple-700' : 'text-green-700';

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🧬 코돈과 아미노산</h1>
          <p className="text-gray-600">3개의 염기를 조합하여 어떤 아미노산이 만들어지는지 확인해보세요</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 왼쪽 영역: 염기 선택 + 코돈 조립 + 가이드 토글 */}
          <div className="space-y-6">
            {/* 염기 선택 */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">염기 선택</h2>
              <div className="grid grid-cols-2 gap-4">
                {bases.map((base) => (
                  <div
                    key={base.letter}
                    draggable
                    onDragStart={() => handleDragStart(base.letter)}
                    className={`${base.color} rounded-xl p-6 cursor-move shadow-lg hover:shadow-xl transition-all text-center`}
                  >
                    <div className="text-4xl font-bold text-white mb-2">{base.letter}</div>
                    <div className="text-sm text-white opacity-90">{base.name}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 코돈 조립 */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">코돈 조립</h2>
              <div className="flex justify-center gap-4">
                {slots.map((slot, index) => (
                  <div
                    key={index}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop(index)}
                    className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center text-2xl font-bold cursor-pointer hover:bg-gray-50 transition-all"
                  >
                    {slot}
                  </div>
                ))}
              </div>

              {/* 버튼 */}
              <div className="mt-4 flex justify-center gap-4">
                <button
                  onClick={handleSubmit}
                  className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition"
                >
                  확인
                </button>
                <button
                  onClick={handleClear}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                >
                  초기화
                </button>
              </div>
            </div>

            {/* 가이드 토글 */}
            <div className="text-center">
              <button
                onClick={() => setShowGuide(!showGuide)}
                className="text-sm text-indigo-600 underline hover:text-indigo-800 transition"
              >
                {showGuide ? '가이드 숨기기' : '가이드 보기'}
              </button>
            </div>
          </div>

          {/* 오른쪽 영역: 결과 */}
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">결과</h2>
            <div className={`${getResultColor()} rounded-xl p-6 w-full text-center transition`}>
              <p className={`${getResultTextColor()} font-bold text-xl`}>
                {result ? result.name : '???'}
              </p>
              <p className={`${getResultTextColor()} text-sm mt-2`}>
                {result ? result.desc : '염기를 모두 배치하고 확인 버튼을 눌러보세요.'}
              </p>
            </div>

            {showGuide && (
              <div className="mt-6 text-left bg-gray-50 p-4 rounded-xl shadow-inner text-gray-700">
                <p className="mb-2">💡 TIP: AUG는 시작 코돈, UAA/UAG/UGA는 종결 코돈이에요.</p>
                <p>분지사슬 아미노산(BCAA): 류신, 발린, 이소류신</p>
              </div>
            )}
          </div>
        </div>

        {/* 돌아가기 버튼 */}
        <div className="mt-12 text-center">
          <button
            onClick={() => window.history.back()}
            className="bg-gray-300 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-400 transition"
          >
            ← 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}
