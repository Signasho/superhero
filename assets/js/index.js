$(document).ready(function () {
  let button = $('#button');

  button.click(function (e) {
    e.preventDefault()
    let superHeroNumber = $('#superHeroNumber').val()

    if (superHeroNumber !== '' && !isNaN(superHeroNumber)) {
      let apiHero = 'https://www.superheroapi.com/api.php/10164257333809896/' + superHeroNumber;

      $.ajax({
        url: apiHero,
        type: 'GET',
        dataType: "json",
        success: function (data) {
          if (data.response === "success") {
            $('#superHeroCard').append('<h1>SuperHero Encontrado!!!</h1>');

            let cardHTML = ` 
            <div class="card mb-3 " style="max-width: 540px;">
            <div class="row g-0">
              <div class="col-md-4">
                <img src="${data.image.url}" class="img-fluid rounded-start" style="height: 100%;" alt="Superhero Image">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h2 class="card-title">${data.name}</h2>
                  <p class="card-text">Full Name: ${data.biography["full-name"]}</p>
                  <p class="card-text">Place of Birth: ${data.biography["place-of-birth"]}</p>
                  <p class="card-text">First Appearance: ${data.biography["first-appearance"]}</p>
                  <p class="card-text">Occupation: ${data.work.occupation}</p>
                  <p class="card-text">Group Affiliation: ${data.connections["group-affiliation"]}</p>
                  <p class="card-text">Relatives: ${data.connections.relatives}</p>
                  <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
                </div>
              </div>
            </div>
          </div>`;

            $('#superHeroCard').append(cardHTML);


            let powerstats = data.powerstats;
            let dataPoints = [];
            for (let key in powerstats) {
              if (powerstats.hasOwnProperty(key)) {
                dataPoints.push({ y: parseInt(powerstats[key]), label: key });
              }
            }

            let chart = new CanvasJS.Chart("chartContainer", {
              theme: "ligth2",
              exportEnabled: false,
              animationEnabled: true,
              title: {
                text: `Estadísticas de Poder para ${data.name}`
              },
              data: [{
                type: "pie",
                startAngle: 25,
                toolTipContent: "<b>{label}</b>: {y}%",
                showInLegend: "true",
                legendText: "{label}",
                indexLabelFontSize: 16,
                indexLabel: "{label} - {y}%",
                dataPoints: dataPoints
              }]
            });

            chart.render();
          }
        },
      });
    } else {
      alert('Por favor, ingrese un número válido para el superhéroe.');
    }
  });
})