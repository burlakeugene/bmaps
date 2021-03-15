export const deepMerge = (obj1, obj2) => {
  for (var p in obj2) {
    try {
      if (obj2[p].constructor == Object) {
        obj1[p] = deepMerge(obj1[p], obj2[p]);
      } else {
        obj1[p] = obj2[p];
      }
    } catch (e) {
      obj1[p] = obj2[p];
    }
  }
  return obj1;
};

export const deepClone = (o) => {
  if (typeof o != 'object') {
    return o;
  }
  if (!o) {
    return o;
  }
  var r = o instanceof Array ? [] : {};
  for (var i in o) {
    if (o.hasOwnProperty(i)) {
      r[i] = deepClone(o[i]);
    }
  }
  return r;
};

export const generateRandomColor = () => {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const colorChangeTone = (color, amount) => {
  amount = parseInt(amount);
  return (
    '#' +
    color
      .replace(/^#/, '')
      .replace(/../g, (color) =>
        (
          '0' +
          Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)
        ).substr(-2)
      )
  );
};

function generateHex(r, g, b) {
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);

  // to address problem mentioned by Alexis Wilke:
  while (r.length < 2) { r = "0" + r; }
  while (g.length < 2) { g = "0" + g; }
  while (b.length < 2) { b = "0" + b; }

  return "#" + r + g + b;
}

function mix(start, end, percent) {
    return start + ((percent) * (end - start));
}

export const prepareColor = (color) => {
  if(color.length === 4){
    let nextColor = '#';
    for(let i = 1; i <= color.length - 1; i++){
      nextColor += color[i]+color[i];
    }
    color = nextColor;
  }
  return color;
}

export const mixColors = (color1, color2, percent) => {
  color1 = prepareColor(color1);
  color2 = prepareColor(color2);
  var red1 = parseInt(color1[1] + color1[2], 16);
  var green1 = parseInt(color1[3] + color1[4], 16);
  var blue1 = parseInt(color1[5] + color1[6], 16);

  var red2 = parseInt(color2[1] + color2[2], 16);
  var green2 = parseInt(color2[3] + color2[4], 16);
  var blue2 = parseInt(color2[5] + color2[6], 16);

  var red = Math.round(mix(red1, red2, percent));
  var green = Math.round(mix(green1, green2, percent));
  var blue = Math.round(mix(blue1, blue2, percent));

  return generateHex(red, green, blue);
}
