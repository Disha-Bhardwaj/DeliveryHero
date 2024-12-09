// Display incentives graphs
function displayIncentives() {
  $("#topOfMindDisplay").css({ display: "none" });
  $("#performanceDisplay").css({ display: "none" });
  $("#incentivesDisplay").css({ display: "flex" });
  $("#forTopMindGraph").removeClass("tpgraphchange");
  $("#forIncentiveGraph").addClass("incentivegraphchange");
  $("#forPerformaceGraph").removeClass("graphchange");
}
// Display Top of mind graphs
function displayTopOfMind() {
  $("#topOfMindDisplay").css({ display: "flex" });
  $("#performanceDisplay").css({ display: "none" });
  $("#incentivesDisplay").css({ display: "none" });
  $("#forTopMindGraph").addClass("tpgraphchange");
  $("#forIncentiveGraph").removeClass("incentivegraphchange");
  $("#forPerformaceGraph").removeClass("graphchange");
}
// Display Performamce Market graphs
function displayPerformaceMarket() {
  $("#performanceDisplay").css({ display: "flex" });
  $("#topOfMindDisplay").css({ display: "none" });
  $("#incentivesDisplay").css({ display: "none" });
  $("#forTopMindGraph").removeClass("tpgraphchange");
  $("#forIncentiveGraph").removeClass("incentivegraphchange");
  $("#forPerformaceGraph").addClass("graphchange");
}
// Display grouped QoQ graphs
function grouped() {
  $("#grouped").removeClass("panelSection");
  $("#grouped").addClass("columnSections");
  $("#dropdownSpecific").css({ display: "none" });
  $("#groupedSpend").removeClass("channelPanel");
  $("#groupedSpend").addClass("groupColumn");
  $("#groupedOrder").removeClass("channelPanel");
  $("#groupedOrder").addClass("groupColumn");
  $("#groupedAcqui").removeClass("channelPanel");
  $("#groupedAcqui").addClass("groupColumn");
  $("#groupTab").addClass("selectedTab");
  $("#channelTab").removeClass("selectedTab");
}
// Display Channel specific QoQ graphs
function channelSpecific() {
  $("#grouped").removeClass("columnSections");
  $("#grouped").addClass("panelSection");
  $("#dropdownSpecific").css({ display: "block" });
  $("#groupedSpend").removeClass("groupColumn");
  $("#groupedSpend").addClass("channelPanel");
  $("#groupedOrder").removeClass("groupColumn");
  $("#groupedOrder").addClass("channelPanel");
  $("#groupedAcqui").removeClass("groupColumn");
  $("#groupedAcqui").addClass("channelPanel");
  $("#channelTab").addClass("selectedTab");
  $("#groupTab").removeClass("selectedTab");
}
// On Click efficiency
function efficiency() {
  $("#efficiency").addClass("selectedTab");
  $("#effectiveness").removeClass("selectedTab");
}
// On Click effectiveness
function effectiveness() {
  $("#effectiveness").addClass("selectedTab");
  $("#efficiency").removeClass("selectedTab");
}
// On Click QoQ
function QoQCLick() {
  $("#QoQTab").addClass("selectedTab");
  $("#YoYTab").removeClass("selectedTab");
  $("#MoMTab").removeClass("selectedTab");
}
// On Click YoY
function YoYCLick() {
  $("#YoYTab").addClass("selectedTab");
  $("#QoQTab").removeClass("selectedTab");
  $("#MoMTab").removeClass("selectedTab");
}
// On Click OrderCLick
function OrderCLick() {
  $("#OrderTab").addClass("selectedTab");
  $("#AcquiTab").removeClass("selectedTab");
}

function tableDataShow() {
  $("#tableRowShow").css({ display: "inline-block" });
  $("#tableRowShow1").css({ display: "inline-block" });
  $("#tableRowShow2").css({ display: "inline-block" });
  $("#tableRowShow3").css({ display: "inline-block" });
  $("#tableRowShow4").css({ display: "inline-block" });
}

// On Click AcquiCLick
function AcquiCLick() {
  $("#AcquiTab").addClass("selectedTab");
  $("#OrderTab").removeClass("selectedTab");
}
// Display bucketgrouped
function bucketgrouped() {
  $("#bucketGroupedID").addClass("selectedTab");
  $("#bucketChannelID").removeClass("selectedTab");
  $("#buckgrah").css({ display: "block" });
  $("#buckgrahChannel").css({ display: "none" });
  $("#colorLabel").css({ display: "block" });
}

// sign conversion
function signConversionPlus() {
  $("#hiddentableminus").css({ display: "inline-block" });
  $("#hiddentableplus").css({ display: "none" });
}

function signConversionMinus() {
  $("#hiddentableminus").css({ display: "none" });
  $("#hiddentableplus").css({ display: "inline-block" });
}

function signConversionPlus1() {
  $("#hiddwntableminus1").css({ display: "inline-block" });
  $("#hiddentableplus1").css({ display: "none" });
}

function signConversionminus1() {
  $("#hiddwntableminus1").css({ display: "none" });
  $("#hiddentableplus1").css({ display: "inline-block" });
}

// Display Optimization Result Page
function displayOptimizationResult() {
  $("#optimizationResultPage").css({ display: "block" });

  $("#landPageOpti").css({ display: "none" });
}

// Display optimization global
function displayOptimizationGlobal() {
  $("#optimizationResultPage").css({ display: "none" });

  $("#landPageOpti").css({ display: "block" });
}

// Display bucketChannel
function bucketChannel() {
  $("#bucketChannelID").addClass("selectedTab");
  $("#bucketGroupedID").removeClass("selectedTab");
  $("#buckgrahChannel").css({ display: "block" });
  $("#buckgrah").css({ display: "none" });
  $("#colorLabel").css({ display: "none" });
}
//  tabs functionality for bucket and Qoq
function QoQDisplay() {
  $("#tabs-1").css({ display: "block" });
  $("#tabs-2").css({ display: "none" });
  $("#qoq_yoy").addClass("active1");
  $("#week_Trendorder").removeClass("active1");
}
function weeklyTrendDisplay() {
  $("#tabs-1").css({ display: "none" });
  $("#tabs-2").css({ display: "block" });
  $("#week_Trendorder").addClass("active1");
  $("#qoq_yoy").removeClass("active1");
}
// For Optimizer pages
function displayWorkbench() {
  $("#countryWorkBench").css({ display: "block" });
  $("#countryOptimizerResult").css({ display: "none" });
  $("#landPageOpti").css({ display: "none" });
}
function displayTool() {
  $("#countryWorkBench").css({ display: "none" });
  $("#countryOptimizerResult").css({ display: "none" });
  $("#landPageOpti").css({ display: "block" });
}
function displayCountryOptimizer() {
  $("#countryOptimizerResult").css({ display: "block" });
  $("#countryWorkBench").css({ display: "none" });
  $("#landPageOpti").css({ display: "none" });
}

// configuration table
function table4() {
  $("table5").css({ display: "block" });
}

function clicktableRow() {
  $(".header").click(function () {
    $(this).nextUntil("tr.header").slideToggle(1000);
  });
}
function mobMenu() {
  $(".responsive").click(function () {
    $(".leftPanel").toggle();
  });
}
// On Click OrderCLick optmizer
function OrderCLickOptimizer() {
  $("#OrderTabOpti").addClass("selectedToggle");
  $("#AcquiTabOpti").removeClass("selectedToggle");
}
// On Click AcquiCLick optmizer
function AcquiCLickOptimizer() {
  $("#AcquiTabOpti").addClass("selectedToggle");
  $("#OrderTabOpti").removeClass("selectedToggle");
}
// On Click OrderCLick optmizer
function chanCLickOptimizer() {
  $("#chanTabOpti").addClass("selectedToggle");
  $("#bucTabOpti").removeClass("selectedToggle");
  $(".selectCHannel").css({ display: "block" });
}
// On Click AcquiCLick optmizer
function bucCLickOptimizer() {
  $("#bucTabOpti").addClass("selectedToggle");
  $("#chanTabOpti").removeClass("selectedToggle");
  $(".selectCHannel").css({ display: "none" });
}
// set upper limit optimizer page
function setUperLimit(object) {
  if (object.value < 0 || object.value > 50) {
    object.value = 45;
  }
}
// set lower limit optimizer page
function setLowerLimit(object) {
  if (object.value > 0 || object.value < -50) {
    object.value = -2;
  }
}
function menuLinks() {
  $(document).ready(function () {
    $(function () {
      $("li a").click(function (e) {
        e.preventDefault();
        $("a").removeClass("active");
        $(this).addClass("active");
      });
    });
  });
}
function setUperLimit(object) {
  if (object.value < 1) {
    object.value = 1;
  }
}
function setLowerLimit(object) {
  if (object.value > -1) {
    object.value = -1;
  }
}
// GLobal optimization
function displayFirstGlobal(){
  $("#globaloptimizationResultPage").css({ display: "none" });
  $("#landPageGlobalOpti").css({ display: "block" });
}
