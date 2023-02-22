let valTransfer = $("#transfer").val();
let valStorage = $("#storage").val();
let arr = [];

$("#numbRange").val(valStorage);
$("#numbTrans").val(valTransfer);

$(document).ready(function() {
  main();
  
  $(window).resize(function () {
  main();
  });
	
  
    
  document.querySelector('#storage')
    .addEventListener('input', evt => {
    valStorage = evt.target.value;
    $("#numbRange").val(valStorage);
    $("#val_storage").text(valStorage);
    main();
  });

  document.querySelector('#transfer')
    .addEventListener('input', evt => {
    valTransfer = evt.target.value;
    $("#numbTrans").val(valTransfer);
    $("#val_transfer").text(valTransfer); 
    main();
  });
    
  
  $("[type=number]").change(function() {
    id = $(this).attr('id');
   //console.log(id);
	if(id == "numbRange") {
	  valStorage = $(this).val();
      $("#storage").val(valStorage);
	}
	if(id == "numbTrans") {
      valTransfer = $(this).val();
      $("#transfer").val(valTransfer);
	}
	
    main();
  });
  
  $('#form1 input').on('change', function() {
    main();
  }); 	
});

//Головна функція
function main() {	
  arr[0] = priceBackblaze(valStorage,valTransfer);
  arr[1] = priceBunny(valStorage,valTransfer);
  arr[2] = priceScaleway(valStorage,valTransfer);
  arr[3] = priceVultr(valStorage,valTransfer);
  drawDiagram( priceBackblaze(valStorage,valTransfer), "#backblaze" );
  drawDiagram( priceBunny(valStorage,valTransfer), "#bunny" );
  drawDiagram( priceScaleway(valStorage,valTransfer), "#scaleway" );
  drawDiagram( priceVultr(valStorage,valTransfer), "#vultr" );
  minValue();
}

//Функція знаходить найменшу ціну,зафарбовує блок
function minValue() {
  min = Math.min.apply(window, arr);
  //console.log( arr.indexOf(min) );
  $( $("div.block") ).css("background-color", "grey");
  $( $("div.block")[arr.indexOf(min)] ).css("background-color", "red");
}

//Функція обчислює ціну Backblaze 
function priceBackblaze (valStor, valTran) {
  let price = (0.005 * valStor + 0.01 * valTran ).toFixed(2);
  price = (price < 7) ? 7 : price;
  $("#priceBackblaze").text(price + '$');
  return +price;	
}

//Функція обчислює ціну Bunny
function priceBunny (valStor,valTran) {
  let val1 = $("#form1 input[type='radio']:checked").val();
  let val2 = ( val1=="HDD" ) ? 0.01 : 0.02;
  let price = (val2 * valStor + 0.01 * valTran ).toFixed(2);
  price = (price > 10) ? 10 : price;
  $("#priceBunny").text(price + '$');
  return +price;		
}

//Функція обчислює ціну Scaleway
function priceScaleway (valStor,valTran){
  let val1 = $("#form1 input[name='choice']:checked").val();
  let val2;
  let price;
  
  if (valStor > 75) {
	val2 = (val1 == "Single") ? 0.03 : 0.06;
	price=( val2 * (valStor - 75) + 0.02 * (valTran - 75) ).toFixed(2);
  }
  else{
	price = (valTran > 75) ? (0.02 * (valTran - 75)).toFixed(2) : 0 ;
  }
	
  $("#priceScaleway").text(price + '$');
  
  return +price;		
}

//Функція обчислює ціну Vultr
function priceVultr (valStor,valTran){
  let price = (0.01 * valStor + 0.01 * valTran).toFixed(2);
  price = (price < 5) ? 5 : price;
  $("#priceVultr").text(price + '$');
  return +price;	
}

//Функція малює діаграму і нижнє підчеркування в залежності від розміру екрану
function drawDiagram (price, id) {
  let windowInnerWidth = document.documentElement.clientWidth;
  let windowInnerHeight = document.documentElement.clientHeight;
  //console.log(windowInnerWidth);
  let value;
  //console.log(value);
  
  if (windowInnerWidth < 590){
	value = (6 * price + 1) + "px";
    $("#leftthings").css("border", "none");
    $("#leftthings").css("border-top", "5px solid black")
    $(id).css("width", "28px");
    $(id).css("height", value);
  }
  else{
	value = (8 * price + 1) + "px";
    $("#leftthings").css("border", "none");
    $("#leftthings").css("border-left", "5px solid black");
    $(id).css("height", "28px");
    $(id).css("width", value);
  }
	
}