const { v4: uuidv4 } = require('uuid');

const movies = [
  {
    id: '1',
    title: 'Inception',
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    rating: 8.8,
    releaseDate: '2010-07-16',
    reviews: [
      { id: 'r1', user: 'Alice', content: 'Mind blowing!', rating: 5, createdAt: '2023-01-01T10:00:00Z' },
      { id: 'r2', user: 'Bob', content: 'A bit confusing but great visuals.', rating: 4, createdAt: '2023-01-02T12:00:00Z' }
    ]
  },
  {
    id: '2',
    title: 'The Shawshank Redemption',
    description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    rating: 9.3,
    releaseDate: '1994-09-22',
    reviews: [
      { id: 'r3', user: 'Charlie', content: 'Best movie ever.', rating: 5, createdAt: '2023-02-01T14:30:00Z' }
    ]
  },
  {
    id: '3',
    title: 'The Godfather',
    description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
    rating: 9.2,
    releaseDate: '1972-03-24',
    reviews: []
  },
  {
    id: '4',
    title: 'The Dark Knight',
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    rating: 9.0,
    releaseDate: '2008-07-18',
    reviews: []
  },
  {
    id: '5',
    title: 'Pulp Fiction',
    description: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
    rating: 8.9,
    releaseDate: '1994-10-14',
    reviews: []
  }
];

module.exports = {
  movies
};
