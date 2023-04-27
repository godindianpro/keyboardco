alert("Use the 'ignore case' button, if your phone has auto-uppercase feature. Pls upvote it and show your support thanks :)")

texts = [
    `simon is currently at war with adam as they fight for the fastest typer of the two we have yet to see adams response to simon beating adams record by 2wpm helen cooked dinner therefore Ralph will wash the dishes.`, 

    `simon is currently at war with adam as they fight for the fastest typer of the two we have yet to see adams response to simon beating adams record by 2wpm helen cooked dinner therefore Ralph will wash the dishes.`, 

    `simon is currently at war with adam as they fight for the fastest typer of the two we have yet to see adams response to simon beating adams record by 2wpm helen cooked dinner therefore Ralph will wash the dishes.`, 

    `simon is currently at war with adam as they fight for the fastest typer of the two we have yet to see adams response to simon beating adams record by 2wpm helen cooked dinner therefore Ralph will wash the dishes.`,

    `simon is currently at war with adam as they fight for the fastest typer of the two we have yet to see adams response to simon beating adams record by 2wpm helen cooked dinner therefore Ralph will wash the dishes.`, 

    `simon is currently at war with adam as they fight for the fastest typer of the two we have yet to see adams response to simon beating adams record by 2wpm helen cooked dinner therefore Ralph will wash the dishes.`, 
    
    `simon is currently at war with adam as they fight for the fastest typer of the two we have yet to see adams response to simon beating adams record by 2wpm helen cooked dinner therefore Ralph will wash the dishes.`, 
    
    `simon is currently at war with adam as they fight for the fastest typer of the two we have yet to see adams response to simon beating adams record by 2wpm helen cooked dinner therefore Ralph will wash the dishes.`, 

    `simon is currently at war with adam as they fight for the fastest typer of the two we have yet to see adams response to simon beating adams record by 2wpm helen cooked dinner therefore Ralph will wash the dishes.`, 

    `simon is currently at war with adam as they fight for the fastest typer of the two we have yet to see adams response to simon beating adams record by 2wpm helen cooked dinner therefore Ralph will wash the dishes.`, 
    
    `simon is currently at war with adam as they fight for the fastest typer of the two we have yet to see adams response to simon beating adams record by 2wpm helen cooked dinner therefore Ralph will wash the dishes.`, 
    
    `simon is currently at war with adam as they fight for the fastest typer of the two we have yet to see adams response to simon beating adams record by 2wpm helen cooked dinner therefore Ralph will wash the dishes.`
]

var text,textarea, doneTill="", chosen="",leftOver="", t, ignored = false,val=0,calc=[0,0],consistency=[],oldVal=0,notStarted=true,wrong=0,toggle=0;
for (let i in texts) {
    texts[i]=texts[i]+" ";
}

window.onload = function() {
    text=document.getElementById("text");
    textarea=document.getElementsByTagName("textarea")[0];
    text.innerHTML=chosen=leftOver=texts[Math.floor(Math.random()*texts.length)];
    textarea.addEventListener("input",CheckAndClear);
}

function CheckAndClear() {
    if (notStarted && doneTill=="" && textarea.value.length!=0) {
        t = setInterval(function() {
            val+=1;
            document.getElementById("time").innerHTML = "Timer- "+(Math.floor(val/6000)<10 ? "0" : "")+Math.floor(val/6000)+":"+(Math.floor(val/100)%60<10 ? "0" : "")+Math.floor(val/100)%60+":"+(val%100<10 ? "0": "")+val%100;
        },10);
        notStarted=false;
    }
    var x = textarea.value = (ignored ? textarea.value.toLowerCase() : textarea.value);
    consistency.push(val-oldVal);
    if (leftOver=="") {
        Finish();
        if (t) {
            clearInterval(t);
        }
    }
    document.getElementById("alert").style.top="-50px";
    text.innerHTML=`<b>${doneTill}</b>`;
    for (var i = 0; i < x.length; i++) {
        if (x[i]==leftOver[i]) {
            text.innerHTML+=`<b>${x[i]}</b>`;
        }
        if (x[i]!=leftOver[i]) {
            wrong++;
            document.getElementById("alert").style.top="0";
            text.innerHTML+=`<span>${leftOver[i]}</span>`;
        }
    }
    text.innerHTML+=leftOver.slice(i);
    if (x==leftOver.slice(0,-1)) {
        ShowResult();
    }
    for (let i = 0; i < x.length; i++) {
        if (x[i]==" " && leftOver.startsWith(x.slice(0,i+1))) {
            leftOver=leftOver.slice(i+1);
            doneTill+=x.slice(0,i)+" ";
            x = x.slice(i+1)
        }
    }
    textarea.value = x;
    oldVal=val;
}

window.IgnoreCase = function() {
    toggle++;
    if (toggle%2) {
        ignored = true;
        text.innerHTML=text.innerHTML.toLowerCase();
        leftOver=leftOver.toLowerCase();
        doneTill=doneTill.toLowerCase();
        document.getElementById("case").innerHTML = "Consider Case";
    }
    else {
        ignored = false;
        text.innerHTML = chosen;
        leftOver = text.innerHTML.slice(text.innerHTML.length-leftOver.length);
        CheckAndClear();
        document.getElementById("case").innerHTML = "Ignore Case";
    }
}

function Finish() {
    clearInterval(t);
    t = false;
}

function ShowResult() {
    clearInterval(t);
    document.getElementById("result-page").style.left="0";
    var wpm = doneTill!="" ? Math.round(doneTill.split(" ").length*600000/val)/100 : 0;
    var review = (wpm<10 ? "Need Improvement" : (wpm<20 ? "Okay" : (wpm<30 ? "Impressive" : (wpm<50 ? "Outstanding" : "Hacker!"))));
    document.getElementById("rp-rating").innerHTML = "Speed review: "+review;
    document.getElementById("rp-wpm").innerHTML = "Words Per Minute: "+wpm;
    try {
        var avg = consistency.reduce((a,b)=>a+b)/consistency.length;
        var n = consistency.map(a => Math.abs((avg-a)/5));
        var n_avg = n.reduce((a,b)=>a+b)/n.length;
        var final_consis = Math.round(10000*(1-n_avg/avg))/100;
        document.getElementById("rp-consistency").innerHTML = "Consistency: "+final_consis+"%";
    }
    catch (e) {document.getElementById("rp-consistency").innerHTML = "Consistency: 0%";}
    document.getElementById("rp-accuracy").innerHTML = "Accuracy: "+Math.round(10000*(1 - wrong/chosen.length/5))/100;
}

window.Replay = function() {
    document.getElementById("result-page").style.left="-100vw";
    text.innerHTML=chosen=leftOver=texts[Math.floor(Math.random()*texts.length)];
    doneTill="";
    textarea.value = "";
    val = 0;
    document.getElementById("time").innerHTML = "Timer- 00:00:00";
    notStarted=true;
    consistency=[];
    oldVal = 0;
    wrong = 0;
    ignored = false;
}

