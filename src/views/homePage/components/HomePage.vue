<template>
    <div>
        <el-row class="row-bg" justify="space-around" type="flex">
            <el-col :span="9">
                <el-input
                        clearable
                        placeholder="Поиск"
                        style="margin: 0 0 16px 0;"
                        @input="inputSearch"
                        v-model="input">
                </el-input>
                <div class="grid-content-left bg-purple" v-if="itemsCount">
                    <div :id="item"
                         :key="item"
                         @click="clickRow(item)"
                         class="list-row"
                         v-for="(item, value) in itemsCount"> {{value}}</div>
                </div>
            </el-col>
            <el-col :span="9">
                <div :id="item"
                     :key="value"
                     v-for="(item, value) in listCount">
                    <div>{{value}}:</div>
                    <div v-if="checkArray(item)">
                        <el-col
                             :key="i"
                             v-for="i in item">{{ i }}</el-col>
                    </div>
                    <div v-else>{{item}}</div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>

  import homeApi from '../api/homeApi'

  export default {
      name: 'HomePage',
      data() {
          return {
              input: '',
              search: null,
              users: null,
              itemsCount: null,
              list: null,
              listCount: null,
              keys: null,
          }
      },
      mounted() {
            this.getData();
      },
      methods: {
          getData() {
              homeApi.getItems()
                  .then(response => {
                      this.itemsCount = response.data;
                      this.list = response.data;
                      this.keys = Object.keys(this.list);
                  })
                  .catch(error => {
                      console.log(error)

                  })
          },
          inputSearch(e) {
              this.itemsCount = {};
              if(e) {
                  this.keys.forEach(item => {
                      if(item.toLowerCase().includes(e.toLowerCase())) {
                         this.itemsCount[`${item}`] = this.list[item];
                      }
                  })
              } else {
                  this.itemsCount = this.list;
              }
          },
          async clickRow(e) {
              this.getList(e);
              let elem = await document.querySelector('.active');
              elem && elem.classList.remove('active');
              let clicked = await document.getElementById(e);
              clicked.classList.add('active');
          },
          getList(url){
              homeApi.getDataList(url)
                  .then(response => {
                      //console.log(response.data.results);
                      this.listCount = response.data.results[0];
                  })
                  .catch(error => {
                      console.log(error);

                  })
          },
          checkArray(item) {
              return  typeof(item) === 'object';
          }
      }
  }
</script>

<style scoped>
    .row-bg {
        margin: 16px;
        padding: 8px;
        background-color: #f9fafc;
    }
    .bg-purple {
        background: #ffffff;
    }
    .grid-content-left {
        border-radius: 4px;
        min-height: calc(100vh - 168px);
    }
    .grid-content-right {
        border-radius: 4px;
        min-height: calc(100vh - 112px);
    }
    .list-row {
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        margin: 4px 8px 0 8px;
        height: 40px;
        background: #fff6f6;
        color: #ff8484;
        line-height: 41px;
        padding: 0 0 0 16px;
        cursor: pointer;
        transition: .3s;
    }
    .list-row:hover {
        background: #fde2e2;
        transition: .3s;
    }
    .active {
        background: #fde2e2;
    }
    .name {
        color: #960530;
        font-size: 24px;
        height: 48px;
        line-height: 48px;
        text-align: start;
        padding: 0 0 0 16px;
    }
    .cross {
        opacity:0;
        transition: .3s;
        color: #960530;
        font-size: 24px;
        height: 48px;
        line-height: 58px;
        padding: 0 32px 0 0;
        cursor: pointer;
    }
    .wrap-cross:hover .cross {
        opacity:1;
        transition: .3s;
    }
</style>
