// 初始化設定
const defectArr = [
  "r-under",
  "g-under",
  "b-under",
  "bm-wp",
  "r-wp",
  "g-wp",
  "b-wp",
  "r-gel",
  "g-gel",
  "b-gel",
  "r-dev-abnormal",
  "g-dev-abnormal",
  "b-dev-abnormal",
  "r-fiber",
  "g-fiber",
  "b-fiber",
  "bp",
  "bm-dirty",
  "repair",
  "above-p",
  "back-dirty",
  "dirty",
  "oven-drop",
  "black",
];

setItems(); // 設定FMA Result Item number
fmaTotal();
deleteRow();
sheetTotal();
totalNum();
// 設定FMA Result Item number
function setItems() {
  let allItems = document.querySelectorAll(".item");
  allItems.forEach((item, index) => {
    item.innerHTML = index + 1;
  });
}

function sumArr(arr) {
  return arr.reduce((acc, cur) => acc + cur, 0);
}

// 計算fma total，單row defect數量總和
function fmaTotal() {
  let fmaTable = document.querySelectorAll(".df-row");
  fmaTable.forEach((dfRow) => {
    dfRow.addEventListener("keyup", (e) => {
      // 取得row資料，轉為array
      let rowArr = e.target.parentNode.innerText.split("\t").slice(2, 26);
      // 去除array中空字串
      rowArr = rowArr.filter((item) => item != "");
      // 將字串轉number
      rowArr = rowArr.map((i) => Number(i));
      // 計算單列defect加總
      let fma_total = sumArr(rowArr);
      e.target.parentElement.children[26].innerHTML = fma_total;
    });
  });
}

// 計算Sheet Data Total
function sheetTotal() {
  let fmaTable = document.querySelectorAll(".df-row");
  fmaTable.forEach((dfRow) => {
    dfRow.addEventListener("keyup", (e) => {
      let rowArr = e.target.parentNode.innerText.split("\t").slice(27, 30);
      // 將字串轉number
      rowArr = rowArr.map((i) => Number(i));
      let sumTotal = sumArr(rowArr);
      e.target.parentElement.children[30].innerHTML = sumTotal;
    });
  });
}

// Create a python range function
function range(size, startNum = 0) {
  return [...Array(size).keys()].filter((i) => i > startNum);
}

// 取得產品欄位(glass id)不為空白的列數
function getNotEmptyRowLen() {
  let countNotEmptyRows = 0;
  const notEmptyGidRows = document.querySelectorAll(".gid");
  notEmptyGidRows.forEach((row) => {
    if (row.innerHTML != "") {
      countNotEmptyRows += 1;
    }
  });
  // console.log(countNotEmptyRows);
  return countNotEmptyRows;
}

function countTotalAvg(tNumRow, avgNumRow, notEmptyGidRows) {
  defectArr.forEach((df, i) => {
    let eachDfCol = document.querySelectorAll("." + df);
    let col_sum = 0;
    eachDfCol.forEach((defectCell) => {
      if (Number(defectCell.innerHTML)) {
        col_sum += Number(defectCell.innerHTML);
      }
    });
    i += 1;
    tNumRow.children[i].innerHTML = col_sum;
    if (notEmptyGidRows > 0) {
      avgNumRow.children[i].innerHTML = (col_sum / notEmptyGidRows).toFixed(1);
    }
  });
}

// 計算defect各column Total Num
function totalNum() {
  let fmaTable = document.querySelectorAll(".df-row");
  let tNumRow = document.querySelector(".total-num");
  let avgNumRow = document.querySelector(".avg-num");
  // console.log(range(32, 3));
  let numArr = range(26, 2);

  fmaTable.forEach((dfRow) => {
    dfRow.addEventListener("keyup", (e) => {
      let notEmptyGidRows = getNotEmptyRowLen();
      countTotalAvg(tNumRow, avgNumRow, notEmptyGidRows);
      // 計算Total Num row的FMA Total
      let fmaTotalAll = document.querySelectorAll(".fma-total");
      const fmaTotalSumEle = document.querySelector(".fma-total-sum");
      const fmaTotalAvgEle = document.querySelector(".fma-total-avg");
      let fmaTotalCount = 0;
      fmaTotalAll.forEach((row) => {
        if (Number(row.innerHTML)) {
          fmaTotalCount += Number(row.innerHTML);
        }
      });
      // console.log(fmaTotalCount);
      // console.log(fmaTotalSumEle);

      fmaTotalSumEle.innerHTML = fmaTotalCount;
      if (notEmptyGidRows) {
        fmaTotalAvgEle.innerHTML = (fmaTotalCount / notEmptyGidRows).toFixed(1);
      } else {
        fmaTotalAvgEle.innerHTML = 0;
      }

      // let rUnderCols = document.querySelectorAll(".r-under");
      // let r_under_sum = 0;
      // rUnderCols.forEach((rUnderCell) => {
      //   if (Number(rUnderCell.innerHTML)) {
      //     r_under_sum += Number(rUnderCell.innerHTML);
      //   }
      // });
      // tNumRow.children[1].innerHTML = r_under_sum;
      // if (notEmptyGidRows > 0) {
      //   avgNumRow.children[1].innerHTML = (
      //     r_under_sum / notEmptyGidRows
      //   ).toFixed(1);
      // }
    });
  });
}

// 設定datePicker為current date
const datePicker = document.querySelector("#date-pick");
const today = new Date();
datePicker.valueAsDate = today;

// 清除FMA Result row
function deleteRow() {
  let allTrash = document.querySelectorAll(".trash-button");
  allTrash.forEach((trash) => {
    trash.addEventListener("click", (e) => {
      e.preventDefault();
      e.target.parentElement.parentElement.parentElement.remove();
      setItems();
      totalNum();
    });
  });
}

// 實做 FMA Result table button.add-new row功能
const addRowBtn = document.querySelector(".add-new-row");
const fmaTbody = document.querySelector("#fma-tbody");

// addRowBtn click事件，在table body 加入tr elements
addRowBtn.addEventListener("click", () => {
  let newTr = document.createElement("tr");
  newTr.classList.add("df-row");
  let new_td_item = document.createElement("td");
  new_td_item.classList.add("item");
  let new_td_gid = document.createElement("td");
  new_td_gid.classList.add("gid", "edit-color");
  new_td_gid.setAttribute("contenteditable", "true");
  let new_td_r_under = document.createElement("td");
  new_td_r_under.classList.add("r-under", "edit-color");
  new_td_r_under.setAttribute("contenteditable", "true");
  let new_td_g_under = document.createElement("td");
  new_td_g_under.classList.add("g-under", "edit-color");
  new_td_g_under.setAttribute("contenteditable", "true");
  let new_td_b_under = document.createElement("td");
  new_td_b_under.classList.add("b-under", "edit-color");
  new_td_b_under.setAttribute("contenteditable", "true");
  let new_td_bm_wp = document.createElement("td");
  new_td_bm_wp.classList.add("bm-wp", "edit-color");
  new_td_bm_wp.setAttribute("contenteditable", "true");
  let new_td_r_wp = document.createElement("td");
  new_td_r_wp.classList.add("r-wp", "edit-color");
  new_td_r_wp.setAttribute("contenteditable", "true");
  let new_td_g_wp = document.createElement("td");
  new_td_g_wp.classList.add("g-wp", "edit-color");
  new_td_g_wp.setAttribute("contenteditable", "true");
  let new_td_b_wp = document.createElement("td");
  new_td_b_wp.classList.add("b-wp", "edit-color");
  new_td_b_wp.setAttribute("contenteditable", "true");
  let new_td_r_gel = document.createElement("td");
  new_td_r_gel.classList.add("r-gel", "edit-color");
  new_td_r_gel.setAttribute("contenteditable", "true");
  let new_td_g_gel = document.createElement("td");
  new_td_g_gel.classList.add("g-gel", "edit-color");
  new_td_g_gel.setAttribute("contenteditable", "true");
  let new_td_b_gel = document.createElement("td");
  new_td_b_gel.classList.add("b-gel", "edit-color");
  new_td_b_gel.setAttribute("contenteditable", "true");
  let new_td_r_dev_abnormal = document.createElement("td");
  new_td_r_dev_abnormal.classList.add("r-dev-abnormal", "edit-color");
  new_td_r_dev_abnormal.setAttribute("contenteditable", "true");
  let new_td_g_dev_abnormal = document.createElement("td");
  new_td_g_dev_abnormal.classList.add("g-dev-abnormal", "edit-color");
  new_td_g_dev_abnormal.setAttribute("contenteditable", "true");
  let new_td_b_dev_abnormal = document.createElement("td");
  new_td_b_dev_abnormal.classList.add("b-dev-abnormal", "edit-color");
  new_td_b_dev_abnormal.setAttribute("contenteditable", "true");
  let new_td_r_fiber = document.createElement("td");
  new_td_r_fiber.classList.add("r-fiber", "edit-color");
  new_td_r_fiber.setAttribute("contenteditable", "true");
  let new_td_g_fiber = document.createElement("td");
  new_td_g_fiber.classList.add("g-fiber", "edit-color");
  new_td_g_fiber.setAttribute("contenteditable", "true");
  let new_td_b_fiber = document.createElement("td");
  new_td_b_fiber.classList.add("b-fiber", "edit-color");
  new_td_b_fiber.setAttribute("contenteditable", "true");
  let new_td_bp = document.createElement("td");
  new_td_bp.classList.add("bp", "edit-color");
  new_td_bp.setAttribute("contenteditable", "true");
  let new_td_bm_dirty = document.createElement("td");
  new_td_bm_dirty.classList.add("bm-dirty", "edit-color");
  new_td_bm_dirty.setAttribute("contenteditable", "true");
  let new_td_repair = document.createElement("td");
  new_td_repair.classList.add("repair", "edit-color");
  new_td_repair.setAttribute("contenteditable", "true");
  let new_td_above_p = document.createElement("td");
  new_td_above_p.classList.add("above-p", "edit-color");
  new_td_above_p.setAttribute("contenteditable", "true");
  let new_td_back_dirty = document.createElement("td");
  new_td_back_dirty.classList.add("back-dirty", "edit-color");
  new_td_back_dirty.setAttribute("contenteditable", "true");
  let new_td_dirty = document.createElement("td");
  new_td_dirty.classList.add("dirty", "edit-color");
  new_td_dirty.setAttribute("contenteditable", "true");
  let new_td_oven_drop = document.createElement("td");
  new_td_oven_drop.classList.add("oven-drop", "edit-color");
  new_td_oven_drop.setAttribute("contenteditable", "true");
  let new_td_black = document.createElement("td");
  new_td_black.classList.add("black", "edit-color");
  new_td_black.setAttribute("contenteditable", "true");
  let new_td_fma_total = document.createElement("td");
  new_td_fma_total.classList.add("fma-total");
  let new_td_s = document.createElement("td");
  new_td_s.classList.add("s", "edit-color");
  new_td_s.setAttribute("contenteditable", "true");
  let new_td_m = document.createElement("td");
  new_td_m.classList.add("m", "edit-color");
  new_td_m.setAttribute("contenteditable", "true");
  let new_td_l = document.createElement("td");
  new_td_l.classList.add("l", "edit-color");
  new_td_l.setAttribute("contenteditable", "true");
  let new_td_df_sum = document.createElement("td");
  new_td_df_sum.classList.add("df-sum");
  // Create trash button td tag and add inline styles
  let new_td_trash_td = document.createElement("td");
  new_td_trash_td.style.borderTopStyle = "hidden";
  new_td_trash_td.style.borderRightStyle = "hidden";
  new_td_trash_td.style.borderBottomStyle = "hidden";
  new_td_trash_td.style.padding = "0.2rem 0rem 0rem 0.2rem";
  new_td_trash_td.style.width = "2rem";
  // Create trash button
  let new_trash_btn = document.createElement("button");
  new_trash_btn.classList.add("trash-button");
  new_trash_btn.style.border = "none";
  new_trash_btn.style.cursor = "pointer";
  // Create trash icon
  let new_trash_icon = document.createElement("i");
  new_trash_icon.classList.add("fas", "fa-trash");
  new_trash_icon.style.fontSize = "1.15rem";
  // Add trash icon inside trash button
  new_trash_btn.appendChild(new_trash_icon);
  // Add trash button in trash td
  new_td_trash_td.appendChild(new_trash_btn);

  newTr.appendChild(new_td_item);
  newTr.appendChild(new_td_gid);
  newTr.appendChild(new_td_r_under);
  newTr.appendChild(new_td_g_under);
  newTr.appendChild(new_td_b_under);
  newTr.appendChild(new_td_bm_wp);
  newTr.appendChild(new_td_r_wp);
  newTr.appendChild(new_td_g_wp);
  newTr.appendChild(new_td_b_wp);
  newTr.appendChild(new_td_r_gel);
  newTr.appendChild(new_td_g_gel);
  newTr.appendChild(new_td_b_gel);
  newTr.appendChild(new_td_r_dev_abnormal);
  newTr.appendChild(new_td_g_dev_abnormal);
  newTr.appendChild(new_td_b_dev_abnormal);
  newTr.appendChild(new_td_r_fiber);
  newTr.appendChild(new_td_g_fiber);
  newTr.appendChild(new_td_b_fiber);
  newTr.appendChild(new_td_bp);
  newTr.appendChild(new_td_bm_dirty);
  newTr.appendChild(new_td_repair);
  newTr.appendChild(new_td_above_p);
  newTr.appendChild(new_td_back_dirty);
  newTr.appendChild(new_td_dirty);
  newTr.appendChild(new_td_oven_drop);
  newTr.appendChild(new_td_black);
  newTr.appendChild(new_td_fma_total);
  newTr.appendChild(new_td_s);
  newTr.appendChild(new_td_m);
  newTr.appendChild(new_td_l);
  newTr.appendChild(new_td_df_sum);
  newTr.appendChild(new_td_trash_td);
  newTr.appendChild(new_td_trash_td);
  fmaTbody.appendChild(newTr);

  setItems();
  fmaTotal();
  sheetTotal();
  totalNum();
  // 清除FMA Result row
  deleteRow();
});

// 防止form內部的button交出表單
let allButton = document.querySelectorAll("button");
// console.log(allButton);
allButton.forEach((button) => {
  //   console.log(e);
  button.addEventListener("click", (e) => {
    e.preventDefault();
  });
});

// test Echarts............
// 使echarts graph俱响應式
window.onresize = function () {
  myChart.resize();
};
//
const chartDom = document.getElementById("barChart");
const myChart = echarts.init(chartDom);
let option;
// 設定echart
option = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      crossStyle: {
        color: "#999",
      },
    },
  },
  toolbox: {
    feature: {
      dataView: { show: true, readOnly: false },
      magicType: { show: true, type: ["line", "bar"] },
      restore: { show: true },
      saveAsImage: { show: true },
    },
  },
  legend: {
    data: ["Evaporation", "Precipitation", "Temperature"],
  },
  xAxis: [
    {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "sen", " seh"],
      axisPointer: {
        type: "shadow",
      },
    },
  ],
  yAxis: [
    {
      type: "value",
      name: "Precipitation",
      min: 0,
      max: 250,
      interval: 50,
      axisLabel: {
        formatter: "{value} ml",
      },
    },
    {
      type: "value",
      name: "Temperature",
      min: 0,
      max: 25,
      interval: 5,
      axisLabel: {
        formatter: "{value} °C",
      },
    },
  ],
  series: [
    {
      name: "Evaporation",
      type: "bar",
      tooltip: {
        valueFormatter: function (value) {
          return value + " ml";
        },
      },
      data: [
        2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3,
      ],
    },
    {
      name: "Precipitation",
      type: "bar",
      tooltip: {
        valueFormatter: function (value) {
          return value + " ml";
        },
      },
      data: [
        2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3,
      ],
    },
    {
      name: "Temperature",
      type: "line",
      yAxisIndex: 1,
      tooltip: {
        valueFormatter: function (value) {
          return value + " °C";
        },
      },
      data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
    },
  ],
};

option && myChart.setOption(option);
