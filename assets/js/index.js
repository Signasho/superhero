$(document).ready(function () {
  let button = $('#button');
  
  button.click(function (e) {
    e.preventDefault()
    let superHeroNumber = $('#superHeroNumber').val()

    if(superHeroNumber !== '' && !isNaN(superHeroNumber)){
      let apiHero = 'https://www.superheroapi.com/api.php/10164257333809896/' + superHeroNumber;

      $.ajax({
        url: apiHero,
        type: 'GET',
        dataType: "json",
        success: function(data) {
          superHeroInfo(data);
        },
      });
    } else {
      alert('Por favor, ingrese un número válido para el superhéroe.');
    }
  });

  const superHeroInfo = (heroData) =>{
    let name = heroData.name;
    let powerStats = heroData.powerstats;
    let heroimage = heroData.image;
    let card = $('#superHeroCard');

    card.append(
      
    );



  }
 
  
  



})