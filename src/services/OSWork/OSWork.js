
import { RunIfPossible } from "../RunIfPossible/RunIfPossible.js";

export function OSWork({onWindows, onLinux, onMacOS}) {
  const platform = process.platform;
  
  switch (platform) {
    case 'win32':
      return RunIfPossible({func: onWindows});
    case 'linux':
      return RunIfPossible({func: onLinux});
    case 'darwin':
      return RunIfPossible({func: onMacOS});
    default:
      throw new Error('Unsupported platform');
  }
}
