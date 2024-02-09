async function getbookKey(book, callback ){
    let test =  fetch(`https://freetestapi.com/api/v1/books?search=${book}`)
 
                .then(async function(response){
                    if(response.status == 200){
                        let data = await response.json()
                        if(data.length == 0) setError("No Book Found")
                        else callback(data[0])
                    }
                    else{
                        setError("Failed to Get book "+response.statusText)
                    }
                })
                .catch(function(error){
                    setError("Failed to fetch book")
                    console.log('API errors ',error)
                })
    
    
}

async function setError(error){
    let node = document.querySelector(".errorMsg")
        document.querySelector(".error").setAttribute("id" , "set")
        document.querySelector(".errorMsg").setAttribute("id" , "setMsg")
        
        node.textContent = error
        setTimeout(function(){
            document.querySelector(".error").removeAttribute("id" , "set")
            document.querySelector(".errorMsg").removeAttribute("id" , "setMsg")
            node.textContent = ""
        },2000)
        
}

let getBookDetails = function(test){
    document.querySelector(".title").textContent ="Book Name : "+test.title
    document.querySelector(".author").textContent ="Author : "+test.author
    document.querySelector(".publication").textContent ="Publication : "+test.publication_year
    document.querySelector(".genre").textContent ="genre: "+test.genre[0]   
    document.querySelector(".body").textContent =`Description : ${test.description}`
    document.querySelector(".img").setAttribute("src",`${test.cover_image}`)
    document.querySelector(".img").classList.add('imgSize')
    
}

document.querySelector(".submit").addEventListener("click" , function(){

   let book = document.querySelector(".text").value
   if(book.length == 0) setError("Please Enter the book name")
   else{
        getbookKey(book , getBookDetails)
   }
})

async function getdatalist(){
    let data = await((await fetch(`https://freetestapi.com/api/v1/books`)).json())
    .catch(function(error){
        throw error
    })
    let datalist = document.querySelector('datalist')
    let arr = []
    for(let i = 0 ;i <data.length;i++){
        let option = document.createElement("option")
        if(!arr.includes(`${data[i].title}`)){
            arr.push(`${data[i].title}`)
            option.value =`${data[i].title}`
            datalist.appendChild(option)    
            } 
        }
}

document.querySelector(".text").addEventListener("keydown" , function(e){
    let re = /[a-z\ A-z]/
    if(!re.test(e.key)) e.preventDefault()

 })

 function onload(){
    getdatalist();
 }


 onload()
 

