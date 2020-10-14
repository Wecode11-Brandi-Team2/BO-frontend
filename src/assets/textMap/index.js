import {
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
} from './filter';
import {
  DEFAULT_SORT,
  DELIVERY_SORT,
  DELIVERY_COMP_SORT,
  REFUND_REQ_SORT,
  REFUND_COMP_SORT,
  ORDER_CANCEL_SORT
} from './filter/sort';
import {
  PAYMENT_COMP_TB,
  PREPARE_TB,
  DELIVERY_TB,
  DELIVERY_COMP_TB,
  REFUND_REQ_TB,
  REFUND_COMP_TB,
  ORDER_CANCEL_TB,
  PRODUCT_MANAGE_TB,
  QNA_TB,
  REVIEW_TB,
  MEMBER_TB,
  SELLER_TB,
  COUPON_TB
} from './table/tableHeaders';

import {
  ORDER_MAP,
  PRODUCT_MAP,
  QNA_MAP,
  REVIEW_MAP,
  MEMBER_MAP,
  SELLER_MAP
} from './table/tableMap';
import { SHORT_LIMIT, LONG_LIMIT } from './limit';
import { accountApi } from '@/api';

export default {
  paymentcomplete: {
    main: '주문 관리',
    sub: '결제완료 관리',
    filters: PAYMENT_COMP,
    sort: DEFAULT_SORT,
    table: PAYMENT_COMP_TB,
    tableMap: ORDER_MAP,
    tableId: 'order_detail_id',
    limit: LONG_LIMIT,
    orderStatus: 1
  },
  prepare: {
    main: '주문 관리',
    sub: '상품준비 관리',
    filters: PREPARE,
    sort: DEFAULT_SORT,
    table: PREPARE_TB,
    tableMap: ORDER_MAP,
    tableId: 'order_detail_id',
    limit: LONG_LIMIT,
    orderStatus: 2
  },
  delivery: {
    main: '주문 관리',
    sub: '배송중 관리',
    filters: DELIVERY,
    sort: DELIVERY_SORT,
    table: DELIVERY_TB,
    tableMap: ORDER_MAP,
    tableId: 'order_detail_id',
    limit: LONG_LIMIT,
    orderStatus: 3
  },
  deliverycomplete: {
    main: '주문 관리',
    sub: '배송완료 관리',
    filters: DELIVERY_COMP,
    sort: DELIVERY_COMP_SORT,
    table: DELIVERY_COMP_TB,
    tableMap: ORDER_MAP,
    tableId: 'order_detail_id',
    limit: LONG_LIMIT,
    orderStatus: 4
  },
  refundrequest: {
    main: '취소/환불 관리',
    sub: '환불요청 관리',
    filters: REFUND_REQ,
    sort: REFUND_REQ_SORT,
    table: REFUND_REQ_TB,
    tableMap: ORDER_MAP,
    tableId: 'order_detail_id',
    limit: LONG_LIMIT,
    orderStatus: 7
  },
  refundcomplete: {
    main: '취소/환불 관리',
    sub: '환불완료관리',
    filters: REFUND_COMP,
    sort: REFUND_COMP_SORT,
    table: REFUND_COMP_TB,
    tableMap: ORDER_MAP,
    tableId: 'order_detail_id',
    limit: LONG_LIMIT,
    orderStatus: 8
  },
  ordercancel: {
    main: '취소/환불 관리',
    sub: '주문취소완료 관리',
    filters: ORDER_CANCEL,
    sort: ORDER_CANCEL_SORT,
    table: ORDER_CANCEL_TB,
    tableMap: ORDER_MAP,
    tableId: 'order_detail_id',
    limit: LONG_LIMIT,
    orderStatus: 6
  },
  manage: {
    main: '상품 관리',
    sub: '상품 관리',
    filters: PRODUCT_MANAGE,
    table: PRODUCT_MANAGE_TB,
    tableMap: PRODUCT_MAP,
    tableId: 'id',
    limit: SHORT_LIMIT
  },
  qna: {
    main: '고객응대 관리',
    sub: 'Q&A 관리',
    filters: QNA,
    table: QNA_TB,
    tableMap: QNA_MAP,
    tableId: 'question_id'
  },
  review: {
    main: '고객응대 관리',
    sub: '텍스트 리뷰',
    filters: REVIEW,
    table: REVIEW_TB,
    tableMap: REVIEW_MAP,
    tableId: 'review_id',
    limit: LONG_LIMIT
  },
  member: {
    main: '회원관리 커뮤니티',
    sub: '회원 목록',
    table: MEMBER_TB,
    tableMap: MEMBER_MAP,
    tableId: 'id',
    tableTitle: '회원 리스트',
    api: accountApi.getMembers,
    resKey: 'user',
    limit: LONG_LIMIT
  },
  seller: {
    main: '셀러 계정 관리',
    sub: '셀러회원 목록/관리',
    table: SELLER_TB,
    tableMap: SELLER_MAP,
    tableId: 'seller_id',
    tableTitle: '셀러 회원 리스트',
    api: accountApi.getSellers,
    resKey: 'seller',
    limit: LONG_LIMIT
  },
  coupon: {
    main: '기획전/쿠폰 관리',
    sub: '쿠폰 관리',
    table: COUPON_TB
  },
  event: {
    main: '기획전/쿠폰 관리',
    sub: '기획전 관리'
  }
};
