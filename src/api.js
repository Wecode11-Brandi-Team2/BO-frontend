import axios from 'axios';

const api = axios.create({
  baseURL: 'http://52.79.239.101:5000/api',
  headers: {
    Authorization:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzZWxsZXJfbm8iOjQxOH0.JvlKJET7Okt5VwwUA95YtIkZX8O9-RBfSiLM5vT8hbM'
  }
});

export const orderApi = {
  getOrder: (status, queries) =>
    api.get('/order/filter', {
      params: {
        orderStatus: status,
        ...queries
      }
    }),
  getDetail: orderId => api.get(`/order/detail/${orderId}`)
};

export const productApi = {
  getSellerName: name => {
    return api.get('/product/seller', {
      params: {
        q: name
      }
    });
  },
  getFirCategory: sellerAttrId => {
    return api.get('/product/category', {
      params: {
        seller_attr_id: sellerAttrId
      }
    });
  },
  getSecCategory: categoryId => {
    return api.get('/product/category', {
      params: {
        f_category_id: categoryId
      }
    });
  },
  registProduct: form => api.post('/product', form),
  getProducts: (queries = {}) =>
    api.get('/product/products', {
      params: queries
    }),
  getExcelFile: productIds =>
    api.get('/product/excel', {
      params: {
        product_id: productIds
      }
    })
};

export const inquiryApi = {
  getQna: queries =>
    api.get('/qna/', {
      params: queries
    }),
  getReviews: queries =>
    api.get('/review/', {
      params: queries
    })
};

export const accountApi = {
  getMembers: (queries = {}) =>
    api.get('/user/', {
      params: queries
    }),
  getSellers: (queries = {}) =>
    api.get('/seller/sellers', {
      params: queries
    })
};

export const couponApi = {
  getCoupons: (filterCondtion, page) => {
    let requestUrl = '/coupon/list?';
    if (filterCondtion.coupon_id != '') {
      requestUrl += `couponId=${filterCondtion.coupon_id}&`;
    }
    if (filterCondtion.coupon_name != '') {
      requestUrl += `couponName=${filterCondtion.coupon_name}&`;
    }
    if (filterCondtion.coupon_validation_start_from != '') {
      requestUrl += `validationStartFrom=${filterCondtion.coupon_validation_start_from}&`;
    }

    if (filterCondtion.coupon_validation_start_to != '') {
      requestUrl += `validationStartTo=${filterCondtion.coupon_validation_start_to}&`;
    }
    if (filterCondtion.coupon_validation_end_from != '') {
      requestUrl += `validationEndFrom=${filterCondtion.coupon_validation_end_from}&`;
    }
    if (filterCondtion.coupon_validation_end_to != '') {
      requestUrl += `validationEndTo=${filterCondtion.coupon_validation_end_to}&`;
    }
    if (filterCondtion.coupon_download_start_from != '') {
      requestUrl += `downloadStartFrom=${filterCondtion.coupon_download_start_from}&`;
    }
    if (filterCondtion.coupon_download_start_to != '') {
      requestUrl += `downloadStartTo=${filterCondtion.coupon_download_start_to}&`;
    }
    if (filterCondtion.coupon_download_end_from != '') {
      requestUrl += `downloadEndFrom=${filterCondtion.coupon_download_end_from}&`;
    }
    if (filterCondtion.coupon_download_end_to != '') {
      requestUrl += `downloadEndTo=${filterCondtion.coupon_download_end_to}&`;
    }
    if (filterCondtion.coupon_issue_type !== -1) {
      requestUrl += `IssueTypeId=${filterCondtion.coupon_issue_type}&`;
    }
    if (filterCondtion.coupon_is_limited !== -1) {
      requestUrl += `IsLimited=${filterCondtion.coupon_is_limited}&`;
    }

    requestUrl += `page=${page}`;
    console.log(requestUrl);
    return api.get(requestUrl);
  },
  getTotalNumber: () => api.get('/coupon/count')
};

export const loginApi = {
  login: val => api.post('/seller/login', val),
  signup: val => api.post('/seller/signup', val)
};
