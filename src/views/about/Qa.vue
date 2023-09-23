<template>
  <el-scrollbar class="box w-100" wrap-class="scrollbar-box">
    <div class="m-5">
      <h2
        style="color: #005089; background: rgba(110, 200, 218, .2); border-radius: 20%; text-decoration:  underline;"
        class="ms-2 text-center py-2 link-offset-1"
      >常見問題集
      </h2>
      <div
      v-for="(item, index) in question"
        class="my-5"
      >
        <p class="fs-6 m-5 me-0" style="line-height: 3;">
          <span class="fs-4">Q{{ index + 1 }} : </span>
          {{ item[0] }}
        </p>
        <p class="fs-6 m-5" style="line-height: 3;">
          <span class="fs-4">A : </span>
          {{ item[1] }}
        </p>
        <el-divider></el-divider>
      </div>
    </div>
    <div style="background: #005089;" class="text-light text-center">
        &copy; 2023 - {{ new Date().getFullYear() }} by Allison Lin
    </div>
    <el-backtop :visibility-height="100" target=".scrollbar-box" />
  </el-scrollbar>
</template>

<script setup>
import { ref } from 'vue';

const question = ref([['獎勵然而否則興趣職業大學諾基亞，大門體育病毒大盤推坑王律師按鈕供應核心，刪除試驗那個江湖將軍指標德國上傳讓你免費電影美女瀏覽器內部，天空多麼戀愛春天財富利用差距，防止十大看出教育處罰農村信箱門口，台中能否，初步影片政策不了一部分，透露不在？', '明白空氣街道創建回來登記，越來越首頁通用連載服裝防治綠色看不到，是不是，指標機票爭取感染形成將來投資者有一種，文檔歡迎光臨知調節，古代團體明天批評民族五年先生吸引數碼相機，當初危險大幅那位跟着培養展示，烏日審核堅決，版主股權距離召開許多感染鼓勵老師你的那個通知，變化有關相應害怕剛才依靠尷尬插入有點求職部分浙江有一種，網際錯誤員工全體尋求學校人物服飾，夫妻本次年齡。'],['獎勵然而否則興趣職業大學諾基亞，大門體育病毒大盤推坑王律師按鈕供應核心，刪除試驗那個江湖將軍指標德國上傳讓你免費電影美女瀏覽器內部，天空多麼戀愛春天財富利用差距，防止十大看出教育處罰農村信箱門口，台中能否，初步影片政策不了一部分，透露不在？', '明白空氣街道創建回來登記，越來越首頁通用連載服裝防治綠色看不到，是不是，指標機票爭取感染形成將來投資者有一種，文檔歡迎光臨知調節，古代團體明天批評民族五年先生吸引數碼相機，當初危險大幅那位跟着培養展示，烏日審核堅決，版主股權距離召開許多感染鼓勵老師你的那個通知，變化有關相應害怕剛才依靠尷尬插入有點求職部分浙江有一種，網際錯誤員工全體尋求學校人物服飾，夫妻本次年齡。']])
</script>