import { useState } from 'react';

// Fill in the deployed Google Apps Script URL here
const GOOGLE_SCRIPT_URL = '';

const PINK = '#FF69B4';
const STORAGE_KEY = 'rsvp_submitted';

type Attendance = 'yes' | 'partial' | 'no' | '';
type Side = 'bride' | 'groom' | '';

interface FormState {
  name: string;
  attendance: Attendance;
  time: string;
  side: Side;
}

export default function RsvpForm() {
  const [form, setForm] = useState<FormState>({
    name: '',
    attendance: '',
    time: '',
    side: '',
  });
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
    if (!form.name.trim() || !form.attendance || !form.side) return;

    setLoading(true);
    setError('');

    const attendanceLabel =
      form.attendance === 'yes'
        ? '참석'
        : form.attendance === 'partial'
          ? '일부 참석'
          : '불참';

    const payload = {
      name: form.name.trim(),
      attendance: attendanceLabel,
      time: form.attendance === 'partial' ? form.time : '',
      side: form.side === 'bride' ? '신부측' : '신랑측',
    };

    if (!GOOGLE_SCRIPT_URL) {
      setError('RSVP 기능이 아직 준비 중입니다. 잠시 후 다시 시도해 주세요.');
      setLoading(false);
      return;
    }

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
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
          marginTop: 36,
          padding: '32px 24px',
          backgroundColor: '#FFF0F8',
          borderRadius: 20,
          textAlign: 'center',
          border: `2px solid ${PINK}`,
        }}
      >
        <div style={{ fontSize: 40, marginBottom: 12 }}>💌</div>
        <p style={{ fontSize: 17, fontWeight: 700, color: PINK, margin: 0 }}>
          참석 여부가 전달되었어요!
        </p>
        <p style={{ fontSize: 13, color: '#999', marginTop: 8 }}>
          소중한 응답 감사해요 :)
        </p>
      </div>
    );
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 14px',
    borderRadius: 10,
    border: `1.5px solid #f0b8d8`,
    fontSize: 14,
    outline: 'none',
    boxSizing: 'border-box',
    fontFamily: "'Noto Sans KR', sans-serif",
  };

  const radioLabelStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontSize: 14,
    color: '#333',
    cursor: 'pointer',
    padding: '6px 0',
  };

  const sectionLabelStyle: React.CSSProperties = {
    fontSize: 13,
    fontWeight: 700,
    color: '#888',
    marginBottom: 8,
    display: 'block',
    textAlign: 'left',
  };

  const isValid = form.name.trim() && form.attendance && form.side &&
    (form.attendance !== 'partial' || form.time.trim());

  return (
    <div
      style={{
        marginTop: 36,
        padding: '28px 20px',
        backgroundColor: '#FFF0F8',
        borderRadius: 20,
        border: `2px solid ${PINK}`,
        textAlign: 'left',
      }}
    >
      <p
        style={{
          fontSize: 18,
          fontWeight: 900,
          color: PINK,
          margin: '0 0 20px',
          textAlign: 'center',
          fontFamily: "'Gaegu', cursive",
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
            placeholder="이름을 입력해 주세요"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            style={inputStyle}
          />
        </div>

        {/* 참석 여부 */}
        <div>
          <span style={sectionLabelStyle}>참석 여부</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {[
              { value: 'yes', label: '① 참석' },
              { value: 'partial', label: '② 일부 시간에만 참석' },
              { value: 'no', label: '③ 불참' },
            ].map(({ value, label }) => (
              <label key={value} style={radioLabelStyle}>
                <input
                  type="radio"
                  name="attendance"
                  value={value}
                  checked={form.attendance === value}
                  onChange={() =>
                    setForm({ ...form, attendance: value as Attendance, time: '' })
                  }
                  style={{ accentColor: PINK, width: 16, height: 16 }}
                />
                {label}
              </label>
            ))}
          </div>

          {/* Conditional time input */}
          {form.attendance === 'partial' && (
            <div style={{ marginTop: 10, paddingLeft: 24 }}>
              <input
                type="text"
                placeholder="참석 가능한 시간대를 입력해 주세요 (예: 14:00~16:00)"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                style={{ ...inputStyle, fontSize: 13 }}
              />
            </div>
          )}
        </div>

        {/* 신부측 / 신랑측 */}
        <div>
          <span style={sectionLabelStyle}>신부측 / 신랑측</span>
          <div style={{ display: 'flex', gap: 16 }}>
            {[
              { value: 'bride', label: '신부측' },
              { value: 'groom', label: '신랑측' },
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
        </div>

        {error && (
          <p style={{ fontSize: 13, color: '#e53935', margin: 0 }}>{error}</p>
        )}

        <button
          type="submit"
          disabled={!isValid || loading}
          style={{
            padding: '13px 0',
            borderRadius: 12,
            backgroundColor: isValid && !loading ? PINK : '#f0b8d8',
            color: '#fff',
            fontSize: 15,
            fontWeight: 700,
            border: 'none',
            cursor: isValid && !loading ? 'pointer' : 'not-allowed',
            fontFamily: "'Noto Sans KR', sans-serif",
            transition: 'background-color 0.2s',
          }}
        >
          {loading ? '전송 중...' : '참석 여부 보내기'}
        </button>
      </form>
    </div>
  );
}
