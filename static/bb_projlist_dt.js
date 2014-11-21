function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var searchTerm = getParameterByName('search');
if(searchTerm) {
	$('#proj_search').val(searchTerm);
}

/* Custom filtering functions here */
$.fn.dataTableExt.afnFiltering.push(
	function( oSettings, aData, iDataIndex ) {
		var chkBlack = $('#bbBlack').prop("checked");
		var chkBone = $('#bbone').prop("checked");
		var chkXM = $('#bbXM').prop("checked");
		var chkBoard = $('#bboard').prop("checked");
		var chkBBNA = $('#bbNA').prop("checked");
		
		var dBoardType = aData[4] == "undefined" ? "" : aData[4];

		if (chkBlack || chkBone || chkXM || chkBoard || chkBBNA) {
			if ( chkBlack && dBoardType.indexOf("bbblack") > -1 )
			{
				return true;
			}
			if ( chkBone && dBoardType.indexOf("bbone") > -1 )
			{
				return true;
			}
			if ( chkXM && dBoardType.indexOf("bbxm") > -1 )
			{
				return true;
			}
			if ( chkBoard && dBoardType.indexOf("bboard") > -1 )
			{
				return true;
			}
			if ( chkBBNA && dBoardType == "" )
			{
				return true;
			}
                        if(chkBlack && chkBone && chkXM && chkBoard && chkBBNA) {
				console.log(iDataIndex + " has invalid board set as: " + dBoardType);
                        }
			return false;
		} else {
			return true;
		}
	}
);


$.fn.dataTableExt.afnFiltering.push(
	function( oSettings, aData, iDataIndex ) {
		var chkConcept = $('#sConcept').prop("checked");
		var chkDemo = $('#sDemo').prop("checked");
		var chkDev = $('#sDev').prop("checked");
		var chkComplete = $('#sComplete').prop("checked");
		var chkSubmit = $('#sSubmit').prop("checked");
		var chkProd = $('#sProd').prop("checked");
		var chkObsolete = $('#sObsolete').prop("checked");
		var chkSNA = $('#sNA').prop("checked");
		
		var dBoardType = aData[5] == "undefined" ? "" : aData[5];

		if (chkConcept || chkDemo || chkDev || chkComplete || chkSubmit || chkProd || chkObsolete || chkSNA) {
		
			if ( chkConcept && dBoardType.indexOf("concept") > -1 )
			{
				return true;
			}
			else if ( chkDemo && dBoardType.indexOf("demo") > -1 )
			{
				return true;
			}
			else if ( chkDev && dBoardType.indexOf("dev") > -1 )
			{
				return true;
			}
			else if ( chkComplete && dBoardType.indexOf("complete") > -1 )
			{
				return true;
			}
			else if ( chkSubmit && dBoardType.indexOf("submitted") > -1 )
			{
				return true;
			}
			else if ( chkProd && dBoardType.indexOf("production") > -1 )
			{
				return true;
			}
			else if ( chkObsolete && dBoardType.indexOf("obsolete") > -1 )
			{
				return true;
			}
			else if ( chkSNA && dBoardType == "")
			{
				return true;
			}
			return false;
		} else {
			return true;
		}
	}
);


$.fn.dataTableExt.afnFiltering.push(
	function( oSettings, aData, iDataIndex ) {
		var chkDistro = $('#cDistro').prop("checked");
		var chkDoc = $('#cDocumentation').prop("checked");
		var chkLib = $('#cLibrary').prop("checked");
		var chkUtil = $('#cUtility').prop("checked");
		var chkCape = $('#cCape').prop("checked");
		var chkCase = $('#cCase').prop("checked");
		var chkDemo = $('#cDemo').prop("checked");
		var chkRobot = $('#cRobot').prop("checked");
		var chkGSoC = $('#cGSoC').prop("checked");
		var chkCNA = $('#cNA').prop("checked");
		
		var dCategory = aData[3] == "undefined" ? "" : aData[3];

		if (chkDistro || chkDoc || chkLib || chkUtil || chkCape || chkCase || chkDemo || chkRobot || chkGSoC || chkCNA) {
		
			if ( chkDistro && dCategory.indexOf("distro") > -1 )
			{
				return true;
			}
			else if ( chkDoc && dCategory.indexOf("documentation") > -1 )
			{
				return true;
			}
			else if ( chkLib && dCategory.indexOf("library") > -1 )
			{
				return true;
			}
			else if ( chkUtil && dCategory.indexOf("utility") > -1 )
			{
				return true;
			}
			else if ( chkCape && dCategory.indexOf("cape") > -1 )
			{
				return true;
			}
			else if ( chkCase && dCategory.indexOf("case") > -1 )
			{
				return true;
			}
			else if ( chkDemo && dCategory.indexOf("demo") > -1 )
			{
				return true;
			}
			else if ( chkRobot && dCategory.indexOf("robotics") > -1 )
			{
				return true;
			}
			else if ( chkGSoC && dCategory.indexOf("gsoc") > -1 )
			{
				return true;
			}
			else if ( chkCNA && dCategory == "" )
			{
				return true;
			}
			return false;
		} else {
			return true;
		}
	}
);

/*
$.fn.dataTableExt.afnFiltering.push(
	function( oSettings, aData, iDataIndex ) {
		var fCat = $('#projCats').val();
		var dCat = aData[3] == "undefined" ? "" : aData[3];

		if (fCat != 'all') {
		
			if ( dCat.indexOf(fCat) > -1 )
			{
				return true;
			} else {
				return false;
			}
		} else {
			return true;
		}
	}
);
*/


$.fn.dataTableExt.afnFiltering.push(
	function( oSettings, aData, iDataIndex ) {
		var fSearch = $('#proj_search').val().toLowerCase();
		var dData = $(aData[0]).text().toLowerCase() + ';' + $(aData[1]).text().toLowerCase();

		if (fSearch != '') {
		
			if ( dData.indexOf(fSearch) > -1 )
			{
				return true;
			} else {
				return false;
			}
		} else {
			return true;
		}
	}
);

$('.chkcat').live('click', function() {
	$('#projects').dataTable().fnDraw();
})

$('.chkboard').live('click', function() {
	$('#projects').dataTable().fnDraw();
});

$('.chkstatus').live('click', function() {
	$('#projects').dataTable().fnDraw();
});

//$('#projCats').live('change', function() {
//	$('#projects').dataTable().fnDraw();
//})

$('#proj_search').live('keyup change', function() {
	$('#projects').dataTable().fnDraw();
});


function replaceInlineImages() {  //this function is called in list
	if ($.browser.msie && (parseFloat($.browser.version) < 9 ) ) {
		$('img[src^="data:"]').each(function() {
			this.src = '/static/graphics/coolboris.png'
		});
	}
}

setInterval(function() {
	$('.lazy-load').each(function() {
		var e = $(this);

		$.ajax({
			url: e.attr('data-src'),
			dataType: 'html',
			success: function(html) {
				e.removeClass('lazy-load');
				e.attr('src', $(html).attr('src'));
			}
		});
	});
}, 1000);
