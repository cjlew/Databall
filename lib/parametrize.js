const d3 = require("d3");

export const parametrize = (data, params) => {
  let refinedData = [];
  if (params.position !== 'All' && params.team !== 'All' && params.player !== null) {
    data.forEach((player) => {
      if (params.position === player.Pos && params.team === player.Tm && player.Player.match(params.player)) {
        refinedData.push(player);
      }
    });
  } else if (params.position !== 'All' && params.team !== 'All') {
    data.forEach((player) => {
      if (params.position === player.Pos && params.team === player.Tm) {
        refinedData.push(player);
      }
    });
  } else if (params.position !== 'All') {
    data.forEach((player) => {
      if (params.position === player.Pos) {
        refinedData.push(player);
      }
    });
  } else if (params.team !== 'All') {
    data.forEach((player) => {
      if (params.team === player.Tm) {
        refinedData.push(player);
      }
    });
  } else if (params.player !== null){
    debugger
    data.forEach((player) => {
      if (player.Player.match(params.player)) {
        refinedData.push(player);
      }
    });
  } else {
    refinedData = data;
  }


  return refinedData;
};
