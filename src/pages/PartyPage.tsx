import { motion } from 'framer-motion';
import { partyData } from '../data/party';
import ScrollReveal from '../components/ScrollReveal';
import useCountdown from '../hooks/useCountdown';
import RsvpForm from '../components/RsvpForm';
import Confetti from '../components/Confetti';
import FloatingEmojis from '../components/FloatingEmojis';
import Sparkles from '../components/Sparkles';

const PINK = '#FF69B4';
const RED = '#FF0000';
const GOLD = '#B8960C';
const MAGENTA = '#FF1493';
const CORAL = '#FF6B6B';

const circleNumbers = ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧'];

export default function PartyPage() {
  const countdown = useCountdown(partyData.dDay);

  return (
    <div
      style={{
        maxWidth: 480,
        margin: '0 auto',
        fontFamily: "'Saenggeo Jincheon', sans-serif",
        overflowX: 'hidden',
        backgroundColor: '#fff',
      }}
    >
      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          padding: '80px 24px 48px',
        }}
      >
        {/* Animated gradient sky */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, #667eea 0%, #87CEEB 20%, #FFB6C1 40%, #E0F4FF 60%, #ffecd2 80%, #fcb69f 100%)',
            backgroundSize: '300% 300%',
            animation: 'gradient-shift 12s ease infinite',
            zIndex: 0,
          }}
        />

        {/* Overlay for readability */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.7) 100%)',
            zIndex: 1,
          }}
        />

        {/* Confetti */}
        <Confetti count={35} />

        {/* Sparkles */}
        <Sparkles count={15} />

        {/* Floating emojis */}
        <FloatingEmojis count={10} />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 11, width: '100%', textAlign: 'center' }}>
          {/* Main title GIF */}
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <img
              src="/images/chicken-walk.gif"
              alt="파티는 핑계고"
              style={{
                width: 280,
                maxWidth: '80%',
                margin: '0 auto',
                display: 'block',
                filter: 'drop-shadow(0 4px 20px rgba(255,105,180,0.4))',
              }}
            />
          </motion.div>

          {/* Date subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
          >
            <p
              style={{
                fontSize: 20,
                color: '#333',
                margin: '8px 0 28px',
                animation: 'text-glow 3s ease-in-out infinite',
              }}
            >
              4월 11일 토요일에 만나요!
            </p>
          </motion.div>

          {/* Couple photo + names */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
            style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 16 }}
          >
            {/* Bride name */}
            <motion.div
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              style={{ textAlign: 'center', paddingBottom: 16 }}
            >
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 900,
                  color: PINK,
                  writingMode: 'vertical-rl',
                  textOrientation: 'upright',
                  letterSpacing: 4,
                  textShadow: `0 0 20px rgba(255,105,180,0.4)`,
                }}
              >
                {partyData.bride.name}
              </div>
              <div style={{ fontSize: 13, color: '#888', marginTop: 4 }}>bride</div>
            </motion.div>

            {/* Photo with glow frame */}
            <div
              style={{
                position: 'relative',
                borderRadius: 24,
                padding: 3,
                background: `linear-gradient(135deg, ${PINK}, ${MAGENTA}, #FFD700, ${CORAL}, ${PINK})`,
                backgroundSize: '300% 300%',
                animation: 'gradient-shift 4s ease infinite, pulse-glow 3s ease-in-out infinite',
                flexShrink: 0,
              }}
            >
              <img
                src="/images/party-main.jpg"
                alt="couple photo"
                style={{
                  width: 220,
                  height: 300,
                  borderRadius: 21,
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>

            {/* Groom name */}
            <motion.div
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              style={{ textAlign: 'center', paddingBottom: 16 }}
            >
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 900,
                  color: RED,
                  writingMode: 'vertical-rl',
                  textOrientation: 'upright',
                  letterSpacing: 4,
                  textShadow: `0 0 20px rgba(255,0,0,0.3)`,
                }}
              >
                {partyData.groom.name}
              </div>
              <div style={{ fontSize: 13, color: '#888', marginTop: 4 }}>groom</div>
            </motion.div>
          </motion.div>

          {/* Countdown */}
          {!countdown.isExpired && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9 }}
              style={{
                marginTop: 32,
                display: 'flex',
                gap: 12,
                justifyContent: 'center',
              }}
            >
              {[
                { label: 'DAY', value: countdown.days },
                { label: 'HRS', value: countdown.hours },
                { label: 'MIN', value: countdown.minutes },
                { label: 'SEC', value: countdown.seconds },
              ].map(({ label, value }, idx) => (
                <motion.div
                  key={label}
                  animate={{ y: [0, -4, 0] }}
                  transition={{
                    duration: 1.5,
                    delay: idx * 0.15,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,240,248,0.95) 100%)',
                    borderRadius: 16,
                    padding: '10px 14px',
                    minWidth: 58,
                    boxShadow: `0 4px 20px rgba(255,105,180,0.25), 0 0 0 1px rgba(255,105,180,0.15)`,
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <div
                    style={{
                      fontSize: 26,
                      fontWeight: 900,
                      background: `linear-gradient(135deg, ${PINK}, ${MAGENTA})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      lineHeight: 1,
                    }}
                  >
                    {String(value).padStart(2, '0')}
                  </div>
                  <div style={{ fontSize: 11, color: '#bbb', marginTop: 3, letterSpacing: 1 }}>{label}</div>
                </motion.div>
              ))}
            </motion.div>
          )}
          {countdown.isExpired && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.9, type: 'spring' }}
              style={{
                marginTop: 28,
                fontSize: 24,
                fontWeight: 700,
                animation: 'text-glow 2s ease-in-out infinite',
              }}
            >
              <span style={{ color: PINK }}>파티가 열렸어요!</span>
              <span style={{ fontSize: 32, marginLeft: 8 }}>🎉</span>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── INFO SECTION ──────────────────────────────────────────── */}
      <section
        style={{
          position: 'relative',
          padding: '56px 24px',
          backgroundColor: '#fff',
          textAlign: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Subtle animated bg */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            animation: 'disco-bg 8s ease infinite',
            pointerEvents: 'none',
          }}
        />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <ScrollReveal direction="up" delay={0}>
            <h2
              style={{
                fontSize: 40,
                fontWeight: 700,
                letterSpacing: 14,
                margin: '0 0 8px',
                fontFamily: "'Saenggeo Jincheon', sans-serif",
                background: `linear-gradient(90deg, ${PINK}, ${MAGENTA}, #FF4500, ${PINK})`,
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'shimmer 4s linear infinite',
              }}
            >
              초 대 장
            </h2>
            <div style={{ fontSize: 14, color: '#ccc', letterSpacing: 6, marginBottom: 28 }}>
              INVITATION
            </div>
          </ScrollReveal>

          {/* Animated envelope */}
          <ScrollReveal direction="up" delay={0.1}>
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                marginBottom: 32,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 96,
                  height: 96,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(255,240,248,0.9) 0%, rgba(255,240,248,0) 70%)',
                  animation: 'envelope-glow 3s ease-in-out infinite',
                }}
              >
                <img
                  src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/2709.svg"
                  alt="envelope"
                  style={{
                    width: 64,
                    height: 64,
                    filter: 'drop-shadow(0 4px 16px rgba(255,105,180,0.5))',
                  }}
                />
              </div>
            </motion.div>
          </ScrollReveal>

          {/* Event details */}
          <ScrollReveal direction="up" delay={0.2}>
            <div style={{ marginTop: 20, lineHeight: 2 }}>
              <p style={{ fontSize: 18, color: '#444', margin: '0 0 4px' }}>
                4월 11일(토) {partyData.timeLabel}
              </p>
              <p
                style={{
                  fontSize: 28,
                  fontWeight: 900,
                  color: '#111',
                  margin: '8px 0',
                  letterSpacing: 2,
                }}
              >
                {partyData.location.name}
              </p>
              <p style={{ fontSize: 15, color: '#666', margin: '4px 0' }}>
                {partyData.location.address}
              </p>
              <p style={{ fontSize: 14, color: '#999', margin: '4px 0' }}>
                ({partyData.location.transport})
              </p>
            </div>
          </ScrollReveal>

          {/* Map buttons with gradient */}
          <ScrollReveal direction="up" delay={0.3}>
            <div
              style={{
                display: 'inline-flex',
                gap: 10,
                marginTop: 24,
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              {[
                {
                  label: '네이버지도',
                  href: 'https://naver.me/GMmg4L4y',
                  gradient: `linear-gradient(135deg, ${PINK}, ${MAGENTA})`,
                },
                {
                  label: '카카오지도',
                  href: `https://map.kakao.com/link/map/${encodeURIComponent(partyData.location.name)},${partyData.location.lat},${partyData.location.lng}`,
                  gradient: `linear-gradient(135deg, ${CORAL}, #FF4500)`,
                },
              ].map(({ label, href, gradient }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '9px 20px',
                    borderRadius: 999,
                    background: gradient,
                    color: '#fff',
                    fontSize: 14,
                    textDecoration: 'none',
                    boxShadow: '0 4px 14px rgba(255,105,180,0.3)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    cursor: 'pointer',
                  }}
                >
                  {label}
                </a>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.4}>
            <RsvpForm />
          </ScrollReveal>
        </div>
      </section>

      {/* ── NOTES SECTION ─────────────────────────────────────────── */}
      <section
        style={{
          position: 'relative',
          padding: '56px 24px',
          textAlign: 'center',
          overflow: 'hidden',
          background: 'linear-gradient(180deg, #FFF5FA 0%, #FFF0F8 50%, #FFE8F5 100%)',
        }}
      >
        {/* Floating emojis in notes section too */}
        <FloatingEmojis count={6} />

        <div style={{ position: 'relative', zIndex: 2 }}>
          <ScrollReveal direction="up" delay={0}>
            <div style={{ marginBottom: 8 }}>
              <span
                style={{
                  fontSize: 32,
                  fontWeight: 700,
                  display: 'block',
                  fontFamily: "'Saenggeo Jincheon', sans-serif",
                  background: `linear-gradient(90deg, ${PINK}, ${MAGENTA})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  animation: 'text-glow 3s ease-in-out infinite',
                }}
              >
                유의사항
              </span>
              <span
                style={{
                  fontSize: 16,
                  fontStyle: 'italic',
                  color: '#C06090',
                  fontFamily: "'Saenggeo Jincheon', sans-serif",
                }}
              >
                Pre-Wedding party
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.15}>
            <div
              style={{
                background: `linear-gradient(135deg, ${PINK}, ${MAGENTA}, ${CORAL})`,
                backgroundSize: '200% 200%',
                animation: 'gradient-shift 6s ease infinite',
                borderRadius: 28,
                padding: '32px 24px',
                textAlign: 'left',
                marginTop: 24,
                boxShadow: `0 8px 32px rgba(255,105,180,0.3), 0 0 0 1px rgba(255,255,255,0.2) inset`,
              }}
            >
              {partyData.notes.map((note, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    gap: 10,
                    marginBottom: i < partyData.notes.length - 1 ? 18 : 0,
                    alignItems: 'flex-start',
                  }}
                >
                  <span
                    style={{
                      fontSize: 15,
                      lineHeight: 1.8,
                      color: 'rgba(255,255,255,0.9)',
                      flexShrink: 0,
                      textShadow: '0 1px 4px rgba(0,0,0,0.1)',
                    }}
                  >
                    {circleNumbers[i] ?? String(i + 1)}
                  </span>
                  <p
                    style={{
                      fontSize: 15,
                      color: '#fff',
                      lineHeight: 1.8,
                      margin: 0,
                      textShadow: '0 1px 2px rgba(0,0,0,0.05)',
                    }}
                  >
                    {note}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.25}>
            <p
              style={{
                fontSize: 15,
                color: '#888',
                marginTop: 28,
                lineHeight: 1.8,
              }}
            >
              {partyData.closingNote}
            </p>
            <p
              style={{
                fontSize: 16,
                marginTop: 14,
                fontFamily: "'Saenggeo Jincheon', sans-serif",
                letterSpacing: 0.5,
                background: `linear-gradient(90deg, ${GOLD}, #D4A017, ${GOLD})`,
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'shimmer 4s linear infinite',
              }}
            >
              {partyData.groom.fullNameEn} &amp; {partyData.bride.fullNameEn}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────── */}
      <footer
        style={{
          position: 'relative',
          padding: '56px 24px 72px',
          textAlign: 'center',
          background: 'linear-gradient(180deg, #fff 0%, #FFF5FA 100%)',
          overflow: 'hidden',
        }}
      >
        <Sparkles count={10} />
        <ScrollReveal direction="up" delay={0}>
          <motion.p
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'relative',
              zIndex: 1,
              fontSize: 22,
              fontWeight: 900,
              background: `linear-gradient(90deg, ${PINK}, ${RED}, ${MAGENTA}, ${PINK})`,
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'shimmer 3s linear infinite',
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            청첩장파티에 초대되신 여러분 환영합니다.
          </motion.p>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.2}>
          <div style={{ marginTop: 20, fontSize: 32, letterSpacing: 12 }}>
            🎊✨🥂✨🎊
          </div>
        </ScrollReveal>
      </footer>
    </div>
  );
}
