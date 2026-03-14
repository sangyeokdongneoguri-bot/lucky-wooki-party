import { partyData } from '../data/party';
import ScrollReveal from '../components/ScrollReveal';
import useCountdown from '../hooks/useCountdown';
import RsvpForm from '../components/RsvpForm';
import Confetti from '../components/Confetti';
import FloatingEmojis from '../components/FloatingEmojis';

const PINK = '#FF69B4';
const MAGENTA = '#FF1493';
const GOLD = '#B8960C';
const CHARCOAL = '#3D3D5C';
const TITLE_FONT = "'Saenggeo Jincheon', sans-serif";
const BODY_FONT =
  "-apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif";

function ScrollIndicator() {
  return (
    <div
      className="anim-bounce-scroll"
      style={{
        position: 'relative',
        zIndex: 11,
        marginTop: 40,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
      }}
    >
      <span
        style={{ fontSize: 11, color: 'rgba(255,105,180,0.5)', letterSpacing: 2 }}
      >
        SCROLL
      </span>
      <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
        <path
          d="M1 1L8 8L15 1"
          stroke="rgba(255,105,180,0.5)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default function PartyPage() {
  const countdown = useCountdown(partyData.dDay);

  const scrollToRsvp = () => {
    document.getElementById('rsvp-section')?.scrollIntoView({ behavior: 'smooth' });
  };


  return (
    <div
      style={{
        maxWidth: 480,
        margin: '0 auto',
        fontFamily: BODY_FONT,
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
          padding: '80px 24px 80px',
        }}
      >
        {/* Animated gradient sky */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(135deg, #667eea 0%, #87CEEB 20%, #FFB6C1 40%, #E0F4FF 60%, #ffecd2 80%, #fcb69f 100%)',
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
            background:
              'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.7) 100%)',
            zIndex: 1,
          }}
        />

        {/* Confetti — reduced */}
        <Confetti count={20} />

        {/* Floating emojis */}
        <FloatingEmojis count={6} />

        {/* Wave at bottom of hero */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 12,
            lineHeight: 0,
          }}
        >
          <svg
            viewBox="0 0 1440 60"
            preserveAspectRatio="none"
            style={{ width: '100%', display: 'block', height: 40 }}
          >
            <path
              d="M0,25 Q360,55 720,25 Q1080,-5 1440,25 L1440,60 L0,60 Z"
              fill="#fff"
            />
          </svg>
        </div>

        {/* Content */}
        <div
          style={{
            position: 'relative',
            zIndex: 11,
            width: '100%',
            textAlign: 'center',
          }}
        >
          {/* Main title GIF */}
          <div
            className="hero-enter-scale"
            style={{ '--duration': '0.8s' } as React.CSSProperties}
          >
            <picture>
              <source srcSet="/images/main.webp" type="image/webp" />
              <img
                src="/images/main-opt.png"
                alt="파티는 핑계고"
                style={{
                  width: 280,
                  maxWidth: '80%',
                  margin: '0 auto',
                  display: 'block',
                  filter: 'drop-shadow(0 4px 20px rgba(255,105,180,0.4))',
                }}
              />
            </picture>
          </div>

          {/* Date subtitle */}
          <div
            className="hero-enter"
            style={{ '--delay': '0.4s', '--duration': '0.7s' } as React.CSSProperties}
          >
            <p
              style={{
                fontSize: 20,
                color: '#333',
                margin: '8px 0 28px',
                fontFamily: TITLE_FONT,
              }}
            >
              4월 11일 토요일에 만나요!
            </p>
          </div>

          {/* Couple photo + names below */}
          <div
            className="hero-enter"
            style={{
              '--delay': '0.5s',
              '--duration': '0.8s',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            } as React.CSSProperties}
          >
            {/* Photo with gradient frame — single animation */}
            <div
              style={{
                borderRadius: 24,
                padding: 3,
                background: `linear-gradient(135deg, ${PINK}, ${MAGENTA}, ${GOLD}, ${PINK})`,
                backgroundSize: '300% 300%',
                animation: 'gradient-shift 4s ease infinite',
              }}
            >
              <picture>
                <source srcSet="/images/party-main.webp" type="image/webp" />
                <img
                  src="/images/party-main.jpg"
                  alt="couple photo"
                  style={{
                    width: '60vw',
                    maxWidth: 240,
                    aspectRatio: '11 / 15',
                    borderRadius: 21,
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </picture>
            </div>

            {/* Names below photo — horizontal */}
            <div
              className="hero-enter"
              style={{
                '--delay': '0.7s',
                '--duration': '0.6s',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginTop: 16,
              } as React.CSSProperties}
            >
              <div>
                <span
                  style={{
                    fontSize: 22,
                    fontWeight: 900,
                    color: PINK,
                    fontFamily: TITLE_FONT,
                  }}
                >
                  {partyData.bride.name}
                </span>
                <span style={{ fontSize: 12, color: '#aaa', marginLeft: 4 }}>
                  bride
                </span>
              </div>
              <span
                style={{
                  fontSize: 18,
                  color: GOLD,
                  fontFamily: TITLE_FONT,
                }}
              >
                &amp;
              </span>
              <div>
                <span
                  style={{
                    fontSize: 22,
                    fontWeight: 900,
                    color: CHARCOAL,
                    fontFamily: TITLE_FONT,
                  }}
                >
                  {partyData.groom.name}
                </span>
                <span style={{ fontSize: 12, color: '#aaa', marginLeft: 4 }}>
                  groom
                </span>
              </div>
            </div>
          </div>

          {/* Countdown — no bounce */}
          {!countdown.isExpired && (
            <div
              className="hero-enter"
              style={{
                '--delay': '0.9s',
                '--duration': '0.7s',
                marginTop: 32,
                display: 'flex',
                gap: 12,
                justifyContent: 'center',
              } as React.CSSProperties}
            >
              {[
                { label: 'DAY', value: countdown.days },
                { label: 'HRS', value: countdown.hours },
                { label: 'MIN', value: countdown.minutes },
                { label: 'SEC', value: countdown.seconds },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,240,248,0.95) 100%)',
                    borderRadius: 16,
                    padding: '10px 14px',
                    minWidth: 58,
                    boxShadow:
                      '0 4px 20px rgba(255,105,180,0.25), 0 0 0 1px rgba(255,105,180,0.15)',
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
                      fontFamily: TITLE_FONT,
                    }}
                  >
                    {String(value).padStart(2, '0')}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: '#bbb',
                      marginTop: 3,
                      letterSpacing: 1,
                    }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>
          )}
          {countdown.isExpired && (
            <div
              className="hero-enter-spring"
              style={{
                '--delay': '0.9s',
                '--duration': '0.7s',
                marginTop: 28,
                fontSize: 24,
                fontWeight: 700,
                fontFamily: TITLE_FONT,
              } as React.CSSProperties}
            >
              <span style={{ color: PINK }}>파티가 열렸어요!</span>
              <span style={{ fontSize: 32, marginLeft: 8 }}>🎉</span>
            </div>
          )}

          {/* CTA to RSVP — only before event */}
          {!countdown.isExpired && (
            <div
              className="hero-enter"
              style={{ '--delay': '1.1s', '--duration': '0.7s', marginTop: 24 } as React.CSSProperties}
            >
              <button
                onClick={scrollToRsvp}
                className="cta-button"
                style={{
                  padding: '12px 32px',
                  borderRadius: 999,
                  background: `linear-gradient(135deg, ${PINK}, ${MAGENTA})`,
                  color: '#fff',
                  fontSize: 16,
                  fontFamily: TITLE_FONT,
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 20px rgba(255,105,180,0.4)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
              >
                참석 응답하기 💕
              </button>
            </div>
          )}
        </div>

        {/* Scroll indicator */}
        <ScrollIndicator />
      </section>

      {/* ── INFO SECTION ──────────────────────────────────────────── */}
      <section
        style={{
          position: 'relative',
          padding: '56px 24px',
          backgroundColor: '#fff',
          textAlign: 'center',
        }}
      >
        <ScrollReveal direction="up" delay={0}>
          <h2
            style={{
              fontSize: 40,
              fontWeight: 700,
              letterSpacing: 8,
              margin: '0 0 8px',
              fontFamily: TITLE_FONT,
              background: `linear-gradient(90deg, ${PINK}, ${MAGENTA}, ${PINK})`,
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'shimmer 4s linear infinite',
            }}
          >
            초 대 장
          </h2>
          <div
            style={{
              fontSize: 14,
              color: '#ccc',
              letterSpacing: 6,
              marginBottom: 28,
            }}
          >
            INVITATION
          </div>
        </ScrollReveal>

        {/* Animated envelope */}
        <ScrollReveal direction="up" delay={0.1}>
          <div
            className="anim-bounce-envelope"
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
                background:
                  'radial-gradient(circle, rgba(255,240,248,0.9) 0%, rgba(255,240,248,0) 70%)',
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
          </div>
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
                fontFamily: TITLE_FONT,
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

        {/* Map & Calendar buttons */}
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
                gradient: 'linear-gradient(135deg, #FF6B6B, #FF4500)',
              },
            ].map(({ label, href, gradient }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="map-button"
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
      </section>

      {/* ── RSVP SECTION ──────────────────────────────────────────── */}
      <section
        id="rsvp-section"
        style={{
          position: 'relative',
          padding: '48px 24px',
          textAlign: 'center',
          background: 'linear-gradient(180deg, #fff 0%, #FFF5FA 100%)',
        }}
      >
        <ScrollReveal direction="up" delay={0}>
          {countdown.isExpired ? (
            <div
              style={{
                padding: '32px 24px',
                backgroundColor: '#fff',
                borderRadius: 20,
                border: `2px solid ${PINK}`,
              }}
            >
              <div style={{ fontSize: 40, marginBottom: 12 }}>🎊</div>
              <p
                style={{
                  fontSize: 18,
                  color: PINK,
                  fontFamily: TITLE_FONT,
                  margin: 0,
                }}
              >
                이 파티는 이미 종료되었습니다
              </p>
              <p style={{ fontSize: 14, color: '#999', marginTop: 8 }}>
                함께해 주신 모든 분들 감사합니다!
              </p>
            </div>
          ) : (
            <RsvpForm />
          )}
        </ScrollReveal>
      </section>

      {/* ── NOTES SECTION ─────────────────────────────────────────── */}
      <section
        style={{
          position: 'relative',
          padding: '56px 24px',
          textAlign: 'center',
          overflow: 'hidden',
          background:
            'linear-gradient(180deg, #FFF5FA 0%, #FFF0F8 50%, #FFE8F5 100%)',
        }}
      >
        {/* Floating emojis in notes section too */}
        <FloatingEmojis count={4} />

        <div style={{ position: 'relative', zIndex: 2 }}>
          <ScrollReveal direction="up" delay={0}>
            <div style={{ marginBottom: 24 }}>
              <span
                style={{
                  fontSize: 32,
                  fontWeight: 700,
                  display: 'block',
                  fontFamily: TITLE_FONT,
                  background: `linear-gradient(90deg, ${PINK}, ${MAGENTA})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                안내사항
              </span>
            </div>
          </ScrollReveal>

          {/* Grouped notes */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
            }}
          >
            {partyData.noteGroups.map((group, gi) => (
              <ScrollReveal key={gi} direction="up" delay={0.1 + gi * 0.08}>
                <div
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: 20,
                    padding: '20px 20px',
                    textAlign: 'left',
                    border: '1px solid rgba(255,105,180,0.15)',
                    boxShadow: '0 2px 12px rgba(255,105,180,0.08)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      marginBottom: 10,
                    }}
                  >
                    <span style={{ fontSize: 20 }}>{group.icon}</span>
                    <span
                      style={{
                        fontSize: 16,
                        fontWeight: 700,
                        color: PINK,
                        fontFamily: TITLE_FONT,
                      }}
                    >
                      {group.title}
                    </span>
                  </div>
                  {group.items.map((item, ii) => (
                    <p
                      key={ii}
                      style={{
                        fontSize: 14,
                        color: '#555',
                        lineHeight: 1.8,
                        margin:
                          ii < group.items.length - 1 ? '0 0 8px' : 0,
                        paddingLeft: 28,
                      }}
                    >
                      {item}
                    </p>
                  ))}
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal direction="up" delay={0.5}>
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
                fontFamily: TITLE_FONT,
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
          padding: '56px 24px 48px',
          textAlign: 'center',
          background: 'linear-gradient(180deg, #FFE8F5 0%, #fff 100%)',
          overflow: 'hidden',
        }}
      >
        <ScrollReveal direction="up" delay={0}>
          <p
            className="anim-pulse-scale"
            style={{
              position: 'relative',
              zIndex: 1,
              fontSize: 20,
              fontWeight: 900,
              fontFamily: TITLE_FONT,
              background: `linear-gradient(90deg, ${PINK}, ${MAGENTA}, ${PINK})`,
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
          </p>
        </ScrollReveal>

        {/* Monogram */}
        <ScrollReveal direction="up" delay={0.15}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 80,
              height: 80,
              borderRadius: '50%',
              border: `2px solid ${GOLD}`,
              marginTop: 28,
            }}
          >
            <span
              style={{
                fontSize: 18,
                fontFamily: TITLE_FONT,
                fontWeight: 700,
                background: `linear-gradient(135deg, ${PINK}, ${GOLD})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              K &amp; S
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.25}>
          <p style={{ fontSize: 12, color: '#ccc', marginTop: 20 }}>
            Made with 💕
          </p>
        </ScrollReveal>
      </footer>
    </div>
  );
}
