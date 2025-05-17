import readline from 'readline';
import { exec } from 'child_process';
import { clearScreen, showBanner } from './utils.js';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let isRecording = false;

export function mainMenu() {
  clearScreen();
  showBanner();

  if (!isRecording) {
    console.log('1. 🎙 Начать запись');
    console.log('0. ❌ Выход');
    rl.question('\nВыбор: ', (answer) => {
      if (answer === '1') {
        startRecording();
      } else {
        rl.close();
      }
    });
  } else {
    console.log('Enter ⏎ — Завершить запись');
    console.log('0. ❌ Отменить\n');
    rl.question('', (input) => {
      if (input === '0') {
        isRecording = false;
        mainMenu();
      } else {
        stopRecording();
      }
    });
  }
}

function startRecording() {
  console.log('🎤 Запись началась...');
  isRecording = true;
  const scriptPath = resolve(__dirname, './scripts/start-record.sh');
  setTimeout(() => {
    exec(`bash ${scriptPath}`, () => {
      mainMenu();
    });
  }, 500)
}

function stopRecording() {
  console.log('⏳ Обработка...');
  isRecording = false;
  const scriptPath = resolve(__dirname, './scripts/stop-record.sh');
  exec(`bash ${scriptPath}`, (err, stdout: string) => {
    if (err) {
      console.error('❌ Ошибка при обработке записи:', err);
    } else {
      if (!stdout) {
        console.log('Ничего записано не было. stdout пуст! ->', stdout ?? 'undefined')
        return void 0;
      }
      console.log(`✅ Озвучка завершена.\nТвой текст: ${stdout}`);
    }
    setTimeout(mainMenu, 10500);
  });
}
