<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const route = useRoute(); //현재 라우팅 정보
const router = useRouter(); //이동 기능

const isEdit = computed(() => !!route.params.id); //주소에 id있으면 수정 없으면 새로 등록
const tradeId = route.params.id; //URL에 있는 거래의 고유 ID 땡긴댜
const userId = 'tokkaeng'; // 실제로는 Pinia 등에서 가져와야 한다고함

const type = ref('income'); // 수입/지출 선택
const date = ref(''); //날짜
const price = ref(0); //돈
const categoryId = ref(''); //카테괼 아이디
const desc = ref(''); //사용하는놈이 쓴 내용
const categoryList = ref([]); //카테 목록

const fetchCategories = async () => {
  const { data } = await axios.get(`/category?type=${type.value}`);
  console.log('📦 받아온 카테고리 목록:', data); //콘솔창 확인용 -추가
  categoryList.value = data;
}; //type(수입/지출)에 따라 맞는 카테고리 떙김

watch(type, fetchCategories); //type 값이 변경될 때마다 fetchCategories 함수를 실행하여 카테고리 목록을 다시 가져옴

const fetchTrade = async () => {
  const { data } = await axios.get(`/trade_list/${tradeId}`);
  type.value = data.type;
  date.value = data.date;
  price.value = data.price;
  categoryId.value = data.categoryId;
  desc.value = data.desc;
  await fetchCategories();
}; //수정일 때 기존 데이터 떙김

const handleSubmit = async () => {
  const payload = {
    userid: userId,
    type: type.value,
    date: date.value,
    price: Number(price.value),
    categoryId: Number(categoryId.value),
    desc: desc.value,
  };

  if (isEdit.value) {
    await axios.patch(`/trade_list/${tradeId}`, payload);
  } else {
    await axios.post(`/trade_list`, payload);
  }

  router.push('/transactions'); //저장 후 거래목록 페이지로 이동
}; //저장누르면 실행

const handleDelete = async () => {
  if (confirm('정말 삭제하시겠습니까?')) {
    await axios.delete(`/trade_list/${tradeId}`);
    router.push('/transactions');
  }
}; //삭제

onMounted(() => {
  isEdit.value ? fetchTrade() : fetchCategories(); //참이면 앞놈 거짓이면 뒷놈
});
//컴포넌트가 화면에 나타날 때 실행할 코드를 정의
// 여기서는 isEdit 값에 따라 다른 함수를 호출
//수정 - 기존 거래 / 신규 - 캐테고리 목록
</script>

<template>
  <div class="edit-page">
    <!--전체 페이지를 감싸는 컨테이너-->
    <!-- 수입 / 지출 탭 -->
    <div class="type-tab">
      <button :class="{ active: type === 'income' }" @click="type = 'income'">
        수입
        <!--type이 'income'일 때 해당 버튼에 'active' 클래스를 
        추가하여 스타일을 변경-->
      </button>
      <button :class="{ active: type === 'outcome' }" @click="type = 'outcome'">
        지출
        <!--버튼을 클릭하면 type 값을 'income'으로 설정-->
      </button>
    </div>

    <!-- 날짜 -->
    <label class="form-label" for="inputdate"> 날짜 </label>
    <div class="input">
      <input type="date" v-model="date" class="form-control" id="inputdate" />
      <i class="fa-calendar-days"></i>
    </div>
    <br />

    <!-- 금액 -->
    <label class="form-label" for="inputmoney"> 금액 </label>
    <div class="input M-input">
      <span class="currency">₩</span>
      <input
        type="number"
        id="inputmoney"
        class="form-control"
        v-model="price"
      />
    </div>
    <br />
    <!-- 카테고리 -->
    <label class="form-label" for="inputcategory"> 카테고리 </label>
    <div class="input">
      <select v-model="categoryId" class="form-control" id="inputcategory">
        <option disabled value="">카테고리 선택</option>
        <option v-for="cat in categoryList" :key="cat.id" :value="cat.id">
          {{ cat.name }}
        </option>
      </select>
    </div>
    <br />
    <!-- 내용 -->
    <label class="form-label" for="text"> 내용 </label>
    <div class="input">
      <input
        type="text"
        v-model="desc"
        placeholder="거래에 대한 설명을 입력하세요"
        class="form-control"
        id="text"
      />
    </div>
    <br />
    <!-- 버튼 영역 -->
    <div class="button-row">
      <button class="cancel" @click="router.back()">취소</button>
      <button class="submit" @click="handleSubmit">저장</button>
      <button v-if="isEdit" class="delete" @click="handleDelete">삭제</button>
    </div>
  </div>
</template>

<style scoped>
.input {
  text-align: center;
}
.M-input {
  position: relative;
  width: 500px;
  margin: 0 auto;
}
.M-input .currency {
  position: absolute;
  top: 50%;
  left: 25px;
  transform: translateY(-50%);
  font-size: 18px;
  pointer-events: none;
}
.M-input input {
  width: 100%;
  height: 60px;
  padding: 1px 20px;
  padding-left: 30px;
  font-weight: 550;
  font-family: inherit;
  border-radius: 8px;
  border: 1px solid #ddd;
  text-align: right;
}
.form-label {
  color: rgba(0, 0, 0, 0.5);
  padding: 30px;
}
.form-control {
  padding: 1px 20px;
  width: 500px;
  height: 60px;
  font-weight: 550;
  font-family: inherit;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.edit-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.type-tab {
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-bottom: 16px;
}
.type-tab button {
  display: flex;
  padding: 10px 55px;
  border: 1px solid #ddd;
  border-radius: 50px;
  background: #f0f0f0;
  font-weight: bold;
}

.type-tab button.active {
  background: #007bff;
  color: white;
}

.date-wrapper {
  position: relative;
}
.date-wrapper i {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0.5;
}

.button-row {
  display: flex;
  padding: 6px;
  gap: 10px;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}
button.cancel {
  background: #ddd;
  flex: 1;
}
button.submit {
  background: #007bff;
  color: white;
  flex: 1;
}
button.delete {
  background: #b7e9fc;
  color: white;
  flex: 1;
}
button {
  padding: 10px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
</style>
