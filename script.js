async function main(){
    const api = await fetch("https://taka.ml/api/date")
      .then(res=>res.json())
      .catch(()=>console.log("Fetch Error"))
    const ctx = document.getElementById("status").getContext('2d');
    const ping = new Chart(ctx, {
      type: "line",
        data: {
          labels: api.time,
          datasets: [{
            label: "Ping",
            data: api.ping,
            backgroundColor: "rgba(0,0,255)",
            borderColor: "rgba(0,0,255)",
            borderWidth: 1
          },
          {
            label: "Web",
            data: api.web,
            backgroundColor: "rgba(0,255,0)",
            borderColor: "rgba(0,255,0)",
            borderWidth: 1
          },
          {
            label: "ユーザー",
            data: api.user,
            backgroundColor: "rgba(255,0,0)",
            borderColor: "rgba(255,0,0)",
            borderWidth: 1
          },
          {
            label: "サーバー",
            data: api.guild,
            backgroundColor: "rgba(255,255,0)",
            borderColor: "rgba(255,255,0)",
            borderWidth: 1
          },
          {
            label: "グローバルチャット",
            data: api.gc,
            backgroundColor: "rgba(255,128,0)",
            borderColor: "rgba(255,128,0)",
            borderWidth: 1
          },
          {
            label: "CPU",
            data: api.cpu,
            backgroundColor: "rgba(96,96,96)",
            borderColor: "rgba(96,96,96)",
            borderWidth: 1
          },
          {
            label: "メモリー",
            data: api.ram,
            backgroundColor: "rgba(0,255,255)",
            borderColor: "rgba(0,255,255)",
            borderWidth: 1
          }]
        },
        options: {
          title: {
            display: true,
            text: "ステータス"
          },
          legend: {
              position: "left",
          },
          responsive: true,
          scale: {
            pointLabels: {
              fontSize: 15,
            },
            ticks: {
              stepSize: 5,
              beginAtZero:true,
              suggestedMax: 700,
              suggestedMin: 0,
            }
          },
        }
    });
  }
  main()