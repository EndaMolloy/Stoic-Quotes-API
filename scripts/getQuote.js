(function(){

  if(!localStorage.quote){
    getAjax('http://localhost:5000/getQuote',(serverQuote)=>{
      localStorage.quote = serverQuote.quote;
      localStorage.author = serverQuote.author;
      document.getElementById('quote').textContent = '“ '+serverQuote.quote+' ”';
      document.getElementById('author').textContent = serverQuote.author;
    })
  }else{
    window.onload = load;
  }

  function load(){
    document.getElementById('quote').textContent = '“ '+localStorage.quote+' ”';
    document.getElementById('author').textContent = localStorage.author;
  }

  function getAjax(url, callback) {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = ()=> {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            try {
                callback(JSON.parse(xmlhttp.responseText));
            } catch(err) {
                console.log(err.message + " in " + xmlhttp.responseText);
                return;
            }
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  };

})();
