// Model section
let password;
const maxPasswordLength = 16384;


function getRandomCharFromStr(string) {
	return string[Math.floor(Math.random() * string.length)];
}


function makeCharset(lowerp, upperp, numberp) {
	const charset1 = "abcdefghjkilmnopqrstuvwxyz";
	const charset2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const charset3 = "0123456789";

	let charset = '';

	if (lowerp) charset += charset1;
	if (upperp) charset += charset2;
	if (numberp) charset += charset3;

	return charset;
}


function makePassword(lowerp, upperp, numberp, length) {

	// 16384
	if (Number(length) > maxPasswordLength) {
		(() => {
			setPassword(`-- Password must be at most ${maxPasswordLength} characters --`);
		})();
		return;
	}

	const charset = makeCharset(lowerp, upperp, numberp);

	let word = '';
	if (charset != '') {
		for (let i = 0; i < length; i++) {
			let randomChar = getRandomCharFromStr(charset);
			word = word + randomChar;
		}
	}

	setPassword(word);
}


function setPassword(word) {
	password = word;
}


// View section
function render() {
	if (password != undefined && password.length > 0) {
		const element = document.getElementById('password');
		element.innerHTML = '' + password;
	} else {
		const element = document.getElementById('password');
		element.innerHTML = '';
	}
}

function displayLengthWarning() {
	// Use the password display div for the warning
	const password = document.querySelector('#password');

	password.innerHTML = `The length of the password must be at most ${maxPasswordLength}`;
}


// Controller section
function generatePassword(event) {
	const lowercaseCheckbox = document.getElementById('lowercase-checkbox');
	const isLowercase = lowercaseCheckbox.checked;

	const uppercaseCheckbox = document.getElementById('uppercase-checkbox');
	const isUppercase = uppercaseCheckbox.checked;

	const numbersCheckbox = document.getElementById('numbers-checkbox');
	const isNumbers = numbersCheckbox.checked;

	const letterInput = document.getElementById('length-input');
	const length = letterInput.value;

	makePassword(isLowercase, isUppercase, isNumbers, length);

	render();
}

// Generate password if Enter is pressed
window.addEventListener('keypress', onKeyPress);

function onKeyPress(e) {
	// If Enter is pressed, generate password
	if (e.key === 'Enter') {
		generatePassword(event);	
	}
}
