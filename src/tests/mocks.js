/* eslint-disable max-lines */
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

export const getInitialState = (playerName = '', questionsMocked = [],
  playerScore = { score: 0, assertions: 0 },
  configs = { category: '', difficulty: '', type: '' }) => ({
  player: {
    name: playerName,
    assertions: playerScore.assertions,
    score: playerScore.score,
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

export const rankingMock = [
  {
    name: 'Leonardo',
    score: 150,
    picture: 'https://www.gravatar.com/avatar/0f077cac8e26b4daffc25af525400e1a',
  },
  {
    name: 'Amanda',
    score: 140,
    picture: 'https://www.gravatar.com/avatar/5e9c7a87ab7a351dabc508b28acaec11',
  },
];

export const categoriesMock = {
  trivia_categories: [
    {
      id: 9,
      name: 'General Knowledge',
    },
    {
      id: 10,
      name: 'Entertainment: Books',
    },
    {
      id: 11,
      name: 'Entertainment: Film',
    },
    {
      id: 12,
      name: 'Entertainment: Music',
    },
    {
      id: 13,
      name: 'Entertainment: Musicals & Theatres',
    },
    {
      id: 14,
      name: 'Entertainment: Television',
    },
    {
      id: 15,
      name: 'Entertainment: Video Games',
    },
    {
      id: 16,
      name: 'Entertainment: Board Games',
    },
    {
      id: 17,
      name: 'Science & Nature',
    },
    {
      id: 18,
      name: 'Science: Computers',
    },
    {
      id: 19,
      name: 'Science: Mathematics',
    },
    {
      id: 20,
      name: 'Mythology',
    },
    {
      id: 21,
      name: 'Sports',
    },
    {
      id: 22,
      name: 'Geography',
    },
    {
      id: 23,
      name: 'History',
    },
    {
      id: 24,
      name: 'Politics',
    },
    {
      id: 25,
      name: 'Art',
    },
    {
      id: 26,
      name: 'Celebrities',
    },
    {
      id: 27,
      name: 'Animals',
    },
    {
      id: 28,
      name: 'Vehicles',
    },
    {
      id: 29,
      name: 'Entertainment: Comics',
    },
    {
      id: 30,
      name: 'Science: Gadgets',
    },
    {
      id: 31,
      name: 'Entertainment: Japanese Anime & Manga',
    },
    {
      id: 32,
      name: 'Entertainment: Cartoon & Animations',
    },
  ],
};

export const categoriesFetchMock = () => ({
  json: () => categoriesMock,
});

const GENERAL_KNOWLEDGE = 'General Knowledge';

const configuredQuestionsMock = {
  response_code: 0,
  results: [
    {
      category: GENERAL_KNOWLEDGE,
      type: 'multiple',
      difficulty: 'medium',
      question: 'This field is sometimes known as &ldquo;The Dismal Science.&rdquo;',
      correct_answer: 'Economics',
      incorrect_answers: [
        'Philosophy',
        'Politics',
        'Physics',
      ],
    },
    {
      category: GENERAL_KNOWLEDGE,
      type: 'multiple',
      difficulty: 'medium',
      question: 'Which Italian automobile manufacturer gained majority control '
        + 'of U.S. automobile manufacturer Chrysler in 2011?',
      correct_answer: 'Fiat',
      incorrect_answers: [
        'Maserati',
        'Alfa Romeo',
        'Ferrari',
      ],
    },
    {
      category: GENERAL_KNOWLEDGE,
      type: 'multiple',
      difficulty: 'medium',
      question: 'Which of the following carbonated soft drinks were introduced first?',
      correct_answer: 'Dr. Pepper',
      incorrect_answers: [
        'Coca-Cola',
        'Sprite',
        'Mountain Dew',
      ],
    },
    {
      category: GENERAL_KNOWLEDGE,
      type: 'multiple',
      difficulty: 'medium',
      question: 'Who invented Pastafarianism?',
      correct_answer: 'Bobby Henderson',
      incorrect_answers: [
        'Eric Tignor',
        'Bill Nye',
        'Zach Soldi',
      ],
    },
    {
      category: GENERAL_KNOWLEDGE,
      type: 'multiple',
      difficulty: 'medium',
      question: 'What is the star sign of someone born on Valentines day?',
      correct_answer: 'Aquarius',
      incorrect_answers: [
        'Pisces',
        'Capricorn',
        'Scorpio',
      ],
    },
  ],
};

export const configuredQuestionsFetchMock = () => ({
  json: () => configuredQuestionsMock,
});
