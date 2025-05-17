export function clearScreen() {
    process.stdout.write('\x1Bc');
  }
  
  export function showBanner() {
    console.log('=== 🧠 ELLIS.AI ===\n');
  }
  