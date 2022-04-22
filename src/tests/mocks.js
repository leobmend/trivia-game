export const defaultQuestions = [
  {
    category: 'Geography',
    type: 'multiple',
    difficulty: 'easy',
    question: 'All of the following are classified as Finno-Ugric languages EXCEPT:',
    correct_answer: 'Samoyedic',
    incorrect_answers: [
      'Hungarian',
      'Finnish',
      'Estonian',
    ],
  },
  {
    category: 'Entertainment: Film',
    type: 'multiple',
    difficulty: 'medium',
    question: 'Which one of these actors is said to be cut from the film '
      + '&#039;E.T. the Extra-Terrestrial&#039;?',
    correct_answer: 'Harrison Ford',
    incorrect_answers: [
      'Michael J. Fox',
      'Andy Kaufman',
      'Arnold Schwarzenegger',
    ],
  },
  {
    category: 'Entertainment: Video Games',
    type: 'multiple',
    difficulty: 'medium',
    question: 'In &quot;Call Of Duty: Zombies&quot;, what does the game traditionally '
      + 'reward you for completing a boss round?',
    correct_answer: 'Max Ammo',
    incorrect_answers: [
      'A Pack-A-Punched gun',
      'Death Machine',
      'Monkey Bombs',
    ],
  },
  {
    category: 'Entertainment: Music',
    type: 'multiple',
    difficulty: 'hard',
    question: 'Who sings the rap song &quot;Secret Wars Part 1&quot;?',
    correct_answer: 'The Last Emperor',
    incorrect_answers: [
      'MC Frontalot',
      'Busdriver',
      'Masta Killa',
    ],
  },
  {
    category: 'Science: Computers',
    type: 'boolean',
    difficulty: 'easy',
    question: 'The Python programming language gets its name from the British '
      + 'comedy group &quot;Monty Python.&quot;',
    correct_answer: 'True',
    incorrect_answers: [
      'False',
    ],
  },
];

export const boolQuestions = [];

export const getInitialState = (playerName = '', questionsMocked = [],
  configs = { category: '', difficulty: '', type: '' }) => ({
  player: {
    name: playerName,
    assertions: 0,
    score: 0,
    gravatarEmail: '',
  },
  token: '',
  trivia: {
    isFetching: false,
    questions: questionsMocked,
    responseCode: 0,
  },
  configs: {
    category: configs.category,
    difficulty: configs.difficulty,
    type: configs.type,
  },
});
