export const ORDER_MAP = {
  cancel_reason_id: '주문취소사유',
  complete_cancellation_date: '주문취소완료일',
  discount_price: '할인가',
  seller_name: '셀러명',
  product_name: '상품명',
  option_additional_price: '옵션추가금액',
  option_info: '옵션정보',
  order_id: '주문번호',
  order_detail_id: '주문상세번호',
  orderer_name: '주문자명',
  orderer_phone: '핸드폰번호',
  payment_date: '결제일자',
  refund_amount: '환급금액',
  refund_complete_date: '환불완료일',
  refund_reason_id: '환불사유',
  refund_request_date: '환불요청일',
  shipping_complete_date: '배송완료일',
  shipping_start_date: '배송시작일',
  total_payment: '결제금액',
  units: '수량',
  coupon_id: '쿠폰 번호',
  coupon_name: '쿠폰 이름',
  validation_start_date: '쿠폰 유효 시작일',
  validation_end_date: '쿠폰 유효 종료일',
  download_start_date: '쿠폰 다운로드 시작일',
  download_end_date: '쿠폰 다운로드 종료일',
  issue_type_name: '발급유형',
  is_limited: '제한여부',
  maximum_number: '제한 개수',
  issue_number: '발급 개수',
  used_number: '사용 개수',
  actions: 'Actions'
};

export const PRODUCT_MAP = {
  created_at: '등록일',
  main_img: '대표이미지',
  name: '상품명',
  product_code: '상품코드',
  id: '상품번호',
  attribution_name: '셀러속성',
  korean_name: '셀러명',
  price: '판매가',
  discount_price: '할인가',
  is_on_sale: '판매여부',
  is_displayed: '진열여부',
  is_promotion: '할인여부'
};

export const QNA_MAP = {
  question_id: '글번호',
  type_name: '문의유형',
  created_at: '등록일',
  phone_number: '전화번호',
  name: '상품명',
  korean_name: '셀러명',
  content: '질문',
  user_id: '회원번호'
};

export const REVIEW_MAP = {
  review_id: '글번호',
  korean_name: '셀러명',
  product_id: '상품번호',
  product_name: '상품명',
  login_id: '회원닉네임',
  content: '리뷰내용',
  created_at: '등록일시',
  updated_at: '수정일시'
};

export const MEMBER_MAP = {
  id: '회원번호',
  login_id: '회원명',
  phone_number: '휴대폰',
  email: '이메일',
  created_at: '등록일'
};

export const SELLER_MAP = {
  seller_id: '번호',
  login_id: '셀러아이디',
  eng_name: '영문이름',
  korean_name: '한글이름',
  name: '담당자이름',
  seller_status_id: '셀러상태',
  email: '담당자이메일',
  seller_attribute_id: '셀러속성',
  product_count: '상품개수',
  start_at: '등록일시'
};

export default {
  ORDER_MAP,
  PRODUCT_MAP,
  QNA_MAP,
  REVIEW_MAP,
  MEMBER_MAP,
  SELLER_MAP
};
