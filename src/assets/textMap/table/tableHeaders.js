import { productApi } from '@/api';

export const PAYMENT_COMP_TB = {
  status_buttons: [{ name: '주문취소처리', api: '' }],
  excel_buttons: [
    { name: '선택주문 엑셀다운로드', api: '' },
    { name: '전체주문 엑셀다운로드', api: '' }
  ],
  table_headers: [
    'payment_date',
    'order_id',
    'order_detail_id',
    'seller_name',
    'product_name',
    'option_info',
    'option_additional_price',
    'units',
    'orderer_name',
    'orderer_phone',
    'total_payment'
  ]
};
export const PREPARE_TB = {
  status_buttons: [{ name: '주문취소처리', api: '' }],
  excel_buttons: [
    { name: '선택주문 엑셀다운로드', api: '' },
    { name: '전체주문 엑셀다운로드', api: '' }
  ],
  table_headers: [
    'payment_date',
    'order_id',
    'order_detail_id',
    'seller_name',
    'product_name',
    'option_info',
    'option_additional_price',
    'units',
    'orderer_name',
    'orderer_phone',
    'total_payment'
  ]
};
export const DELIVERY_TB = {
  status_buttons: [
    { name: '배송완료처리', api: '' },
    { name: '배송준비처리', api: '' },
    { name: '환불요청', api: '' }
  ],
  excel_buttons: [
    { name: '선택주문 엑셀다운로드', api: '' },
    { name: '전체주문 엑셀다운로드', api: '' }
  ],
  table_headers: [
    'payment_date',
    'shipping_start_date',
    'order_id',
    'order_detail_id',
    'seller_name',
    'product_name',
    'orderer_name',
    'orderer_phone',
    'total_payment'
  ]
};
export const DELIVERY_COMP_TB = {
  status_buttons: [
    { name: '구매확정보류&진행처리', api: '' },
    { name: '환불요청', api: '' }
  ],
  excel_buttons: [
    { name: '선택주문 엑셀다운로드', api: '' },
    { name: '전체주문 엑셀다운로드', api: '' }
  ],
  table_headers: [
    'payment_date',
    'shipping_complete_date',
    'order_id',
    'order_detail_id',
    'seller_name',
    'product_name',
    'option_info',
    'option_additional_price',
    'units',
    'orderer_name',
    'orderer_phone',
    'total_payment'
  ]
};
export const REFUND_REQ_TB = {
  status_buttons: [{ name: '반품진행처리', api: '' }],
  excel_buttons: [
    { name: '선택주문 엑셀다운로드', api: '' },
    { name: '전체주문 엑셀다운로드', api: '' }
  ],
  table_headers: [
    'payment_date',
    'shipping_start_date',
    'refund_request_date',
    'order_id',
    'order_detail_id',
    'seller_name',
    'product_name',
    'option_info',
    'option_additional_price',
    'units',
    'orderer_name',
    'orderer_phone',
    'refund_reason_id',
    'refund_amount'
  ]
};
export const REFUND_COMP_TB = {
  excel_buttons: [
    { name: '선택주문 엑셀다운로드', api: '' },
    { name: '전체주문 엑셀다운로드', api: '' }
  ],
  table_headers: [
    'payment_date',
    'refund_complete_date',
    'order_id',
    'order_detail_id',
    'seller_name',
    'product_name',
    'option_info',
    'option_additional_price',
    'units',
    'orderer_name',
    'orderer_phone',
    'refund_reason_id',
    'refund_amount'
  ]
};
export const ORDER_CANCEL_TB = {
  excel_buttons: [
    { name: '선택주문 엑셀다운로드', api: '' },
    { name: '전체주문 엑셀다운로드', api: '' }
  ],
  table_headers: [
    'payment_date',
    'complete_cancellation_date',
    'order_id',
    'order_detail_id',
    'seller_name',
    'product_name',
    'option_info',
    'option_additional_price',
    'units',
    'orderer_name',
    'orderer_phone',
    'cancel_reason_id',
    'refund_amount'
  ]
};

export const PRODUCT_MANAGE_TB = {
  excel_buttons: [
    { name: '선택주문 엑셀다운로드', api: productApi.getExcelFile },
    { name: '전체주문 엑셀다운로드', api: productApi.getExcelFile }
  ],
  table_headers: [
    'created_at',
    'main_img',
    'name',
    'product_code',
    'id',
    'attribution_name',
    'price',
    'discount_price',
    'is_on_sale',
    'is_displayed',
    'is_promotion'
  ]
};

export const QNA_TB = {
  excel_buttons: [{ name: '엑셀다운로드', api: '' }],
  table_headers: [
    'question_id',
    'type_name',
    'created_at',
    'phone_number',
    'name',
    'korean_name',
    'content',
    'user_id'
  ]
};

export const REVIEW_TB = {
  table_headers: [
    'review_id',
    'korean_name',
    'product_id',
    'product_name',
    'login_id',
    'content',
    'created_at',
    'updated_at'
  ]
};

export const MEMBER_TB = {
  table_headers: ['id', 'login_id', 'phone_number', 'email', 'created_at']
};

export const SELLER_TB = {
  table_headers: [
    'seller_id',
    'login_id',
    'eng_name',
    'korean_name',
    'name',
    'seller_status_id',
    'email',
    'seller_attribute_id',
    'product_count',
    'start_at'
  ]
};
