async function main(){
  const res = await fetch("https://api.taka.cf/v1/status")
    .then(res=>res.json())
    .catch(err=>console.log(`Fetch Error: ${err}`));
 
  console.log(res);

  const time = res.data.map(data=>formatDate(new Data(data.time),"MM月dd日HH時"));
  const ping = res.data.map(data=>data.ping);
  const user = res.data.map(data=>data.user);
  const guild = res.data.map(data=>data.guild);
  const message = res.data.map(data=>data.message);
  const command = res.data.map(data=>data.command);
  const cpu = res.data.map(data=>data.cpu);
  const ram = res.data.map(data=>data.ram);

  new Chart(document.getElementById("ping"),{
    type: "line",
      data: {
        labels: time,
        datasets: [{
          label: "Ping",
          data: ping,
          backgroundColor: "rgba(0,0,255)",
          borderColor: "rgba(0,0,255)",
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
            suggestedMax: 300,
          },
          ticks: {
            stepSize: 10
          }
        },
      }
  });

  new Chart(document.getElementById("bot"),{
    type: "line",
      data: {
        labels: time,
        datasets: [
        {
          label: "ユーザー",
          data: user,
          backgroundColor: "rgba(255,0,0)",
          borderColor: "rgba(255,0,0)",
          borderWidth: 1,
          radius: 0,
          yAxisID: "right"
        },
        {
          label: "サーバー",
          data: guild,
          backgroundColor: "rgba(255,255,0)",
          borderColor: "rgba(255,255,0)",
          borderWidth: 1,
          radius: 0,
          yAxisID: "left"
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

  new Chart(document.getElementById("active"),{
    type: "line",
      data: {
        labels: time,
        datasets: [
        {
          label: "メッセージ",
          data: message,
          backgroundColor: "rgba(255,0,0)",
          borderColor: "rgba(255,0,0)",
          borderWidth: 1,
          radius: 0
        },
        {
          label: "コマンド",
          data: command,
          backgroundColor: "rgba(255,255,0)",
          borderColor: "rgba(255,255,0)",
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
            text: "利用状況",
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

  new Chart(document.getElementById("server"),{
    type: "line",
      data: {
        labels: time,
        datasets: [
          {
            label: "CPU",
            data: cpu,
            backgroundColor: "rgba(96,96,96)",
            borderColor: "rgba(96,96,96)",
            borderWidth: 1,
            radius: 0
          },
          {
            label: "メモリー",
            data: ram,
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

window.setTimeout(()=>{
  document.getElementById("loader").style.visibility = "hidden";
  main();
},3000);

function formatDate(date,format){
  format = format.replace(/yyyy/g,date.getFullYear());
  format = format.replace(/MM/g,((date.getMonth() + 1)).slice(-2));
  format = format.replace(/dd/g,(date.getDate()).slice(-2));
  format = format.replace(/HH/g,(date.getHours()).slice(-2));
  format = format.replace(/mm/g,(date.getMinutes()).slice(-2));
  format = format.replace(/ss/g,(date.getSeconds()).slice(-2));
  format = format.replace(/SSS/g,(date.getMilliseconds()).slice(-3));
  return format;
};