<?php
header("Content-Type: text/javascript");
include_once("../cfg.php");
?>
function fillProductListDropDown(responseText)
{
	var totProductArr = responseText.split('||+||');
	if(parseInt(totProductArr[0])>0)
	{	
		var optListArr = totProductArr[2].split('~~|~~');
		optListArr.pop();
		$('#_model').empty();
		$('#_smodel').empty();
		$('#_selModels').val('');
		
		for(i=0;	i<optListArr.length;	i++)
		{	var itemDet = optListArr[i].split(':');
			$('#_model').append("<option value='"+itemDet[0]+"'>"+itemDet[1]+' ('+totProductArr[1]+') '+"</option>");
		}
		
	}else
	{
		alert('Please select the product company or the company you selected have no any product.');
		return false
	}
    
}
function fillProductGroupListDropDown(responseText)
{
	var totProductArr = responseText.split('||+||');
	if(parseInt(totProductArr[0])>0)
	{	
		var optListArr = totProductArr[1].split('~~|~~');
		optListArr.pop();
		$('#_prGroup').empty();
		$('#_selPrGroup').empty();
		$('#_selPrGroupIds').val('');
		
		for(i=0;	i<optListArr.length;	i++)
		{	var itemDet = optListArr[i].split(':');
			$('#_prGroup').append("<option value='"+itemDet[0]+"'>"+itemDet[1]+"</option>");
		}
		
	}else
	{
		alert('Please select the product company or the company you selected have no any product group.');
		return false
	}
    
}
function fillProductForOS(responseText)
{
	var totProductArr = responseText.split('||+||');
	if(parseInt(totProductArr[0])>0)
	{	
		var optListArr = totProductArr[2].split('~~|~~');
		optListArr.pop();
		$('#productHolder').empty();
		$('#_selProduct').val('');
		var selPrd = '';
		for(i=0;	i<optListArr.length;	i++)
		{	var itemDet = optListArr[i].split(':');
			$('#productHolder').append("<tr><td class=right-td> "+itemDet[1]+" : </td><td><input type='text' name='"+itemDet[0]+"'  id='"+itemDet[0]+"' value='"+itemDet[2]+"' class='inputTax' ></td></tr>");
			selPrd = selPrd + itemDet[0] + ',';
		}
		$('#_selProduct').val(selPrd);
	}else
	{
		alert('Please select the product company or the company you selected have no any product.');
		return false
	}
}
function insertOption(sourceId, destId)
{
  var sourceSel = getEle(sourceId);
  var destSel = getEle(destId);
  var sourceOptTot = sourceSel.length;
  var transferArr = new Array();
  var trnCnt = 0;
  for(i=0;	i<sourceOptTot;	i++){  
	  if (sourceSel.options[i].selected) {
		var elOptNew = document.createElement('option');
		elOptNew.text = sourceSel.options[i].text.toString();
		elOptNew.value = sourceSel.options[i].value.toString();
		try {
		  destSel.add(elOptNew, null);
		  transferArr[trnCnt]=sourceSel.options[i].index;	trnCnt++;
		}
		catch(ex) {
		  destSel.add(elOptNew); // IE only
		  transferArr[trnCnt]=sourceSel.options[i].index;	trnCnt++;
		}
	  }
	  
	}
  var trArrEnd = (transferArr.length-1);
  for(i=trArrEnd;	i>=0;	i--){
  	sourceSel.remove(transferArr[i]);
  }
}
function removeOpt(sourceId, destId)
{
	var sourceSel = getEle(sourceId);
	var destSel = getEle(destId);
	var destOptTot = destSel.length;
	var transferArr = new Array();
	var trnCnt = 0;
	for(i=0;	i<destOptTot;	i++){  
	  if (destSel.options[i].selected) {
		var elOptNew = document.createElement('option');
		elOptNew.text = destSel.options[i].text.toString();
		elOptNew.value = destSel.options[i].value.toString();
		try {
		  sourceSel.add(elOptNew, null);
		  transferArr[trnCnt]=destSel.options[i].index;	trnCnt++;
		  //sourceSel.remove(sourceSel.options[i].index);
		}
		catch(ex) {
		  sourceSel.add(elOptNew); // IE only
		  transferArr[trnCnt]=destSel.options[i].index;	trnCnt++;
		  //sourceSel.remove(sourceSel.options[i].index);
		}
	  }
	  
	}
	var trArrEnd = (transferArr.length-1);
	for(i=trArrEnd;	i>=0;	i--){
		destSel.remove(transferArr[i]);
	}
}
function rFillSelModel(destId, selId)
{
	var modelList = '';
	var destSel = getEle(destId);
	for(i=0;	i<destSel.length;	i++){
		modelList = modelList + destSel.options[i].value.toString() + ',';  
	}
	$('#'+selId).val(modelList);
}
function drawNextTaxBillItem()
{
	var nextId= (parseInt($('#_totEle').val())+1);
	//alert(nextId);
	$('#itemHolder').append('<table id="itemsHolderTbl_'+nextId+'" style="border-top:2px solid #ffffff;"><tr><td class="right-td_bill">CMC : </td><td colspan="5"><input type="text" name="productString'+nextId+'" id="productString'+nextId+'" style="width:200px; " onkeypress="javascript:getKeyCode(event,'+nextId+');"/><div style="float:right;" onClick="javascript:removeTaxBillItem('+nextId+')"><i class="fa fa-trash"></i>&nbsp;</div></td></tr><tr><td class="right-td_bill">&nbsp;</td><td colspan="5"><select name="productList'+nextId+'" id="productList'+nextId+'"  style="width:485px; background:none; background-color:#000000; " onfocus="javascript:eS(this);" onblur="javascript:cS(this);"><option value="0">---</option></select></td></tr><tr><td class="right-td_bill">IMEI : </td><td><input type="text" class="w200" value="" name="prIMEI'+nextId+'" id="prIMEI'+nextId+'" /></td><td class="right-td_bill">Serial:</td><td><input type="text" class="w200" value="" name="prSerial'+nextId+'" id="prSerial'+nextId+'" /></td></tr></table>');
	$('#_totEle').val((parseInt($('#_totEle').val())+1));
	$('#_netEle').val(($('#_netEle').val()+nextId+'-'));
}
function updateProductCost(responseText)
{	var respTxtArr = responseText.split(':');
	if(respTxtArr[0]=='Discount Updated successfully')
    {	var id = respTxtArr[1];
        var baseDP = parseFloat($('#basedp_'+id).val());
        var vat = ((baseDP * parseFloat($('#vat').val()))/100);
        var avat = ((baseDP * parseFloat($('#avat').val()))/100);
        var pdisc = ((baseDP * parseFloat($('#pdisc_'+id).val()))/100);
        var rdisc = parseFloat($('#_rdisc_'+id).val());
        var cost = parseFloat(((baseDP + vat + avat) - (pdisc+rdisc)));
        $('#cost_'+id).html(roundNumber(cost,2));
    }else{
    	alert(respTxtArr[0]);
    }
}
function clearHtmlCache(varName, reloadWindow)
{
  callAjax('_phpFun=clearHtmlCache&_nextAct=&varName='+varName, '');
  if(reloadWindow == true)
    window.location.reload();
}