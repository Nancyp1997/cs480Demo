var top4Tickers= [];
function nancy(select_sector){
	
	var selectedText = select_sector.options[select_sector.selectedIndex].innerHTML;
    var selectedValue = select_sector.value;
	loadTop4Cards(selectedText);
}
//Across all sectors
function loadTop4Cards(sector_name) {
    
    const xhttp = new XMLHttpRequest();
	
	var url = "https://server1-nancypitta.uic-cs480-fall-2022.repl.co/api/stocks_toprow/"+sector_name;
    xhttp.open("GET", url);
    xhttp.send();
	
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
		top4Tickers= [];
		
        const objects = JSON.parse(this.responseText);
		
        var ids = ["top1","top2","top3","top4"];
        var ind =-1;
        for (let obj of objects.response) {  
			var shares_vol = obj["volume"];
			console.log(shares_vol);
			console.log(typeof(shares_vol));
			var string_vol = ""+obj["volume"];
			if(shares_vol>1000000){
				console.log("GOING HERE");
				string_vol = ((obj["volume"]/1000000).toFixed(0))+" m";
			}else if(shares_vol>1000){
				string_vol = ((obj["volume"]/1000).toFixed(0))+" k";
			}
			console.log(string_vol);
          var trHTML = '';
          trHTML += '<div class="card"><div class="stat-widget-one"><div class="stat-icon dib"><i class="ti-money color-success border-success"></i></div><div class="stat-content dib">';
          trHTML += '<div class="stat-text">'+obj["ticker"]+'</div><div class="stat-digit">'+obj["open_price"].toFixed(1)+'</div></div><div class="stat-content dib"><div class="stat-text">Total shares</div>';
          trHTML += '<div class="stat-digit">'+string_vol+'</div></div><div class="stat-content dib"><div class="stat-text">Total returns</div>';
          trHTML +=  '<div class="stat-digit">'+obj["close_price"].toFixed(0)+'</div></div></div></div>';
          
          ind += 1;
          var currid = ids[ind];
          
          document.getElementById(currid).innerHTML = trHTML;
          
          document.getElementById(currid).onclick = function(){
            //Update the chart with the clicked element's data
            
            const xhttp1 = new XMLHttpRequest();
            var url = "https://server1-nancypitta.uic-cs480-fall-2022.repl.co/api/stocks/";
            url += obj["ticker"];
            
			top4Tickers.push(obj["ticker"]);
			
            xhttp1.open("GET", url);
            xhttp1.send();
            xhttp1.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                  const objects1 = JSON.parse(this.responseText);
                    
                  prices=[];
                  dates=[];
                  for (let obj of objects1.response) {
                      prices.push(obj.close_price);
                      dates.push(obj.price_date);
                  }
                  // document.getElementById("stockChartContainer").innerHTML = "<script type='text/javascript'>generateChart("+objects1+")</script>";
                  // '<script type="text/javascript">window.onload = function () {var dataPoints = [];var stockChart = new CanvasJS.StockChart("stockChartContainer",{theme: "light2",colorSet: "colorSet1",exportEnabled: true,title:{text:"StockChart with Area Chart"},subtitles: [{text: "Retail Sales Of ACME Corp."}],charts: [{axisX: {crosshair: {enabled: true}},axisY: {prefix: "$",suffix: "M",title: "Sales Revenue in USD",titleFontSize: 14},data: [{type: "area",xValueFormatString: "MMM YYYY",yValueFormatString: "$#,###.##M",dataPoints : dataPoints}]}],navigator: {slider: {minimum: new Date(2010, 00, 01),maximum: new Date(2014, 00, 01)}}});$.getJSON("'+url+'", function(data) {console.log(data.response);for(var i = 0; i < data.response.length; i++){dataPoints.push({x: new Date(data.response[i].price_date.substring(0,10)), y: Number(data.response[i].close_price)});}stockChart.render();});}</script>';                
                }
            }
          };
          
        }
        
      }
    };
    

  }
  

loadTop4Cards('Technology');
// const my_watchList=['AAPL','MSFT','META','TSLA','NFLX','AMD','AMZN','GOOGL'];
// function loadTable() {
// 	var xhttp = new XMLHttpRequest();
// 	var trHTML = "";
// 	var watchListURL = "https://server1-nancypitta.uic-cs480-fall-2022.repl.co/api/stockswatchlist/";
// 	for ( eachTicker in my_watchList){
// 		xhttp = new XMLHttpRequest();
// 		xhttp.open("GET", watchListURL+my_watchList[eachTicker]);
// 		xhttp.send();
// 		console.log(my_watchList[eachTicker]);
// 		xhttp.onreadystatechange = function () {
// 	  		if (this.readyState == 4 && this.status == 200) {
// 				console.log(this.responseText);
				
// 				const objects = JSON.parse(this.responseText);
// 				console.log(objects.response);
// 				for (let object of objects.response) {
// 					trHTML += "<tr>";
// 		  			trHTML += "<td>" + object["ticker"] + "</td>";
// 		  			trHTML += "<td>" + object["open_price"] + "</td>";
// 		  			trHTML += "<td>" + object["close_price"] + "</td>";
// 		  			trHTML += "<td>" + object["high_price"] + "</td>";
// 		  			trHTML += "<td>" + object["price_date"] + "</td>";
// 		  			trHTML +=
// 						'<td><button type="button" class="btn btn-outline-secondary" onclick="showUserEditBox(' +
// 						object["ticker"] +
// 						')">See Trend</button>';
// 		  			trHTML +=
// 						'<button type="button" class="btn btn-outline-danger" onclick="userDelete(' +
// 						object["ticker"] +
// 						')">Some</button></td>';
// 		  			trHTML += "</tr>";
// 				}
				
// 	  		}
// 		};
// 	}
// 	document.getElementById("myWatchList").innerHTML = trHTML;
	
//   }
// loadTable();  



( function ( $ ) {
	"use strict";


	//Sales chart
	// var ctx = document.getElementById( "sales-chart" );
	// ctx.height = 150;
	// var myChart = new Chart( ctx, {
	// 	type: 'line',
	// 	data: {
	// 		labels: [ "2010", "2011", "2012", "2013", "2014", "2015", "2016" ],
	// 		type: 'line',
	// 		defaultFontFamily: 'Montserrat',
	// 		datasets: [ {
	// 			label: "Foods",
	// 			data: [ 0, 30, 10, 120, 50, 63, 10 ],
	// 			backgroundColor: 'transparent',
	// 			borderColor: 'rgba(220,53,69,0.75)',
	// 			borderWidth: 3,
	// 			pointStyle: 'circle',
	// 			pointRadius: 5,
	// 			pointBorderColor: 'transparent',
	// 			pointBackgroundColor: 'rgba(220,53,69,0.75)',
    //                 }, {
	// 			label: "Electronics",
	// 			data: [ 0, 50, 40, 80, 40, 79, 120 ],
	// 			backgroundColor: 'transparent',
	// 			borderColor: 'rgba(40,167,69,0.75)',
	// 			borderWidth: 3,
	// 			pointStyle: 'circle',
	// 			pointRadius: 5,
	// 			pointBorderColor: 'transparent',
	// 			pointBackgroundColor: 'rgba(40,167,69,0.75)',
    //                 } ]
	// 	},
	// 	options: {
	// 		responsive: true,

	// 		tooltips: {
	// 			mode: 'index',
	// 			titleFontSize: 12,
	// 			titleFontColor: '#000',
	// 			bodyFontColor: '#000',
	// 			backgroundColor: '#fff',
	// 			titleFontFamily: 'Montserrat',
	// 			bodyFontFamily: 'Montserrat',
	// 			cornerRadius: 3,
	// 			intersect: false,
	// 		},
	// 		legend: {
	// 			display: false,
	// 			labels: {
	// 				usePointStyle: true,
	// 				fontFamily: 'Montserrat',
	// 			},
	// 		},
	// 		scales: {
	// 			xAxes: [ {
	// 				display: true,
	// 				gridLines: {
	// 					display: false,
	// 					drawBorder: false
	// 				},
	// 				scaleLabel: {
	// 					display: false,
	// 					labelString: 'Month'
	// 				}
    //                     } ],
	// 			yAxes: [ {
	// 				display: true,
	// 				gridLines: {
	// 					display: false,
	// 					drawBorder: false
	// 				},
	// 				scaleLabel: {
	// 					display: true,
	// 					labelString: 'Value'
	// 				}
    //                     } ]
	// 		},
	// 		title: {
	// 			display: false,
	// 			text: 'Normal Legend'
	// 		}
	// 	}
	// } );

// NANCY start

// var labels_x = [], datesData1 = [], datesData2 = [], stock1Data = [], stock2Data = [];

// async function salesChartUpdate() {
//   await getTwoStocksData()
//   var ctx = document.getElementById( "sales-chart" );
//   ctx.height = 150;
//   var url1 = "https://server1-nancypitta.uic-cs480-fall-2022.repl.co/api/stocks/";
//   var url2 = "https://server1-nancypitta.uic-cs480-fall-2022.repl.co/api/stocks/";
//   var myChart = new Chart( ctx, {
// 	type: 'line',
// 	data: {
// 		labels: datesData1,
// 		type: 'line',
// 		defaultFontFamily: 'Montserrat',
// 		datasets: [ {
// 			label: "AAPL",
// 			data: stock1Data,
// 			backgroundColor: 'transparent',
// 			borderColor: 'rgba(220,53,69,0.75)',
// 			borderWidth: 3,
// 			pointStyle: 'circle',
// 			pointRadius: 5,
// 			pointBorderColor: 'transparent',
// 			pointBackgroundColor: 'rgba(220,53,69,0.75)',
// 				}, {
// 			label: "MSFT",
// 			data: stock2Data,
// 			backgroundColor: 'transparent',
// 			borderColor: 'rgba(40,167,69,0.75)',
// 			borderWidth: 3,
// 			pointStyle: 'circle',
// 			pointRadius: 5,
// 			pointBorderColor: 'transparent',
// 			pointBackgroundColor: 'rgba(40,167,69,0.75)',
// 				} ]
// 	},
// 	options: {
// 		responsive: true,

// 		tooltips: {
// 			mode: 'index',
// 			titleFontSize: 12,
// 			titleFontColor: '#000',
// 			bodyFontColor: '#000',
// 			backgroundColor: '#fff',
// 			titleFontFamily: 'Montserrat',
// 			bodyFontFamily: 'Montserrat',
// 			cornerRadius: 3,
// 			intersect: false,
// 		},
// 		legend: {
// 			display: false,
// 			labels: {
// 				usePointStyle: true,
// 				fontFamily: 'Montserrat',
// 			},
// 		},
// 		scales: {
// 			xAxes: [ {
// 				type: 'time',
// 				  time: {
// 					displayFormats: {
// 						'millisecond': 'MMM DD',
// 					  'second': 'MMM DD',
// 					  'minute': 'MMM DD',
// 					  'hour': 'MMM DD',
// 					  'day': 'MMM DD',
// 					  'week': 'MMM DD',
// 					  'month': 'MMM DD',
// 					  'quarter': 'MMM DD',
// 					  'year': 'MMM DD',
// 					}
// 				  },
// 				display: true,
// 				gridLines: {
// 					display: false,
// 					drawBorder: false
// 				},
// 				scaleLabel: {
// 					display: false,
// 					labelString: 'Month'
// 				}
// 					} ],
// 			yAxes: [ {
// 				display: true,
// 				gridLines: {
// 					display: false,
// 					drawBorder: false
// 				},
// 				scaleLabel: {
// 					display: true,
// 					labelString: 'Value'
// 				}
// 					} ]
// 		},
// 		title: {
// 			display: false,
// 			text: 'Normal Legend'
// 		}
// 	}
// } );
	
// 	var prices1 = [];
// 	var dates1 = [];
// 	var prices2 = [];
// 	var dates2 = [];

// 	$("#salesstock1").change(function() {
		
// 		var input_value = $("#salesstock1").val();
// 		if(input_value==""){
// 			input_value="AAPL";
// 		}
// 		const xhttp2 = new XMLHttpRequest();
// 		xhttp2.open("GET",url1+input_value);
// 		xhttp2.send();
// 		xhttp2.onreadystatechange = function(){
// 			if(this.readyState == 4 && this.status == 200){
// 				const objects2 = JSON.parse(this.responseText);
// 				prices1 = []; 
// 				dates1=[];
// 				for(let obj of objects2.response){
// 					prices1.push(obj.close_price);
// 					dates1.push(obj.price_date);
// 				}
// 				var data = myChart.config.data;
				
// 				if(prices1.length>0){
// 					data.datasets[0].data = prices1;
// 					data.datasets[0].label = input_value;
// 					// data.datasets[1].data = rain_dataset;
// 					data.labels = dates1;
// 					console.log("INHERE");
// 					myChart.update();
// 				}else{
// 					alert("Enter correct ticker");
// 				}
				
// 			}
// 		}
		
// 	}).change();

// 	$("#salesstock2").change(function() {
		
// 		var input_value = $("#salesstock2").val();
// 		if(input_value==""){
// 			input_value="MSFT";
// 		}
// 		const xhttp2 = new XMLHttpRequest();
// 		xhttp2.open("GET",url2+input_value);
// 		xhttp2.send();
// 		xhttp2.onreadystatechange = function(){
// 			if(this.readyState == 4 && this.status == 200){
// 				const objects2 = JSON.parse(this.responseText);
// 				prices2 = []; 
// 				dates2=[];
// 				for(let obj of objects2.response){
// 					prices2.push(obj.close_price);
// 					dates2.push(obj.price_date);
// 				}
// 				var data = myChart.config.data;
				
// 				if(prices2.length>0){
// 					data.datasets[0].data = prices2;
// 					data.datasets[0].label = input_value;
// 					// data.datasets[1].data = rain_dataset;
// 					data.labels = dates2;
					
// 					myChart.update();
// 				}else{
// 					alert("Enter correct ticker");
// 				}
				
// 			}
// 		}
		
// 	}).change();


// }
// salesChartUpdate();

//Fetch Data from API
async function getTwoStocksData() {
  const apiUrl1 = "https://server1-nancypitta.uic-cs480-fall-2022.repl.co/api/stocks/aapl";
  const apiUrl2 = "https://server1-nancypitta.uic-cs480-fall-2022.repl.co/api/stocks/msft";

  const response1 = await fetch(apiUrl1);
  const response2 = await fetch(apiUrl2);
  const barChatData1 = await response1.json()
  const barChatData2 = await response2.json()
  
  
  var stock1Prices=[];
  var stock2Prices=[];
  var stock1Dates=[];
  var stock2Dates=[];
	for (let obj of barChatData1.response) {
	stock1Prices.push(obj.close_price);
	stock1Dates.push(new Date(obj.price_date));
	}
	for (let obj of barChatData2.response) {
		stock2Prices.push(obj.close_price);
		stock2Dates.push(new Date(obj.price_date));
	}
  
 datesData1 = stock1Dates;
 datesData2 = stock2Dates;
 stock1Data = stock1Prices;
 stock2Data = stock2Prices;
 labels_x = priceDates;
}

var labels_x = [], priceDatesData = [], closingPricesData = []

async function dummyChart() {
  await getStockHistoricalData()
  var ctx = document.getElementById( "lineChart" );
  ctx.height = 150;
  var url = "https://server1-nancypitta.uic-cs480-fall-2022.repl.co/api/stocks/";
  
	var myChart = new Chart( ctx, {
		type: 'line',
		data: {
			labels: priceDatesData,
			datasets: [
				
				{
					label: "AAPL",
					borderColor: "rgba(0,255,0,0.7)",
					borderWidth: "1",
					backgroundColor: "rgba(0, 128, 128, 0.5)",
					pointHighlightStroke: "rgba(26,179,148,1)",
					data: closingPricesData
                            }
                        ]
		},
		options: {
			responsive: true,
			tooltips: {
				mode: 'index',
				intersect: false
			},
			hover: {
				mode: 'nearest',
				intersect: true
			},
			scales: {
				xAxes: [{
				  type: 'time',
				  ticks: {
					fontColor: "white",
					
				   },
				  time: {
					displayFormats: {
						'millisecond': 'MMM DD',
					  'second': 'MMM DD',
					  'minute': 'MMM DD',
					  'hour': 'MMM DD',
					  'day': 'MMM DD',
					  'week': 'MMM DD',
					  'month': 'MMM DD',
					  'quarter': 'MMM DD',
					  'year': 'MMM DD',
					}
				  }
				}],
				yAxes: [{
					ticks: {
						fontColor: "white",
						
					   },
				}]
			  },

		}
	} );
	var prices = [];
	var dates = [];
	$("#top1").click(function() {
		
		const xhttp2 = new XMLHttpRequest();
		xhttp2.open("GET",url+top4Tickers[0]);
		
		xhttp2.send();
		xhttp2.onreadystatechange = function(){
			if(this.readyState == 4 && this.status == 200){
				const objects2 = JSON.parse(this.responseText);
				prices = []; 
				dates=[];
				for(let obj of objects2.response){
					prices.push(obj.close_price);
					dates.push(obj.price_date);
				}
				var data = myChart.config.data;
				
				data.datasets[0].data = prices;
				data.datasets[0].label = top4Tickers[0];
				// data.datasets[1].data = rain_dataset;
				data.labels = dates;
				myChart.update();
			}
		}
		
	});

	$("#top2").click(function() {
		
		const xhttp2 = new XMLHttpRequest();
		xhttp2.open("GET",url+top4Tickers[1]);
		xhttp2.send();
		xhttp2.onreadystatechange = function(){
			if(this.readyState == 4 && this.status == 200){
				const objects2 = JSON.parse(this.responseText);
				prices = []; 
				dates=[];
				for(let obj of objects2.response){
					prices.push(obj.close_price);
					dates.push(obj.price_date);
				}
				var data = myChart.config.data;
				
				data.datasets[0].data = prices;
				data.datasets[0].label = top4Tickers[1];
				// data.datasets[1].data = rain_dataset;
				data.labels = dates;
				myChart.update();
			}
		}
		
	});

	$("#top3").click(function() {
		
		const xhttp2 = new XMLHttpRequest();
		xhttp2.open("GET",url+top4Tickers[2]);
		xhttp2.send();
		xhttp2.onreadystatechange = function(){
			if(this.readyState == 4 && this.status == 200){
				const objects2 = JSON.parse(this.responseText);
				prices = []; 
				dates=[];
				for(let obj of objects2.response){
					prices.push(obj.close_price);
					dates.push(obj.price_date);
				}
				var data = myChart.config.data;
				
				data.datasets[0].data = prices;
				data.datasets[0].label = top4Tickers[2];
				// data.datasets[1].data = rain_dataset;
				data.labels = dates;
				myChart.update();
			}
		}
		
	});

	$("#top4").click(function() {
		
		const xhttp2 = new XMLHttpRequest();
		xhttp2.open("GET",url+top4Tickers[3]);
		xhttp2.send();
		xhttp2.onreadystatechange = function(){
			if(this.readyState == 4 && this.status == 200){
				const objects2 = JSON.parse(this.responseText);
				prices = []; 
				dates=[];
				for(let obj of objects2.response){
					prices.push(obj.close_price);
					dates.push(obj.price_date);
				}
				var data = myChart.config.data;
				
				data.datasets[0].data = prices;
				data.datasets[0].label = top4Tickers[3];
				data.labels = dates;
				myChart.update();
			}
		}
		
	});

	$("#nancySearch").change(function() {
		
		var input_value = $("#nancySearch").val();
		if(input_value==""){
			input_value="AAPL";
		}
		const xhttp2 = new XMLHttpRequest();
		xhttp2.open("GET",url+input_value);
		xhttp2.send();
		xhttp2.onreadystatechange = function(){
			if(this.readyState == 4 && this.status == 200){
				const objects2 = JSON.parse(this.responseText);
				prices = []; 
				dates=[];
				for(let obj of objects2.response){
					prices.push(obj.close_price);
					dates.push(obj.price_date);
				}
				var data = myChart.config.data;
				
				if(prices.length>0){
					data.datasets[0].data = prices;
					data.datasets[0].label = input_value;
					// data.datasets[1].data = rain_dataset;
					data.labels = dates;
					
					myChart.update();
				}else{
					alert("Enter correct ticker");
				}
				
			}
		}
		
	}).change();


}
dummyChart();

//Fetch Data from API
async function getStockHistoricalData() {
  const apiUrl = "https://server1-nancypitta.uic-cs480-fall-2022.repl.co/api/stocks/aapl"

  const response = await fetch(apiUrl)
  const barChatData = await response.json()
  
  
  var prices=[];
	var dates=[];
                  for (let obj of barChatData.response) {
                      prices.push(obj.close_price);
                      dates.push(new Date(obj.price_date));
					//   dates.push(new Date(obj.price_date.substring(0,10)));
                  }
  const priceDates = dates;//barChatData.response.map((x) => x.price_date);
  const closing_price = prices;//barChatData.data.map((x) => x.close_price);
  

 priceDatesData = priceDates;
 closingPricesData = closing_price;
 labels_x = priceDates;
}

var realTime_x=[], realTimePrices=[], realTimeDates=[]

async function realTimeChart() {
	await getRealTimeStockData()
	
	var url = "https://server1-nancypitta.uic-cs480-fall-2022.repl.co/api/realtime/";
	
	var ctx = document.getElementById( "team-chart" );
	ctx.height = 250;
	var myChart = new Chart( ctx, {
		type: 'line',
		data: {
			labels: realTimeDates,
			type: 'line',
			defaultFontFamily: 'Montserrat',
			datasets: [ {
				data: realTimePrices,
				label: "Real Time",
				backgroundColor: 'transparent',
				borderColor: 'rgba(0,255,0,0.7)',
				borderWidth: 3.5,
				pointStyle: 'circle',
				pointRadius: 2,
				pointBorderColor: 'transparent',
				pointBackgroundColor: 'rgba(255,0,0,0.7)',
                    }, ]
		},
		options: {
			responsive: true,
			tooltips: {
				mode: 'index',
				titleFontSize: 12,
				titleFontColor: '#000',
				bodyFontColor: '#000',
				backgroundColor: '#fff',
				titleFontFamily: 'Montserrat',
				bodyFontFamily: 'Montserrat',
				cornerRadius: 3,
				intersect: false,
			},
			legend: {
				display: false,
				position: 'top',
				labels: {
					usePointStyle: true,
					fontFamily: 'Montserrat',
				},


			},
			scales: {
				xAxes: [ {
					type: 'time',
					ticks: {
						fontColor: "white",
					
					},
					time: {
						displayFormats: {
							'millisecond': 'MMM DD',
						  'second': 'MMM DD',
						  'minute': 'MMM DD',
						  'hour': 'MMM DD HH',
						  'day': 'MMM DD',
						  'week': 'MMM DD',
						  'month': 'MMM DD',
						  'quarter': 'MMM DD',
						  'year': 'MMM DD',
						}
					},
					display: true,
					gridLines: {
						display: false,
						drawBorder: false
					},
					scaleLabel: {
						display: false,
						labelString: 'Month'
					}
                        } ],
				yAxes: [ {
					display: true,
					ticks: {
						fontColor: "white",
					
					},
					grid: {borderColor: "white",color:'white'},
					gridLines: {
						borderColor: "white",
						display: false,
						drawBorder: false
					},
					scaleLabel: {
						display: true,
						labelString: 'Value'
					}
                        } ]
			},
			title: {
				display: false,
			}
		}
	} );
	  var prices = [];
	  var dates = [];
	  
  
	  $("#nancySearch1").change(function() {
		  
		  var input_value = $("#nancySearch1").val();
		  if(input_value==""){
			  input_value="AAPL";
		  }
		  const xhttp2 = new XMLHttpRequest();
		  xhttp2.open("GET",url+input_value);
		  xhttp2.send();
		  xhttp2.onreadystatechange = function(){
			  if(this.readyState == 4 && this.status == 200){
				  const objects2 = JSON.parse(this.responseText);
				  var fin_str = JSON.stringify(objects2.response);
				  prices = []; 
				  dates=[];
				  const obj = JSON.parse(fin_str.replaceAll('4. close','close'), function (key, value) {
					if(typeof(value)!=typeof("nj")){
						dates.push(new Date(key));
					}else{
						if(key=="close"){
							prices.push(value);
						}
					}
				});
				console.log(prices);
				console.log(dates);

				  var data = myChart.config.data;
				  
				  if(prices.length>0){
					  data.datasets[0].data = prices;
					  data.datasets[0].label = input_value;
					  // data.datasets[1].data = rain_dataset;
					  data.labels = dates;
					  
					  myChart.update();
				  }else{
					  alert("Enter correct ticker");
				  }
				  
			  }
		  }
		  
	  }).change();
  
  
  }
  realTimeChart();

//Fetch real time data from external alpha vantage API
async function getRealTimeStockData() {
	const apiUrl = "https://server1-nancypitta.uic-cs480-fall-2022.repl.co/api/realtime/aapl"
  
	const response = await fetch(apiUrl)
	
	const barChatData = await response.json()
	var fin_str = JSON.stringify(barChatData.response);
	
	var prices=[];
	var dates=[];
	const obj = JSON.parse(fin_str.replaceAll('4. close','close'), function (key, value) {
		if(typeof(value)!=typeof("nj")){
			var dateobj= new Date(key);
			dates.push(dateobj.getHours()+":"+dateobj.getMinutes());
		}else{
			if(key=="close"){
				prices.push(value);
			}
		}
	});
	
	realTime_x = dates;
	realTimePrices = prices;
	realTimeDates = dates;
  }


// NANCY END
	


	//bar chart
	var ctx = document.getElementById( "barChart" );
	//    ctx.height = 200;
	var myChart = new Chart( ctx, {
		type: 'bar',
		data: {
			labels: [ "January", "February", "March", "April", "May", "June", "July" ],
			datasets: [
				{
					label: "My First dataset",
					data: [ 65, 59, 80, 81, 56, 55, 40 ],
					borderColor: "rgba(0, 123, 255, 0.9)",
					borderWidth: "0",
					backgroundColor: "rgba(0, 123, 255, 0.5)"
                            },
				{
					label: "My Second dataset",
					data: [ 28, 48, 40, 19, 86, 27, 90 ],
					borderColor: "rgba(0,0,0,0.09)",
					borderWidth: "0",
					backgroundColor: "rgba(0,0,0,0.07)"
                            }
                        ]
		},
		options: {
			scales: {
				yAxes: [ {
					ticks: {
						beginAtZero: true
					}
                                } ]
			}
		}
	} );

	//radar chart
	var ctx = document.getElementById( "radarChart" );
	ctx.height = 160;
	var myChart = new Chart( ctx, {
		type: 'radar',
		data: {
			labels: [ [ "Eating", "Dinner" ], [ "Drinking", "Water" ], "Sleeping", [ "Designing", "Graphics" ], "Coding", "Cycling", "Running" ],
			datasets: [
				{
					label: "My First dataset",
					data: [ 65, 59, 66, 45, 56, 55, 40 ],
					borderColor: "rgba(0, 123, 255, 0.6)",
					borderWidth: "1",
					backgroundColor: "rgba(0, 123, 255, 0.4)"
                            },
				{
					label: "My Second dataset",
					data: [ 28, 12, 40, 19, 63, 27, 87 ],
					borderColor: "rgba(0, 123, 255, 0.7",
					borderWidth: "1",
					backgroundColor: "rgba(0, 123, 255, 0.5)"
                            }
                        ]
		},
		options: {
			legend: {
				position: 'top'
			},
			scale: {
				ticks: {
					beginAtZero: true
				}
			}
		}
	} );


	//pie chart
	var ctx = document.getElementById( "pieChart" );
	ctx.height = 300;
	var myChart = new Chart( ctx, {
		type: 'pie',
		data: {
			datasets: [ {
				data: [ 45, 25, 20, 10 ],
				backgroundColor: [
                                    "rgba(0, 123, 255,0.9)",
                                    "rgba(0, 123, 255,0.7)",
                                    "rgba(0, 123, 255,0.5)",
                                    "rgba(0,0,0,0.07)"
                                ],
				hoverBackgroundColor: [
                                    "rgba(0, 123, 255,0.9)",
                                    "rgba(0, 123, 255,0.7)",
                                    "rgba(0, 123, 255,0.5)",
                                    "rgba(0,0,0,0.07)"
                                ]

                            } ],
			labels: [
                            "green",
                            "green",
                            "green"
                        ]
		},
		options: {
			responsive: true
		}
	} );

	//doughut chart
	var ctx = document.getElementById( "doughutChart" );
	ctx.height = 150;
	var myChart = new Chart( ctx, {
		type: 'doughnut',
		data: {
			datasets: [ {
				data: [ 45, 25, 20, 10 ],
				backgroundColor: [
                                    "rgba(0, 123, 255,0.9)",
                                    "rgba(0, 123, 255,0.7)",
                                    "rgba(0, 123, 255,0.5)",
                                    "rgba(0,0,0,0.07)"
                                ],
				hoverBackgroundColor: [
                                    "rgba(0, 123, 255,0.9)",
                                    "rgba(0, 123, 255,0.7)",
                                    "rgba(0, 123, 255,0.5)",
                                    "rgba(0,0,0,0.07)"
                                ]

                            } ],
			labels: [
                            "green",
                            "green",
                            "green",
                            "green"
                        ]
		},
		options: {
			responsive: true
		}
	} );

	//polar chart
	var ctx = document.getElementById( "polarChart" );
	ctx.height = 150;
	var myChart = new Chart( ctx, {
		type: 'polarArea',
		data: {
			datasets: [ {
				data: [ 15, 18, 9, 6, 19 ],
				backgroundColor: [
                                    "rgba(0, 123, 255,0.9)",
                                    "rgba(0, 123, 255,0.8)",
                                    "rgba(0, 123, 255,0.7)",
                                    "rgba(0,0,0,0.2)",
                                    "rgba(0, 123, 255,0.5)"
                                ]

                            } ],
			labels: [
                            "green",
                            "green",
                            "green",
                            "green"
                        ]
		},
		options: {
			responsive: true
		}
	} );

	// single bar chart
	var ctx = document.getElementById( "singelBarChart" );
	ctx.height = 150;
	var myChart = new Chart( ctx, {
		type: 'bar',
		data: {
			labels: [ "Sun", "Mon", "Tu", "Wed", "Th", "Fri", "Sat" ],
			datasets: [
				{
					label: "My First dataset",
					data: [ 40, 55, 75, 81, 56, 55, 40 ],
					borderColor: "rgba(0, 123, 255, 0.9)",
					borderWidth: "0",
					backgroundColor: "rgba(0, 123, 255, 0.5)"
                            }
                        ]
		},
		options: {
			scales: {
				yAxes: [ {
					ticks: {
						beginAtZero: true
					}
                                } ]
			}
		}
	} );




} )( jQuery );
