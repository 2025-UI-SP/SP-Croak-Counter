const SHEET_NAME = "Data"

function transformWindSpeed(speed) {
  switch (speed) {
    case "Calm (<1 mph)":
      return "0";
    case "Light Air (1-3 mph)":
      return "1";
    case "Light Breeze (4-7 mph)":
      return "2";
    case "Gentle Breeze (8-12 mph)":
      return "3";
    case "Moderate Breeze (13-18 mph)":
      return "4";
    default:
      throw new Error(`Unkown speed value: '${speed}'`);
  }
}

function transformSkyCode(sky) {
  switch (sky) {
    case "Clear or only a few clouds":
      return "0";
    case "Partly cloudy or variable":
      return "1";
    case "Broken clouds or overcast":
      return "2";
    case "Fog":
      return "4";
    case "Drizzle or light rain (not affecting hearing)":
      return "5";
    case "Showers (is affecting hearing ability)":
      return "6";
    default:
      throw new Error(`Unkown sky value '${sky}'`);
  }
}

function doPost(e) {
  try {
    
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Data");
    const body = JSON.parse(e.postData.contents);
    const rows = [];
    body.forEach((item) => {
      const row = [
        item.date,
        item.data.startTime,
        item.site,
        item.data.latitude,
        item.data.longitude,
        item.data.county,
        item.data.observer,
        item.data.affiliation,
        item.data.waterTemp,
        item.data.startingAirTemp,
        item.data.endingAirTemp,
        transformSkyCode(item.data.skyCondition),
        transformWindSpeed(item.data.windSpeed),
        item.data.woodfrog,
        item.data.westernchorusfrog,
        item.data.springpeeper,
        item.data.northernleopardfrog,
        item.data.pickerelfrog,
        item.data.americantoad,
        item.data.easterngraytreefrog,
        item.data.copesgraytreefrog,
        item.data.minkfrog,
        item.data.greenfrog,
        item.data.bullfrog,
        item.data.endTime,
        item.data.comments,
      ];

      rows.push(row);
    });
    // split to make sure any issues are found before pushing all data
    rows.forEach((row) => {
      sheet.appendRow(row);
    });
    return ContentService.createTextOutput(JSON.stringify({success: true}));
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({success: false, error: error.message}));
  } 
}

function doGet(request) {
  return ContentService.createTextOutput(JSON.stringify({success: true, data: {}}));
}

function getAccesstoken() {
  Logger.log(ScriptApp.getOAuthToken());
}