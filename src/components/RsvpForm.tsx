import { useState } from 'react';

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwZVwEHVHi4UpUkMoVzMt9sOw6wYzTt51NVONq66YPxQXuXw9skIZcjTEQ0Nm9LMd4I4A/exec';

const PINK = '#FF69B4';
const STORAGE_KEY = 'rsvp_submitted';

type Attendance = 'yes' | 'partial' | 'no' | '';
type Side = 'bride' | 'groom' | '';

// 17:30 ~ 22:00, 30-minute intervals
const TIME_OPTIONS = [
  '17:30', '18:00', '18:30', '19:00', '19:30',
  '20:00', '20:30', '21:00', '21:30', '22:00',
];

interface FormState {
  name: string;
  attendance: Attendance;
  timeStart: string;
  timeEnd: string;
  side: Side;
}

export default function RsvpForm() {
  const [form, setForm] = useState<FormState>({
    name: '',
    attendance: '',
    timeStart: '',
    timeEnd: '',
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

    const timeRange =
      form.attendance === 'partial' && form.timeStart && form.timeEnd
        ? `${form.timeStart} ~ ${form.timeEnd}`
        : '';

    const payload = {
      name: form.name.trim(),
      attendance: attendanceLabel,
      time: timeRange,
      side: form.side === 'bride' ? '신부측' : '신랑측',
    };

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

  const selectStyle: React.CSSProperties = {
    flex: 1,
    padding: '10px 12px',
    borderRadius: 10,
    border: '1.5px solid #f0b8d8',
    fontSize: 14,
    outline: 'none',
    boxSizing: 'border-box',
    fontFamily: "'Noto Sans KR', sans-serif",
    backgroundColor: '#fff',
    color: '#333',
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23999' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 12px center',
    paddingRight: 32,
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 14px',
    borderRadius: 10,
    border: '1.5px solid #f0b8d8',
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

  // Filter end time options to be after start time
  const endTimeOptions = form.timeStart
    ? TIME_OPTIONS.filter((t) => t > form.timeStart)
    : TIME_OPTIONS.slice(1);

  const isPartialValid =
    form.attendance !== 'partial' || (form.timeStart && form.timeEnd);
  const isValid = form.name.trim() && form.attendance && form.side && isPartialValid;

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
                    setForm({ ...form, attendance: value as Attendance, timeStart: '', timeEnd: '' })
                  }
                  style={{ accentColor: PINK, width: 16, height: 16 }}
                />
                {label}
              </label>
            ))}
          </div>

          {/* Time range selectors */}
          {form.attendance === 'partial' && (
            <div style={{ marginTop: 12, paddingLeft: 24 }}>
              <div style={{ fontSize: 12, color: '#999', marginBottom: 8 }}>
                참석 가능한 시간대를 선택해 주세요
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <select
                  value={form.timeStart}
                  onChange={(e) =>
                    setForm({ ...form, timeStart: e.target.value, timeEnd: '' })
                  }
                  style={selectStyle}
                >
                  <option value="">시작 시간</option>
                  {TIME_OPTIONS.slice(0, -1).map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                <span style={{ fontSize: 14, color: '#999', flexShrink: 0 }}>~</span>
                <select
                  value={form.timeEnd}
                  onChange={(e) => setForm({ ...form, timeEnd: e.target.value })}
                  style={{
                    ...selectStyle,
                    color: form.timeStart ? '#333' : '#ccc',
                  }}
                  disabled={!form.timeStart}
                >
                  <option value="">종료 시간</option>
                  {endTimeOptions.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
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
