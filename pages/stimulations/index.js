import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>일상 속 함수 탐험하기</h1>
      <button
        onClick={() => router.push('/stimulation')}
        style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}
      >
        시뮬레이션 시작하기
      </button>
    </div>
  );
}
