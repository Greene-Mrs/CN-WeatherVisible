<script lang="ts" setup>
import { inject, onMounted, ref, watchEffect } from 'vue'  //子组件直接访问、挂载、渲染、数据改变再执行
import type { Ref } from 'vue'
import type { Coord } from '@/types/http' //经纬度
import type { SearchHotCitysData, SearchSuggestData } from '@/types/searchInfo'
import { getSearchHotCitys, getSearchSuggest } from '@/http'
import Scroll from '@/components/components/Scroll.vue'

// inject 注入
const location = inject<Ref<Coord>>('location')!
const mapCenter = inject<Ref<[number, number]>>('mapCenter')!

// 搜索关键字
const searchKey = ref('')
// 搜索联想(结果)框是否可见
const isSuggestVisible = ref(false)

// 获取热门城市信息
const hotCitysList = ref<SearchHotCitysData[]>([])
const getSearchHotCitysInfo = async () => {
  const res = await getSearchHotCitys()         /* api */
  console.log(res)
  hotCitysList.value = res.data
}
// 选择热门城市 点击事件 获得位置信息并更新 location mapCenter
const chooseCity = (e: MouseEvent) => {
  console.log(e)
  let target = e.target as HTMLElement | null
  if (target && target.tagName.toLowerCase() === 'span')//判断是否是span标签
  {
    let info = target.dataset.info?.split(',')
    console.log(info)
    if (info) {
      let lat = parseFloat(info[0])
      let lng = parseFloat(info[1])
      location.value = { lat, lng }
      mapCenter.value = [lng, lat]
    }
  }
  isSuggestVisible.value = false  //城市建议框隐藏
}

// 获取搜索建议(结果)
const suggestList = ref<SearchSuggestData[]>([])
const getSearchSuggestInfo = async () => {
  const res = await getSearchSuggest(searchKey.value)
  console.log(res)
  suggestList.value = res.data
}

// 选择搜索地址 点击事件 获得位置信息并更新 location mapCenter
const chooseAddress = (e: MouseEvent) => {
  console.log(e)
  const target = (e.target as HTMLElement) || null
  const item = target.closest('.item')
  if (item) {
    const loca = item.getAttribute('data-location')
    if (loca) {
      const lArr = loca.split(',')
      console.log(lArr)
      let lat = parseFloat(lArr[1])
      let lng = parseFloat(lArr[0])
      location.value = { lat, lng }
      mapCenter.value = [lng, lat]
    }
  }
  isSuggestVisible.value = false
}

onMounted(() => {
  getSearchHotCitysInfo()
})
watchEffect(() => {
  if (searchKey.value) {
    getSearchSuggestInfo()
  }
})
</script>

<template>
  <div class="header">
    <div class="logo-img">
      <img src="@/assets/img/TIANQI.png">
      全国空气质量可视化
    </div>
    <div class="search">
      <input class="search-input" placeholder="搜索国内城市" v-model="searchKey" @click="() => {
        isSuggestVisible = !isSuggestVisible
      }" />
      <div class="search-suggest" v-show="isSuggestVisible">
        <div class="hot-citys" v-if="!searchKey">
          <div class="title">热门城市</div>
          <div class="citys" @click="chooseCity">
            <span class="item" v-for="item in hotCitysList" :data-info="item">{{ item[2] }}</span>
          </div>
        </div>
        <div class="suggest-list" v-else>
          <Scroll>
            <div class="list" @click="chooseAddress">
              <div class="item" v-for="item in suggestList" :data-location="item.location">
                <p class="name">{{ item.name }}</p>
                <p class="district">{{ item.district }}</p>
              </div>
            </div>
          </Scroll>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  overflow: visible;
  border: 2px solid #11e1b0;

  .logo-img {
    font-size: 37px;
    font-weight: 700;
    color: #618684;
    padding-bottom: 1px;

    img {
      height: 40px;
      margin-left: 15px;
      margin-right: 15px;
    }

  }

  .search {
    position: relative;

    .search-input {
      width: 400px;
      height: 36px;
      margin: 7px 200px 7px 0;
      padding: 5px 10px;
      font-size: 16px;
      color: #444;
      background: #ebeaea;
      border-radius: 5px;
      border: 2px solid #cdca65;
      cursor: text;
      z-index: 0;
    }

    .search-suggest {
      position: absolute;
      top: 49px;
      width: 400px;
      height: 370px;
      background-color: #ffffff;
      border: 1px solid #cdca65;
      z-index: 5;

      .hot-citys {
        padding-top: 6px;

        .title {
          text-align: left;
          font-size: 16px;
          height: 30px;
          width: 72px;
          line-height: 30px;
          margin-left: 16px;
          user-select: none;
          border: 2px solid #cdca65;
        }

        .citys {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
          margin: 0 10px;
          text-align: center;

          .item {
            cursor: pointer;
            height: 30px;
            line-height: 30px;
            width: 54px;
            margin: 4px;
            font-size: 14px;
            border-radius: 2px;
            border: none;
            background: #f7f7f7;
            border: 1px solid #cdca65;
          }
        }
      }

      .suggest-list {
        .list {
          position: relative;
          top: 0;
          left: 0;
          margin: 0;
          padding: 0 20px;
          max-height: 400px;
          background: #fff;
          text-align: left;

          .item {
            padding: 10px 0;
            border-bottom: 1px solid #e5e5e5;
            cursor: pointer;

            .name {
              font-size: 15px;
            }

            .district {
              color: #666;
              font-size: 13px;
              padding-top: 5px;
            }
          }
        }
      }
    }
  }
}
</style>
