var persons = [];

var tpl_name_surename = "";
var tpl_job_title = "";
var tpl_phone1 = "";
var tpl_phone2 = "";
var tpl_email = "";
var tpl_phone1_href = "";
var tpl_phone2_href = "";
var tpl_email_href = "";

$(document).ready(function () {

    $.ajax({
        type: "GET",
        url: "data/data.csv?v=" + Math.floor(Math.random() * 10),
        dataType: "text",
        success: function (data) {
            processData(data);
        }
    });

    ftr_body = $("#footer_body").html();
    tpl_name_surename = $("#tpl_name_surename");
    tpl_job_title = $("#tpl_job_title");
    tpl_phone1 = $("#tpl_phone1");
    tpl_phone2 = $("#tpl_phone2");
    tpl_email = $("#tpl_email");
});

function processData(data) {
    var allTextLines = data.split(/\r\n|\n/);
    
    console.log(allTextLines);
    allTextLines.shift();
    allTextLines.sort((a,b) => a.localeCompare(b));
    console.log(allTextLines);
    var lines = [];

    for (var i = 0; i < allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        var tarr = [];

        for (var j = 0; j < 5; j++) {
            tarr.push(data[j]);
        }

        lines.push(tarr);
        $("#person_select").append("<option value=\"" + (i) + "\">" + lines[i][0] + "</option>");
    }
    persons = lines;
}

function resetTemplate() {
    $("#ftr_body_table").replaceWith(ftr_body);
}

function updateTemplate() {

    var name_surname_txt = $("#form_name").val();
    var job_title_txt = $("#form_job_title").val();
    var phone1_txt = $("#form_phone1").val();
    var phone2_txt = $("#form_phone2").val();
    var email_txt = $("#form_email").val();
    var profile_image_url_txt = $("#form_profile_image_url").val();

    if(name_surname_txt.length > 2) {
        $("#ftr_name_surname_txt").text(name_surname_txt);
    } else {
        $("#ftr_name_surname").remove();
    }

    if(job_title_txt.length > 2) {
        $("#ftr_job_title_txt").text(job_title_txt);
    } else {
        $("#ftr_job_title").remove();
    }

    if(phone1_txt.length > 5) {
        $("#ftr_phone1_txt").text(phone1_txt);
        $("#ftr_phone1_href").attr("href", "phone:" + phone1_txt);
    } else {
        $("#ftr_phone1").remove();
    }

    if(phone2_txt.length > 5) {
        $("#ftr_phone2_txt").text(phone2_txt);
        $("#ftr_phone2_href").attr("href", "phone:" + phone2_txt);
    } else {
        $("#ftr_phone2").remove();
    }

    if(email_txt.length > 5) {
        $("#ftr_email_txt").text(email_txt);
        $("#ftr_email_href").attr("href", "mailto:" + email_txt);
    } else {
        $("#ftr_email").remove();
    }

    if(profile_image_url_txt.length > 5) {
        $("#tpl_profile_img_url_txt").attr("src", profile_image_url_txt);
    } else {
        $("#tpl_profile_img").remove();
    }

}

function fillForm(id) {
    var name = $("#form_name");
    var job_title = $("#form_job_title");
    var phone1 = $("#form_phone1");
    var phone2 = $("#form_phone2");
    var email = $("#form_email");

    $("#ftr_profile_image_select").val("1");
    $("#form_profile_image_url").val("");

    if (persons[id]) {
        name.val(persons[id][0]);
        job_title.val(persons[id][1]);
        email.val(persons[id][2]);
        (persons[id][3].length > 3) ? phone1.val("+48 " + persons[id][3]) : phone1.val("");
        (persons[id][4].length > 3) ? phone2.val("+48 " + persons[id][4]) : phone2.val("");
    } else {
        clearForm();
    }
}

function clearForm() {
    $("#form_name").val("");
    $("#form_job_title").val("");
    $("#form_phone1").val("");
    $("#form_phone2").val("");
    $("#form_email").val("");
    $("#ftr_profile_image_select").val("1");
}

function changeProfileUrl(value) {
    $("#form_profile_image_url").val("");
    if (value.length > 2) {
        $("#form_profile_image_url").val("https://columbuselite.pl/app/stopka/generator/data/profile_img/" + value);
    }
}

function openModal() {
    updateTemplate();
    $("#ftr_modal").css("visibility", "visible");
}

function closeModal() {
    toggleOff(message);
    $("#ftr_modal").css("visibility", "hidden");
    resetTemplate();
}

function copyToClipboard() {
    var range = document.createRange();
    range.selectNode(document.getElementById("footer_body"));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
    toggleOn(message);
}

function toggleOn(id) {
    $(id).css("visibility", "visible");
}

function toggleOff(id) {
    $(id).css("visibility", "hidden");
}