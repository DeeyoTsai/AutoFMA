// 客製化Error，繼承自TypeError
class NotArrayError extends TypeError {
  constructor(message) {
    super(message);
  }

  printSolution() {
    return "確定參數為Aarray在執行程式碼";
  }
}

function sumArray(arr) {
  if (!Array.isArray(arr)) {
    // throw "參數並非Array";
    // throw JS 既有的Error Type
    // throw new TypeError("參數並非Array"); //TypeError: 參數並非Array + Error屬性描述
    throw new NotArrayError("參數並非Array");
    //客製化Error，return NotArrayError [TypeError]: 參數並非Array
    // 客製化Error優點在可以客製化屬性方法
  }
  let result = 0;
  arr.forEach((ele) => {
    result += ele;
  });
  return result;
}

try {
  sumArray("Hello");
} catch (e) {
  console.log(e);
  console.log(e.printSolution());
}
