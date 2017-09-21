$(document).ready(function () {

});

function domHtml(fieldId, inputId, inputValue, fixValue, inputType, style) {
    if (inputType == 4 || inputType == 6) {
	
	if (style == 'none') {
	    $('div[item-id=\"' + fieldId + '\"]').children().addClass('display-none');
	} else {
	    $('div[item-id=\"' + fieldId + '\"]').children().removeClass('display-none');
	}

    } else {
	if (inputValue == fixValue) {
	    if (style == 'none') {
		style = 'block';
	    } else {
		style = 'none';
	    }
	}
	
	if (style == 'none') {
	    $('div[item-id=\"' + fieldId + '\"]').children().addClass('display-none');
	} else {
	    $('div[item-id=\"' + fieldId + '\"]').children().removeClass('display-none');
	}
	
	
    }
    
    //(inputValue=='')


    //console.log(inputId+'-'+style);
//    $('div[item-id=\"'+fieldId+'\"]').attr('sub-item', $('.field-'+inputId).parent().attr('item-id'));
//    
//    var idbox = $('#'+$('.field-'+inputId).parent().attr('item-id')).html();
//    
//    if(typeof idbox=='undefined'){
//	$('.field-'+inputId).parent().parent().append('<div id="'+$('.field-'+inputId).parent().attr('item-id')+'" item-id="'+$('.field-'+inputId).parent().attr('item-id')+'" ></div>');
//	$('#rowItem[item-id=\"'+fieldId+'\"]').removeAttr('item-id');
//    }
}

function eventRadio(inputName, dataCond) {
    
    $('body').on('change', 'input[name=\"SDDynamicModel[' + inputName + ']\"]', function () {
	var condObj = JSON.parse(dataCond);
	$.each(condObj, function (index, cvalue) {

	    var jumpArr = cvalue.cond_jump;
	    var requireArr = cvalue.cond_require;
	    var inputValue = $('input[name=\"SDDynamicModel[' + inputName + ']\"]:checked').val();


	    if (typeof inputValue == 'undefined') {
		if (jumpArr != '' && jumpArr != null) {
		    $.each(jumpArr, function (index, value) {
			$('div[item-id=\"' + value + '\"]').children().addClass('display-none');
			clearFormElements('div[item-id=\"' + value + '\"]');
		    });
		}

	    } else {
		if (inputValue == cvalue.ezf_field_value) {
		    if (jumpArr != '' && jumpArr != null) {
			$.each(jumpArr, function (index, value) {
			    $('div[item-id=\"' + value + '\"]').children().addClass('display-none');
			    clearFormElements('div[item-id=\"' + value + '\"]');
			});
		    }
		    if (requireArr != '' && requireArr != null) {
			$.each(requireArr, function (index, value) {
			    $('div[item-id=\"' + value + '\"]').children().removeClass('display-none');
			});
		    }

		}
	    }

	});

    });
}

function setRadio(inputName, dataCond) {
	var condObj = JSON.parse(dataCond);
	$.each(condObj, function (index, cvalue) {

	    var jumpArr = cvalue.cond_jump;
	    var requireArr = cvalue.cond_require;
	    var inputValue = $('input[name=\"SDDynamicModel[' + inputName + ']\"]:checked').val();


	    if (typeof inputValue == 'undefined') {
		if (jumpArr != '' && jumpArr != null) {
		    $.each(jumpArr, function (index, value) {
			$('div[item-id=\"' + value + '\"]').children().addClass('display-none');
		    });
		}

	    } else {
		if (inputValue == cvalue.ezf_field_value) {
		    if (jumpArr != '' && jumpArr != null) {
			$.each(jumpArr, function (index, value) {
			    $('div[item-id=\"' + value + '\"]').children().addClass('display-none');
			});
		    }
		    if (requireArr != '' && requireArr != null) {
			$.each(requireArr, function (index, value) {
			    $('div[item-id=\"' + value + '\"]').children().removeClass('display-none');
			});
		    }

		}
	    }

	});
}

function eventSelect(inputId, dataCond) {
    $('body').on('change', '#' + inputId, function () {
	var condObj = JSON.parse(dataCond);
	$.each(condObj, function (index, cvalue) {
	    var jumpArr = cvalue.cond_jump;
	    var requireArr = cvalue.cond_require;

	    if ($('#' + inputId).val() == cvalue.ezf_field_value) {
		if (jumpArr != '' && jumpArr != null) {
		    $.each(jumpArr, function (index, value) {
			$('div[item-id=\"' + value + '\"]').children().addClass('display-none');
			clearFormElements('div[item-id=\"' + value + '\"]');
		    });
		}
		if (requireArr != '' && requireArr != null) {
		    $.each(requireArr, function (index, value) {
			$('div[item-id=\"' + value + '\"]').children().removeClass('display-none');
		    });
		}
	    } else if ($('#' + inputId).val() == '') {
		if (jumpArr != '' && jumpArr != null) {
		    $.each(jumpArr, function (index, value) {
			$('div[item-id=\"' + value + '\"]').children().addClass('display-none');
			clearFormElements('div[item-id=\"' + value + '\"]');
		    });
		}

	    }
	});

    });
}

function setSelect(inputId, dataCond) {
	var condObj = JSON.parse(dataCond);
	$.each(condObj, function (index, cvalue) {
	    var jumpArr = cvalue.cond_jump;
	    var requireArr = cvalue.cond_require;

	    if ($('#' + inputId).val() == cvalue.ezf_field_value) {
		if (jumpArr != '' && jumpArr != null) {
		    $.each(jumpArr, function (index, value) {
			$('div[item-id=\"' + value + '\"]').children().addClass('display-none');
		    });
		}
		if (requireArr != '' && requireArr != null) {
		    $.each(requireArr, function (index, value) {
			$('div[item-id=\"' + value + '\"]').children().removeClass('display-none');
		    });
		}
	    } else if ($('#' + inputId).val() == '') {
		if (jumpArr != '' && jumpArr != null) {
		    $.each(jumpArr, function (index, value) {
			$('div[item-id=\"' + value + '\"]').children().addClass('display-none');
		    });
		}

	    }
	});
}

function eventCheckBox(inputId, dataCond) {
    $('body').on('change', '#' + inputId, function () {
	var condObj = JSON.parse(dataCond);
	$.each(condObj, function (index, cvalue) {
	    var jumpArr = cvalue.cond_jump;
	    var requireArr = cvalue.cond_require;

	    if ($('#' + inputId).prop("checked")) {
		if (jumpArr != '' && jumpArr != null) {
		    $.each(jumpArr, function (index, value) {
			$('div[item-id=\"' + value + '\"]').children().addClass('display-none');
			clearFormElements('div[item-id=\"' + value + '\"]');
		    });
		}
		if (requireArr != '' && requireArr != null) {
		    $.each(requireArr, function (index, value) {
			$('div[item-id=\"' + value + '\"]').children().removeClass('display-none');
		    });
		}
	    } else {
		if (jumpArr != '' && jumpArr != null) {
		    $.each(jumpArr, function (index, value) {
			$('div[item-id=\"' + value + '\"]').children().removeClass('display-none');
		    });
		}
		if (requireArr != '' && requireArr != null) {
		    $.each(requireArr, function (index, value) {
			$('div[item-id=\"' + value + '\"]').children().addClass('display-none');
			clearFormElements('div[item-id=\"' + value + '\"]');
		    });
		}
	    }
	});
    });

}

function setCheckBox(inputId, dataCond) {
    var condObj = JSON.parse(dataCond);
    $.each(condObj, function (index, cvalue) {
	var jumpArr = cvalue.cond_jump;
	var requireArr = cvalue.cond_require;

	if ($('#' + inputId).prop("checked")) {
	    if (jumpArr != '' && jumpArr != null) {
		$.each(jumpArr, function (index, value) {
		    $('div[item-id=\"' + value + '\"]').children().addClass('display-none');
		});
	    }
	    if (requireArr != '' && requireArr != null) {
		$.each(requireArr, function (index, value) {
		    $('div[item-id=\"' + value + '\"]').children().removeClass('display-none');
		});
	    }
	} else {
	    if (jumpArr != '' && jumpArr != null) {
		$.each(jumpArr, function (index, value) {
		    $('div[item-id=\"' + value + '\"]').children().removeClass('display-none');
		});
	    }
	    if (requireArr != '' && requireArr != null) {
		$.each(requireArr, function (index, value) {
		    $('div[item-id=\"' + value + '\"]').children().addClass('display-none');
		});
	    }
	}
    });
}

function clearFormElements(ele) {
    $(ele).find(':input').each(function () {
	var type = this.type;
	var tag = this.tagName.toLowerCase(); // normalize case
	if (type == 'text' || type == 'password' || tag == 'textarea') {
	    this.value = '';
	} else if (type == 'checkbox' || type == 'radio') {
	    this.checked = false;
	} else if (tag == 'select') {
	    this.value = '';
	} else {
	    this.value = '';
	}
	$(this).trigger("change");
    });
}

function setFormElements(data, model) {
    for (var key in data) {

	var type_id = $('#' + model + '_' + key).attr('type');
	var type_name = $('input[name="' + model + '[' + key + ']"][value="' + data[key] + '"]').attr('type');
	var tag = $('#' + model + '_' + key).prop('tagName');
	var type_list = $('input[name="' + model + '[' + key + '][]"]').attr('type');

	if (type_id == 'text' || type_id == 'hidden' || type_id == 'password' || tag == 'TEXTAREA') {
	    $('#' + model + '_' + key).val(data[key]);
	}

	if (type_name == 'checkbox' || type_name == 'radio') {
	    $('input[name="' + model + '[' + key + ']"][value="' + data[key] + '"]').attr('checked', true);
	}

	if (type_list == 'checkbox') {
	    var arr = jQuery.parseJSON(data[key]);
	    for (var akey in arr) {
		$('input[name="' + model + '[' + key + '][]"][value="' + arr[akey] + '"]').attr('checked', true);
	    }
	}

	if (tag == 'SELECT') {
	    if ($('#' + model + '_' + key).attr('multiple') == 'multiple') {
		var arr = jQuery.parseJSON(data[key]);

		for (var akey in arr) {
		    $('#' + model + '_' + key + ' option[value="' + arr[akey] + '"]').attr('selected', true);
		}
	    }
	    else {
		$('#' + model + '_' + key).val(data[key]);
	    }

	}
    }
}