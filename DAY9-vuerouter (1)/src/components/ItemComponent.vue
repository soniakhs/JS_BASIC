<template>
  <div class="item">
    <div class="item-header">
      <div class="title-bar">{{item.title}}</div>
      <div class="date-box">
        <span class="date">{{formatDate}}</span>
      </div>
    </div>
    <div class="info-bar">
      <div class="button-group">
        <router-link :to="`/view/${item.id}`" class="btn btn-sm btn-outline-success">보기</router-link>
        <button class="btn btn-sm btn-outline-danger" @click="delItem">삭제</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "itemcompo",
  props: ["item"],
  computed: {
    formatDate() {
      let value = new Date(this.item.date);
      return `${value.getFullYear()}-${value.getMonth() +
        1}-${value.getDate()}`;
    }
  },
  methods: {
    async delItem(e) {
      try {
        let result = await Swal.fire({
          title: "정말 삭제하시겠어요?",
          text: "삭제시 되돌릴 수 없습니다",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "네 삭제할게요",
          cancelButtonText: "아니오"
        });
        if (result.value) {
          let res = await axios.delete(`/api/todo?id=${this.item.id}`);
          const data = res.data;
          this.$emit("delete", e, data);
          Swal.fire({
            title: "성공",
            text: "삭제가 정상적으로 완료되었습니다.",
            icon: "success"
          });
        }
      } catch (err) {
        Swal.fire({
          title: "실패",
          text: "삭제중 오류 발생",
          icon: "warning"
        });
      }
    }
  }
};
</script>

<style scoped>
.item-header > .title-bar {
  margin-left: -20px;
  border-radius: 0 5px 5px 0;
  min-width: 100%;
  padding-left: 10px;
  min-height: 30px;
  background-color: rgb(148, 230, 111);
  letter-spacing: -1px;
  line-height: 1;
  font-weight: bold;
  color: rgb(255, 255, 255);
  display: flex;
  align-items: center;
}
.item-header > .date-box {
  display: flex;
  justify-content: flex-end;
  margin-top: 5px;
}

.date-box > .date {
  border: 1px solid rgb(148, 230, 111);
  padding: 4px 8px;
}

.item {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 20px;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  box-sizing: border-box;
}

.info-bar {
  display: flex;
  justify-content: flex-end;
}
</style>
