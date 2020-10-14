export const ORDER_SELECT = {
  ORDER_CD: '주문번호',
  ORDER_DETAIL: '주문상세번호',
  ORDER_NAME: '주문자명',
  ORDER_TELNO: '핸드폰번호',
  MD_KO_NAME: '셀러명',
  PRODUCT_NAME: '상품명'
};
export const PRODUCT_SELECT = {
  PRODUCT_NAME: '상품명',
  PRODUCT_NO: '상품번호',
  PRODUCT_CD: '상품코드'
};
export const QNA_SELECT = {
  PRODUCT_NAME: '상품명',
  PRODUCT_INQRY_NO: '글번호',
  MD_KO_NAME: '셀러명',
  ORDER_NO: '주문자번호'
};
export const REVIEW_SELECT = {
  PRODUCT_INQRY_NO: '글번호',
  MEMBER_NICK: '회원닉네임',
  REVIEW: '리뷰내용'
};
export const REVIEW_SORT = {
  NEW_REGIST: '등록일시 최신순',
  NEW_EDIT: '수정일시 최신순'
};

export const SELLER_ATTR = {
  1: '입점대기',
  2: '입점',
  3: '퇴점',
  4: '퇴점대기',
  5: '휴점'
};

export const SELLER_TYPE = {
  1: '쇼핑몰',
  2: '마켓',
  3: '로드맵',
  4: '디자이너브랜드',
  5: '제너럴브랜드',
  6: '내셔널브랜드',
  7: '뷰티'
};

export default {
  ORDER_SELECT,
  PRODUCT_SELECT,
  QNA_SELECT,
  REVIEW_SELECT,
  REVIEW_SORT
};
