

var jpdbBaseURL="http://api.login2explore.com:5577";
var jpdbIRL="/api/irl";
var jpdbIML="/api/iml";
var schoolDBName="SCHOOL-DB";
var StudentRelationName="StudentRelation";
var connToken="90933146|-31949318775558192|90951378";
$("#rollno").focus();

function saveRecNo2LS(jsonObj){
    var lvData=JSON.parse(jsonObj.data);
    localStorage.setItem("recno",lvData.rec_no);
}


function getEmpIdAsJsonObj(){
    var roll=$("#rollno").val();
    var jsonStr={
        rollno:roll
    };
    return JSON.stringify(jsonStr);
}

function fillData(jsonObj){
    saveRecNo2LS(jsonObj);
    var record=JSON.parse(jsonObj.data).record;
    $("#name").val(record.name);
    $("#class").val(record.Class);
    $("#dob").val(record.dob);
    $("#address").val(record.address);
    $("#enrolldate").val(record.enrollmentdate);
}


function resetForm(){
    $("#rollno").val("");
    $("#name").val("");
    $("#class").val("");
    $("#dob").val("");
    $("#address").val("");
    $("#enrolldate").val("");
    document.getElementById("rollno").disabled=false;
    document.getElementById("save").disabled=true;
    document.getElementById("change").disabled=true;
    document.getElementById("reset").disabled=true;
//    $("#empid").prop("disabled",false);
//    $("#save").prop("disabled",true);
//    $("#change").prop("disbaled",true);
//    $("#reset").prop("disabled",true);
    $("#rollno").focus();
}


function validateData(){
    var rollno=$("#rollno").val();
    var name=$("#name").val();
    var Class=$("#class").val();
    var dob=$("#dob").val();
    var address=$("#address").val();
    var enrollmentDate=$("#enrolldate").val();
    
    if(rollno===""){
        alert("Roll no missing");
        $("#rollno").focus();
        return "";
    }
    
    if(name===""){
        alert("Name missing");
        $("#name").focus();
        return "";
    }
    
    if(Class===""){
        alert("Class missing");
        $("#class").focus();
        return "";
    }
    
    if(dob===""){
        alert("DOB missing");
        $("#dob").focus();
        return "";
    }
    
    if(address===""){
        alert("Address missing");
        $("#address").focus();
        return "";
    }
    
    if(enrollmentDate===""){
        alert("Enrollment Date missing");
        $("#enrolldate").focus();
        return "";
    }
    
    var jsonStrObj={
        rollno:rollno,
        name:name,
        Class:Class,
        dob:dob,
        address:address,
        enrollmentdate:enrollmentDate
    };
    
    return JSON.stringify(jsonStrObj);
}

function getRoll(){
    var rollnoJsonObj=getEmpIdAsJsonObj();
    var getRequest=createGET_BY_KEYRequest(connToken, schoolDBName, StudentRelationName, rollnoJsonObj);
    jQuery.ajaxSetup({async: false});
    var resJsonObj=executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIRL);
    jQuery.ajaxSetup({async: true});
    
    if(resJsonObj.status===400){
        document.getElementById("save").disabled=false;
        document.getElementById("reset").disabled=false;
//        $("#save").prop("disbaled",false);
//        $("#reset").prop("disbaled",false);
        $("#name").focus();
    }
    else if(resJsonObj.status===200){
        document.getElementById("rollno").disabled=true;
//        $("#empid").prop("disbaled",true);
        fillData(resJsonObj);
        
        document.getElementById("change").disabled=false;
        document.getElementById("reset").disabled=false;
//        $("#change").prop("disbaled",false);
//        $("#reset").prop("disbaled",false);
        $("#rollno").focus();
    }
}

function saveData(){
    var jsonStrObj=validateData();
    if(jsonStrObj==="")
        return "";
//    alert(jsonStrObj);
    
    var putRequest=createPUTRequest(connToken, jsonStrObj, schoolDBName, StudentRelationName);
    jQuery.ajaxSetup({async: false});
    var resJsonObj=executeCommandAtGivenBaseUrl(putRequest,jpdbBaseURL,jpdbIML);
    jQuery.ajaxSetup({async: true});
    resetForm();
    $("#rollno").focus();
}

function changeData(){
    document.getElementById("change").disabled=true;
//    $("#change").prop("disbaled",true);
    jsonChg=validateData();
    var updateRequest=createUPDATERecordRequest(connToken, jsonChg, schoolDBName, StudentRelationName, localStorage.getItem("recno"));
    jQuery.ajaxSetup({async: false});
    var resJsonObj=executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    resetForm();
    $("#rollno").focus();
    
}

