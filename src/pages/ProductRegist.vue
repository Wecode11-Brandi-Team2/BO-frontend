/* eslint-disable vue/no-unused-components */
<template>
  <div>
    <div class="product-regist">
      <div class="title">
        <h1>
          상품등록
        </h1>
        <p>상품 정보 등록</p>
      </div>
      <!-- 셀러 모달 -->
      <div v-if="modalActive" class="seller-modal">
        <div class="seller-box">
          <h2>셀러선택</h2>
          <p>상품을 등록할 셀러를 선택해주세요. (검색 10건)</p>
          <i @click="closeModal" class="fas fa-times"></i>
          <div>
            <div class="seller-container">
              <h3 class="seller-title">셀러검색</h3>
              <div
                v-show="selectedSeller.korean_name"
                :class="{ 'selected-seller': selectedSeller.korean_name }"
              >
                <img
                  class="seller-img"
                  alt="seller-img"
                  :src="selectedSeller.image_url"
                />
                <p class="result-name">{{ selectedSeller.korean_name }}</p>
              </div>
              <button
                class="seller-btn blue-btn"
                @click="
                  getFirCat();
                  closeSeller();
                "
              >
                셀러선택
              </button>
            </div>
            <div class="seller-flex">
              <div class="result-container">
                <input
                  type="text"
                  class="seller-class"
                  placeholder="찾고싶은 셀러를 입력하세요."
                  v-model="sellerSearchInput"
                />
                <i class="fas fa-search seller-class" @click="sendSearch"></i>
                <ul v-show="updateSearch" class="seller-result">
                  <div>
                    <li
                      v-for="(seller, idx) in updateSearch"
                      :key="idx"
                      @click="updateSeller(idx)"
                    >
                      <img
                        class="seller-img"
                        alt="seller-img"
                        :src="seller.image_url"
                      />
                      <p class="seller-name">{{ seller.korean_name }}</p>
                    </li>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 셀러 검색  -->
      <div class="table-container">
        <table class="basic-table">
          <tr>
            <td colspan="2"><i class="fa fa-pencil"></i>기본 정보</td>
          </tr>
          <tr height="50">
            <th>셀러선택 *</th>
            <td>
              <input
                class="seller-search"
                :disabled="selectedSeller"
                v-model="selectedSeller.korean_name"
                placeholder="셀러를 검색해주세요."
              />
              <button class="search-btn" @click="openSeller">셀러검색</button>
            </td>
          </tr>
          <!-- 판매 / 미판매 라디오 버튼  -->
          <tr height="50">
            <th>판매여부</th>
            <td>
              <div class="radio-btn-container">
                <div class="flex-box">
                  <RadioBtn
                    v-for="(buttonName, idx) in btnList1"
                    name="sales"
                    :label="idx + 1"
                    :buttonName="buttonName"
                    :key="idx"
                    @change="updateRadioSales"
                  />
                </div>
              </div>
              <p class="blue-text">
                <i class="fa fa-warning"></i>
                미판매 선택시 앱에서 Sold Out으로 표시됩니다.
              </p>
            </td>
          </tr>
          <!-- 진열 / 미진열 라디오 버튼  -->
          <tr height="50">
            <th>진열여부</th>
            <td>
              <div class="radio-btn-container">
                <RadioBtn
                  v-for="(buttonName, idx) in btnList2"
                  name="displayed"
                  :label="idx + 1"
                  :buttonName="buttonName"
                  :key="idx"
                  @change="updateRadioDisplay"
                />
              </div>
              <p class="blue-text">
                <i class="fa fa-warning"></i>
                미진열 선택시 앱에서 노출되지 않습니다.
              </p>
            </td>
          </tr>
          <!-- 1차 / 2차 카테고리 -->
          <tr height="80">
            <th>카테고리 *</th>
            <td>
              <div class="table-small">
                <TableCategory
                  :firstCat="firstCat"
                  :secondCat="secondCat"
                  @updateFirCategory="updateFirCategory"
                  @updateSecCategory="updateSecCategory"
                ></TableCategory>
              </div>
            </td>
          </tr>
          <!-- 상품 상세참조 / 직접입력 라디오 버튼 -->
          <tr height="50">
            <th>상품 정보 고시 *</th>
            <td>
              <div class="radio-btn-container">
                <RadioBtn
                  v-for="(buttonName, idx) in btnList3"
                  name="product_info"
                  :label="idx + 1"
                  :buttonName="buttonName"
                  :key="idx"
                  @change="updateRadioProduct"
                />
              </div>
            </td>
          </tr>
          <tr height="50">
            <th>상품명 *</th>
            <td>
              <input
                v-model="allInfo.name"
                class="product-name"
                placeholder="상품명을 입력해주세요."
              />
              <p class="blue-text">
                <i class="fa fa-warning"></i>
                상품명에는 쌍따옴표(") 또는 홑따옴표(')를 포함할 수 없습니다.
                <br />
                <i class="fa fa-warning"></i>
                상품명에는 4byte 이모지를 포함할 수 없습니다.
              </p>
            </td>
          </tr>
          <tr height="50">
            <th>한줄 상품 설명</th>
            <td>
              <input
                v-model="allInfo.simple_description"
                class="product-info"
                placeholder="한줄 상품 설명을 입력해주세요."
              />
            </td>
          </tr>
          <!-- 이미지 업로드 5개 -->
          <tr height="80">
            <th>이미지 등록 *</th>
            <td>
              <p class="blue-text">
                <i class="fa fa-warning"></i>
                640 * 720 사이즈 이상 등록 가능하며 확장자는 jpg 만 등록
                가능합니다.
              </p>
              <div class="img-regist-whole">
                <div class="img-regist-container">
                  <FileUploader
                    v-for="(img, idx) of images"
                    @change="handleFile"
                    :fileIdx="idx"
                    :key="idx"
                  />
                </div>
              </div>
            </td>
          </tr>
          <!-- 상세설명, 텍스트 및 이미지 -->
          <tr>
            <th>상세 상품 정보 *</th>
            <td>
              <div>
                <label for="product_detail_info">
                  <input
                    type="radio"
                    name="product_detail_info"
                    label="1"
                    checked="true"
                  />
                  간편 업로드
                </label>
                <span class="caption-black">
                  (에디터에 따라서 상세 내용 화면에 다소 차이가 있을 수
                  있습니다.)
                </span>
              </div>
              <p class="blue-text">
                <i class="fa fa-warning"></i>
                상품상세이미지의 권장 사이즈는 가로사이즈 1000px 이상입니다.
              </p>
              <div>
                <button class="blue-btn">사진 삽입</button>
                <span> 이미지 확장자는 JPG, PNG만 등록 가능합니다. </span>
                <div>
                  <Editor v-model="allInfo.detail_description" />
                </div>
              </div>
            </td>
          </tr>
        </table>
      </div>
      <!-- 옵션 테이블 시작 -->
      <div class="table-container">
        <table class="option-table">
          <tr>
            <td colspan="2"><i class="fas fa-check"></i>옵션 정보</td>
          </tr>
          <tr>
            <th>옵션 설정</th>
            <td>
              <label for="option-select">
                <input type="radio" name="option-select" checked="true" />
                기본 옵션
              </label>
            </td>
          </tr>
          <tr height="50">
            <th>옵션 정보</th>
            <td class="table-option-container">
              <div class="table-small">
                <TableOption @optionRegist="optionRegist" />
              </div>
              <div class="table-small">
                <TableOptionDetail
                  @optionDelete="optionDelete"
                  :optionResult="optionResult"
                />
              </div>
            </td>
          </tr>
        </table>
      </div>
      <!-- 할인 정보  -->
      <div class="table-container">
        <table class="dicount-table">
          <tr>
            <td colspan="2"><i class="fas fa-chart-line"></i>판매 정보</td>
          </tr>
          <tr height="50">
            <th>판매가</th>
            <td>
              <div class="flex-box">
                <input
                  type="number"
                  min="0"
                  class="price-box"
                  v-model="allInfo.price"
                  @change="validatePrice"
                />
                <div class="point-box">원</div>
              </div>
              <p class="blue-text">
                <i class="fa fa-warning"></i>
                판매가는 원화기준 10원 이상이며 가격 입력 시 10원 단위로 입력해
                주세요.
              </p>
            </td>
          </tr>
          <!-- 최소, 최대 판매 수량 -->
          <tr height="50">
            <th>할인 정보</th>
            <td>
              <TableDiscount
                @click="updateDiscount"
                @selected="updateDiscountDate"
                :salesPrice="allInfo.price"
              />
              <p class="blue-text">
                <i class="fa fa-warning"></i>
                할인판매가 = 판매가 * 할인율 할인 판매가 적용 버튼을 클릭 하시면
                판매가 정보가 자동 계산되어집니다. <br />
                <i class="fa fa-warning"></i>
                할인 판매가는 원화기준 10원 단위로 자동 반올림됩니다.
              </p>
            </td>
          </tr>
          <tr height="50">
            <th>최소 판매 수량</th>
            <td>
              <div class="flex-box">
                <label for="min-product">
                  <input
                    @change="updateMinSelect"
                    type="radio"
                    name="min-product"
                    value="1"
                    checked="true"
                  />
                  1개 이상
                </label>
                <label for="min-product">
                  <input
                    @click="setInputActive"
                    @change="updateMinSelect"
                    type="radio"
                    name="min-product"
                    value="2"
                  />
                  <input
                    @change="updateMinSelect"
                    v-model="min_amount"
                    :disabled="minDisabled"
                    type="number"
                    min="1"
                    max="20"
                    class="sales-input"
                  />개 이상
                </label>
              </div>
              <p class="blue-text">(20개를 초과하여 설정하실 수 없습니다)</p>
            </td>
          </tr>
          <tr height="50">
            <th>최대 판매 수량</th>
            <td>
              <div class="flex-box">
                <label for="max-product">
                  <input
                    @change="updateMaxSelect"
                    type="radio"
                    name="max-product"
                    value="1"
                    checked="true"
                  />
                  20개 이하
                </label>
                <label for="max-product">
                  <input
                    @click="setInputActive"
                    @change="updateMaxSelect"
                    type="radio"
                    name="max-product"
                    value="2"
                  />
                  <input
                    @change="updateMaxSelect"
                    v-model="max_amount"
                    :disabled="maxDisabled"
                    type="number"
                    min="1"
                    max="20"
                    class="sales-input"
                  />개 이하
                </label>
              </div>
              <p class="blue-text">(20개를 초과하여 설정하실 수 없습니다)</p>
            </td>
          </tr>
        </table>
      </div>
      <div class="flex-box-center">
        <button class="submit-btn" @click="submitForm" type="submit">
          등록
        </button>
        <button class="cancel-btn" @click="alertCancel">취소</button>
      </div>
    </div>
    <PageLoading v-if="!done" />
  </div>
</template>

<script>
import RadioBtn from '../components/RadioBtn';
import TableOption from '../components/ProductRegist/TableOption';
import TableOptionDetail from '../components/ProductRegist/TableOptionDetail';
import TableCategory from '../components/ProductRegist/TableCategory';
import TableDiscount from '../components/ProductRegist/TableDiscount';
import FileUploader from '../components/ProductRegist/FileUploader';
import Editor from '../components/ProductRegist/Editor';
import PageLoading from '@/components/Loading/PageLoading';
import { productApi } from '@/api';

export default {
  name: 'ProductRegist',
  components: {
    RadioBtn,
    TableOption,
    TableOptionDetail,
    TableCategory,
    TableDiscount,
    FileUploader,
    Editor,
    PageLoading
  },
  data() {
    return {
      allInfo: {
        image_1: '',
        image_2: '',
        image_3: '',
        image_4: '',
        image_5: '',
        name: '', // 완료
        is_on_sale: 0, // 완료
        is_displayed: 0, // 완료
        discount_rate: 0, // 완료
        discount_price: 0, // 완료
        simple_description: '', // 완료
        detail_description: '', // 완료
        price: 0, // 완료
        min_unit: 1, // 완료
        max_unit: 20, // 완료
        is_stock_managed: 1, // append 완료
        stock_number: 1, // append 완료
        first_category_id: 10, // 완료
        second_category_id: 100, // 완료
        discount_start_date: '2020-10-20', // end date 안찍히는문제 해결필요 //append 완
        discount_end_date: '2020-11-01', // end date 안찍히는문제 해결필요 //append 완
        seller_id: 10, // 완료
        is_definite: 1 // 무기한 선택시
      },
      firstCat: [],
      secondCat: [],
      optionResult: {},
      selectedRadio: {},
      searchResult: [],
      sellerSearchInput: '',
      selectedSeller: {},
      searchActive: false,
      modalActive: false,
      minDisabled: true,
      maxDisabled: true,
      salesPrice: 0,
      min_amount: 1,
      max_amount: 20,
      btnList1: ['판매', '미판매'],
      btnList2: ['진열', '미진열'],
      btnList3: ['상품상세 참조', '직접입력'],
      droplist: [],
      images: {
        image_1: '',
        image_2: '',
        image_3: '',
        image_4: '',
        image_5: ''
      },
      done: true
    };
  },
  computed: {
    updateSearch: function() {
      return this.searchResult;
    },
    formattedPrice() {
      return this.allInfo.price.toLocaleString();
    }
  },
  created() {
    document.addEventListener('click', this.toggleModal);
  },
  methods: {
    updateDiscountDate(date) {
      this.allInfo.discount_start_date = date[0];
      this.allInfo.discount_end_date = date[1];
      if (date[1]) {
        this.allInfo.discount_start_date = this.dateToString(
          this.allInfo.discount_start_date
        );
        this.allInfo.discount_end_date = this.dateToString(
          this.allInfo.discount_end_date
        );
      }
      return this.allInfo;
    },
    dateToString(date) {
      const year = date.getFullYear();
      const month =
        date.getMonth() + 1 > 9
          ? `${date.getMonth() + 1}`
          : `0${date.getMonth() + 1}`;
      const day =
        date.getDate() > 9 ? `${date.getDate()}` : `0${date.getDate()}`;

      return `${year}-${month}-${day}`;
    },

    // 이미지 자식에서 받은거 allInfo에 각각 담는 함수
    handleFile(args) {
      const fileList = args[0];
      const file = fileList[0];
      const fileId = args[1];
      this.allInfo[fileId] = file;
      return this.allInfo;
    },
    // 옵션 선택 테이블에서 선택된 옵션을 받아서 옵션디테일 테이블에 내려주는 함수
    optionRegist(option) {
      this.optionResult = option;
    },
    // 옵션 디테일 테이블에서 빨간색 마이너스 버튼 클릭시 해당 옵션 삭제
    optionDelete(args) {
      let clickedColor = args[0]; // 'black'
      let targetSize = this.optionResult[args[0]][args[2]]; // 'M'
      let clickedArr = this.optionResult[clickedColor]; // Black의 ['S', 'M']
      let sizeIdx = clickedArr.indexOf(targetSize);
      let resArr = clickedArr.splice(sizeIdx, 1);
      return resArr;
    },

    // 셀러 모달 바깥 영역을 클릭시 닫는 함수
    // toggleModal() {
    //   event.stopPropagation();
    //   if (
    //     event.target.className !== 'search-btn' &&
    //     event.target.className !== 'seller-modal' &&
    //     event.target.className !== 'seller-class'
    //   ) {
    //     this.modalActive = false;
    //   }
    // },
    openSeller() {
      this.modalActive = !this.modalActive;
    },
    closeSeller() {
      if (this.selectedSeller['korean_name']) {
        this.modalActive = !this.modalActive;
      }
    },
    closeModal() {
      this.modalActive = false;
    },
    // 셀러 검색 get 요청하는 함수
    sendSearch() {
      productApi
        .getSellerName(this.sellerSearchInput)
        .then(res => {
          if (res.data) {
            this.searchResult = res.data;
          }
        })
        .catch(err => {
          console.log(err);
          console.log(err.response);
          if (err.response.data) {
            alert('해당하는 셀러가 없습니다.');
          }
        });
    },
    // 셀러 선택시 allInfo 에 담는 함수
    updateSeller(idx) {
      this.selectedSeller = this.searchResult[idx];
      this.allInfo.seller_id = this.selectedSeller.s_id;
    },

    // form의 모든 사항을 입력했는지 체크하는 함수
    submitCheck() {
      if (this.allInfo.name === '') {
        alert('상품명을 입력해주세요.');
      } else if (this.allInfo.simple_description === '') {
        alert('상세 상품 정보를 입력해주세요.');
      } else if (this.allInfo.seller_id === 0) {
        alert('셀러 이름을 입력해주세요.');
      } else if (this.allInfo.image_1 === '') {
        alert('대표 이미지를 등록해주세요.');
      } else if (this.allInfo.price === 0) {
        alert('판매가를 입력해주세요.');
      } else {
        return true;
      }
    },

    // form 에 append 하는 함수
    submitForm() {
      if (this.submitCheck()) {
        console.log('submitform');

        const form = new FormData();
        // form.append('options', this.optionResult);
        form.append('image_1', this.allInfo.image_1);
        form.append('image_2', this.allInfo.image_2);
        form.append('image_3', this.allInfo.image_3);
        form.append('image_4', this.allInfo.image_4);
        form.append('image_5', this.allInfo.image_5);
        form.append('name', this.allInfo.name);
        form.append('is_on_sale', this.allInfo.is_on_sale);
        form.append('is_displayed', this.allInfo.is_displayed);
        form.append('discount_rate', this.allInfo.discount_rate);
        form.append('discount_price', this.allInfo.discount_price);
        form.append('simple_description', this.allInfo.simple_description);
        form.append('detail_description', this.allInfo.detail_description);
        form.append('min_unit', this.allInfo.min_unit);
        form.append('max_unit', this.allInfo.max_unit);
        form.append('price', this.allInfo.price);
        form.append('is_stock_managed', this.allInfo.is_stock_managed);
        form.append('stock_number', this.allInfo.stock_number);
        form.append('first_category_id', this.allInfo.first_category_id);
        form.append('second_category_id', this.allInfo.second_category_id);
        form.append('discount_start_date', this.allInfo.discount_start_date);
        form.append('discount_end_date', this.allInfo.discount_end_date);
        form.append('seller_id', this.allInfo.seller_id);
        form.append('modifier_id', this.allInfo.seller_id);
        form.append('is_definite', this.allInfo.is_definite);

        productApi
          .registProduct(form)
          .then(res => {
            console.log(res);
            if (res.data) {
              alert('상품이 등록이 완료되었습니다.');
              console.log('제출완료');
            }
          })
          .catch(err => {
            console.log(err);
            console.log(err.response.message);
            if (err.response) {
              alert(err.response.message);
            }
          });
      }
    },

    // 셀러선택 버튼 클릭 시 1차 카테고리를 요청하는 함수
    getFirCat() {
      productApi
        .getFirCategory(this.selectedSeller.attr_id)
        .then(res => {
          console.log(res);
          if (res.data) {
            console.log('firstcategory 200');
            this.firstCat = res.data;
            console.log('firstcat', this.firstCat);
          }
        })
        .catch(err => {
          console.log(err);
          console.log(err.response.message);
          alert('1차 카테고리를 불러오는데 실패하였습니다.');
        });
    },
    // 1차 카테고리를 자식에서 선택하면 담고, 그 후에 2차 카테고리 요청
    updateFirCategory(fId) {
      this.allInfo.first_category_id = fId;
      if (this.allInfo.first_category_id) {
        productApi
          .getSecCategory(this.allInfo.first_category_id)
          .then(res => {
            console.log(res);
            if (res.data) {
              console.log('secondcategory 200');
              this.secondCat = res.data;
            }
          })
          .catch(err => {
            console.log(err);
            console.log(err.response.message);
            alert('2차 카테고리를 불러오는데 실패하였습니다.');
          });
      }
    },
    updateSecCategory(sId) {
      this.allInfo.second_category_id = sId;
    },

    // 라디오버튼 업데이트하는 함수
    updateRadioSales(label) {
      this.allInfo.is_on_sale = label;
    },
    updateRadioDisplay(label) {
      this.allInfo.is_displayed = label;
    },
    updateRadioProduct(label) {
      this.allInfo.is_displayed = label;
    },

    // 할인률, 할인가격 자식 컴포넌트로부터 받아서 담는 함수
    updateDiscount(args) {
      this.allInfo.discount_rate = Number(args[0]);
      this.allInfo.discount_price = args[1];
    },

    // 최소, 최대 수량 핸들링하는 함수
    updateMinSelect(e) {
      if (e.target.value === '1') {
        this.min_amount = 1;
        this.allInfo.min_unit = this.min_amount;
      } else {
        if (this.min_amount < 0) {
          alert('최소 수량은 1개입니다.');
          this.min_amount = 1;
        }
        if (this.min_amount > 20) {
          alert('최대 수량은 20개입니다.');
          this.min_amount = 20;
        }
        this.allInfo.min_unit = this.min_amount;
      }
    },
    updateMaxSelect(e) {
      if (e.target.value === '1') {
        this.max_amount = 20;
        this.allInfo.max_unit = this.max_amount;
      } else {
        if (this.max_amount < 0) {
          alert('최소 수량은 1개입니다.');
          this.max_amount = 1;
        }
        if (this.max_amount > 20) {
          alert('최대 수량은 20개입니다.');
          this.max_amount = 20;
        }
        this.allInfo.max_unit = this.max_amount;
      }
    },
    setInputActive(e) {
      if (e.target.name === 'min-product') {
        this.minDisabled = false;
      }
      if (e.target.name === 'max-product') {
        this.maxDisabled = false;
      }
    },
    validatePrice() {
      if (this.allInfo.price % 10 !== 0) {
        alert('10원 단위로 입력해주세요.');
        this.allInfo.price = 0;
      }
    },
    alertCancel() {
      if (confirm('상품 등록을 취소하시겠습니까?')) {
        this.$router.push('/');
      }
    }
  },
  mounted() {
    this.done = false;

    setTimeout(() => {
      this.done = true;
    }, 800);
  }
};
</script>

<style lang="scss" scoped>
@import '../styles/commonD.scss';

.submit-btn {
  width: 60px;
  height: 30px;
  border: none;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  background-color: #5bc0de;
  color: white;
  font-family: Verdana, sans-serif;
  font-size: 14px;

  &:hover {
    background-color: #4bb8d6;
  }
}

.title {
  display: flex;
  justify-content: flex-start;
  height: 30px;
  margin-top: 50px;

  p {
    align-self: flex-end;
    margin-left: 10px;
    line-height: 1.7;
  }
}

.table-small {
  position: relative;
}

.flex-box {
  display: flex;
  align-items: center;
}

.flex-box-center {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 50px;
}

.blue-text {
  @include blue-text;
}

.price-box {
  display: flex;
  align-items: center;
  width: 150px;
  height: 30px;
  margin: 10px 0 10px 10px;
  padding: 5px;
  border: 1px solid $midgrey;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  text-indent: 5px;
}

.point-box {
  display: flex;
  align-items: center;
  width: 30px;
  height: 30px;
  border-top: 1px solid $midgrey;
  border-bottom: 1px solid $midgrey;
  border-right: 1px solid $midgrey;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  font-size: 14px;
  font-weight: 500;
  text-indent: 5px;
  color: white;
  background-color: $midblue;
}

.discount-table {
  width: 100%;
}

.sales-input {
  width: 100px;
  height: 30px;
  margin: 0 10px;
  padding: 5px;
  border: 1px solid $midgrey;
  border-radius: 5px;
  background-color: $lightgrey;
  text-indent: 5px;

  &:focus {
    outline: none;
  }
}

label {
  margin-right: 20px;
}

tr {
  color: $darkgrey;
  font-size: 14px;

  &:first-child {
    height: 30px;
    text-align: left;
    text-indent: 15px;
    color: $darkgrey;
    background-color: $coolgrey;

    .fa,
    .fas {
      margin-right: 10px;
    }
  }

  &:last-child {
    th {
      border-bottom-left-radius: 10px;
    }
  }

  // 셀러선택, 판매여부 ...
  th {
    display: table-cell;
    vertical-align: middle;
    min-width: 10vw;
    max-width: 15vw;
    padding: 10px;
    border-top: 1px solid $midgrey;

    &:first-child {
      background-color: $softgrey;
    }
  }

  td {
    display: table-cell;
    vertical-align: middle;
    padding: 10px;
    width: 100%;
    border-left: 1px solid $midgrey;
    border-top: 1px solid $midgrey;

    // 검정색 바
    &:first-child {
      border: none;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
  }
}

.seller-modal {
  position: fixed;
  top: 18%;
  left: 34%;
  width: 600px;
  height: 400px;
  padding: 30px;
  color: $darkgrey;
  background-color: $lightgrey;
  border: 1px solid $softgrey;
  border-radius: 5px;
  z-index: 180;

  h2 {
    padding-bottom: 30px;
    border-bottom: 1px solid $midgrey;
    font-size: 22px;
  }

  p {
    margin: 20px 0;
    font-size: 12px;
    color: $midblue;
  }

  h3 {
    font-size: 18px;
  }

  input[type='text'] {
    width: 350px;
    height: 30px;
    margin: 10px 0;
    border: 1px solid $midgrey;
    border-radius: 5px;
    background-color: $lightgrey;
    text-indent: 4px;
  }

  .seller-container {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .seller-box {
    position: relative;
    .fa-times {
      position: absolute;
      top: 0px;
      right: 0px;
    }
  }

  .selected-seller {
    position: absolute;
    left: 150px;
    display: flex;
    align-items: center;
    width: 250px;
    height: 30px;
    text-indent: 10px;
  }

  .seller-img {
    width: 30px;
    height: 30px;
  }

  .result-name {
    margin: 0;
    color: $darkgrey;
    font-size: 18px;
  }
}

.seller-flex {
  display: flex;
  justify-content: center;
}

.result-container {
  position: relative;

  input[type='text'] {
    width: 250px;
    height: 30px;
  }

  .fa-search {
    position: absolute;
    top: 18;
    right: 10;
  }

  li {
    display: flex;
    width: 250px;
    height: 30px;
    border-bottom: 1px solid $midgrey;
    background-color: white;
    text-indent: 10px;

    &:hover {
      background-color: $softgrey;
    }

    .seller-img {
      width: 30px;
      height: 30px;
    }

    .seller-name {
      margin: 0;
      height: 30px;
      color: $darkgrey;
      font-size: 14px;
      line-height: 30px;
    }
  }
  .seller-result {
    margin-top: 0;
    height: 180px;
    font-size: 14px;
    color: $darkgrey;
    overflow: scroll;
  }
}

.upload-blue-btn {
  @include blue-btn;
  position: absolute;
  top: 80px;
  left: 35px;
  border-radius: 5px;
  pointer-events: none;
}

.upload-black-btn {
  @include black-btn;
  position: absolute;
  top: 80px;
  left: 48px;
  border-radius: 5px;
  pointer-events: none;
}

.product-regist {
  font-family: Verdana, sans-serif;
  font-weight: 400;
  color: $darkgrey;

  h1 {
    font-size: 26px;
  }

  input:focus {
    outline: none;
  }

  button {
    height: 30px;
    padding: 0 15px;
    color: white;
    letter-spacing: 0.04rem;
  }

  .img-container {
    position: relative;
  }

  .btn-container {
    @include btnContainer;
  }

  .blue-btn {
    @include blue-btn;
    border-radius: 5px;
  }

  .black-btn {
    @include black-btn;
    border-radius: 5px;
  }

  .cancel-btn {
    width: 60px;
    height: 30px;
    border: none;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    background-color: #d9534f;
    color: white;
    font-family: Verdana, sans-serif;
    font-size: 14px;

    &:hover {
      background-color: #d1493f;
    }
  }

  .caption-blue-bold {
    font-weight: 500;
    font-size: 12px;
    line-height: 2.3;
    color: $midblue;
  }

  .caption-black {
    font-weight: 500;
    font-size: 12px;
  }

  .radio-btn-container {
    display: flex;
    flex-wrap: wrap;
  }

  .table-container {
    border: 1px solid $midgrey;
    border-radius: 10px;
    margin-top: 20px;
  }

  .basic-table {
    width: 100%;
    display: table;
    vertical-align: middle;
    border-collapse: collapse;

    .seller-search {
      width: 300px;
      height: 30px;
      text-indent: 4px;
      border: 1px solid $midgrey;
      border-radius: 5px;
      background-color: $softgrey;
    }

    .search-btn {
      display: table-cell;
      vertical-align: middle;
      width: 100px;
      height: 30px;
      color: white;
      background-color: $midblue;
      border-radius: 5px;
    }

    .product-name,
    .product-info {
      width: 600px;
      height: 30px;
      text-indent: 5px;
      border: 1px solid $midgrey;
      border-radius: 5px;
    }

    .img-regist-whole {
      width: 100%;
      padding: 10px;
      border: 1px solid $midgrey;
      display: flex;
      flex-wrap: wrap;

      .img-regist-container {
        margin: 10px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;

        button {
          margin-top: 10px;
        }
      }
    }
  }
}

.text-area {
  width: 100%;
  height: 300px;
  margin-top: 10px;
  resize: none;
}

input[type='radio'] {
  width: 13px;
  height: 13px;
  appearance: none;
  border-radius: 100%;
  margin-right: 0.3rem;
  background-color: white;
  border: 1px solid $midgrey;
}

input[type='radio']:checked {
  appearance: none;
  border-radius: 100%;
  margin-right: 0.3rem;
  background-color: $darkgrey;
  border: 3px solid $midgrey;
}

input[type='radio']:focus {
  outline: none;
}
</style>
