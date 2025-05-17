import readline from 'readline';
import { ChildProcessByStdio, exec, spawn } from 'child_process';
import { clearScreen, showBanner } from './utils.js';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import fs from 'fs'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let isRecording = false;
let arecord: ChildProcessByStdio<null, null, null>

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
      console.log('НАЖАТ ENTER');
      
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
  arecord = spawn('arecord', ['-f', 'cd', '-c', '1', '-r', '16000', resolve(__dirname, './input.wav')], {
    detached: true,
    stdio: ['ignore', 'ignore', 'ignore']  // ← это ключ
  });
  fs.writeFileSync(resolve(__dirname, './scripts/arecord.pid'), (arecord.pid || 0).toString());
  exec(`bash ${scriptPath}`, () => {
    mainMenu();
  });
}

function stopRecording() {
  console.log('⏳ Обработка...');
  if(arecord) {
    arecord.kill()
    fs.rmSync(resolve(__dirname, './scripts/arecord.pid'))
  }
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
      fs.rmSync(resolve(__dirname, './input.wav'))
    }
    setTimeout(mainMenu, 10500);
  });
}


/**
 * Запускает озвучку подготовленного текста
 */
function startVoiceOver(text: string) {
  console.log(';aaallalalal')
}