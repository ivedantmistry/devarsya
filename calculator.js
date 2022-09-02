function fn(num, places, comma)
{
	var isNeg=0;
	if(num < 0)
	{
		 num=num*-1;
		 isNeg=1;
	}
	var myDecFact = 1;
	var myPlaces = 0;
	var myZeros = "";
	while(myPlaces < places) {
		 myDecFact = myDecFact * 10;
		 myPlaces = Number(myPlaces) + Number(1);
		 myZeros = myZeros + "0";
}
onum=Math.round(num*myDecFact)/myDecFact;
integer=Math.floor(onum);
if (Math.ceil(onum) == integer)
{
	decimal=myZeros;
}
else
{
	decimal=Math.round((onum-integer)* myDecFact)
}
decimal=decimal.toString();
if (decimal.length<places)
{
	 fillZeroes = places - decimal.length;
	 for (z=0;z<fillZeroes;z++)
	 {
			decimal="0"+decimal;
	 }
}
if(places > 0)
{
		decimal = "." + decimal;
}
if(comma == 1)
{
	 integer=integer.toString();
		var tmpnum="";
		 var tmpinteger="";
			var y=0;

			 for (x=integer.length;x>0;x--)
			 {
					 tmpnum=tmpnum+integer.charAt(x-1);
						 y=y+1;
							 if (y==3 & x>1)
							 {
										tmpnum=tmpnum+",";
											 y=0;
							 }
			 }
			 for (x=tmpnum.length;x>0;x--)
			 {
					 tmpinteger=tmpinteger+tmpnum.charAt(x-1);
			 }

			 finNum=tmpinteger+""+decimal;
}
else
{
		finNum=integer+""+decimal;
}

if(isNeg == 1)
{
		 finNum = "-" + finNum;
}
return finNum;
}

function sn(num) {

 num=num.toString();


 var len = num.length;
 var rnum = "";
 var test = "";
 var j = 0;

 var b = num.substring(0,1);
 if(b == "-")
 {
		rnum = "-";
 }

 for(i = 0; i <= len; i++) {
		b = num.substring(i,i+1);
		if(b == "0" || b == "1" || b == "2" || b == "3" || b == "4" || b == "5" || b == "6" || b == "7" || b == "8" || b == "9" || b == ".")
		{
			 rnum = rnum + "" + b;
		}
 }
 if(rnum == "" || rnum == "-") {
		rnum = 0;
 }
 rnum = Number(rnum);
 return rnum;
}

function computeForm(form) {

 if(document.calc.principal.value == "" || document.calc.principal.value ==0) {
 } else
 if(document.calc.payment.value == "" || document.calc.payment.value ==0) {
 } else
 if(document.calc.regIntRate1.value == "" || document.calc.regIntRate1.value ==0) {
 } else
 if(document.calc.regIntRate2.value == "" || document.calc.regIntRate2.value ==0) {
 } else
 if((document.calc.introIntRate1.value.length == 0) && document.calc.introMonths1.value.length > 0) {
 } else
 if((document.calc.introIntRate2.value.length == 0) && document.calc.introMonths2.value.length > 0) {
 } else
 if((document.calc.introMonths1.value == "" || document.calc.introMonths1.value ==0) && document.calc.introIntRate1.value.length > 0) {
 } else
 if((document.calc.introMonths2.value == "" || document.calc.introMonths2.value ==0) && document.calc.introIntRate2.value.length > 0) {
 } else {

		var Vprincipal = sn(document.calc.principal.value);
		var Vpayment = sn(document.calc.payment.value);

		//CALC CARD #1

		var VannFee1 = sn(document.calc.annFee1.value);
		if(VannFee1 == 0 || VannFee1 =="") {
			 VannFee1 = 0;
		} else {
			 VannFee1 = VannFee1 / 12;
		}

		var prin1 = Vprincipal;
		var pmt1 = Vpayment;

		var prin1 = Vprincipal;
		var pmt1 = Vpayment;
		var prinPort1 = 0;
		var intPort1 = 0;
		var count1 = 0;
		var accumInt1 = 0;
		var dailyCount1 = 0;
		var tempInt1 = 0;

		//IF INTRO RATE, DO FOLLOWING:
		var VintroMonths1 = sn(document.calc.introMonths1.value);
		if(VintroMonths1 == 0 || VintroMonths1 =="") {
			 VintroMonths1 = 0;
		}

		if(VintroMonths1 > 0 && document.calc.introIntRate1.value.length > 0) {

			 var VintroIntRate1 = sn(document.calc.introIntRate1.value);
					VintroIntRate1 = VintroIntRate1 / 100.0;

			 if(document.calc.compound1.selectedIndex == 0) {
					VintroIntRate1 /= 12;
			 } else {
					VintroIntRate1 /= 365;
			 }

			 if(document.calc.compound1.selectedIndex == 1) {
					while(count1 < VintroMonths1) {
						 dailyCount1 = 0;
						 tempInt1 = 0;
						 while(dailyCount1 < 31) {
								tempInt1 = Number(VintroIntRate1 * prin1);
								accumInt1 = Number(accumInt1) +  + Number(tempInt1);
								prin1 = Number(prin1) + Number(tempInt1);
								dailyCount1 = dailyCount1 + 1;
						 }
						 prin1 = Number(prin1) - Number(pmt1);
						 count1 = count1 + 1
						 if(count1 > 1000) {
								break;
						 } else {
								continue;
						 }
					}

			 } else {
					while(count1 < VintroMonths1) {
						 intPort1 = Number(VintroIntRate1 * prin1);
						 prinPort1 = Number(pmt1 - intPort1);
						 prin1 = Number(prin1 - prinPort1);
						 accumInt1 = Number(accumInt1 + intPort1);
						 count1 = count1 + 1
						 if(count1 > 1000) {
								break;
						 } else {
								continue;
						 }
					}
			 }
		}
		// END INTRO CALC

		//document.calc.nPer2.value = prin1;
		//document.calc.totalCosts2.value = accumInt1;

		//BEGIN REGULAR INTEREST CALC

		var VregIntRate1 = sn(document.calc.regIntRate1.value);
		VregIntRate1 = VregIntRate1 / 100.0;

		if(document.calc.compound1.selectedIndex == 0) {
			 VregIntRate1 /= 12;
		} else {
			 VregIntRate1 /= 365;
		}

		if(document.calc.compound1.selectedIndex == 1) {
		while((prin1 * ( 1 + VregIntRate1)) > pmt1) {
		//while(count1 < 2) {
					dailyCount1 = 0;
					tempInt1 = 0;
					while(dailyCount1 < 31) {
						 tempInt1 = Number(VregIntRate1 * prin1);
						 accumInt1 = Number(accumInt1) +  + Number(tempInt1);
						 prin1 = Number(prin1) + Number(tempInt1);
						 dailyCount1 = dailyCount1 + 1;
					}
					prin1 = Number(prin1) - Number(pmt1);
					count1 = count1 + 1
					if(count1 > 1000) {
						 break;
					} else {
						 continue;
					}
			 }
			 //FINAL INTEREST PAYMENT
			 dailyCount1 = 0;
			 tempInt1 = 0;
			 while(dailyCount1 < 31) {
					tempInt1 = Number(VregIntRate1 * prin1);
					accumInt1 = Number(accumInt1) +  + Number(tempInt1);
					prin1 = Number(prin1) + Number(tempInt1);
					dailyCount1 = dailyCount1 + 1;
			 }
			 count1 = count1 + 1

		} else {
			 while((prin1 * ( 1 + VregIntRate1)) > pmt1) {
					intPort1 = Number(VregIntRate1 * prin1);
					prinPort1 = Number(pmt1 - intPort1);
					prin1 = Number(prin1 - prinPort1);
					accumInt1 = Number(accumInt1 + intPort1);
					count1 = count1 + 1
					if(count1 > 1000) {
						 break;
					} else {
						 continue;
					}
			 }
		//FINAL INTEREST PAYMENT
			 intPort1 = Number(VregIntRate1 * prin1);
			 accumInt1 = Number(accumInt1 + intPort1);
			 count1 = count1 + 1
		}

		VannFee1 = VannFee1 * count1;

		var VtotalCosts1 = Number(VannFee1) + Number(accumInt1);

		document.calc.totalCosts1.value = "RS " + fn(VtotalCosts1,2,1);
		document.calc.nPer1.value = count1;

		//CALC CARD #2

		var VannFee2 = sn(document.calc.annFee2.value);
		if(VannFee2 == 0 || VannFee2 =="") {
 VannFee2 = 0;
		} else {
			 VannFee2 = VannFee2 / 12;
		}

		var prin2 = Vprincipal;
		var pmt2 = Vpayment;

		var prin2 = Vprincipal;
		var pmt2 = Vpayment;
		var prinPort2 = 0;
		var intPort2 = 0;
		var count2 = 0;
		var accumInt2 = 0;
		var dailyCount2 = 0;
		var tempInt2 = 0;

		//IF INTRO RATE, DO FOLLOWING:
		var VintroMonths2 = sn(document.calc.introMonths2.value);
		if(VintroMonths2 == 0 || VintroMonths2 =="") {
			 VintroMonths2 = 0;
		}

		if(VintroMonths2 > 0 && document.calc.introIntRate1.value.length > 0) {

			 var VintroIntRate2 = sn(document.calc.introIntRate2.value);
			 VintroIntRate2 = VintroIntRate2 / 100.0;

			 if(document.calc.compound2.selectedIndex == 0) {
					VintroIntRate2 /= 12;
			 } else {
					VintroIntRate2 /= 365;
			 }

			 if(document.calc.compound2.selectedIndex == 1) {
					while(count2 < VintroMonths2) {
						 dailyCount2 = 0;
						 tempInt2 = 0;
						 while(dailyCount2 < 31) {
								tempInt2 = Number(VintroIntRate2 * prin2);
								accumInt2 = Number(accumInt2) +  + Number(tempInt2);
								prin2 = Number(prin2) + Number(tempInt2);
								dailyCount2 = dailyCount2 + 1;
						 }
						 prin2 = Number(prin2) - Number(pmt2);
						 count2 = count2 + 1
						 if(count2 > 1000) {
								break;
						 } else {
								continue;
						 }
					}

			 } else {
					while(count2 < VintroMonths2) {
						 intPort2 = Number(VintroIntRate2 * prin2);
						 prinPort2 = Number(pmt2 - intPort2);
						 prin2 = Number(prin2 - prinPort2);
						 accumInt2 = Number(accumInt2 + intPort2);
						 count2 = count2 + 1
						 if(count2 > 1000) {
								break;
						 } else {
								continue;
						 }
					}
			 }
		}
		// END INTRO CALC

		//document.calc.nPer2.value = prin2;
		//document.calc.totalCosts2.value = accumInt2;

		//BEGIN REGULAR INTEREST CALC

		var VregIntRate2 = sn(document.calc.regIntRate2.value);
		VregIntRate2 = VregIntRate2 / 100.0;

		if(document.calc.compound2.selectedIndex == 0) {
			 VregIntRate2 /= 12;
		} else {
			 VregIntRate2 /= 365;
		}

		if(document.calc.compound2.selectedIndex == 1) {
		while((prin2 * ( 1 + VregIntRate2)) > pmt2) {
		//while(count2 < 2) {
					dailyCount2 = 0;
					tempInt2 = 0;
					while(dailyCount2 < 31) {
						 tempInt2 = Number(VregIntRate2 * prin2);
						 accumInt2 = Number(accumInt2) +  + Number(tempInt2);
						 prin2 = Number(prin2) + Number(tempInt2);
						 dailyCount2 = dailyCount2 + 1;
					}
					prin2 = Number(prin2) - Number(pmt2);
					count2 = count2 + 1
					if(count2 > 1000) {
						 break;
					} else {
						 continue;
					}
			 }
			 //FINAL INTEREST PAYMENT
			 dailyCount2 = 0;
			 tempInt2 = 0;
			 while(dailyCount2 < 31) {
					tempInt2 = Number(VregIntRate2 * prin2);
					accumInt2 = Number(accumInt2) +  + Number(tempInt2);
					prin2 = Number(prin2) + Number(tempInt2);
					dailyCount2 = dailyCount2 + 1;
			 }
			 count2 = count2 + 1;

		} else {
			 while((prin2 * ( 1 + VregIntRate2)) > pmt2) {
					intPort2 = Number(VregIntRate2 * prin2);
					prinPort2 = Number(pmt2 - intPort2);
					prin2 = Number(prin2 - prinPort2);
					accumInt2 = Number(accumInt2 + intPort2);
					count2 = count2 + 1;
					if(count2 > 2000) {
						 break;
					} else {
						 continue;
					}
			 }
		//FINAL INTEREST PAYMENT
			 intPort2 = Number(VregIntRate2 * prin2);
			 accumInt2 = Number(accumInt2 + intPort2);
			 count2 = count2 + 1;
		}

		VannFee2 = VannFee2 * count2;

		var VtotalCosts2 = Number(VannFee2) + Number(accumInt2);

		document.calc.totalCosts2.value = "RS " + fn(VtotalCosts2,2,1);
		document.calc.nPer2.value = count2;

var today = new Date();
var Vpayoffdate1 = moment(today).add(count1, 'months').format('MMM YYYY');
 document.calc.payoffdate1.value = Vpayoffdate1;
var Vpayoffdate2 = moment(today).add(count2, 'months').format('MMM YYYY');
 document.calc.payoffdate2.value = Vpayoffdate2;
 }
}


function clear_results(form) {

 document.calc.totalCosts1.value = "";
 document.calc.nPer1.value = "";
 document.calc.totalCosts2.value = "";
 document.calc.nPer2.value = "";
}
