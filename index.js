let searchInputEl = document.getElementById("searchInput");
let searchResultEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");


function createAndAppendSearchResult(result){
  let {title, link, description} = result; 


  let resultItemEl = document.createElement("div");
  resultItemEl.classList.add('result-item');
  searchResultEl.appendChild(resultItemEl);

  let titleEl = document.createElement("a");
  titleEl.href = link;
  titleEl.target = "_blank";
  titleEl.textContent = title;
  titleEl.classList.add("result-title");
  resultItemEl.appendChild(titleEl);


  let titleBreakEl = document.createElement("br");
  resultItemEl.appendChild(titleBreakEl);

  let urlElementEl = document.createElement("a");
  urlElementEl.classList.add("result-url");
  urlElementEl.href = link;
  urlElementEl.target = "_blank";
  urlElementEl.textContent = link;
  resultItemEl.appendChild(urlElementEl);

  let lineBreakEl = document.createElement("br");
  resultItemEl.appendChild(lineBreakEl);

  let descriptionEl = document.createElement("p");
  descriptionEl.classList.add("line-description");
  descriptionEl.textContent = description;
  resultItemEl.appendChild(descriptionEl);

}

function displayResults(search_results) {
  spinnerEl.classList.toggle("d-none");
  for (let result of search_results){
    createAndAppendSearchResult(result);
  } 


  
}

function searchWikipedia(event){
  if (event.key === "Enter"){
    spinnerEl.classList.toggle("d-none");
    searchResultEl.textContent = "";
    let searchInput = searchInputEl.value;
    let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
    let options= {
      method: "Get"
    };
    fetch(url, options)
    .then(function(response){
      return response.json();
    })
    .then(function(jsonData){
      let {search_results} = jsonData;
      displayResults(search_results);
    })
  
  
  }

}

searchInputEl.addEventListener("keydown", searchWikipedia);
