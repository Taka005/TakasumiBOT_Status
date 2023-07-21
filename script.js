async function main(){
  const res = await fetch("https://api.taka.cf/v1/status")
    .then(res=>res.json())
    .catch(err=>console.log(`Fetch Error: ${err}`));
 
  console.log(res);

  const time = res.data.map(data=>formatDate(new Date(data.time),"MM月dd日HH時"));
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
          label: "Bot",
          data: ping,
          backgroundColor: "rgba(0,0,255)",
          borderColor: "rgba(0,0,255)",
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
            text: "通信速度",
            font: {
              size: 20
            }
          },
          legend: true
        },
        responsive: true,
        scales: {
          left: {
            position: "left",
            type: "linear",
            max: 300,
            min: 100,
            ticks: {
              stepSize: 10,
              callback: (value)=>{
                return `${value}ms`;
              }
            }
          }
        }
      }
  });

  new Chart(document.getElementById("bot"),{
    type: "line",
      data: {
        labels: time,
        datasets: [
          {
            label: "サーバー",
            data: guild,
            backgroundColor: "rgba(255,255,0)",
            borderColor: "rgba(255,255,0)",
            borderWidth: 1,
            radius: 0,
            yAxisID: "left"
          },
          {
            label: "ユーザー",
            data: user,
            backgroundColor: "rgba(255,0,0)",
            borderColor: "rgba(255,0,0)",
            borderWidth: 1,
            radius: 0,
            yAxisID: "right"
          }
        ]
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
        scales: {
          left: {
            position: "left",
            type: "linear",
            max: Math.max(...guild)+50,
            min: Math.min(...guild)-50,
            ticks: {
              stepSize: 10,
              callback: (value)=>{
                return `${value}サーバー`;
              }
            }
          },
          right:{
            position: "right",
            type: "linear",
            max: Math.max(...user)+1000,
            min: Math.min(...user)-1000,
            ticks: {
              stepSize: 100,
              callback: (value)=>{
                return `${value}人`;
              }
            },
            grid: {
              drawOnChartArea: false,
            }
          }
        }
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
          backgroundColor: "rgba(255,165,0)",
          borderColor: "rgba(255,165,0)",
          borderWidth: 1,
          radius: 0,
          yAxisID: "left"
        },
        {
          label: "コマンド",
          data: command,
          backgroundColor: "rgba(0,255,0)",
          borderColor: "rgba(0,255,0)",
          borderWidth: 1,
          radius: 0,
          yAxisID: "right"
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
        scales: {
          left: {
            position: "left",
            type: "linear",
            max: Math.max(...message)+500,
            min: 0,
            title: {
              display: true,
              text: "メッセージ"
            },
            ticks: {
              stepSize: 10,
              callback: (value)=>{
                return `${value}回`;
              }
            }
          },
          right: {
            position: "right",
            type: "linear",
            max: Math.max(...command)+500,
            min: 0,
            title: {
              display: true,
              text: "コマンド"
            },
            ticks: {
              stepSize: 10,
              callback: (value)=>{
                return `${value}回`;
              }
            },
            grid: {
              drawOnChartArea: false,
            }
          }
        }
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
            radius: 0,
            yAxisID: "left"
          },
          {
            label: "メモリー",
            data: ram,
            backgroundColor: "rgba(0,255,255)",
            borderColor: "rgba(0,255,255)",
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
            text: "リソース使用率",
            font: {
              size: 20
            }
          },
          legend: true
        },
        responsive: true,
        scales: {
          left: {
            position: "left",
            type: "linear",
            max: 100,
            min: 0,
            ticks: {
              stepSize: 10,
              callback: (value)=>{
                return `${value}%`;
              }
            }
          }
        }
      }
  });
}

window.setTimeout(()=>{
  document.getElementById("loader").style.visibility = "hidden";
  main();
},3000);

function formatDate(date,format){
  return format
    .replace(/yyyy/g,date.getFullYear())
    .replace(/MM/g,((date.getMonth()+1)))
    .replace(/dd/g,(date.getDate()))
    .replace(/HH/g,(date.getHours()));
};