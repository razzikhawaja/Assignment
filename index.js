$(".featured").parent().parent().parent().addClass("border");
var featureButtons = $(".item button");
var filterList = [];

function filter(){
  filterList.forEach(function(item){
    $(".filter-buttons").each(function(){
      var cnt=0;
      $(this).children().each(function(){
            if(($(this).text()+" X")===item)
              cnt++;
      });
      if(cnt===0)
        $(this).parent().css("display", "none");
    });
  });
}

function showFilter(featureName){
  $(".filters button").each(function(){
    if($(this).text()===(featureName + " X")){
      $(this).css("display", "inline-block");
    }
  });
}

$(".item button").on("click",function(){
  var featureName = $(this).text();
  var featureRole = $(this).attr("name");
  if(!filterList.includes(featureName + " X"))
    filterList.push(featureName + " X");
  $(".filters").css("display", "block");
  showFilter(featureName);
  filter();
});

$(".X").on("click", function(){
  var feature = $(this).parent().text();
  var pos = filterList.indexOf(feature);
  filterList.splice(pos,1);
  if(filterList.length===0)
    $(".filters").css("display", "none");
  console.log(filterList);
  $(".item").each(function(){
    $(this).css("display", "block");
  });
  filter();
  $(".filters button").each(function(){
    if($(this).text()===(feature)){
      $(this).css("display", "none");
    }
  });
});
