
  var from = 0;
  var to = 50;

  var parameters = [
    ['Sell', 'Future', 1, 15, 17.15],
    ['Buy', 'Call', 2, 22.5, 2],
  ];

  var numlegs = parameters.filter((p) => p[2] != '').length;


  var legs = [];

  function cost(type, Price, Qty) {
    let cost = null;
    switch (type) {
      case 'Call':
        cost = Price * 100 * Qty;
        break;
      case 'Put':
        cost = Price * 100 * Qty;
        break;
      case 'Stock':
        cost = Price * Qty;
        break;
      case 'Future':
        cost = ((Price * .2) * 100) * Qty;
        break;
      default:
    }
    return cost;
  }

  let legsnetcost = 0;
  let legsnetcostnonmargin = 0;
  let legscost = [];

  for (let i = 0; i < numlegs; i++) {

    legs[i] = {
      'Action': parameters[i][0],
      'Type': parameters[i][1],
      'Qty': parameters[i][2],
      'Strike': parameters[i][3],
      'Price': parameters[i][4],
      'Cost': cost(parameters[i][1], parameters[i][4], parameters[i][2]), // send to function that figures cost
      'Value': [],

    };

    if (legs[i].Action == 'Buy') {
      legscost.push([legs[i].Cost]);
      legsnetcost += legs[i].Cost;
      if (legs[i].Type !== 'Future')
        legsnetcostnonmargin += legs[i].Cost;
    }
    else {
      legscost.push([-(legs[i].Cost)]);
      legsnetcost -= legs[i].Cost;
      if (legs[i].Type !== 'Future')
        legsnetcostnonmargin -= legs[i].Cost;
    }

  }

  // datasheet.getRange('H7:H' + datasheet.getLastRow()).clear();
  // datasheet.getRange('H7:H' + (legscost.length + 6)).setValues(legscost);

  legs.forEach(item => {

    for (let i = from; i < to; i++) {
      let legvalue;
      switch (item.Type) {
        case 'Call':
          legvalue = Math.max(0, i - item.Strike) * 100;
          break;
        case 'Put':
          legvalue = Math.max(0, item.Strike - i) * 100;
          break;
        case 'Stock':
          legvalue = i;
          break;
        case 'Future':
          legvalue = (i - item.Price) * 100;
          break;
        default:
      }
      if (item.Action === 'Buy') {
        item.Value[i] = legvalue * item.Qty;
      } else {
        item.Value[i] = -1 * legvalue * item.Qty;
      }
    }

  });

  var netvalues = netlegvalues(legs, legsnetcostnonmargin,
      legsnetcost, numlegs);

  function netlegvalues(legs, legsnetcostnonmargin, legsnetcost, numlegs) {
    var netresult = [];

    for (let i = from; i < to; i++) {
      let result = 0;
      for (let z = 0; z < numlegs; z++) {
        result = result + legs[z].Value[i];
      }
      netresult.push([
        i,
        result,
        result - legsnetcostnonmargin,
        (result - legsnetcostnonmargin) / Math.abs(legsnetcost) * 100]);
    }
    return netresult;
  }


