export const partyData = {
  groom: {
    name: '기욱',
    nameEn: 'Kiwook',
    fullNameEn: 'Sung Kiwook',
  },
  bride: {
    name: '소연',
    nameEn: 'Soyeon',
    fullNameEn: 'Lee Soyeon',
  },
  title: '파티는 핑계고',
  date: '2026-04-11',
  day: '토요일',
  time: '17:30',
  timeLabel: '오후 5시 30분부터',
  dDay: new Date('2026-04-11T17:30:00+09:00'),
  location: {
    name: '벨지움재즈카페',
    address: '서울 강남구 테헤란로83길 20 건영빌딩',
    transport: '삼성역 5번출구에서 500m',
    lat: 37.5087,
    lng: 127.0632,
  },
  noteGroups: [
    {
      icon: '💡',
      title: '안내',
      items: [
        '본 행사는 지정석입니다.',
        '결혼식이 아닌, 청첩장 파티입니다. 가볍게 오시되 제일 신나게 놀다가세요.',
        '전문 MC와 함께 진행합니다. 혼자 오시더라도 불편하지 않도록 잘 준비해두었습니다.',
      ],
    },
    {
      icon: '🍽',
      title: '식사 & 음료',
      items: [
        '배부르게 드실 수 있는 도시락 식사가 제공됩니다.',
        '와인 / 생맥주(테라/블랑) 무제한으로 준비해두었습니다. 맛있게 드시고 재미있게 즐겨주세요.',
      ],
    },
    {
      icon: '👗',
      title: '드레스코드',
      items: [
        '드레스 코디는 모두가 주인공이 될 수 있는 화이트 또는 밝은 계열의 옷으로 부탁드립니다.',
      ],
    },
    {
      icon: '🚇',
      title: '교통',
      items: [
        '주차가 어려우니 가능하면 대중교통 이용 부탁드립니다. (삼성역에서 약 500m)',
      ],
    },
    {
      icon: '⏰',
      title: '시간 안내',
      items: [
        '공식 행사는 10시에 마무리됩니다.',
      ],
    },
  ],
  closingNote: '자세한 안내는 신부측 / 신랑측에서 따로 연락드리겠습니다.',
} as const;
