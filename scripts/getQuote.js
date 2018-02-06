(function(){

  //const dayNum = getDayNumber();
  const dayNum = 36;

  if(!localStorage.dayNum || dayNum - localStorage.dayNum > 0){
    getAjax(`http://localhost:5000/api/quotes/${dayNum}`,(serverQuote)=>{
      localStorage.dayNum = dayNum;
      localStorage.quote = serverQuote.quote;
      localStorage.author = serverQuote.author;
      document.getElementById('quote').textContent = '“ '+serverQuote.quote+' ”';
      document.getElementById('author').textContent = serverQuote.author;
    })
  }
  else{
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


  //Returns the day number 1-366, UTC format so it accounts for daylightsaving hours
  function getDayNumber(){
    const now = Date.now();
    const year =  new Date().getUTCFullYear();
    const year_start = Date.UTC(year, 0, 1);
    const day_length_in_ms = 1000*60*60*24;
    return Math.floor((now - year_start)/day_length_in_ms);

  }

})();
