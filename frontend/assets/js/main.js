import "regenerator-runtime/runtime";
import { initContract, login, logout, getCounter, counterIncrement,
         counterDecrement, counterReset } from './near/utils'

function resetUI(){
  document.querySelector('#show').classList.replace('number','loader');
  document.querySelector('#show').innerText = '';
}

// Animations
document.querySelector('#c').addEventListener('click', () => {
  document.querySelector('#left').classList.toggle('eye');
});
document.querySelector('#b').addEventListener('click', () => {
  document.querySelector('#right').classList.toggle('eye');
});
document.querySelector('#d').addEventListener('click', () => {
  document.querySelector('.dot').classList.toggle('on');
});

// Buttons - Interact with the Smart Contract
document.querySelector('#plus').addEventListener('click', async () => {
  resetUI();
  await counterIncrement();
  await updateUI();
});

document.querySelector('#minus').addEventListener('click', async  () => {
  resetUI();
  await counterDecrement();
  await updateUI();
});
document.querySelector('#a').addEventListener('click', async  () => {
  resetUI();
  await counterReset();
  await updateUI();
});

// Log in and log out users using NEAR Wallet
document.querySelector('.sign-in .btn').onclick = login;
document.querySelector('.sign-out .btn').onclick = logout;

// `nearInitPromise` gets called on page load
window.nearInitPromise = initContract()
                    .then(flow)
                    .catch(console.error)

function flow(){
  if (window.walletConnection.isSignedIn()){
    signedInFlow()
  }else{
    signedOutFlow()
  }
  updateUI()
}

// Display the signed-out-flow container
function signedOutFlow() {
  document.querySelector('.sign-in').style.display = 'block';
  document.querySelectorAll('.interact').forEach(button => button.disabled = true)
}

// Displaying the signed in flow container and display counter
async function signedInFlow() {
  document.querySelector('.sign-out').style.display = 'block';
  document.querySelectorAll('.interact').forEach(button => button.disabled = false)
}

async function updateUI(){
  let count = await getCounter();
  
  document.querySelector('#show').classList.replace('loader','number');
  document.querySelector('#show').innerText = count === undefined ? 'calculating...' : count;
  document.querySelector('#left').classList.toggle('eye');

  if (count >= 0) {
    document.querySelector('.mouth').classList.replace('cry','smile');
  } else {
    document.querySelector('.mouth').classList.replace('smile','cry');
  }

  if (count > 20 || count < -20) {
    document.querySelector('.tongue').style.display = 'block';
  } else {
    document.querySelector('.tongue').style.display = 'none';
  }
}