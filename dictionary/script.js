const form=document.querySelector('form');
const result=document.querySelector('.result');

form.addEventListener('submit',function(e){
    e.preventDefault();//will not reload ??query will not coming
    getwordinfo(form.elements[0].value);//0th index first child value
});
const getwordinfo=async(word)=>{
    try {
    // alert(word)
        const response=await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        const data=await response.json();
        let definations=data[0].meanings[0].definitions[0];
        result.style.boxShadow = '0px 0px 5px rgb(0, 0, 0)';
        result.innerHTML=`
            <h3><strong>word:</strong>${data[0].word}</h3>
            <p class='POS'>${data[0].meanings[0].partOfSpeech}</p>
            <strong><p>Meaning:</strong>${definations.definition===undefined?"Not found":definations.definition}</p>
            <strong><p>Example:</strong>${definations.example===undefined? "Not found":definations.example}</p>
            <p><strong>Antonym:</strong></p>
        `;
        if(definations.antonyms.length===0){
            result.innerHTML+=`<span>Not found</span>`;
        }else{
            for(let i=0; i<definations.antonyms.length;i++){
                result.innerHTML+=`<li>${definations.antonyms[i]}</li>`
            }
        }
        //button read more
        result.innerHTML+=`<div><a href="${data[0].sourceUrls}"target='blank'>Read More</a></div>`
        // result.innerHtml+=`<button type="click">Audio</button>`.addEventListener('click',function(b){
        //     b.data[0].phonetics[2].audio
        // });

} catch (error) {
    result.innerHTML=`<p>Sorry, No word found</p>`
}
    // console.log(data);
    
    
}
