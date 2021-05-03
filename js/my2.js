//dom
const height = document.getElementById("height");
const weight = document.getElementById("weight");
const checkBtn = document.querySelector(".chkBtn");
const date = document.querySelector(".date");
const elList = document.querySelector(".list");
const elNote = document.querySelector(".note");
const elClearBtn = document.querySelector(".clear button");
const elRestIcon = document.querySelector(".icon");
// bmi 本地資料存取
let data = JSON.parse(localStorage.getItem("bmi")) || [];
// 第一次呈現 資料列表
displayData();
// 監聽
// 點選 看結果 btn
checkBtn.addEventListener("click", calculateBmi, false);
// 點選 清除所有資料
elClearBtn.addEventListener("click", clearData, false);

// 第一次呈現 資料列表
function displayData() {
  if (data.length > 0) {
    elNote.style.display = "none";
    updateBmiData(data);
  } else {
    elNote.style.display = "block";
    elClearBtn.style.display = "none";
  }
}

// 點選 看結果 btn
function calculateBmi(e) {
  // 若不是點選 A標籤 不發生動作
  if (e.target.nodeName !== "A") {
    return;
  }

  // 轉換輸入值為數字
  let heiNum = parseInt(height.value);
  let weiNum = parseInt(weight.value);
  // bmi 計算
  let heiNum_m = heiNum / 100; // cm >> m
  let bmiNum = weiNum / (heiNum_m * heiNum_m);
  // 數字輸入正確 進行判斷取得 bmi狀態 及 顏色
  let bmiColor;
  let bmiStatus;
  let shadowColor;
  if (heiNum > 0 && weiNum > 0) {
    switch (true) {
      case bmiNum <= 18.5:
        bmiStatus = "過輕";
        bmiColor = "#31baf9";
        shadowColor = "2px 0px 3px 0px rgba(49,186,249,0.29)";
        break;
      case 18.5 < bmiNum && bmiNum <= 25:
        bmiStatus = "理想";
        bmiColor = "#86d73f";
        shadowColor = "2px 0px 3px 0px rgba(49,186,0,0.29)";
        break;
      case 25 < bmiNum && bmiNum <= 30:
        bmiStatus = "過重";
        bmiColor = "#ff982d";
        shadowColor = "2px 0px 3px 0px rgba(255,152,45,0.29)";
        break;
      case 30 < bmiNum && bmiNum <= 35:
        bmiStatus = "輕度肥胖";
        bmiColor = "#ff6c03";
        shadowColor = "2px 0px 3px 0px rgba(255,108,2,0.29)";
        break;
      case 35 < bmiNum && bmiNum <= 40:
        bmiStatus = "中度肥胖";
        bmiColor = "#ff6c03";
        shadowColor = "2px 0px 3px 0px rgba(255,108,2,0.29)";
        break;
      case 40 < bmiNum:
        bmiStatus = "重度肥胖";
        bmiColor = "#ff1200";
        shadowColor = "2px 0px 3px 0px rgba(255,108,2,0.29)";
        break;
      default:
        break;
    }

    // 時間
    let Today = new Date();
    let date =
      Today.getFullYear() +
      "-" +
      (Today.getMonth() + 1) +
      "-" +
      Today.getDate();

    // 將資料存入物件 再推上陣列
    const bmiData = {
      bmiStatus: bmiStatus,
      bmiNum: bmiNum.toFixed(2),
      height: heiNum + "CM",
      weight: weiNum + "KG",
      date: date,
      bmiColor: bmiColor,
      shadowColor: shadowColor,
    };
    data.push(bmiData);
    // 把新一筆資料放入 本地
    localStorage.setItem("bmi", JSON.stringify(data));
    // 對應 bmi數據 更新 UI btn樣式
    const elBtnHover = document.querySelector(".chkBtn:hover");
    const elStr = document.createElement("div");
    const elDivImg = document.createElement("div");
    const elImg = document.createElement("img");
    elDivImg.style.className = "icon";
    elDivImg.className = "icon";
    elDivImg.style.backgroundColor = bmiColor;
    elImg.src = "images/icons_loop.png";
    checkBtn.style.background = "transparent";
    checkBtn.style.border = "6px solid " + bmiColor;
    elBtnHover.style.boxShadow = "none";
    checkBtn.style.color = bmiColor;
    checkBtn.style.fontSize = "32px";
    checkBtn.style.lineHeight = "120px";
    checkBtn.textContent = bmiNum.toFixed(2);
    elStr.className = "title1";
    elStr.textContent = "BMI";
    elStr.style.color = bmiColor;
    elDivImg.appendChild(elImg);
    checkBtn.appendChild(elDivImg);
    checkBtn.appendChild(elStr);
    // reset btn 出現
    elDivImg.style.opacity = "1";

    // 更新 UI bmi list 資料列表
    updateBmiData(data);
    // UI 查無此紀錄 消失
    elNote.style.display = "none";

    // 點選 reset 還原至原本設定
    elDivImg.addEventListener("click", resetResult2, false);
    function resetResult2() {
      console.log("134444");
      elDivImg.style.opacity = "0";
      checkBtn.removeChild(elStr);
      checkBtn.style.background = "#ffd366";
      checkBtn.style.color = "#424242";
      checkBtn.style.fontSize = "24px";
      checkBtn.style.border = "none";
      checkBtn.textContent = "看結果";
      // 清空 input 框中的输入内容
      height.value = "";
      weight.value = "";
    }
  } else {
    // 若有一個未填入資料
    alert("格式錯誤，請確認輸入正確數值。");
  }
}

// 更新 UI bmi的使用者輸入歷史資料
function updateBmiData(list) {
  let str = "";
  for (var i = 0; i < list.length; i++) {
    str += `
    <li class="d-flex-list">
    <div class="box" style="background-color: ${list[i].bmiColor}; box-shadow:${list[i].shadowColor}"></div>
    <h3>${list[i].bmiStatus}</h3>
    <h4 class="bmi-num">BMI<span>${list[i].bmiNum}</span></h4>
    <h4 class="wei-num">weight <span>${list[i].height}</span></h4>
    <h4 class="hei-num">height <span>${list[i].weight}</span></h4>
    <div class="date">${list[i].date}</div>
  </li>
    `;
  }
  elList.innerHTML = str;
  if (list.length > 0) {
    elClearBtn.style.display = "inline-block";
  }
}

// 清除所有資料
function clearData(e) {
  e.preventDefault();
  // 強迫變成空陣列 >>> 清空全部的資料
  data = [];
  // 將空資料傳入
  localStorage.setItem("bmi", JSON.stringify(data));
  // 查無此紀錄 顯示
  elNote.style.display = "block";
  // 清除所有資料 btn 消失
  elClearBtn.style.display = "none";
  // 更新 UI 資料列表
  updateBmiData(data);
}
