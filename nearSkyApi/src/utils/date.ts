import { LanguageModelDictionary } from "../models";

export function formatDateISO(date:string){
    return new Date(date).toISOString().slice(0, 10);
}

export function formatDate(date: string, initialFormat: string, finalFormat: string): string {
    initialFormat = initialFormat.toUpperCase();
    finalFormat = finalFormat.toUpperCase();
  
    let ddPosition = initialFormat.indexOf('DD');
    let mmPosition = initialFormat.indexOf('MM');
    let yyyyPosition = initialFormat.indexOf('YYYY');
  
    let dd = date.substring(ddPosition, ddPosition + 2); // Extrai os próximos 2 caracteres após a posição do 'DD'
    let mm = date.substring(mmPosition, mmPosition + 2); // Extrai os próximos 2 caracteres após a posição do 'MM'
    let yyyy = date.substring(yyyyPosition, yyyyPosition + 4); // Extrai os próximos 4 caracteres após a posição do 'YYYY'
  
    let formatedDate = finalFormat
      .replace('DD', dd)
      .replace('MM', mm)
      .replace('YYYY', yyyy);
    
    return formatedDate;
}
//newStartDate.setDate(new Date('2024-04-14').getDate() + 5);

  
export function getStartEndDate(currentDate: string | Date, daysAhead: number, startDate?: string, endDate?: string): [string, string] {
    function formatDateIntern(date: string, initialFormat: string, finalFormat: string): string {
        initialFormat = initialFormat.toUpperCase();
        finalFormat = finalFormat.toUpperCase();
      
        let ddPosition = initialFormat.indexOf('DD');
        let mmPosition = initialFormat.indexOf('MM');
        let yyyyPosition = initialFormat.indexOf('YYYY');
      
        let dd = date.substring(ddPosition, ddPosition + 2); // Extrai os próximos 2 caracteres após a posição do 'DD'
        let mm = date.substring(mmPosition, mmPosition + 2); // Extrai os próximos 2 caracteres após a posição do 'MM'
        let yyyy = date.substring(yyyyPosition, yyyyPosition + 4); // Extrai os próximos 4 caracteres após a posição do 'YYYY'
      
        let formatedDate = finalFormat
          .replace('DD', dd)
          .replace('MM', mm)
          .replace('YYYY', yyyy);
        
        return formatedDate;
    }

    function setDateFormat(date:string):string{
        return formatDateIntern(date,'DD/MM/YYYY','YYYY-MM-DD')
    }

    if (typeof currentDate === 'string') {
      currentDate = new Date(currentDate); // Convertendo a string em um objeto Date
    }
  
    const currentDateFormatted = setDateFormat(currentDate.toLocaleDateString());
    const regex = /^\d{4}[-/]\d{2}[-/]\d{2}$/;
  
    if (startDate && endDate) { // ambos !null 
      let formattedStartDate = startDate.replace(/\//g, '-');
      let formattedEndDate = endDate.replace(/\//g, '-');
  
      if (regex.test(endDate) && regex.test(startDate)) {
        if (new Date(startDate) > new Date(endDate)) {
          throw new Error("'startDate' cannot be after 'endDate'.");
        }
        return [formattedStartDate, formattedEndDate];
      }
  
      const newStartDate = new Date(startDate);
      newStartDate.setDate(newStartDate.getDate() + daysAhead);
      const startDateFormatted = formattedStartDate;
      formattedEndDate = setDateFormat(newStartDate.toLocaleDateString());
  
      return [startDateFormatted, formattedEndDate];
  
    } else if (!startDate && !endDate) { // ambos null
      const newStartDate = new Date(currentDateFormatted)
      newStartDate.setDate(new Date(currentDateFormatted).getDate() + daysAhead);
  
      return [currentDateFormatted, setDateFormat(newStartDate.toLocaleDateString())];
    } else if (startDate && !endDate) {
  
      let formattedStartDate = startDate.replace(/\//g, '-');
      const newStartDate = new Date(startDate);
      newStartDate.setDate(newStartDate.getDate() + daysAhead + 1);
  
      return [formattedStartDate, setDateFormat(newStartDate.toLocaleDateString())];
    }
  
    const newEndDate = new Date(currentDateFormatted)
    newEndDate.setDate(new Date(currentDateFormatted).getDate() + daysAhead);
  
    return [currentDateFormatted, setDateFormat(newEndDate.toLocaleDateString())];
}

export function getDayOfWeek(currentDate:string, date:number, language?:string):string{
  language = language || 'en';

  const timeString = currentDate.slice(16, 24);
  const combinedDateTimeString = formatDateToYYYYMMDD(new Date(date*1000)) + " " + timeString;
  const combinedDate = new Date(combinedDateTimeString);
  const day = new Date(combinedDate).toLocaleDateString(language, { weekday: 'long' });
  // const dateValue = new Date(date).toISOString().slice(0,10)
  // const currentDateValue = new Date(currentDate).toISOString().slice(0,10)

  function formatDateToYYYYMMDD(date:Date){
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return  `${year}-${month}-${day}`;
  }
  const dateValue = formatDateToYYYYMMDD(new Date(date*1000))
  const currentDateValue = formatDateToYYYYMMDD(new Date(currentDate))

  const translations: { [key: string]: string } = {
    [LanguageModelDictionary.Arabic]: 'اليوم', // Arabic
    [LanguageModelDictionary.Bulgarian]: 'днес', // Bulgarian
    [LanguageModelDictionary.Czech]: 'dnes', // Czech
    [LanguageModelDictionary.Danish]: 'i dag', // Danish
    [LanguageModelDictionary.German]: 'heute', // German
    [LanguageModelDictionary.Greek]: 'σήμερα', // Greek
    [LanguageModelDictionary.English]: 'Today', // English
    [LanguageModelDictionary.AmericanEnglish]: 'Today', // American English
    [LanguageModelDictionary.Spanish]: 'hoy', // Spanish
    [LanguageModelDictionary.Persian]: 'امروز', // Persian
    [LanguageModelDictionary.Finnish]: 'tänään', // Finnish
    [LanguageModelDictionary.French]: 'aujourd\'hui', // French
    [LanguageModelDictionary.Hebrew]: 'היום', // Hebrew
    [LanguageModelDictionary.Hungarian]: 'ma', // Hungarian
    [LanguageModelDictionary.Indonesian]: 'hari ini', // Indonesian
    [LanguageModelDictionary.Italian]: 'oggi', // Italian
    [LanguageModelDictionary.Japanese]: '今日', // Japanese
    [LanguageModelDictionary.Korean]: '오늘', // Korean
    [LanguageModelDictionary.Dutch]: 'vandaag', // Dutch
    [LanguageModelDictionary.Polish]: 'dzisiaj', // Polish
    [LanguageModelDictionary.BrazilianPortuguese]: 'Hoje', // Brazilian Portuguese
    [LanguageModelDictionary.Portuguese]: 'Hoje', // Portuguese
    [LanguageModelDictionary.Russian]: 'сегодня', // Russian
    [LanguageModelDictionary.Slovak]: 'dnes', // Slovak
    [LanguageModelDictionary.Serbian]: 'данас', // Serbian
    [LanguageModelDictionary.Swedish]: 'idag', // Swedish
    [LanguageModelDictionary.Turkish]: 'bugün', // Turkish
    [LanguageModelDictionary.Ukrainian]: 'сьогодні', // Ukrainian
    [LanguageModelDictionary.Vietnamese]: 'hôm nay', // Vietnamese
    [LanguageModelDictionary.Chinese]: '今天', // Chinese
  };

  // Verificar se a data é igual à data atual
  if (currentDateValue === dateValue) {
    // Verificar se há uma tradução disponível para o idioma especificado
    if (translations.hasOwnProperty(language)) {
      return translations[language];
    } else {
      // Se não houver tradução disponível para o idioma, retornar 'Today' como padrão
      return 'Today';
    }
  }
  return day;
}

export function convertEpochToISO8601(datetimeEpoch: number, roundMinutes: boolean): string {
  const date = new Date(datetimeEpoch * 1000); // Convertendo de segundos para milissegundos

  if (roundMinutes) {
      const minutes = date.getMinutes();
      if (minutes >= 30) {
          date.setMinutes(0); // Arredondando os minutos para a próxima hora
          date.setSeconds(0);
          date.setMilliseconds(0); // Zerando os milissegundos
          date.setHours(date.getHours() + 1); // Incrementando a hora
      } else {
          date.setMinutes(0); // Arredondando os minutos para a hora anterior
          date.setSeconds(0);
          date.setMilliseconds(0); // Zerando os milissegundos
      }
  } else {
      date.setSeconds(0);
      date.setMilliseconds(0); // Zerando os milissegundos caso não haja arredondamento de minutos
  }

  return date.toISOString();
}

// export function getDayOfWeek(currentDate:string, date:number, language?:string):string{
//   language = language || 'en';

//   const timeString = currentDate.slice(16, 24);
//   const combinedDateTimeString = date + " " + timeString;
//   const combinedDate = new Date(combinedDateTimeString);
//   const day = new Date(combinedDate).toLocaleDateString(language, { weekday: 'long' });
  
//   function formatDateToYYYYMMDD(date:Date){
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const day = String(date.getDate()).padStart(2, '0');
//     return  `${year}-${month}-${day}`;
//   }
  
//   const currentDateValue = formatDateToYYYYMMDD(new Date(currentDate));
//   const dateValue = formatDateToYYYYMMDD(new Date(date*1000));
  
//   // const dateValue = new Date(date).toISOString().slice(0,10)
//   // const currentDateValue = new Date(currentDate).toISOString().slice(0,10)

//   const translations: { [key: string]: string } = {
//     [LanguageModelDictionary.Arabic]: 'اليوم', // Arabic
//     [LanguageModelDictionary.Bulgarian]: 'днес', // Bulgarian
//     [LanguageModelDictionary.Czech]: 'dnes', // Czech
//     [LanguageModelDictionary.Danish]: 'i dag', // Danish
//     [LanguageModelDictionary.German]: 'heute', // German
//     [LanguageModelDictionary.Greek]: 'σήμερα', // Greek
//     [LanguageModelDictionary.English]: 'Today', // English
//     [LanguageModelDictionary.AmericanEnglish]: 'Today', // American English
//     [LanguageModelDictionary.Spanish]: 'hoy', // Spanish
//     [LanguageModelDictionary.Persian]: 'امروز', // Persian
//     [LanguageModelDictionary.Finnish]: 'tänään', // Finnish
//     [LanguageModelDictionary.French]: 'aujourd\'hui', // French
//     [LanguageModelDictionary.Hebrew]: 'היום', // Hebrew
//     [LanguageModelDictionary.Hungarian]: 'ma', // Hungarian
//     [LanguageModelDictionary.Indonesian]: 'hari ini', // Indonesian
//     [LanguageModelDictionary.Italian]: 'oggi', // Italian
//     [LanguageModelDictionary.Japanese]: '今日', // Japanese
//     [LanguageModelDictionary.Korean]: '오늘', // Korean
//     [LanguageModelDictionary.Dutch]: 'vandaag', // Dutch
//     [LanguageModelDictionary.Polish]: 'dzisiaj', // Polish
//     [LanguageModelDictionary.BrazilianPortuguese]: 'Hoje', // Brazilian Portuguese
//     [LanguageModelDictionary.Portuguese]: 'Hoje', // Portuguese
//     [LanguageModelDictionary.Russian]: 'сегодня', // Russian
//     [LanguageModelDictionary.Slovak]: 'dnes', // Slovak
//     [LanguageModelDictionary.Serbian]: 'данас', // Serbian
//     [LanguageModelDictionary.Swedish]: 'idag', // Swedish
//     [LanguageModelDictionary.Turkish]: 'bugün', // Turkish
//     [LanguageModelDictionary.Ukrainian]: 'сьогодні', // Ukrainian
//     [LanguageModelDictionary.Vietnamese]: 'hôm nay', // Vietnamese
//     [LanguageModelDictionary.Chinese]: '今天', // Chinese
//   };

//   // Verificar se a data é igual à data atual
//   if (currentDateValue === dateValue) {
//     // Verificar se há uma tradução disponível para o idioma especificado
//     if (translations.hasOwnProperty(language)) {
//       return translations[language];
//     } else {
//       // Se não houver tradução disponível para o idioma, retornar 'Today' como padrão
//       return 'Today';
//     }
//   }
//   return day;
// }