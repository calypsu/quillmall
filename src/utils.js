export const sendError = msg => ({ error: msg });

export const gen_random = num => Math.floor(Math.random() * num);

export const check_answer = (question, answer) => question.correct_answer == answer;