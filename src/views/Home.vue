<template>
  <div class="home">
    <el-row type="flex" justify="center">
      <el-col :span="24">
        <h1>雷电数据可视化</h1>
        <iframe src="http://www.cnlightning.cn/CnlightningBuilder/index.html" frameborder="10" width="100%" height="800px"></iframe>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="24">
        <h1>雷电数据</h1>
        <div style="width:100%; height:100%" >
          <div id="datafall">
              <el-table :data="tableData" ref="table" stripe border style="width: 100%;" max-height="450">
                <el-scrollbar>
                <el-table-column
                  prop="Location"
                  label="地点"
                  header-align="center"
                  width="280"
                  fixed
                >
                </el-table-column>
                <el-table-column
                  prop="Name1"
                  label="经度"
                  width="100"
                  header-align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="Name2"
                  label="纬度"
                  width="100"
                  header-align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="Intens"
                  label="雷电强度"
                  width="100"
                  header-align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="Redata"
                  label="原始数据"
                  header-align="center"
                >
                </el-table-column>
                </el-scrollbar>
              </el-table>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
// @ is an alias to /src
const dayjs = require('dayjs');
let scrollTimer;
let freq = 300; // 数据滚动频率

export default {
  name: 'home',
  data() {
    return {
      fetching: false,
      thunderData: {},
      tableData:[
        {
          Number:'',
          Location:'',
          Name1:'',
          Name2:'',
          Intens:'',
          Redata:'',
        }
      ],
    };
  },
  methods: {
    //获取数据的方法
    fetchData(timeBefore) {
      if (!this.fetching) {
        let url = `/rest/THUNDERTODAY/query/dateTime>to_date('${timeBefore}','yyyy-mm-dd hh24:mi:ss')`;
        this.axios.get(url, {
          responseType: 'blob',
          headers: {
            'Content-Type': 'application/octet-stream',
          },
        })
          .then(res => {
            let reader = new FileReader();
            reader.addEventListener("loadend", () => {
              let text = reader.result;
              this.thunderData = JSON.parse(text); // 获取到过去2分钟内的全部数据，刷新thunderData对象
              this.fetching = false;
              console.debug(`fetch end`);
              console.debug(this.thunderData);
              window.clearInterval(scrollTimer); // 关闭前次计时器
              let i = 0;
              scrollTimer = window.setInterval(() => {
                if (this.thunderData) {
                  let tick = {};
                  let myJSON;
                  tick.Location = this.thunderData[i].PROVINCE + this.thunderData[i].DISTRICT + this.thunderData[i].COUNTRY;
                  tick.Name1 = this.thunderData[i].LONGITUDE; 
                  tick.Name2 = this.thunderData[i].LATITUDE;
                  tick.Intens = this.thunderData[i].INTENS;
                  myJSON = JSON.stringify(this.thunderData[i]);
                  tick.Redata = myJSON;
                  this.tableData.push(tick);
                  this.$refs.table.bodyWrapper.scrollTop = this.$refs.table.bodyWrapper.scrollHeight;
                  i++;
                  // 超出范围时，索引归零
                  if (i > this.thunderData.length - 2) {
                    i = 0;
                  }
                }
              }, freq);
            });
            reader.readAsText(res.data, 'GB2312');
          })
          .catch(error => {
            // handle error
            console.debug(error);
          })
        this.fetching = true;
        console.debug(`fetch start`);
      }
    },
    
  },
  mounted() {
    let timer = 0;
    window.setInterval(() => {
      // 数据刷新时点（每2分钟） 或 无数据且非请求过程中（出现于初始化过程），获取数据
      if (timer % 120 === 0 || (!this.thunderData && !this.fetching)) {
        let timeBefore = dayjs().subtract(2, 'minute');
        timeBefore = timeBefore.format('YYYY-MM-DD HH:mm:ss');
        console.debug(`刷新数据 @ ${timeBefore}`);
        this.fetchData(timeBefore);
      }
      timer += 2;
    }, 2000);
  }
}
</script>

<style>
#datafall{
  padding:20px;
  text-align:center;
  line-height:200%;
}
.el-scrollbar__wrap{
  width: 100%; 
  height: 100px;
}
.home{
  overflow-x: hidden;
  overflow-y: hidden;
}
</style>
