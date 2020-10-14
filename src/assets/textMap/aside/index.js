export default [
  { name: '홈', param: 'home', url: '/' },
  {
    name: '주문관리',
    param: 'order',
    sub: [
      {
        name: '결제완료관리',
        param: 'paymentcomplete',
        url: '/order/paymentcomplete'
      },
      { name: '상품준비관리', param: 'prepare', url: '/order/prepare' },
      { name: '배송중관리', param: 'delivery', url: '/order/delivery' },
      {
        name: '배송완료관리',
        param: 'deliverycomplete',
        url: '/order/deliverycomplete'
      }
    ]
  },
  {
    name: '취소/환불 관리',
    param: 'refund_order',
    sub: [
      {
        name: '환불요청관리',
        param: 'refundrequest',
        url: '/refund_order/refundrequest'
      },
      {
        name: '환불완료관리',
        param: 'refundcomplete',
        url: '/refund_order/refundcomplete'
      },
      {
        name: '주문취소완료관리',
        param: 'ordercancel',
        url: '/refund_order/ordercancel'
      }
    ]
  },
  {
    name: '상품관리',
    param: 'product',
    sub: [
      { name: '상품 관리', param: 'manage', url: '/product/manage' },
      { name: '상품 등록', param: 'regist', url: '/product/regist' }
    ]
  },
  {
    name: '고객응대관리',
    param: 'inquiry',
    sub: [
      { name: 'Q&A 관리', param: 'qna', url: '/inquiry/qna' },
      { name: '텍스트 리뷰', param: 'review', url: '/inquiry/review' }
    ]
  },
  {
    name: '기획전/쿠폰관리',
    param: 'promotion',
    sub: [
      { name: '기획전 관리', param: 'event', url: '/promotion/event' },
      { name: '쿠폰 관리', param: 'coupon', url: '/promotion/coupon' }
    ]
  },
  {
    name: '회원관리',
    param: 'account',
    sub: [
      {
        name: '회원 관리 커뮤니티',
        param: 'member',
        url: '/account/member'
      },
      { name: '셀러계정관리', param: 'seller', url: '/account/seller' }
    ]
  }
];
