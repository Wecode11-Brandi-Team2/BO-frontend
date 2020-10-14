import {
  SELLER_TYPE,
  SALES,
  DISCOUNT,
  DISPLAY,
  ORDER_DATE,
  SHIP_DATE,
  ORDER_CANCEL_DATE,
  ORDER_CANCEL_REASON,
  REFUND_DATE,
  REFUND_REASON,
  REQ_TYPE,
  QNA_DATE,
  REVIEW_DATE
} from './buttons';
import {
  ORDER_SELECT,
  PRODUCT_SELECT,
  QNA_SELECT,
  REVIEW_SELECT,
  REVIEW_SORT
} from './select';

/*
   type 1: select input
   type 2: button & date picker
   type 3: single selected button
   type 4: multi selected button
   type 5: date picker
   type 6: input
   type 7: select & date picker
   type 8: select
*/

export const PAYMENT_COMP = [
  { type: 1, values: ORDER_SELECT },
  {
    type: 2,
    title: '주문완료일',
    values: ORDER_DATE.values
  },
  {
    type: 4,
    title: '셀러속성',
    values: SELLER_TYPE.values
  }
];
export const PREPARE = [
  { type: 1, values: ORDER_SELECT },
  {
    type: 2,
    title: '결제완료일',
    values: ORDER_DATE.values
  },
  {
    type: 4,
    title: '셀러속성',
    values: SELLER_TYPE.values
  }
];
export const DELIVERY = [
  { type: 1, values: ORDER_SELECT },
  {
    type: 2,
    title: '배송시작일',
    values: SHIP_DATE.values
  },
  {
    type: 4,
    title: '셀러속성',
    values: SELLER_TYPE.values
  }
];
export const DELIVERY_COMP = [
  { type: 1, values: ORDER_SELECT },
  {
    type: 2,
    title: '배송완료일',
    values: SHIP_DATE.values
  },
  {
    type: 4,
    title: '셀러속성',
    values: SELLER_TYPE.values
  }
];
export const REFUND_REQ = [
  { type: 1, values: ORDER_SELECT },
  {
    type: 2,
    title: '환불요청일',
    values: REFUND_DATE.values
  },
  {
    type: 3,
    title: '환불사유',
    key: 'filterRefndReason',
    values: REFUND_REASON.values
  },
  {
    type: 4,
    title: '셀러속성',
    values: SELLER_TYPE.values
  }
];
export const REFUND_COMP = [
  { type: 1, values: ORDER_SELECT },
  {
    type: 2,
    title: '환불완료일',
    values: REFUND_DATE.values
  },
  {
    type: 3,
    title: '환불사유',
    key: 'filterRefndReason',
    values: REFUND_REASON.values
  },
  {
    type: 4,
    title: '셀러속성',
    values: SELLER_TYPE.values
  }
];
export const ORDER_CANCEL = [
  { type: 1, values: ORDER_SELECT },
  {
    type: 2,
    title: '주문취소완료일',
    values: ORDER_CANCEL_DATE.values,
    tip: '주문취소 완료 기간은 최대 90일까지만 설정 가능합니다.'
  },
  {
    type: 3,
    title: '주문취소사유',
    key: 'filterCancelReason',
    values: ORDER_CANCEL_REASON.values
  },
  {
    type: 4,
    title: '셀러속성',
    values: SELLER_TYPE.values
  }
];
export const PRODUCT_MANAGE = [
  {
    type: 5,
    title: '조회기간'
  },
  {
    type: 6,
    title: '셀러명',
    key: 'mdName',
    values: '셀러명을 입력하세요'
  },
  { type: 1, title: '', values: PRODUCT_SELECT },
  {
    type: 4,
    title: '셀러속성',
    values: SELLER_TYPE.values
  },
  {
    type: 3,
    title: '판매여부',
    key: 'sellYn',
    values: SALES.values
  },
  {
    type: 3,
    title: '진열여부',
    key: 'exhibitionYn',
    values: DISPLAY.values
  },
  {
    type: 3,
    title: '할인여부',
    key: 'discountYn',
    values: DISCOUNT.values
  }
];
export const QNA = [
  { type: 1, values: QNA_SELECT },
  {
    type: 3,
    title: '문의유형',
    key: 'inquiryType',
    values: REQ_TYPE.values
  },
  {
    type: 2,
    title: '등록일',
    values: QNA_DATE.values
  }
];
export const REVIEW = [
  { type: 1, values: REVIEW_SELECT },
  {
    type: 7,
    select: { regist: '등록일', edit: '수정일' },
    values: REVIEW_DATE.values
  },
  { type: 8, title: '정렬필터', key: 'inquiryType', values: REVIEW_SORT }
];
export default {
  PAYMENT_COMP,
  PREPARE,
  DELIVERY,
  DELIVERY_COMP,
  REFUND_REQ,
  REFUND_COMP,
  ORDER_CANCEL,
  PRODUCT_MANAGE,
  QNA,
  REVIEW
};
