async function main(){
  const api = await fetch("https://api.taka.ml/v1/date")
    .then(res=>res.json())
    .catch(()=>console.log("Fetch Error"))

  const canvas_1 = document.getElementById("ping").getContext('2d');
  new Chart(canvas_1, {
    type: "line",
      data: {
        labels: api.time,
        datasets: [{
          label: "Ping",
          data: api.ping,
          backgroundColor: "rgba(0,0,255)",
          borderColor: "rgba(0,0,255)",
          borderWidth: 1,
          radius: 0,
        },
        {
          label: "Web",
          data: api.web,
          backgroundColor: "rgba(0,255,0)",
          borderColor: "rgba(0,255,0)",
          borderWidth: 1,
          radius: 0,
        }]
      },
      options: {
        interaction: {
          intersect: false
        },
        plugins: {
          title: {
            display: true,
            text: "Ping(通信速度)",
            font: {
              size: 20
            }
          },
          legend: true
        },
        responsive: true,
        scale: {
          x: {
            display: true,
            type: "linear"
          },
          y: {
            display: true,
            suggestedMin: 100,
            suggestedMax: 400,
          },
          ticks: {
            stepSize: 10
          }
        },
      }
  });

  const canvas_2 = document.getElementById("bot").getContext('2d');
  new Chart(canvas_2, {
    type: "line",
      data: {
        labels: api.time,
        datasets: [
        {
          label: "ユーザー",
          data: api.user,
          backgroundColor: "rgba(255,0,0)",
          borderColor: "rgba(255,0,0)",
          borderWidth: 1,
          radius: 0
        },
        {
          label: "サーバー",
          data: api.guild,
          backgroundColor: "rgba(255,255,0)",
          borderColor: "rgba(255,255,0)",
          borderWidth: 1,
          radius: 0
        },
        {
          label: "グローバルチャット",
          data: api.gc,
          backgroundColor: "rgba(255,128,0)",
          borderColor: "rgba(255,128,0)",
          borderWidth: 1,
          radius: 0
        }]
      },
      options: {
        interaction: {
          intersect: false
        },
        plugins: {
          title: {
            display: true,
            text: "利用者数、導入数",
            font: {
              size: 20
            }
          },
          legend: true
        },
        responsive: true,
        scale: {
          x: {
            display: true,
            type: "linear"
          },
          y: {
            display: true,
            suggestedMin: 0,
            suggestedMax: 300
          },
          ticks: {
            stepSize: 10
          }
        },
      }
  });

  const canvas_3 = document.getElementById("server").getContext('2d');
  new Chart(canvas_3, {
    type: "line",
      data: {
        labels: api.time,
        datasets: [
          {
            label: "CPU",
            data: api.cpu,
            backgroundColor: "rgba(96,96,96)",
            borderColor: "rgba(96,96,96)",
            borderWidth: 1,
            radius: 0
          },
          {
            label: "メモリー",
            data: api.ram,
            backgroundColor: "rgba(0,255,255)",
            borderColor: "rgba(0,255,255)",
            borderWidth: 1,
            radius: 0
          }]
      },
      options: {
        interaction: {
          intersect: false
        },
        plugins: {
          title: {
            display: true,
            text: "リソース使用率",
            font: {
              size: 20
            }
          },
          legend: true
        },
        responsive: true,
        scale: {
          x: {
            display: true,
            type: "linear"
          },
          y: {
            display: true,
            suggestedMin: 0,
            suggestedMax: 100
          },
          ticks: {
            stepSize: 10
          }
        },
      }
  });
}

window.setTimeout( function(){
  document.getElementById("loader").style.visibility = "hidden";
  main()
}, 3000 );