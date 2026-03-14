import { useState } from 'react';

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw73Z2SCqK6_MvDNKJk_gz3AX8_Tel0gJQq5Lx2yzd60g530Cy4V97ny_fq5MhDcc4ohg/exec';

const PINK = '#FF69B4';
const STORAGE_KEY = 'rsvp_submitted';

type Side = 'bride' | 'groom' | '';

const PLACEHOLDER_NAMES = ['성기욱', '이소연'] as const;

interface FormState {
  name: string;
  side: Side;
  relation: string;
}

export default function RsvpForm() {
  const [form, setForm] = useState<FormState>({
    name: '',
    side: '',
    relation: '',
  });
  const [placeholderName] = useState(
    () => PLACEHOLDER_NAMES[Math.random() < 0.5 ? 0 : 1],
  );
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.side) return;

    setLoading(true);
    setError('');

    const payload = {
      name: form.name.trim(),
      attendance: '참석',
      time: '',
      side: form.side === 'bride' ? '신부측' : '신랑측',
      relation: form.relation.trim(),
    };

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(payload),
      });
      localStorage.setItem(STORAGE_KEY, 'true');
      setSubmitted(true);
    } catch {
      setError('제출 중 오류가 발생했습니다. 다시 시도해 주세요.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div
        style={{
          padding: '32px 24px',
          backgroundColor: '#fff',
          borderRadius: 20,
          textAlign: 'center',
          border: `2px solid ${PINK}`,
        }}
      >
        <div style={{ fontSize: 40, marginBottom: 12 }}>💌</div>
        <p style={{ fontSize: 18, color: PINK, margin: 0 }}>
          참석 여부가 전달되었어요!
        </p>
        <p style={{ fontSize: 14, color: '#999', marginTop: 8 }}>
          소중한 응답 감사해요 :)
        </p>
        <button
          type="button"
          onClick={() => {
            localStorage.removeItem(STORAGE_KEY);
            setSubmitted(false);
          }}
          style={{
            marginTop: 16,
            fontSize: 13,
            color: '#ccc',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            textDecoration: 'underline',
          }}
        >
          다시 제출하기
        </button>
      </div>
    );
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 14px',
    borderRadius: 10,
    border: '1.5px solid #f0b8d8',
    fontSize: 15,
    outline: 'none',
    boxSizing: 'border-box',
    fontFamily: "'Saenggeo Jincheon', sans-serif",
  };

  const radioLabelStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontSize: 15,
    color: '#333',
    cursor: 'pointer',
    padding: '6px 0',
  };

  const sectionLabelStyle: React.CSSProperties = {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
    display: 'block',
    textAlign: 'left',
  };

  const isValid = form.name.trim() && form.side;

  return (
    <div
      style={{
        padding: '28px 20px',
        backgroundColor: '#fff',
        borderRadius: 20,
        border: `2px solid ${PINK}`,
        textAlign: 'left',
      }}
    >
      <p
        style={{
          fontSize: 20,
          color: PINK,
          margin: '0 0 20px',
          textAlign: 'center',
          fontFamily: "'Saenggeo Jincheon', sans-serif",
          letterSpacing: 2,
        }}
      >
        참석 여부 알려주세요 💕
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {/* 이름 */}
        <div>
          <span style={sectionLabelStyle}>이름</span>
          <input
            type="text"
            required
            placeholder={`ex. ${placeholderName}`}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            style={inputStyle}
          />
        </div>

        {/* 신부측 / 신랑측 */}
        <div>
          <span style={sectionLabelStyle}>신부측 / 신랑측</span>
          <div style={{ display: 'flex', gap: 16 }}>
            {[
              { value: 'groom', label: '신랑측' },
              { value: 'bride', label: '신부측' },
            ].map(({ value, label }) => (
              <label key={value} style={radioLabelStyle}>
                <input
                  type="radio"
                  name="side"
                  value={value}
                  checked={form.side === value}
                  onChange={() => setForm({ ...form, side: value as Side })}
                  style={{ accentColor: PINK, width: 16, height: 16 }}
                />
                {label}
              </label>
            ))}
          </div>

          {/* 관계 입력 */}
          {form.side && (
            <div style={{ marginTop: 12 }}>
              <span style={sectionLabelStyle}>관계</span>
              <input
                type="text"
                placeholder={`ex. ${form.side === 'groom' ? '대학 동기' : '직장 동료'}`}
                value={form.relation}
                onChange={(e) => setForm({ ...form, relation: e.target.value })}
                style={inputStyle}
              />
            </div>
          )}
        </div>

        <p
          style={{
            fontSize: 13,
            color: '#888',
            margin: 0,
            lineHeight: 1.7,
            textAlign: 'center',
          }}
        >
          즐거운 파티를 위해 시작 시간에 맞게 프로그램을 짜두었습니다.
          <br />
          지정석으로 진행되니 혹시라도 늦게 오시면 꼭 연락주세요.
        </p>

        {error && (
          <p style={{ fontSize: 14, color: '#e53935', margin: 0 }}>{error}</p>
        )}

        <button
          type="submit"
          disabled={!isValid || loading}
          style={{
            padding: '13px 0',
            borderRadius: 12,
            backgroundColor: isValid && !loading ? PINK : '#f0b8d8',
            color: '#fff',
            fontSize: 16,
            border: 'none',
            cursor: isValid && !loading ? 'pointer' : 'not-allowed',
            fontFamily: "'Saenggeo Jincheon', sans-serif",
            transition: 'background-color 0.2s',
          }}
        >
          {loading ? '전송 중...' : '참석 여부 보내기'}
        </button>
      </form>
    </div>
  );
}
