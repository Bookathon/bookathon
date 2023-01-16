let vv = []
let page = "page/"
let url = "https://teen.munjang.or.kr/archives/category/old-excl/"
let pagenum = 44
let writing = "https://teen.munjang.or.kr/archives/"
function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}

for(let i=1;i<=pagenum;i++) {(
    function(i) {
        var thisurl = url
        if(i>1) thisurl = thisurl + page + i
        $.ajax({
            url : thisurl,
            type: "GET",
            async : false, 
            processData: false,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            dataType : 'HTML'
        }).done(function(html){
            const parser = new DOMParser();
            const parse_result = parser.parseFromString(html, "text/html")
            ar = parse_result.getElementById("main").getElementsByTagName("article")
            for(let t =0; t<ar.length; t++){
                vv.push(ar[t].getAttribute("id").match(/(\d)*$/)[0])
            }
        })
    })(i)
    console.log("end")
   }

for(let j=0;j<vv.length;j++) {(
    function(j) {
        var writing_url = writing + vv[j]
        $.ajax({
            url : writing_url,
            type: "GET",
            async : false, 
            processData: false,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            dataType : 'HTML'
        }).done(function(html){
            const parser_writing = new DOMParser();
            const parse_result_write = parser_writing.parseFromString(html, "text/html")
            ar = parse_result_write.getElementsByClassName("entry-content")[0].innerText.trim()
            download(ar, "" + vv[j] + ".txt", "text")
        })
    })(j)
    console.log("enddd")
   }
