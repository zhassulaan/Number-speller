function num2word(number, lang = 'ru') {
	const current_lang = spelling_number[lang];
	number = parseFloat(number.toString().replace(/,/g, ''));

	if (!number || number < 0 || isNaN(number) || Array.isArray(number)) {
		return current_lang.base[0];
	}

	const { declination, base_separator, unit_separator, base, units } = current_lang || spelling_number['ru'];
	const three_digit_parts = split_three_digit_parts(number);
	const result = [];

	// if (number.length > 3) {
	// 	for (let i = number.length; i > 0; i -= 3)
	// 		three_digit_parts.push(parseFloat(number.substring(i - 3, i)));
  	// } else
	// 	three_digit_parts.push(parseFloat(number));

	for (let i = 0; i < three_digit_parts.length; i++) {
		let current_number = three_digit_parts[i];

		const hundreds = Math.floor(current_number / 100) * 100; // 200
		const tens = Math.floor((current_number % 100) / 10) * 10; // 30
		const ones = current_number % 10; // 1

		current_number -= hundreds; // 231 - 200 = 31

		let ending = 'plural';
		if (current_number > 10 && current_number < 20) {
			ending = 'plural';
		}
		else if (current_number % 10 > 1 && current_number % 10 < 5) {
			ending = 'few';
		}
		else if (current_number % 10 == 1) {
			ending = 'singular';
		}

		const a = (hundreds ? (base[hundreds] + ((number > 1000 && i == 0 && current_number != 0) ? unit_separator : ' ')) : ''); // rename
		const c = ((declination && i != 0) ? units[i][ending] : units[i]); // rename

		if (base[three_digit_parts[i] % 100]) {
			result.push(
				a + (three_digit_parts[i] % 100 ? base[three_digit_parts[i] % 100] : '') + c
			);
		}
		else {
			result.push(
        		a + base[tens] + base_separator + base[ones] + c
			);
		}
	}
	
	return result.reverse().join(' ');
}
		  
function split_three_digit_parts(num) {
	const result = [];

	while (num > 0) {
	  	result.push(num % 1000);
		num = Math.floor(num / 1000);
	}

	return result;
}
 
const spelling_number = {
	en: {
		declination: false,
		base_separator: '-',
		unit_separator: ' and ',
		base: {
			0: 'zero',
			1: 'one',
			2: 'two',
			3: 'three',
			4: 'four',
			5: 'five',
			6: 'six',
			7: 'seven',
			8: 'eight',
			9: 'nine',
			10: 'ten',
			11: 'eleven',
			12: 'twelve',
			13: 'thirteen',
			14: 'fourteen',
			15: 'fifteen',
			16: 'sixteen',
			17: 'seventeen',
			18: 'eighteen',
			19: 'nineteen',
			20: 'twenty',
			30: 'thirty',
			40: 'forty',
			50: 'fifty',
			60: 'sixty',
			70: 'seventy',
			80: 'eighty',
			90: 'ninety',
			100: 'one hundred',
			200: 'two hundred',
			300: 'three hundred',
			400: 'four hundred',
			500: 'five hundred',
			600: 'six hundred',
			700: 'seven hundred',
			800: 'eight hundred',
			900: 'nine hundred',
		},
		units: [
			'',
			' thousand',
			' million',
			' billion',
			' trillion',
			' quadrillion',
			' quintillion',
			' sextillion',
			' septillion',
			' octillion',
			' nonillion',
			' decillion',
			' undecillion',
			' duodecillion',
			' tredecillion',
			' quattuordecillion',
			' quindecillion',
		],
	},
	ru: {
		declination: true,
		base_separator: ' ',
		unit_separator: ' ',
		base: {
			0: 'ноль',
			1: 'один',
			2: 'два',
			3: 'три',
			4: 'четыре',
			5: 'пять',
			6: 'шесть',
			7: 'семь',
			8: 'восемь',
			9: 'девять',
			10: 'десять',
			11: 'одиннадцать',
			12: 'двенадцать',
			13: 'тринадцать',
			14: 'четырнадцать',
			15: 'пятнадцать',
			16: 'шестнадцать',
			17: 'семнадцать',
			18: 'восемнадцать',
			19: 'девятнадцать',
			20: 'двадцать',
			30: 'тридцать',
			40: 'сорок',
			50: 'пятьдесят',
			60: 'шестьдесят',
			70: 'семьдесят',
			80: 'восемьдесят',
			90: 'девяносто',
			100: 'сто',
			200: 'двести',
			300: 'триста',
			400: 'четыреста',
			500: 'пятьсот',
			600: 'шестьсот',
			700: 'семьсот',
			800: 'восемьсот',
			900: 'девятьсот',
		},
		alternative_base: {
			1: 'одна',
			2: 'две',
		},
		units: [
			'',
			{
				singular: ' тысяча',
				few: ' тысячи',
				plural: ' тысяч',
			},
			{
				singular: ' миллион',
				few: ' миллиона',
				plural: ' миллионов',
			},
			{
				singular: 'миллиард',
				few: 'миллиарда',
				plural: 'миллиардов',

			},
			{
				singular: 'триллион',
				few: 'триллиона',
				plural: 'триллионов',
			},
			{
				singular: 'квадрильон',
				few: 'квадриллион',
				plural: 'квадрилон',
			},
			{
				singular: ' квинтиллион',
				few: ' квинтиллиона',
				plural: ' квинтильонов',
			},
			{
				singular: ' секстиллионов',
				few: ' секстильона',
				plural: ' секстиллионов',
			},
			{
				singular: ' септиллион',
				few: ' септиллиона',
				plural: ' септиллионов',
			},
			{
				singular: ' октиллион',
				few: ' октиллиона',
				plural: ' октиллионов',
			},
			{
				singular: ' нониллион',
				few: ' нониллиона',
				plural: ' нониллионов',
			},
			{
				singular: ' дециллион',
				few: ' дециллиона',
				plural: ' дециллионов',
			},
			{
				singular: ' ундециллион',
				few: ' ундециллиона',
				plural: ' ундециллионив',
			},
			{
				singular: ' дуодециллион',
				few: ' дуодециллиона',
				plural: ' дуодециллионив',
			},
			{
				singular: ' тредециллион',
				few: ' тредециллиона',
				plural: ' тредециллионив',
			},
			{
				singular: ' кватуордециллион',
				few: ' кватуордециллиона',
				plural: ' кватуордециллионив',
			},
			{
				singular: ' квиндециллион',
				few: ' квиндециллиона',
				plural: ' квиндециллионив',
			},
		],
	},
	kk: {
		declination: false,
		base_separator: ' ',
		unit_separator: ' ',
		base: {
			0: 'нөл',
			1: 'бір',
			2: 'екі',
			3: 'үш',
			4: 'төрт',
			5: 'бес',
			6: 'алты',
			7: 'жеті',
			8: 'сегіз',
			9: 'тоғыз',
			10: 'он',
			11: 'он бір',
			12: 'он екі',
			13: 'он үш',
			14: 'он төрт',
			15: 'он бес',
			16: 'он алты',
			17: 'он жеті',
			18: 'он сегіз',
			19: 'он тоғыз',
			20: 'жиырма',
			30: 'отыз',
			40: 'қырық',
			50: 'елу',
			60: 'алпыс',
			70: 'жетпіс',
			80: 'сексен',
			90: 'тоқсан',
			100: 'жүз',
			200: 'екі жүз',
			300: 'үш жүз',
			400: 'төрт жүз',
			500: 'бес жүз',
			600: 'алты жүз',
			700: 'жеті жүз',
			800: 'сегіз жүз',
			900: 'тоғыз жүз',
		},
		units: [
			'',
			' мың',
			' миллион',
			' миллиард',
			' триллион',
			' квадриллион',
			' квинтилион',
			' секстиллион',
			' септилион',
			' октилион',
			' нониллион',
			' дециллион',
			' ундециллион',
			' дуодециллион',
			' тредециллион',
			' кватуордециллион',
			' квиндециллион',
		],
	},
};

var input = document.getElementById('value');
var select;
var result = document.getElementById('result');

input.addEventListener('change', function() {
	var value = input.value;
	var select  = document.getElementById('language').value;
	result.innerHTML += num2word(value, select) + '\n';
});
		  