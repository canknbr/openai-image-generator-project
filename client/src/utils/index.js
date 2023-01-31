import FileSaver from 'file-saver';
import { surpriseMePrompts } from '../constants';

export const getRandomPrompt = prompt => {
  const rndIndex = Math.floor(Math.random() * surpriseMePrompts.length);
  const rndPrompt = surpriseMePrompts[rndIndex];

  if (rndPrompt === prompt) {
    return getRandomPrompt(prompt);
  }

  return rndPrompt;
};

export const downloadFile = async (_id, photo) => {
  FileSaver.saveAs(photo, `download_${_id}.jpg`);
};

